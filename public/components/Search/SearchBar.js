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
     * @return  {{validateChange: {listener: *, type: string}, hideError: {listener: *, type: string}, validateInput: {listener: *, type: string}, showError: {listener: *, type: string}, registrationClick: {listener: *, type: string}}} array of listeners
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Set new listeners
     * @this {RegistrationPanel}
     * @param  {{validateChange: {listener: *, type: string}, hideError: {listener: *, type: string}, validateInput: {listener: *, type: string}, showError: {listener: *, type: string}, registrationClick: {listener: *, type: string}}} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
    }

    rerenderProductList(ctx) {
        this.__productList.render(ctx.productList);
    }

    getAllFields() {
        return {
            sort: document
                .getElementById('sorting'),
            search: document
                .getElementById('search-field'),
            fromAmount: document
                .getElementById('fromAmount'),
            toAmount: document
                .getElementById('toAmount'),
            date: document
                .getElementById('date'),
            category: document
                .getElementById('category'),
            submitFilter: document
                .getElementById('submitFilter'),
            searchSubmit: document
                .getElementById('search-submit')
        };
    }



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
    }

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
        this.__parent.insertAdjacentHTML('beforeend', searchBarTemplate({optionSort: sessionStorage.getItem('sort'), optionCategory: sessionStorage.getItem('category'), optionDate: sessionStorage.getItem('date')}));
        console.log(context);
        this.listeners = context.search.listeners;
        this.__productList = new ProductTable(document.getElementById('product-content'));
        this.__productList.render(context.productList);
        this.__addListeners();
    }
}