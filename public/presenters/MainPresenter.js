import {BasePresenter} from './BasePresenter.js';

import {RecListModel} from '../models/RecListModel.js';
import {MainListModel} from '../models/MainListModel.js';

import {eventProductListHandler, eventHandlerWithDataType} from '../modules/handlers/eventHandler.js';
import {CreateButtonHandler} from '../modules/handlers/createButtonHandler';
import {EndlessScroll} from '../modules/handlers/endlessScroll.js';
import {PageUpHandler} from '../modules/handlers/pageUpHandler.js';
import {NotFoundError, UnauthorizedError} from '../modules/http/httpError';

import {router} from '../modules/router';
import {frontUrls} from '../modules/urls/frontUrls';
import {customSessionStorage} from '../modules/storage/customSessionStorage.js';

import {sentryManager} from '../modules/sentry';

/***
 * Main presenter
 */
export class MainPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {MainView} view - view
     */
    constructor(view) {
        super(view);
        this.__view = view;
        this.__mainListModel = new MainListModel();
        this.__recListModel = new RecListModel();

        this.__endlessScroll = new EndlessScroll(this.__createListeners().scroll);
        this.__pageUp = new PageUpHandler();
        this.__createButton = new CreateButtonHandler(this.openCreateProduct.bind(this));
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        return super.update()
            .then(() => this.__mainListModel.update())
            .then(() => this.__recListModel.update())
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                if (!UnauthorizedError.isError(err)) {
                    sentryManager.captureException(err);
                }

                this.checkOfflineStatus(err);
            });
    }

    /***
     * Control view
     * @returns {Promise<void>}
     */
    async control() {
        await this.update();
        if (this.checkOffline()) {
            return;
        }

        this.__view.render(this.__makeContext());

        this.__endlessScroll.start();
        this.__pageUp.start();
        this.__createButton.start();

        this.checkScrollOffset();
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__endlessScroll.remove();
        this.__pageUp.remove();
        this.__createButton.remove();

        this.__view.removePage();
    }

    /***
     * Product List main click event
     * @param {MouseEvent} ev - event
     */
    __listenerMainListClick(ev) {
        ev.stopPropagation();
        eventProductListHandler(ev, this.__getActions().mainList);
    }

    /***
     * Product list rec click event
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerRecListClick(ev) {
        ev.stopPropagation();
        eventProductListHandler(ev, this.__getActions().recList);
    }

    /***
     * Listener on scroll end
     * @returns {Promise<void>}
     * @private
     */
    __scrollEnd() {
        this.__mainListModel.updateNewData()
            .then(() => {
                const newData = this.__mainListModel.newData;
                if (newData.length === 0) {
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

                console.log(err.message);
                if (!NotFoundError.isError(err)) {
                    sentryManager.captureException(err);
                }

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * Header click listener
     * @param {MouseEvent} ev - event
     * @param {string} dataType
     * @param {Object} actions
     * @private
     * @this {MainPresenter}
     */
    __listenerSearchClick(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
    }

    /***
     * Get view listeners
     * @returns {{search: {searchClick: {listener: *, type: string}}, scroll: {scrollEnd: any}, recList: {productCardClick: {listener: *, type: string}}, mainList: {productCardClick: {listener: *, type: string}}}}
     * @private
     */
    __createListeners() {
        return {
            mainList: {
                productCardClick: {
                    type: 'click',
                    listener: this.__listenerMainListClick.bind(this)
                }
            },
            recList: {
                productCardClick: {
                    type: 'click',
                    listener: this.__listenerRecListClick.bind(this)
                }
            },
            search: {
                searchClick: {
                    type: 'click',
                    listener: this.__listenerSearchClick.bind(this, 'action', this.__getActions().search)
                }
            },
            scroll: {
                scrollEnd: this.__scrollEnd.bind(this)
            }
        };
    }

    /***
     * Open card main callback
     * @param {string} id - product card id
     * @private
     */
    __openCardMain(id) {
        this.saveScrollOffset();
        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.product(numberId), '', {title: 'Koya'});
    }

    /***
     * Like card main callback
     * @param {string} id - product card id
     * @private
     */
    __likeCardMain(id) {
        const numberId = parseInt(id, 10);
        if (!this.__userModel.isAuth) {
            super.openAuth();
            return;
        }

        this.__mainListModel.voteProduct(numberId)
            .then(({status}) => {
                if (status === 'dislike') {
                    this.__recListModel.sedDislike(numberId);
                    this.__view.dislikeProduct(numberId);
                    return;
                }

                this.__recListModel.setLike(numberId);
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
     * Open card rec callback
     * @param {string} id - product card id
     * @private
     */
    __openCardRec(id) {
        this.saveScrollOffset();
        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.product(numberId), '', {title: 'Koya'});
    }

    /***
     * Like card rec callback
     * @param {string} id - product card id
     * @private
     */
    __likeCardRec(id) {
        const numberId = parseInt(id, 10);
        if (!this.__userModel.isAuth) {
            super.openAuth();
            return;
        }

        this.__recListModel.voteProduct(numberId)
            .then(({status}) => {
                if (status === 'dislike') {
                    this.__mainListModel.sedDislike(numberId);
                    this.__view.dislikeProduct(numberId);
                    return;
                }

                this.__mainListModel.setLike(numberId);
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
     * Get product list actions
     * @returns {{search: {searchButtonClick: {open: *}, categoryClick: {open: *}}, recList: {likeClick: {open: *}, cardClick: {open: *}}, mainList: {likeClick: {open: *}, cardClick: {open: *}}}}
     * @private
     */
    __getActions() {
        return {
            mainList: {
                cardClick: {
                    open: this.__openCardMain.bind(this)
                },
                likeClick: {
                    open: this.__likeCardMain.bind(this)
                }
            },
            recList: {
                cardClick: {
                    open: this.__openCardRec.bind(this)
                },
                likeClick: {
                    open: this.__likeCardRec.bind(this)
                }
            },
            search: {
                searchButtonClick: {
                    open: this.__searchButton.bind(this)
                },
                categoryClick: {
                    open: this.__categoryClick.bind(this)
                }
            }
        };
    }

    /***
     * click to subcategory
     * @param{Event} ev
     * @private
     */
    __categoryClick(ev) {
        customSessionStorage.set('category', ev.target.innerText);

        router.redirect(frontUrls.search, '', {title: 'Koya'});
    }

    /***
     * Click to search button
     * @private
     */
    __searchButton() {
        customSessionStorage.set('category', '');
        const val = this.__view.getTextFromSearch();
        if (val !== '') {
            router.redirect(frontUrls.searchWithText(val), '', {title: 'Koya'});
            return;
        }

        router.redirect(frontUrls.search, '', {title: 'Koya'});
    }

    /***
     * Make view context
     * @returns {{mainList: {data: Object[], listeners: {productCardClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            search: {
                data: null,
                listeners: this.__createListeners().search
            },
            recList: {
                data: this.__recListModel.getData(),
                listeners: this.__createListeners().recList
            },
            mainList: {
                data: this.__mainListModel.getData(),
                listeners: this.__createListeners().mainList
            }
        };
    }
}