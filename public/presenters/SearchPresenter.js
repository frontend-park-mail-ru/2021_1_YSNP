import {BasePresenter} from './BasePresenter.js';
import {eventHandlerWithDataType} from '../modules/eventHandler.js';
import {router} from '../modules/router.js';
import {ProductListModel} from '../models/ProductListModel.js';
import {frontUrls} from '../modules/frontUrls.js';
import {SearchModel} from '../models/SearchModel.js';
import {amountMask} from '../modules/mask.js';
import {PageUpHandler} from '../modules/pageUpHandler.js';
import {noop} from '../models/Noop';
/***
 *  class SearchPresenter extends BasePresenter
 */
export class SearchPresenter extends BasePresenter {

    /***
     * @author Ivan Gorshkov
     *
     * Class constructor
     * @param{SearchView} view - view
     * @this {SearchPresenter}
     */
    constructor(view) {
        super(view);
        this.__view = view;
        this.__productListModel = new ProductListModel();
        this.__model = new SearchModel();
    }

    /***
     * @author Ivan Gorshkov
     *
     * update super Presenter. update productListModel and userModel
     * @return {Promise<void>}
     */
    async update() {
        return super.update()
            .catch((err) => {
                console.log(err.message);
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * Search Presenter control. render view and PageUP
     * @return {Promise<void>}
     */
    async control() {
        await this.update();
        this.__view.render(this.__makeContext()).then(() => this.__search());
        (new PageUpHandler()).start();
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
    __listenerRegistrationPanel(dataType, actions, ev) {
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
                    listener: this.__listenerRegistrationPanel.bind(this, 'action', this.__getActions().navigation)
                }
            },
            search: {
                sort: {
                    type: 'change',
                    listener: this.__listenerRegistrationPanel.bind(this, 'action', this.__getActions().search)
                },
                submitFilter: {
                    type: 'click',
                    listener: this.__listenerRegistrationPanel.bind(this, 'action', this.__getActions().search)
                },
                validateInput: {
                    type: 'input',
                    listener: this.__listenerRegistrationPanel.bind(this, 'action', this.__getActions().search)
                }
            },
            productList: {
                productCardClick: {
                    type: 'click',
                    listener: this.__listenerProductListClick.bind(this)
                }
            }
        };
    }


    /***
     * Like card callback
     * @param {string} id - product card id
     * @private
     */
    __likeCard(id) {
        // TODO(Sergey) release __likeCard

        const numberId = parseInt(id, 10);
        this.__view.likeProduct(numberId);
    }

    /***
     * Open card callback
     * @param {string} id - product card id
     * @private
     */
    __openCard(id) {
        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.product(numberId));
    }


    /***
     * Product List click event
     * @param {MouseEvent} ev - event
     */
    __listenerProductListClick(ev) {
        ev.preventDefault();

        let id = undefined;
        let action = undefined;
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined) {
                    if ('action' in el.dataset && action === undefined) {
                        action = el.dataset.action;
                    }

                    if ('cardId' in el.dataset) {
                        id = el.dataset.cardId;
                    }
                }
            });

        if (action !== undefined) {
            const actions = this.__getActions().productList;
            actions[action].open(id);
        }
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
        sessionStorage.setItem('sort', ev.target.value);
        this.__search().then(() => noop());
    }

    /***
     * @author Ivan Gorshkov
     *
     * @this {SearchPresenter}
     * @private
     */
     __submitFilter() {
        sessionStorage.setItem('category', document.getElementById('category').value);
        sessionStorage.setItem('date', document.getElementById('date').value);
        this.__search().then(() => noop());
    }

    /***
     * @author Ivan Gorshkov
     *
     * async function for search with filer and sorung
     * @return {Promise<void>}
     * @private
     */
    async __search() {
        const {fromAmount, toAmount, search} = this.__view.getAllFields();
        this.__model.fillProductModel({
            category: sessionStorage.getItem('category'),
            fromAmount: parseInt(fromAmount.value.replace(/[^0-9]/g, '', 0)),
            toAmount: parseInt(toAmount.value.replace(/[^0-9]/g, ''), 0),
            date: sessionStorage.getItem('date'),
            radius: 5,
            sorting: sessionStorage.getItem('sort'),
            search: search.value
        });

        await this.__model.update().then(({isUpdate, data}) => {
            if (isUpdate) {
                this.__productListModel = new ProductListModel();
                this.__productListModel.setNewData(data);
                this.__view.rerenderProductList(this.__makeContext());
            }
        }).catch(() => {
            this.__view.rerenderProductList(this.__makeContext());
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
                data: this.__productListModel.getData(),
                listeners: this.__createListeners().productList
            },
            search: {
                data: null,
                listeners: this.__createListeners().search
            }
        };
    }
}