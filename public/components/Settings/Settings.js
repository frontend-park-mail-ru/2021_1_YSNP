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
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Add component listeners
     */
    addListeners() {
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
        this.addListeners();
    }
}