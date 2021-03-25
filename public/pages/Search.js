import {Header} from '../components/Header/Header.js';
import {HeaderController} from '../components/Header/HeaderController.js';

import {Navigation} from '../components/Navigation/Navigation.js';
import {NavigationController} from '../components/Navigation/NavigationController.js';

import {SearchBar} from '../components/Search/SearchBar.js';

/***
 * First (main) page
 */
export class Search {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Remove page listeners
     * @private
     */
    __removePageListeners() {
        this.__headerController.removeControllerListeners();
        this.__navigationController.removeControllerListeners();
    }

    /***
     * Add component to parent
     */
    async render() {
        this.__parent.innerHTML = '';

        const header = new Header(this.__parent);
        this.__headerController = new HeaderController(this.__removePageListeners.bind(this), this.__parent, header);
        await this.__headerController.control();

        this.__navigation = new Navigation(this.__parent, 'Главная страница', {route: ['Поиск']});
        this.__navigation.render();
        this.__navigationController = new NavigationController(this.__removePageListeners.bind(this), this.__parent, this.__navigation);
        this.__navigationController.control();

        const searchBar = new SearchBar(this.__parent);
        await searchBar.render();
        document.getElementById('product-list-inner').classList.add('product-list-search-padding');

    }
}