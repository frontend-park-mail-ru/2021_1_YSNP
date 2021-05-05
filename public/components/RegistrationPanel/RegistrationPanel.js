import '../Board/Board.scss';
import '../Board/Description/Description.scss';
import '../Settings/Settings.scss';
import './RegistrationPanel.scss';
import registrationPanelTemplate from './RegistrationPanel.hbs';
import {createMessageError} from '../../modules/layout/validationStates.js';
import {Field} from './Fields/Field.js';

/***
 * @author Ivan Gorshkov
 * RegistrationPanel class for contain product
 * @class RegistrationPanel
 */
export class RegistrationPanel {

    /***
     * @author Ivan Gorshkov
     *
     * init of class RegistrationPanel
     * @param {HTMLElement} parent - parent element
     * @constructor
     * @this {RegistrationPanel}
     * @public
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Form text error
     * @param {string} val - error text
     * @this {RegistrationPanel}
     */
    errorText(val) {
        document
            .getElementById('reg-error')
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
     * remove listeners
     * @this {RegistrationPanel}
     * @public
     */
    removeListeners() {
        document
            .getElementById('registrationForm')
            .removeEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('file-upload')
            .removeEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('submitBtn')
            .removeEventListener(this.listeners.registrationClick.type, this.listeners.registrationClick.listener);
        document
            .getElementById('avatar')
            .removeEventListener(this.listeners.registrationClick.type, this.listeners.registrationClick.listener);
        document
            .getElementById('date')
            .removeEventListener(this.listeners.keydown.type, this.listeners.keydown.listener, true);
        document
            .getElementById('registrationForm')
            .removeEventListener(this.listeners.focusInput.type, this.listeners.focusInput.listener, true);
        document
            .getElementById('registrationForm')
            .removeEventListener(this.listeners.blurInput.type, this.listeners.blurInput.listener, true);

    }

    /***
     * @author Ivan Gorshkov
     *
     * get id of target HTML
     * @this {RegistrationPanel}
     * @param {HTMLElement} target
     * @return {string}
     * @public
     */
    getErrorId(target) {
        return `${target.id}Error`;
    }

    /***
     * @author Ivan Gorshkov
     *
     * add error of field
     * @param {[string]} message - errors of field
     * @return {string}
     * @this {RegistrationPanel}
     * @public
     */
    addErrorForm(message) {
        const errorList = message.reduce((prev, cur) => `${prev}<li>${cur}</li>`, '');
        return createMessageError(`
                  <ul class="list-errors">
                         ${errorList}
                  </ul>
        `);
    }

    /***
     * @author Ivan Gorshkov
     *
     * remove class from hide error class
     * @param {HTMLElement} target
     * @this {RegistrationPanel}
     * @public
     */
    hideError(target) {
        document.getElementById(target).classList.remove('error-hidden');
    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system to choose file
     * @public
     * @this {RegistrationPanel}
     */
    openFileSystem() {
        const elem = document.getElementById('file-upload');
        elem.click();
    }

    /***
     * @author Ivan Gorshkov
     *
     * get HTMLELement of form
     * @public
     * @return {HTMLElement} form
     * @this {RegistrationPanel}
     */
    getForm() {
        return document.getElementById('registration-from');
    }

    /***
     * @author Ivan Gorshkov
     *
     * all HTMLElement of form
     * @public
     * @return {{date: HTMLElement, password: HTMLElement, mail: HTMLElement, passwordConfirm: HTMLElement, phone: HTMLElement, surname: HTMLElement, sex: HTMLElement, name: HTMLElement}}
     * @this {RegistrationPanel}
     */
    getAllFields() {
        return {
            passwordConfirm: document.getElementById('passwordConfirm'),
            phone: document.getElementById('phone'),
            password: document.getElementById('password'),
            mail: document.getElementById('mail'),
            name: document.getElementById('name'),
            surname: document.getElementById('surname'),
            date: document.getElementById('date'),
            sex: document.getElementById('sex'),
            pic: document.getElementById('profile-pic')
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * add src to picture
     * @public
     * @param {Event} ev - event
     * @this {RegistrationPanel}
     */
    avatarOnLoad(ev) {
        const elem = document.getElementById('profile-pic');
        elem.src = ev.target.result;
    }

    /***
     * @author Ivan Gorshkov
     *
     * add error class to avatar
     * @public
     * @this {RegistrationPanel}
     */
    addErrorAvatar() {
        document.getElementById('circle-avatar').classList.add('input-error');
    }

    /***
     * @author Ivan Gorshkov
     *
     * remove error class to avatar
     * @public
     * @this {RegistrationPanel}
     */
    removeErrorAvatar() {
        document.getElementById('circle-avatar').classList.remove('input-error');
        document.getElementById('circle-avatar').classList.add('input-susses');
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {RegistrationPanel}
     * @public
     */
    render(ctx) {
        this.listeners = ctx.registrationPanel.listeners;
        this.__parent.insertAdjacentHTML('beforeend', registrationPanelTemplate(ctx.registrationPanel));

        for (const fields in ctx.registrationPanel.fields) {
            const field = new Field(document.getElementById('registrationForm'), ctx.registrationPanel.fields[fields]);
            field.render();
        }

        this.__addListeners();
        document.getElementById('date').max = new Date().toISOString().split('T')[0];
    }
}
