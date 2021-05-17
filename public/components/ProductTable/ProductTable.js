import productTableTemplate from './ProductTable.hbs';
import './ProductTable.scss';

import {ProductCard} from './ProductCard/ProductCard.js';
import {EmptyMessage} from './EmptyMessage/EmptyMessage';

import {sentryManager} from '../../modules/sentry';

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
            .getElementById(`product-table${this.__context.id}`)
            .addEventListener(this.__context.listeners.productCardClick.type, this.__context.listeners.productCardClick.listener);
    }

    /***
     * Add like animation
     * @param {number} id - product card id
     */
    like(id) {
        const product = this.__productTable.get(id);
        if (product) {
            product.like();
        }
    }

    /***
     * Remove like animation
     * @param {number} id - product card id
     */
    dislike(id) {
        const product = this.__productTable.get(id);
        if (product) {
            product.dislike();
        }
    }

    /***
     * Render empty message
     * @param {HTMLElement} parent
     * @private
     */
    __addEmptyMessage(parent) {
        const emptyMessage = new EmptyMessage(parent);
        emptyMessage.render(this.__context);
    }

    /***
     * Add cards to table
     * @param {Object[]} data - cards
     * @private
     */
    __addCards(data) {
        const table = this.__getParent();
        if (data.length === 0) {
            this.__addEmptyMessage(table);
            return;
        }

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
        return this.__parent.querySelector(`[id="product-table-body${this.__context.id}"]`);
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', productTableTemplate(this.__context));
            this.__addCards(this.__context.data);
            this.__addListeners();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}