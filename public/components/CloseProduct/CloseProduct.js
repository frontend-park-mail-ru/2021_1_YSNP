import closeProductTemplate from './CloseProduct.hbs';
import './CloseProduct.scss';

import {sentryManager} from '../../modules/sentry';

/***
 * Header component
 */
export class CloseProduct {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Get close product element
     * @returns {HTMLElement}
     * @private
     */
    __getCloseProduct() {
        return document.getElementById('close-product');
    }

    /***
     * Get close product content element
     * @returns {HTMLElement}
     * @private
     */
    __getCloseProductContent() {
        return document.getElementById('close-product-content');
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        window
            .addEventListener(this.__context.listeners.keyClick.type, this.__context.listeners.keyClick.listener);

        this.__getCloseProduct()
            .addEventListener(this.__context.listeners.pageClick.type, this.__context.listeners.pageClick.listener);

        this.__getCloseProductContent()
            .addEventListener(this.__context.listeners.closeProductClick.type, this.__context.listeners.closeProductClick.listener);
    }

    /***
     * Remove component listeners
     */
    __removeListeners() {
        window
            .removeEventListener(this.__context.listeners.keyClick.type, this.__context.listeners.keyClick.listener);

        this.__getCloseProduct()
            .addEventListener(this.__context.listeners.pageClick.type, this.__context.listeners.pageClick.listener);

        this.__getCloseProductContent()
            .removeEventListener(this.__context.listeners.closeProductClick.type, this.__context.listeners.closeProductClick.listener);
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', closeProductTemplate());
            this.__addListeners();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }

    /***
     * Remove component
     */
    remove() {
        try {
            this.__removeListeners();
            this.__getCloseProduct().remove();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}
