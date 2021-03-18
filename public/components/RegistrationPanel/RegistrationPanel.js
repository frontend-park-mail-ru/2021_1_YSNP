import './RegistrationPanel.css';

import registrationPanelTemplate from './RegistrationPanel.hbs';
/***
 * @author Ivan Gorshkov
 * RegistrationPanel class for contain product
 * @class RegistrationPanel
 */
export class RegistrationPanel {

    /***
     * @author Ivan Gorshkov
     * init of class RegistrationPanel
     * @param {HTMLElement} parent - parent element
     * @param {Object} data - JSON Object
     * @constructor
     * @this {RegistrationPanel}
     * @public
     */
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
    }

    /***
     * Form text error
     * @param {string} val - error text
     */
    errorText(val) {
        document
            .getElementById('auth-error')
            .textContent = val;
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

    /***
     * @author Ivan Gorshkov
     *
     * add listeners
     * @this {RegistrationPanel}
     * @public
     */
    addListeners() {
        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('file-upload')
            .addEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('submitBtn')
            .addEventListener(this.listeners.registrationClick.type, this.listeners.registrationClick.listener);
        document
            .getElementById('avatar')
            .addEventListener(this.listeners.registrationClick.type, this.listeners.registrationClick.listener);
        document
            .getElementById('date')
            .addEventListener(this.listeners.keydown.type, this.listeners.keydown.listener, true);
        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.focusInput.type, this.listeners.focusInput.listener, true);
        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.blurInput.type, this.listeners.blurInput.listener, true);

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
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {RegistrationPanel}
     * @public
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', registrationPanelTemplate(this.__context()));
        document.getElementById('date').max = new Date().toISOString().split('T')[0];
    }
}
