import searchBarTemplate from '../Search/SearchBar.hbs';
import './SearchBar.css';
import {ProductTable} from '../ProductTable/ProductTable';

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
     * @author Ivan Gorshkov
     *
     * get Navigation listeners
     * @this {RegistrationPanel}
     * @private
     * @readonly
     * @return  {Object} array of listeners
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Set new listeners
     * @this {RegistrationPanel}
     * @param  {Object} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
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
        this.__parent.insertAdjacentHTML('beforeend', searchBarTemplate(context.filter));
        this.listeners = context.search.listeners;
        this.__productList = new ProductTable(document.getElementById('product-content'));
        this.__productList.render(context.productList);
        this.__addListeners();
    }
}