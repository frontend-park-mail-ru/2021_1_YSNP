import headerTemplate from './Header.hbs';
import authTemplate from './Auth.hbs';
import notAuthTemplate from './NotAuth.hbs';
import './Header.css';

/***
 * Header component
 */
export class Header {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} data - element data
     * @param {Object} listeners - component listeners
     */
    constructor(parent, data = {}, listeners = {}) {
        this.__parent = parent;
        this.__data = data;
        this.__listeners = listeners;
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
     * Open/Close dropdown menu
     */
    toggleDropdownMenu() {
        document
            .getElementById('header-dropdown-content')
            .classList
            .toggle('header-dropdown-content_hidden');
    }

    /***
     * Remove dropdown menu
     */
    closeDropdownMenu() {
        if (this.__data.isAuth) {
            document
                .getElementById('header-dropdown-content')
                .classList
                .add('header-dropdown-content_hidden');
        }
    }

    /***
     * Add component listeners
     */
    addListeners() {
        document
            .getElementById('header')
            .addEventListener(this.__listeners.headerClick.type, this.__listeners.headerClick.listener);

        if (this.__data.isAuth) {
            document
                .getElementById('header-dropdown')
                .addEventListener(this.__listeners.dropdownClick.type, this.__listeners.dropdownClick.listener);

            document
                .getElementById('app')
                .addEventListener(this.__listeners.pageClick.type, this.__listeners.pageClick.listener);
        }
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('header')
            .removeEventListener(this.__listeners.headerClick.type, this.__listeners.headerClick.listener);

        if (this.__data.isAuth) {
            document
                .getElementById('header-dropdown')
                .removeEventListener(this.__listeners.dropdownClick.type, this.__listeners.dropdownClick.listener);

            document
                .getElementById('app')
                .removeEventListener(this.__listeners.pageClick.type, this.__listeners.pageClick.listener);
        }
    }

    /***
     * Add component to parent
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', headerTemplate());

        const accountTemplate = this.__data.isAuth ? authTemplate(this.__data) : notAuthTemplate();
        document.getElementById('header-right').insertAdjacentHTML('beforeend', accountTemplate);
    }
}
