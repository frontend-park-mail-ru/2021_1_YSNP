import {ProductCard} from './ProductCard/ProductCard.js';

import productListTemplate from './ProductList.hbs';
import './ProductList.css';

/***
 * Product List - table of components Product Card
 */
export class ProductList {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} data - component data
     * @param {Object} listeners - component listeners
     */
    constructor(parent, data = {}, listeners = {}) {
        this.__parent = parent;
        this.__data = data;
        this.__listeners = listeners;
        this.__productList = new Map();
    }

    /***
     * Get data
     * @returns {Object}
     */
    get data() {
        return this.__data;
    }

    /***
     * Set data
     * @param {Object} data - component data
     */
    set data(data) {
        this.__data = data;
    }

    /***
     * Get listeners
     * @returns {Object}
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * Set listeners
     * @param {Object} val - component listeners
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * Add component listeners
     */
    addListeners() {
        document
            .getElementById('product-list')
            .addEventListener(this.__listeners.productCardClick.type, this.__listeners.productCardClick.listener);
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('product-list')
            .removeEventListener(this.__listeners.productCardClick.type, this.__listeners.productCardClick.listener);
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
     * Add component to parent
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', productListTemplate());

        const list = this.__parent.querySelector('[class=\'product-list-inner\']');
        this.__data.forEach((el) => {
            const productCard = new ProductCard(list, el.getMainData());
            productCard.render();
            this.__productList.set(el.id, productCard);
        });
    }
}