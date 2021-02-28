import {ProductCard} from './ProductCard/ProductCard.js';

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
    constructor(parent, data, listeners = undefined) {
        this.__parent = parent;
        this.__data = data;
        this.__listeners = listeners;
        this.__productList = new Map();
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
     * Component HTML
     * @returns {string}
     * @private
     */
    __getTemplate() {
        return `
            <div class="product-list" id="product-list">
                <div class="product-list-inner">
                </div>
            </div>
        `;
    }

    /***
     * Add component to parent
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);

        const list = this.__parent.querySelector('[class=\'product-list-inner\']');
        this.__data.forEach((el) => {
            const productCard = new ProductCard(list, el);
            productCard.render();
            this.__productList.set(el.id, productCard);
        });
    }
}