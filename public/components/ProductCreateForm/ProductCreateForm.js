import './ProductCreateForm.css';
import productCreateFormTemplate from './ProductCreateForm.hbs';
/***
 * @author Max Torzhkov
 * ProductCreateForm class for product creation
 * @class ProductCreateForm
 */
export class ProductCreateForm {

    /***
     * @author Max Torzhkov, Ivan Gorshkov
     *
     * init of class ProductCreateForm
     * @param {HTMLElement} parent - parent element
     * @param {Object} data
     * @constructor
     * @this {ProductCreateForm}
     * @public
     */
    constructor(parent, data) {
        this.__parent = parent;
        this.__listeners = {};
        this.__data = data;
    }


    /***
     * @author Max Trozhkov
     *
     * get Navigation listeners
     * @this {ProductCreateForm}
     * @private
     * @readonly
     * @return  {Object} array of listeners
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Max Torzhkov
     *
     * Set new listeners
     * @this {ProductCreateForm}
     * @param  {Object} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * @author Max Torzhkov, Ivan Gorshkov
     *
     * Add component to parent
     * @this {ProductCreateForm}
     * @public
     */
    addListeners() {
        document
            .getElementById('submitProduct')
            .addEventListener(this.__listeners.submitClick.type, this.__listeners.submitClick.listener);
        document
            .getElementById('ProductForm')
            .addEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('productPhoto')
            .addEventListener(this.listeners.submitClick.type, this.listeners.submitClick.listener);
        document
            .getElementById('productPhoto')
            .addEventListener(this.listeners.showError.type, this.listeners.showError.listener);
        document
            .getElementById('productPhoto')
            .addEventListener(this.listeners.hideError.type, this.listeners.hideError.listener);
        document
            .getElementById('files')
            .addEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('ProductForm')
            .addEventListener(this.listeners.focusInput.type, this.listeners.focusInput.listener, true);
        document
            .getElementById('ProductForm')
            .addEventListener(this.listeners.blurInput.type, this.listeners.blurInput.listener, true);
    }

    /***
     * @author Max Torzhkov, Ivan Gorshkov
     *
     * Remove component from parent
     * @this {ProductCreateForm}
     * @public
     */
    removeListeners() {
        document
            .getElementById('submitProduct')
            .removeEventListener(this.__listeners.submitClick.type, this.__listeners.submitClick.listener);
        document
            .getElementById('ProductForm')
            .removeEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('productPhoto')
            .removeEventListener(this.listeners.submitClick.type, this.listeners.submitClick.listener);
        document
            .getElementById('productPhoto')
            .removeEventListener(this.listeners.showError.type, this.listeners.showError.listener);
        document
            .getElementById('productPhoto')
            .removeEventListener(this.listeners.hideError.type, this.listeners.hideError.listener);
        document
            .getElementById('files')
            .removeEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('ProductForm')
            .removeEventListener(this.listeners.focusInput.type, this.listeners.focusInput.listener, true);
        document
            .getElementById('ProductForm')
            .removeEventListener(this.listeners.blurInput.type, this.listeners.blurInput.listener, true);
    }

    /***
     * @author Ivan Gorshkov
     *
     * context for template
     * @return {{id: Number, title: String}}
     * @private
     */
    __context() {
        return {
            fields: this.__data
        };
    }


    /***
     * @author Max Torzhkov
     * Add component to parent
     * @this {ProductCreateForm}
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', productCreateFormTemplate(this.__context()));
    }
}