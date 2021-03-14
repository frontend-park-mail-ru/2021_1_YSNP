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
     * Component HTML
     * @returns {string}
     * @private
     */
    __getTemplate() {
        return `
        <div class="auth" id="auth">
            <div class="auth-content" id="auth-content">
                <div class="auth-content-inner">
                        
                    <svg version="1.1" class="auth-content-inner__close" data-action="closeClick" height="2vh" width="2vh" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512.001 512.001" xml:space="preserve">
                        <g><g>
                        <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                        L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                        c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                        l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                        L284.286,256.002z"/>
                        </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                    </svg>
                
                    <div class="auth-content-inner__title">
                        <span>Вход</span>
                    </div>
                     <div class="auth-content-inner__error" id="auth-error">
                        <span></span>
                    </div>
                    <form class="auth-content-form" id="auth-form">
                    <div>
                        <input class="auth-content-form__input auth-content-form__country" readonly required value="+7">
                        <input class="auth-content-form__input auth-content-form__tel" id="auth-tel" type="tel" placeholder="(999) 999 99 99" required>
                    </div>
                    <div>
                        <input class="auth-content-form__input auth-content-form__password" id="auth-password" type="password" placeholder="Пароль" required>
                    </div>
                        <button class="auth-content-form__button" type="submit">Войти</button>
                    </form>
                    <div class="auth-content-form__registration">
                        <span>Еще не зарегистрировались?</span>
                        <a href="#" data-action="registrationClick">Создайте аккаунт.</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    /***
     * Add component to parent
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }

    /***
     * Remove component
     */
    remove() {
        document.getElementById('auth').remove();
    }
}