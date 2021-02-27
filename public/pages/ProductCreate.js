import {Header} from '../components/Header/Header.js';
// import {HeaderController} from '../components/Header/HeaderController.js';
//
// import {Navigation} from '../components/Navigation/Navigation.js';
// import {NavigationController} from '../components/Navigation/NavigationController.js';

import {ProductCreateForm} from '../components/ProductCreateForm/ProductCreateForm.js';
import {ProductCreateFormController} from '../components/ProductCreateForm/ProductCreateFormController.js';

/***
 * @author Max Torzhkov
 * Class for product creation page
 * @class ProductCreate
 */
export class ProductCreate {

    /***
     * @author Max Torzhkov
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @constructor
     * @this {ProductCreate}
     * @public
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * @author Max Torzhkov
     * Remove page listeners
     * @private
     */
    __removePageListeners() {
        this.__headerController.removeControllerListeners();
        this.__productListController.removeControllerListeners();
    }

    /***
     * @author Max Torzhkov
     * Add component to parent
     * @this {ProductCreateForm}
     */
    render() {
        this.__parent.innerHTML = '';

        // const header = new Header(this.__parent, {location: 'Москва'});
        // header.render();
        //this.__headerController = new HeaderController(this.__removePageListeners.bind(this), this.__parent, header);
        //this.__headerController.control();

        // this.__navigation = new Navigation(this.__parent, 'Главная страница', {route: ['Регистрация профиля']});
        // this.__navigation.listeners = listeners.backBtn;
        // this.__navigation.render();

        const productCreateForm = new ProductCreateForm(this.__parent);
        productCreateForm.render();
        this.__productCreateFormController = new ProductCreateFormController(this.__removePageListeners.bind(this), this.__parent, productCreateForm);
        this.__productCreateFormController.control();
    }
}