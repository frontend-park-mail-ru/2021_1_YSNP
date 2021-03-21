import authTemplate from './Auth.hbs';
import './Auth.css';

/***
 * Auth component
 */
export class Auth {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} listeners - component listeners
     */
    constructor(parent, listeners = {}) {
        this.__parent = parent;
        this.__listeners = listeners;
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
     * Get listeners
     * @returns {Object}
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * Set listeners
     * @param {Object} val - component listeners
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * Add component listeners
     */
    addListeners() {
        document
            .getElementById('auth-content')
            .addEventListener(this.__listeners.authClick.type, this.__listeners.authClick.listener);

        document
            .getElementById('app')
            .addEventListener(this.__listeners.pageClick.type, this.__listeners.pageClick.listener);

        window
            .addEventListener(this.__listeners.keyClick.type, this.__listeners.keyClick.listener);

        document
            .getElementById('auth-form')
            .addEventListener(this.__listeners.submitForm.type, this.__listeners.submitForm.listener);

        document
            .getElementById('auth-tel')
            .addEventListener(this.__listeners.telFocus.type, this.__listeners.telFocus.listener);

        document
            .getElementById('auth-tel')
            .addEventListener(this.__listeners.telInput.type, this.__listeners.telInput.listener);

        document
            .getElementById('auth-tel')
            .addEventListener(this.__listeners.telBlur.type, this.__listeners.telBlur.listener);
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('auth-content')
            .removeEventListener(this.__listeners.authClick.type, this.__listeners.authClick.listener);

        document
            .getElementById('app')
            .removeEventListener(this.__listeners.pageClick.type, this.__listeners.pageClick.listener);

        window
            .removeEventListener(this.__listeners.keyClick.type, this.__listeners.keyClick.listener);

        document
            .getElementById('auth-tel')
            .removeEventListener(this.__listeners.telFocus.type, this.__listeners.telFocus.listener);

        document
            .getElementById('auth-tel')
            .removeEventListener(this.__listeners.telInput.type, this.__listeners.telInput.listener);

        document
            .getElementById('auth-tel')
            .removeEventListener(this.__listeners.telBlur.type, this.__listeners.telBlur.listener);
    }

    /***
     * Add component to parent
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', authTemplate());
    }

    /***
     * Remove component
     */
    remove() {
        document.getElementById('auth').remove();
    }
}