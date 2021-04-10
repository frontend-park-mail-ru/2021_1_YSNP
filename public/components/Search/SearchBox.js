import './SearchBox.css';
import searchBoxTemplate from './SearchBox.hbs';
import {categories} from '../../modules/fields.js';

/***
 * class for SearchBox component (Main page)
 */
export class SearchBox {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} data - element data
     * @param {Object} listeners - component listeners
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * getter for listeners
     * @return {Object}
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * setter for listeners
     * @return {Object}
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     *
     * @return {string}
     */
    getTextFromSearch() {
        return document.getElementById('search-input').value;
    }

    /***
     * add new listeners
     * @private
     */
    __addListeners() {
        document
            .getElementById('search-button')
            .addEventListener(this.listeners.searchClick.type, this.listeners.searchClick.listener);
        document
            .getElementById('search-categories')
            .addEventListener(this.listeners.searchClick.type, this.listeners.searchClick.listener);
    }


    /***
     *
     * @param{HTMLElement} element
     */
    getCategory(element) {
        return element.dataset['category'];
    }

    /***
     * remove listeners
     */
    removeListeners() {
        document
            .getElementById('search-button')
            .removeEventListener(this.listeners.searchClick.type, this.listeners.searchClick.listener);
    }

    /***
     * Add component to parent
     */
    render(ctx) {
        this.listeners = ctx.listeners;
        this.__parent.insertAdjacentHTML('beforeend', searchBoxTemplate(categories));
        this.__addListeners();
    }
}