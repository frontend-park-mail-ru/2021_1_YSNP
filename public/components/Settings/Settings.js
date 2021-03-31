import './Settings.css';
import settingsTemplate from './Settings.hbs';
import {ChangePassword} from './ChangePassword/ChangePassword.js';

/***
 * Settings box on profile page
 */
export class Settings {
    /***
     * Class constructor
     * @param {Element} parent - element where the component will be inserted
     * @this {Settings}
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Add component listeners
     * @this {Settings}
     */
    __addListeners() {
        document
            .getElementById('file-upload')
            .addEventListener(this.__context.listeners.validateChange.type, this.__context.listeners.validateChange.listener);
        document
            .getElementById('settings-components')
            .addEventListener(this.__context.listeners.validateInput.type, this.__context.listeners.validateInput.listener);
        document
            .getElementById('settings-password')
            .addEventListener(this.__context.listeners.validateInput.type, this.__context.listeners.validateInput.listener);
        document
            .getElementById('settings')
            .addEventListener(this.__context.listeners.settingsClick.type, this.__context.listeners.settingsClick.listener);
        document
            .getElementById('settings')
            .addEventListener(this.__context.listeners.focusInput.type, this.__context.listeners.focusInput.listener, true);
        document
            .getElementById('settings')
            .addEventListener(this.__context.listeners.blurInput.type, this.__context.listeners.blurInput.listener, true);
    }

    /***
     * Remove component listeners
     * @this {Settings}
     */
    removeListeners() {
        document
            .getElementById('file-upload')
            .removeEventListener(this.__context.listeners.validateChange.type, this.__context.listeners.validateChange.listener);
        document
            .getElementById('settings-components')
            .removeEventListener(this.__context.listeners.validateInput.type, this.__context.listeners.validateInput.listener);
        document
            .getElementById('settings-password')
            .removeEventListener(this.__context.listeners.validateInput.type, this.__context.listeners.validateInput.listener);
        document
            .getElementById('settings')
            .removeEventListener(this.__context.listeners.settingsClick.type, this.__context.listeners.settingsClick.listener);
        document
            .getElementById('settings')
            .removeEventListener(this.__context.listeners.focusInput.type, this.__context.listeners.focusInput.listener, true);
        document
            .getElementById('settings')
            .removeEventListener(this.__context.listeners.blurInput.type, this.__context.listeners.blurInput.listener, true);
    }

    /***
     * Enable password change
     * @param target
     * @this {Settings}
     */
    enablePasswordChange(target) {
        if (target.value !== '') {
            document
                .getElementById('settings-save-pass')
                .style.visibility = 'visible';
            document
                .getElementById('settings-reset-pass')
                .style.visibility = 'visible';
        } else {
            document
                .getElementById('settings-save-pass')
                .style.visibility = 'hidden';
            document
                .getElementById('settings-reset-pass')
                .style.visibility = 'hidden';
        }
    }

    /***
     * Returns errors ID
     * @returns {{errorSettingsID: string, errorPasswordID: string}}
     */
    getErrorID() {
        return {
            errorPasswordID: 'settings-password-error',
            errorSettingsID: 'settings-error'
        };
    }

    /***
     * Get passwords input elements
     * @returns {{passwordConfirm: HTMLElement, oldPassword: HTMLElement, newPassword: HTMLElement}}
     */
    getPasswordInfo() {
        return {
            oldPassword: document.getElementById('settings-old-pass'),
            passwordConfirm: document.getElementById('settings-confirm-pass'),
            newPassword: document.getElementById('settings-new-pass')
        };
    }

    /***
     * Get input error id
     * @param target
     * @returns {string}
     */
    getInputErrorId(target) {
        return `${target.id}Error`;
    }

    /***
     * Remove password input style
     * @this {Settings}
     */
    removePasswordStyles() {
        document
            .getElementById('settings-save-pass')
            .style.visibility = 'hidden';
        document
            .getElementById('settings-reset-pass')
            .style.visibility = 'hidden';
        const {oldPassword, passwordConfirm, newPassword} = this.getPasswordInfo();
        newPassword.classList.remove('reg-panel__input-susses');
        passwordConfirm.classList.remove('reg-panel__input-susses');
        oldPassword.classList.remove('reg-panel__input-susses');
    }

