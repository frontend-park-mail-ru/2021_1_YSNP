import {BasePresenter} from './BasePresenter.js';

import {SearchModel} from '../models/SearchModel.js';

import {eventHandlerWithDataType, eventProductListHandler} from '../modules/handlers/eventHandler.js';
import {amountMask, parseAmount} from '../modules/layout/mask.js';
import {EndlessScroll} from '../modules/handlers/endlessScroll';
import {PageUpHandler} from '../modules/handlers/pageUpHandler.js';
import {noop} from '../modules/noop';
import {NotFoundError, UnauthorizedError} from '../modules/http/httpError';

import {router} from '../modules/router.js';
import {frontUrls} from '../modules/urls/frontUrls.js';
import {customSessionStorage} from '../modules/storage/customSessionStorage.js';

import {categories} from '../modules/layout/fields.js';
import {sentryManager} from '../modules/sentry';

/***
 *  class SearchPresenter extends BasePresenter
 */
export class SearchPresenter extends BasePresenter {

    /***
     * @author Ivan Gorshkov
     *
     * Class constructor
     * @param {SearchView} view - view
     * @param text
     * @this {SearchPresenter}
     */
    constructor(view, text) {
        super(view);
        this.__view = view;
        this.__model = new SearchModel();
        this.__searchInitText = decodeURI(text);
        this.__endlessScroll = new EndlessScroll(this.__createListeners().scroll);
        this.__pageUp = new PageUpHandler();
    }

