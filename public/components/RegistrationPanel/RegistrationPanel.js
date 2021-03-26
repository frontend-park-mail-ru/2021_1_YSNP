import '../Board/Board.css';
import '../Board/Description/Description.css';
import '../Settings/Settings.css';
import './RegistrationPanel.css';

import registrationPanelTemplate from './RegistrationPanel.hbs';
import {createMessageError} from '../../modules/validationStates';

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
    constructor(parent, ctx) {
        this.__parent = parent;
        this.__data = ctx.data;
        this.listeners = ctx.listeners;
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
    __addListeners() {
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

    getErrorId(target) {
        return `${target.id}Error`;
    }

    addErrorForm(message) {
        return createMessageError(`
                  <ul class="list-errors">
                         <li>${message}</li>
                     </ul>
        `);
    }

    hideError(target) {
        document.getElementById(target).classList.remove('error-hidden');
    }


    openFileSystem() {
        const elem = document.getElementById('file-upload');
        elem.click();
    }

    getPasswords() {
        return {
            confirmPassword: document.getElementById('passwordConfirm'),
            password: document.getElementById('password')
        };
    }

    getForm() {
        return document.getElementById('registration-from');
    }


    getAllFields() {
        return {
            passwordConfirm: document.getElementById('passwordConfirm'),
            phone: document.getElementById('phone'),
            password: document.getElementById('password'),
            mail: document.getElementById('mail'),
            name: document.getElementById('name'),
            surname: document.getElementById('surname'),
            date: document.getElementById('date'),
            sex: document.getElementById('sex')
        };
    }

    avatarOnLoad(ev) {
        const elem = document.getElementById('profile-pic');
        elem.src = ev.target.result;
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
        this.__addListeners();
        document.getElementById('date').max = new Date().toISOString().split('T')[0];
    }
}