    /***
     * Open file system for photo
     */
    openFileSystem() {
        const elem = document.getElementById('file-upload');
        elem.click();
    }

    /***
     * Add src to picture
     * @param {Event} ev - event
     */
    avatarOnLoad(ev) {
        const elem = document.getElementById('settings-profile-pic');
        elem.src = ev.target.result;
    }

    /***
     * Set default data
     * @param {Object} data - user data
     */
    resetSettingsChanges(data) {
        document
            .getElementById('settings-name')
            .value = data.name;
        document
            .getElementById('settings-surname')
            .value = data.surname;
        document
            .getElementById('settings-gender')
            .value = data.sex;
        document
            .getElementById('settings-birthday')
            .value = data.dateBirth;
        document
            .getElementById('settings-telephone')
            .value = data.telephone;
        document
            .getElementById('settings-email')
            .value = data.email;
        const elem = document.getElementById('settings-profile-pic');
        elem.src = data.imageSrc;
        this.disableEditing();
    }

    /***
     * Open form settings for editing
     */
    enableEditing() {
        document
            .getElementById('settings-button-save')
            .style.visibility = 'visible';
        document
            .getElementById('settings-upload-button')
            .style.visibility = 'visible';
        document
            .getElementById('settings-surname')
            .removeAttribute('readonly');
        document
            .getElementById('settings-name')
            .removeAttribute('readonly');
        document
            .getElementById('settings-gender')
            .removeAttribute('disabled');
        document
            .getElementById('settings-birthday')
            .removeAttribute('readonly');
        document
            .getElementById('settings-email')
            .removeAttribute('readonly');

    }

    /***
     * Close form settings for editing
     */
    disableEditing() {
        document
            .getElementById('settings-button-save')
            .style.visibility = 'hidden';
        document
            .getElementById('settings-upload-button')
            .style.visibility = 'hidden';
        document
            .getElementById('settings-surname')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-surnameError')) {
            const target = document.getElementById('settings-surname');
            target.parentNode.removeChild(target.nextSibling);
        }
        document
            .getElementById('settings-name')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-nameError')) {
            const target = document.getElementById('settings-name');
            target.parentNode.removeChild(target.nextSibling);
        }
        document
            .getElementById('settings-gender')
            .setAttribute('disabled', 'true');
        document
            .getElementById('settings-birthday')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-birthdayError')) {
            const target = document.getElementById('settings-birthday');
            target.parentNode.removeChild(target.nextSibling);
        }
        document
            .getElementById('settings-telephone')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-telephoneError')) {
            const target = document.getElementById('settings-telephone');
            target.parentNode.removeChild(target.nextSibling);
        }
        document
            .getElementById('settings-email')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-emailError')) {
            const target = document.getElementById('settings-email');
            target.parentNode.removeChild(target.nextSibling);
        }
    }

    /***
     * All HTMLElement of settings form
     * @returns {{birthday: HTMLElement, mail: HTMLElement, phone: HTMLElement, surname: HTMLElement, name: HTMLElement}}
     */
    getSettingsFields() {
        return {
            surname: document.getElementById('settings-surname'),
            name: document.getElementById('settings-name'),
            birthday: document.getElementById('settings-birthday'),
            phone: document.getElementById('settings-telephone'),
            mail: document.getElementById('settings-email'),
            sexEl: document.getElementById('settings-gender'),
            img: document.getElementById('settings-profile-pic')
        };
    }

    /***
     * Get settings form
     * @returns {HTMLElement}
     */
    getForm() {
        return document.getElementById('settings-form');
    }

    /***
     * Add component to parent
     */
    render(context) {
        this.__context = context;
        this.__parent.insertAdjacentHTML('beforeend', settingsTemplate(this.__context.data));
        const chPass = new ChangePassword(document.getElementById('settings'));
        chPass.render();
        document
            .getElementById('settings-gender').options[this.__context.data.sex]
            .setAttribute('selected', 'true');
        this.__addListeners();
    }
}