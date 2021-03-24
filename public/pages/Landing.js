import {Header} from '../components/Header/Header.js';
import {HeaderController} from '../components/Header/HeaderController.js';

import {ProductList} from '../components/ProductList/ProductList.js';
import {ProductListController} from '../components/ProductList/ProductListController.js';

import {Switch} from '../components/Switch/Switch.js';

/***
 * First (main) page
 */
export class Landing {
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
        this.__productListController.removeControllerListeners();
    }

    /***
     * Add component to parent
     */
    async render() {
        this.__parent.innerHTML = '';

        const header = new Header(this.__parent);
        this.__headerController = new HeaderController(this.__removePageListeners.bind(this), this.__parent, header);
        await this.__headerController.control();

        const adSwitch = new Switch(this.__parent);
        adSwitch.render();

        const productList = new ProductList(this.__parent);
        this.__productListController = new ProductListController(this.__removePageListeners.bind(this), this.__parent, productList);
        await this.__productListController.control();
    }
}