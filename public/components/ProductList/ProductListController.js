import {Product} from '../../pages/Product.js';

import {ProductListModel} from '../../models/ProductListModel.js';

/***
 * Product List controller
 */
export class ProductListController {
    /***
     * Class constructor
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {ProductList} productList - product list
     */
    constructor(pageRemoveListeners, parent, productList) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__productList = productList;
        this.__model = new ProductListModel();
    }

    /***
     * Add listeners
     */
    async control() {
        this.__productList.listeners = this.__createListeners();
        this.__productList.addListeners();

        await this.__model.update();
        this.__productList.data = this.__model.productList;
        this.__productList.render();
    }

    /***
     * Remove listeners
     */
    removeControllerListeners() {
        this.__productList.removeListeners();
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
            const actions = this.__getActions();
            actions[action].open(id);
        }
    }

    /***
     * Get product list listeners
     * @returns {{productCardClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            productCardClick: {
                type: 'click',
                listener: this.__listenerProductListClick.bind(this)
            }
        };
    }

    /***
     * Like card callback
     * @param {number} id - product card id
     * @private
     */
    __likeCard(id) {
        // TODO(Sergey) release __likeCard

        console.log('like click', id);
        this.__productList.like(id);
    }

    /***
     * Open card callback
     * @param {number} id - product card id
     * @private
     */
    __openCard(id) {
        const page = new Product(this.__parent);
        page.render();
        console.log('open card', id);

        const product = new Product(this.__parent);
        product.render();
    }

    /***
     * Get product list actions
     * @returns {{likeClick: {open: *}, cardClick: {open: *}}}
     * @private
     */
    __getActions() {
        return {
            cardClick: {
                open: this.__openCard.bind(this)
            },
            likeClick: {
                open: this.__likeCard.bind(this)
            }
        };
    }
}