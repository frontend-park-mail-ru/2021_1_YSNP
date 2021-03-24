import productListTemplate from './ProductList.hbs';
import './ProductList.css';

import {ProductCard} from './ProductCard/ProductCard.js';

/***
 * Product List - table of components Product Card
 */
export class ProductList {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
        this.__productList = new Map();
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        document
            .getElementById('product-list')
            .addEventListener(this.__context.listeners.productCardClick.type, this.__context.listeners.productCardClick.listener);
    }

    /***
     * Add like animation
     * @param {number} id - product card id
     */
    like(id) {
        this.__productList.get(id).like();
    }

    /***
     * Remove like animation
     * @param {number} id - product card id
     */
    dislike(id) {
        this.__productList.get(id).dislike();
    }

    /***
     * Get product card parent
     * @returns {Element}
     * @private
     */
    __getParent() {
        return this.__parent.querySelector('[class=\'product-list-inner\']');
    }

    /***
     * Add component to parent
     */
    render(context) {
        this.__context = context;

        this.__parent.insertAdjacentHTML('beforeend', productListTemplate());
        this.__addListeners();

        const list = this.__getParent();
        this.__context.data.forEach((el) => {
            const productCard = new ProductCard(list);
            productCard.render(el);
            this.__productList.set(el.id, productCard);
        });
    }
}