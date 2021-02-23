'use strict';

/***
 * Product List listeners
 */
export class ProductListController {
    /***
     * Class constructor
     * @param {ProductList} productList - product list
     */
    constructor(productList) {
        this.__productList = productList;
    }

    /***
     * Add listeners to product list
     */
    control() {
        this.__productList.render();

        this.__productList.listeners = this.__createListeners();
        this.__productList.addListeners();
    }

    /***
     * Product List click event
     * @param {Event} ev - event
     */
    __listenerProductListClick(ev) {
        ev.preventDefault();

        let id = undefined;
        let action = undefined;
        Object
            .entries(ev.path)
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
        console.log('like click', id);
    }

    /***
     * Open card callback
     * @param {number} id - product card id
     * @private
     */
    __openCard(id) {
        console.log('open card', id);
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