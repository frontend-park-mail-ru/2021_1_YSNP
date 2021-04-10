import productTableTemplate from './ProductTable.hbs';
import './ProductTable.scss';

import {ProductCard} from './ProductCard/ProductCard.js';

/***
 * Product List - table of components Product Card
 */
export class ProductTable {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
        this.__productTable = new Map();
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        document
            .getElementById('product-table')
            .addEventListener(this.__context.listeners.productCardClick.type, this.__context.listeners.productCardClick.listener);
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('product-table')
            .removeEventListener(this.__context.listeners.productCardClick.type, this.__context.listeners.productCardClick.listener);
    }

    /***
     * Add like animation
     * @param {number} id - product card id
     */
    like(id) {
        this.__productTable.get(id).like();
    }

    /***
     * Remove like animation
     * @param {number} id - product card id
     */
    dislike(id) {
        this.__productTable.get(id).dislike();
    }

    /***
     * Add cards to table
     * @param {Object[]} data - cards
     * @private
     */
    __addCards(data) {
        const table = this.__getParent();
        data.forEach((el) => {
            const productCard = new ProductCard(table);
            productCard.render(el);
            this.__productTable.set(el.id, productCard);
        });
    }

    /***
     * Add new cards to list
     * @param {Object[]} data - new cards
     */
    addNewCards(data) {
        this.__addCards(data);
    }

    /***
     * Get product card parent
     * @returns {Element}
     * @private
     */
    __getParent() {
        return this.__parent.querySelector('[class="product-table-inner"]');
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', productTableTemplate());
            this.__addCards(this.__context.data);
            this.__addListeners();
        } catch (err) {
            console.log(err.message);
        }
    }
}