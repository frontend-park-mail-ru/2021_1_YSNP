import {telMask, parseTelNumber} from '../../modules/telMask.js';
import {Registration} from '../../pages/Registration.js';
import {RegAuthUserModel} from '../../models/RegAuthUserModel.js';
import {Landing} from '../../pages/Landing';

/***
 * Auth controller
 */
export class AuthController {
    /***
     *
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {Auth} auth - auth
     */
    constructor(pageRemoveListeners, parent, auth) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__auth = auth;
        this.__model = new RegAuthUserModel();
    }

    /***
     * Add listeners
     */
    control() {
        this.__auth.listeners = this.__createListeners();
        this.__auth.addListeners();
    }

    /***
     *  Remove listeners
     */
    removeControllerListeners() {
        this.__auth.removeListeners();
    }

    /***
     * Auth popup click event
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerAuthClick(ev) {
        ev.stopPropagation();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open();
                }
            });
    }

    /***
     * Auth outside popup click event
     * @param {Event} ev - event
     * @private
     */
    __listenerPageClick(ev) {
        ev.preventDefault();

        this.__closeAuth();
    }

    /***
     * Auth key esc pressed
     * @param {KeyboardEvent} ev - event
     * @private
     */
    __listenerKeyClick(ev) {
        if (ev.key === 'Escape') {
            this.__auth.removeListeners();
            this.__auth.remove();
        }
    }

    /***
     * Submit form
     * @param {Event} ev - event
     * @private
     */
    __listenerSubmitForm(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        const telephone = parseTelNumber(document.getElementById('auth-tel').value);
        const password = document.getElementById('auth-password').value;

        const isValidTelephone = this.__isValidTelephone(telephone);
        const isValidPassword = this.__isValidPassword(password);

        if (isValidTelephone && isValidPassword) {
            this.__model.log();
            this.__model.auth()
                .then(({status, data}) => {
                    console.log(status, data);

                    if (status === 200) {
                        const landing = new Landing(this.__parent);
                        landing.render();
                    }
                });
        } else {
            this.__auth.errorText('Неправильный номер или пароль');
        }
    }

    __isValidTelephone(telephone) {
        const {error} = this.__model.validationTelephone(telephone);

        if (!error) {
            this.__model.telephone = telephone;
            this.__auth.errorText('');

            return true;
        }

        return false;
    }

    __isValidPassword(password) {
        const {error} = this.__model.validationPassword(password);

        if (!error) {
            this.__model.password = password;
            this.__auth.errorText('');

            return true;
        }

        return false;
    }

    /***
     * Get auth listeners
     * @returns {{authClick: {listener: any, type: string}, pageClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            authClick: {
                type: 'click',
                listener: this.__listenerAuthClick.bind(this)
            },
            pageClick: {
                type: 'click',
                listener: this.__listenerPageClick.bind(this)
            },
            keyClick: {
                type: 'keydown',
                listener: this.__listenerKeyClick.bind(this)
            },
            submitForm: {
                type: 'submit',
                listener: this.__listenerSubmitForm.bind(this)
            },
            telFocus: {
                type: 'focus',
                listener: telMask
            },
            telInput: {
                type: 'input',
                listener: telMask
            },
            telBlur: {
                type: 'blur',
                listener: telMask
            }
        };
    }

    /***
     * Open registration
     * @private
     */
    __openRegistration() {
        this.__pageRemoveListeners();

        const registration = new Registration(this.__parent);
        registration.render();
    }

    /***
     * Close auth
     * @private
     */
    __closeAuth() {
        this.__auth.removeListeners();
        this.__auth.remove();
    }

    /***
     * Get auth actions
     * @returns {{registrationClick: {open: *}}}
     * @private
     */
    __getActions() {
        return {
            registrationClick: {
                open: this.__openRegistration.bind(this)
            },
            closeClick: {
                open: this.__closeAuth.bind(this)
            }
        };
    }
}