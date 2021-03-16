import './Settings.css';
import settingsTemplate from './Settings.hbs';
import {ChangePassword} from './ChangePassword/ChangePassword.js';
/***
 * Settings box on profile page
 */
export class Settings {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} listeners - component listeners
     */
    constructor(parent, listeners = {}) {
        this.__parent = parent;
        this.data = {};
        this.__listeners = listeners;
    }

    /***
     * Get listeners
     * @returns {Object}
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * Set listeners
     * @param {Object} val - listener to set
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * Add component listeners
     */
    addListeners() {
        document
            .getElementById('settings-file-upload')
            .addEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('settings-components')
            .addEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('settings-password')
            .addEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('settings')
            .addEventListener(this.listeners.settingsClick.type, this.listeners.settingsClick.listener);
        document
            .getElementById('settings')
            .addEventListener(this.listeners.focusInput.type, this.listeners.focusInput.listener, true);
        document
            .getElementById('settings')
            .addEventListener(this.listeners.blurInput.type, this.listeners.blurInput.listener, true);
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('settings-file-upload')
            .removeEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('settings-components')
            .removeEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('settings-password')
            .removeEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('settings')
            .removeEventListener(this.__listeners.settingsClick.type, this.__listeners.settingsClick.listener);
        document
            .getElementById('settings')
            .removeEventListener(this.listeners.focusInput.type, this.listeners.focusInput.listener, true);
        document
            .getElementById('settings')
            .removeEventListener(this.listeners.blurInput.type, this.listeners.blurInput.listener, true);
    }

    /***
     * Add component to parent
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', settingsTemplate(this.data));
        const chPass = new ChangePassword(document.getElementById('settings'));
        chPass.render();
        document
            .getElementById('settings-gender').options[this.data.sex]
            .setAttribute('selected', 'true');
    }
}