import searchBarTemplate from './SearchBar.hbs';
import './SearchBar.scss';
import {ProductTable} from '../ProductTable/ProductTable';
import {Switch} from '../Switch/Switch';

/***
 * SearchBar box on profile page
 */
export class SearchBar {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Like product
     * @param {number} id - product id
     */
    likeProduct(id) {
        this.__productList.like(id);
    }

    /***
     * Dislike product
     * @param {number} id - product id
     */
    dislikeProduct(id) {
        this.__productList.dislike(id);
    }

    /***
     * Add new cards to view
     * @param {Object[]} context - new cards
     */
    addNewCards(context) {
        this.__productList.addNewCards(context);
    }

    /***
     * rerender product list
     * @param{Object} ctx
     */
    rerenderProductList(ctx) {
        document.getElementById('product-content').innerText = '';
        this.__productList.render(ctx.productList);
    }

    /***
     * Delete product list
     */
    deleteProductList() {
        const product = document.getElementById('product-content');
        product.innerText = '';
        (new Switch(product)).render({
            data: {
                text: 'Нет объявлений по такому запросу'
            }
        });
    }

    /***
     * return object of HTMLElement fields
     * @return {Object}
     */
    getAllFields() {
        return {
            sort: document.getElementById('sorting'),
            search: document.getElementById('search-field'),
            fromAmount: document.getElementById('fromAmount'),
            toAmount: document.getElementById('toAmount'),
            date: document.getElementById('date'),
            category: document.getElementById('category'),
            submitFilter: document.getElementById('submitFilter'),
            searchSubmit: document.getElementById('search-submit')
        };
    }

    /***
     * add new listeners
     * @private
     */
    __addListeners() {
        document
            .getElementById('sorting')
            .addEventListener(this.listeners.sort.type, this.listeners.sort.listener);
        document
            .getElementById('submitFilter')
            .addEventListener(this.listeners.submitFilter.type, this.listeners.submitFilter.listener);
        document
            .getElementById('search-submit')
            .addEventListener(this.listeners.submitFilter.type, this.listeners.submitFilter.listener);
        document
            .getElementById('amount')
            .addEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('search-map')
            .addEventListener(this.listeners.mapOpen.type, this.listeners.mapOpen.listener);
    }

    /***
     * remove listeners
     */
    removeListeners() {
        document
            .getElementById('sorting')
            .removeEventListener(this.listeners.sort.type, this.listeners.sort.listener);
        document
            .getElementById('submitFilter')
            .removeEventListener(this.listeners.submitFilter.type, this.listeners.submitFilter.listener);
        document
            .getElementById('search-submit')
            .removeEventListener(this.listeners.submitFilter.type, this.listeners.submitFilter.listener);
    }

    /***
     * Add component to parent
     */
    render(context) {
        this.__parent.insertAdjacentHTML('beforeend', searchBarTemplate(context.search.data));
        this.listeners = context.search.listeners;

        this.__productList = new ProductTable(document.getElementById('product-content'));
        this.__productList.render(context.productList);
        this.__addListeners();
    }
}