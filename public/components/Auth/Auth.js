import authTemplate from './Auth.hbs';
import './Auth.css';

/***
 * Auth component
 */
export class Auth {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
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
     * Get user telephone
     * @returns {string}
     */
    getTelephone() {
        return document.getElementById('auth-tel').value;
    }

    /***
     * Get user password
     * @returns {string}
     */
    getPassword() {
        return document.getElementById('auth-password').value;
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        document
            .getElementById('auth-content')
            .addEventListener(this.__context.listeners.authClick.type, this.__context.listeners.authClick.listener);

        window
            .addEventListener(this.__context.listeners.keyClick.type, this.__context.listeners.keyClick.listener);

        document
            .getElementById('auth-form')
            .addEventListener(this.__context.listeners.submitForm.type, this.__context.listeners.submitForm.listener);

        document
            .getElementById('auth-tel')
            .addEventListener(this.__context.listeners.telFocus.type, this.__context.listeners.telFocus.listener);

        document
            .getElementById('auth-tel')
            .addEventListener(this.__context.listeners.telInput.type, this.__context.listeners.telInput.listener);

        document
            .getElementById('auth-tel')
            .addEventListener(this.__context.listeners.telBlur.type, this.__context.listeners.telBlur.listener);
    }

    /***
     * Remove component listeners
     */
    __removeListeners() {
        document
            .getElementById('auth-content')
            .removeEventListener(this.__context.listeners.authClick.type, this.__context.listeners.authClick.listener);

        window
            .removeEventListener(this.__context.listeners.keyClick.type, this.__context.listeners.keyClick.listener);

        document
            .getElementById('auth-form')
            .removeEventListener(this.__context.listeners.submitForm.type, this.__context.listeners.submitForm.listener);

        document
            .getElementById('auth-tel')
            .removeEventListener(this.__context.listeners.telFocus.type, this.__context.listeners.telFocus.listener);

        document
            .getElementById('auth-tel')
            .removeEventListener(this.__context.listeners.telInput.type, this.__context.listeners.telInput.listener);

        document
            .getElementById('auth-tel')
            .removeEventListener(this.__context.listeners.telBlur.type, this.__context.listeners.telBlur.listener);
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', authTemplate());
            this.__addListeners();
        } catch (err) {
            console.log(err.message);
        }
    }

    /***
     * Remove component
     */
    remove() {
        try {
            this.__removeListeners();
            document.getElementById('auth').remove();
        } catch (err) {
            console.log(err.message);
        }
    }
}