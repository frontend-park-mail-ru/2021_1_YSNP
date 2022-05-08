import settingsTemplate from './Settings.hbs';
import './Settings.scss';

import {ChangePassword} from './ChangePassword/ChangePassword.js';
import {parseTelMask} from '../../modules/layout/mask';

import {sentryManager} from '../../modules/sentry';

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
        document
            .getElementById('settings-telephone')
            .addEventListener(this.__context.listeners.telFocus.type, this.__context.listeners.telFocus.listener, true);
        document
            .getElementById('settings-telephone')
            .addEventListener(this.__context.listeners.telBlur.type, this.__context.listeners.telBlur.listener, true);
        document
            .getElementById('settings-telephone')
            .addEventListener(this.__context.listeners.telInput.type, this.__context.listeners.telInput.listener, true);
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
        document
            .getElementById('settings-telephone')
            .removeEventListener(this.__context.listeners.telFocus.type, this.__context.listeners.telFocus.listener, true);
        document
            .getElementById('settings-telephone')
            .removeEventListener(this.__context.listeners.telBlur.type, this.__context.listeners.telBlur.listener, true);
        document
            .getElementById('settings-telephone')
            .removeEventListener(this.__context.listeners.telInput.type, this.__context.listeners.telInput.listener, true);
    }

    /***
     * Enable password change
     * @param target
     * @this {Settings}
     */
    enablePasswordChange(target) {
        const {buttonSavePass, buttonResetPass} = this.getPasswordInfo();
        if (target.id === 'settings-old-pass') {
            if (target.value !== '') {
                buttonSavePass.style.visibility = 'visible';
                buttonResetPass.style.visibility = 'visible';
            } else {
                buttonSavePass.style.visibility = 'hidden';
                buttonResetPass.style.visibility = 'hidden';
            }
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
            newPassword: document.getElementById('settings-new-pass'),
            buttonSavePass: document.getElementById('settings-save-pass'),
            buttonResetPass: document.getElementById('settings-reset-pass')
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
        const {oldPassword, passwordConfirm, newPassword, buttonSavePass, buttonResetPass} = this.getPasswordInfo();
        buttonSavePass.style.visibility = 'hidden';
        buttonResetPass.style.visibility = 'hidden';
        newPassword.classList.remove('reg-panel__input-susses');
        passwordConfirm.classList.remove('reg-panel__input-susses');
        oldPassword.classList.remove('reg-panel__input-susses');
    }

    /***
     * Open file system for photo
     */
    openFileSystem() {
        const {imgUpload} = this.getSettingsFields();
        imgUpload.click();
    }

    /***
     * Add src to picture
     * @param {Event} ev - event
     * @this {Settings}
     */
    avatarOnLoad(ev) {
        const img = document.getElementById('settings-profile-pic');
        img.src = ev.target.result;
    }

    /***
     * Set default data
     * @param {Object} data - user data
     */
    resetSettingsChanges(data) {
        const {name, surname, gender, birthday, phone, mail, img} = this.getSettingsFields();
        name.value = data.name;
        surname.value = data.surname;
        gender.value = data.sex;
        birthday.value = data.dateBirth;
        phone.value = data.telephone;
        mail.value = data.email;
        img.src = data.imageSrc;
        this.disableEditing();
    }

    /***
     * Open form settings for editing
     */
    enableEditing() {
        const {
            name,
            surname,
            gender,
            birthday,
            phone,
            phoneCountry,
            mail,
            buttonSaveProfile,
            buttonUploadImg
        } = this.getSettingsFields();
        buttonSaveProfile.style.visibility = 'visible';
        buttonUploadImg.style.visibility = 'visible';
        surname.removeAttribute('readonly');
        name.removeAttribute('readonly');
        gender.removeAttribute('disabled');
        birthday.removeAttribute('readonly');
        mail.removeAttribute('readonly');

        document.getElementById('settings-avatar').style.cursor = 'pointer';

        if (this.__context.data.telephone === '') {
            phone.removeAttribute('readonly');
            phoneCountry.removeAttribute('readonly');
        }
        if (this.__context.data.dateBirth === '') {
            const {birthday} = this.getSettingsFields();
            birthday.style.visibility = 'visible';
        }
        document.getElementById('settings-telephone-block')
            .style.visibility = 'visible';
    }

    /***
     * Close form settings for editing
     */
    disableEditing() {
        const {
            name,
            surname,
            gender,
            birthday,
            phone,
            phoneCountry,
            mail,
            buttonSaveProfile,
            buttonUploadImg
        } = this.getSettingsFields();
        buttonSaveProfile.style.visibility = 'hidden';
        buttonUploadImg.style.visibility = 'hidden';
        surname.setAttribute('readonly', 'true');
        if (document.getElementById(this.getInputErrorId(surname))) {
            surname.parentNode.removeChild(surname.nextSibling);
        }
        name.setAttribute('readonly', 'true');
        if (document.getElementById(this.getInputErrorId(name))) {
            name.parentNode.removeChild(name.nextSibling);
        }
        gender.setAttribute('disabled', 'true');
        birthday.setAttribute('readonly', 'true');
        if (document.getElementById(this.getInputErrorId(birthday))) {
            birthday.parentNode.removeChild(birthday.nextSibling);
        }
        phone.setAttribute('readonly', 'true');
        phoneCountry.setAttribute('readonly', 'true');
        if (document.getElementById(this.getInputErrorId(phone))) {
            phone.parentNode.removeChild(phone.nextSibling);
        }
        mail.setAttribute('readonly', 'true');
        if (document.getElementById(this.getInputErrorId(mail))) {
            mail.parentNode.removeChild(mail.nextSibling);
        }
        if (this.__context.data.dateBirth === '') {
            const {birthday} = this.getSettingsFields();
            birthday.style.visibility = 'hidden';
        }
        document.getElementById('settings-avatar').style.cursor = 'default';

        if (this.__context.data.telephone !== '') {
            document.getElementById('box-passwords')
                .style.visibility = 'visible';
            document.getElementById('settings-telephone-block')
                .style.visibility = 'visible';
        } else {
            document.getElementById('box-passwords')
                .style.visibility = 'hidden';
            document.getElementById('settings-telephone-block')
                .style.visibility = 'hidden';
        }
        if (this.__context.data.sex === '') {
            document
                .getElementById('settings-gender').options['notstated']
                .setAttribute('selected', 'true');
        } else {
            document
                .getElementById('settings-gender').options[this.__context.data.sex]
                .setAttribute('selected', 'true');
        }
        if (this.__context.data.dateBirth === '') {
            const {birthday} = this.getSettingsFields();
            birthday.style.visibility = 'hidden';
        }
    }

    /***
     * All HTMLElement of settings form
     * @returns {{birthday: HTMLElement, img: HTMLElement, mail: HTMLElement, gender: HTMLElement, phone: HTMLElement, surname: HTMLElement, name: HTMLElement, imgUpload: HTMLElement, buttonSaveProfile: HTMLElement, buttonUploadImg: HTMLElement}}
     */
    getSettingsFields() {
        return {
            surname: document.getElementById('settings-surname'),
            name: document.getElementById('settings-name'),
            birthday: document.getElementById('settings-birthday'),
            phone: document.getElementById('settings-telephone'),
            phoneCountry: document.getElementById('settings-telephone-country'),
            mail: document.getElementById('settings-email'),
            gender: document.getElementById('settings-gender'),
            img: document.getElementById('settings-profile-pic'),
            imgUpload: document.getElementById('file-upload'),
            buttonSaveProfile: document.getElementById('settings-button-save'),
            buttonUploadImg: document.getElementById('settings-upload-button')
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
        try {
            this.__context = context;
            this.__context.data.telephone = parseTelMask(this.__context.data.telephone);
            this.__parent.insertAdjacentHTML('beforeend', settingsTemplate(this.__context.data));

            const chPass = new ChangePassword(document.getElementById('settings'));
            chPass.render();

            this.disableEditing();
            this.__addListeners();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}