    /***
     * @author Ivan Gorshkov
     *
     * update super Presenter. update productListModel and userModel
     * @return {Promise<{data: *, status: number}>}
     */
    async update() {
        return super.update()
            .catch((err) => {
                //TODO(Serge) нормальная обработка ошибок

                console.log(err.message);
                if (!UnauthorizedError.isError(err)) {
                    sentryManager.captureException(err);
                }

                this.checkOfflineStatus(err);
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * SearchBox Presenter control. render view and PageUP
     * @return {Promise<void>}
     */
    async control() {
        await this.update();
        if (this.checkOffline()) {
            return;
        }

        this.__view.render(this.__makeContext())
            .then(() => this.__search());

        this.__endlessScroll.start();
        this.__pageUp.start();

        this.checkScrollOffset();
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__endlessScroll.remove();
        this.__pageUp.remove();

        this.__view.removePage();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Header click listener
     * @param {MouseEvent} ev - event
     * @param {string} dataType
     * @param {Object} actions
     * @private
     * @this {SearchPresenter}
     */
    __listenerSearch(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {SearchPresenter}
     * @return {Object}
     * @private
     */
    __createListeners() {
        return {
            navigation: {
                backClick: {
                    type: 'click',
                    listener: this.__listenerSearch.bind(this, 'action', this.__getActions().navigation)
                }
            },
            search: {
                sort: {
                    type: 'change',
                    listener: this.__listenerSearch.bind(this, 'action', this.__getActions().search)
                },
                submitFilter: {
                    type: 'click',
                    listener: this.__listenerSearch.bind(this, 'action', this.__getActions().search)
                },
                validateInput: {
                    type: 'input',
                    listener: this.__listenerSearch.bind(this, 'action', this.__getActions().search)
                },
                mapOpen: {
                    type: 'click',
                    listener: this.__openMapPopUp.bind(this)
                }
            },
            productList: {
                productCardClick: {
                    type: 'click',
                    listener: this.__listenerProductListClick.bind(this)
                }
            },
            scroll: {
                scrollEnd: this.__scrollEnd.bind(this)
            }
        };
    }

    /***
     * Open Map PopUp
     * @param {MouseEvent} ev - event
     */
    __openMapPopUp(ev) {
        ev.stopPropagation();
        this.openMap();
    }

    /***
     * Like card callback
     * @param {string} id - product card id
     * @private
     */
    __likeCard(id) {
        const numberId = parseInt(id, 10);

        if (!this.__userModel.isAuth) {
            super.openAuth();
            return;
        }

        this.__model.voteProduct(numberId)
            .then(({status}) => {
                if (status === 'dislike') {
                    this.__view.dislikeProduct(numberId);
                    return;
                }

                this.__view.likeProduct(numberId);
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

         sentryManager.captureException(err);
                console.log(err.message);

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /***
     * Open card callback
     * @param {string} id - product card id
     * @private
     */
    __openCard(id) {
        this.saveScrollOffset();
        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.product(numberId), '', {title: 'Поиск'});
    }

    /***
     * Product List click event
     * @param {MouseEvent} ev - event
     */
    __listenerProductListClick(ev) {
        ev.stopPropagation();
        eventProductListHandler(ev, this.__getActions().productList);
    }

    /***
     * @author Ivan Gorshkov
     *
     * action for navigation to back
     * @this {SearchPresenter}
     * @private
     */
    __navBack() {
        this.closeAllComponents();
        this.__view.removingSubViews();
        router.navigateBack();
    }

    /***
     * @author Ivan Gorshkov
     *
     * @this {SearchPresenter}
     * @private
     */
    __sort(ev) {
        customSessionStorage.set('sort', ev.target.value);

        this.__search().then(() => noop());
    }

    /***
     * @author Ivan Gorshkov
     *
     * @this {SearchPresenter}
     * @private
     */
    __submitFilter() {
        customSessionStorage.set('category', this.__view.getAllFields().category.value);
        customSessionStorage.set('date', this.__view.getAllFields().date.value);

        this.__search().then(() => noop());
    }

    /***
     * @author Ivan Gorshkov
     *
     * async function for search with filer and soring
     * @return {Promise<void>}
     * @private
     */
    async __search() {
        const {sort, search, fromAmount, toAmount, date, category} = this.__view.getAllFields();
        this.__model.fillSearchData({
            category: category.value,
            fromAmount: parseAmount(fromAmount.value),
            toAmount: parseAmount(toAmount.value),
            date: date.value,
            radius: this.__userModel.getData().radius,
            longitude: this.__userModel.getData().longitude,
            latitude: this.__userModel.getData().latitude,
            sorting: sort.value,
            search: search.value
        });

        if (search.value !== '') {
            router.replaceState(frontUrls.searchWithText(search.value), '', {title: router.getPreviousTitle()});
        } else {
            router.replaceState(frontUrls.search, '', {title: router.getPreviousTitle()});
        }

        await this.__model.update()
            .then(() => {
                this.__view.rerenderProductList(this.__makeContext());
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                if (!NotFoundError.isError(err)) {
                    sentryManager.captureException(err);
                }

                this.__view.deleteProductList();

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /***
     * Listener on scroll end
     * @returns {Promise<void>}
     * @private
     */
    __scrollEnd() {
        this.__model.updateNewData()
            .then(() => {
                const newData = this.__model.newData;
                if (!Array.isArray(newData) || newData.length === 0) {
                    this.__endlessScroll.remove();
                    return;
                }

                this.__view.addNewCards(newData);
            })
            .catch((err) => {
                if (err.message === 'isUpdate') {
                    return;
                }

                //TODO(Sergey) нормальная обработка ошибок

                 sentryManager.captureException(err);
                console.log(err.message);

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * @this {SearchPresenter}
     * @private
     */
    __getActions() {
        return {
            navigation: {
                backClick: {
                    open: this.__navBack.bind(this)
                }
            },
            search: {
                changeSort: {
                    open: this.__sort.bind(this)
                },
                submitFilter: {
                    open: this.__submitFilter.bind(this)
                },
                submitSearch: {
                    open: this.__search.bind(this)
                },
                priceInput: {
                    open: this.__validateFields.bind(this)
                }
            },
            productList: {
                cardClick: {
                    open: this.__openCard.bind(this)
                },
                likeClick: {
                    open: this.__likeCard.bind(this)
                }
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * @this {SearchPresenter}
     * @private
     */
    __validateFields(ev) {
        ev.target.value = amountMask(ev.target.value);
    }

    /***
     * @author Ivan Gorshkov
     *
     * Make view context
     * @returns {{productList: {data: *[], listeners: {productCardClick: {listener: *, type: string}}}}}
     * @private
     * @this {SearchPresenter}
     */
    __makeContext() {
        return {
            navigation: {
                data: null,
                listeners: this.__createListeners().navigation
            },
            productList: {
                data: this.__model.getData(),
                listeners: this.__createListeners().productList
            },
            search: {
                data: {
                    textSearch: this.__searchInitText,
                    optionSort: customSessionStorage.get('sort'),
                    optionCategory: customSessionStorage.get('category'),
                    optionDate: customSessionStorage.get('date'),
                    categories: categories
                },
                listeners: this.__createListeners().search
            }
        };
    }
}