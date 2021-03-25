import {RegUserData} from '../../models/RegUserData.js';
import {telMask, parseTelNumber} from '../../modules/telMask.js';
import {insertError, addSuccesses, createMessageError, hideError, showError} from '../../modules/validationStates.js';

import {router} from '../../modules/router.js';
import {frontUrls} from '../../modules/frontUrls.js';

/***
 * @author Ivan Gorshkov
 *
 * RegistrationPanelController control events of board and board component
 * @class RegistrationPanelController
 */
export class RegistrationPanelController {

    /***
     * @author Ivan Gorshkov
     *
     * init of class RegistrationPanelController
     * @param{HTMLElement} parent - parent component
     * @param{RegistrationPanel} registrationPanel - control component
     * @constructor
     * @this {RegistrationPanelController}
     * @public
     */
    constructor(parent, registrationPanel) {
        this.__parent = parent;
        this.__registartion = registrationPanel;
        this.__model = new RegUserData();
        this.__isPicAdd = false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * set listeners to all components
     * @this {RegistrationPanelController}
     * @public
     */
    control() {
        this.__registartion.listeners = this.__createListeners();
        this.__registartion.addListeners();
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {RegistrationPanelController}
     * @return {Object}
     * @private
     */
    __createListeners() {
        return {
            registrationClick: {
                type: 'click',
                listener: this.__listener.bind(this, 'action')
            },
            validateInput: {
                type: 'input',
                listener: this.__listener.bind(this, 'action')
            },
            validateChange: {
                type: 'change',
                listener: this.__listener.bind(this, 'action')
            },
            keydown: {
                type: 'keydown',
                listener: (ev) => {
                    ev.preventDefault();
                    return false;
                }
            },
            focusInput: {
                type: 'focus',
                listener: this.__listener.bind(this, 'move')

            },
            blurInput: {
                type: 'blur',
                listener: this.__listener.bind(this, 'moveout')

            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     *  listener for Page Events
     * @private
     * @this {RegistrationPanelController}
     * @param {string } dataType - type action
     * @param{Event} ev - event
     */
    __listener(dataType, ev) {
        ev.preventDefault();
        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && dataType in el.dataset) {
                    actions[el.dataset[dataType]].open(ev);
                }
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * Object with all actions
     * @return {{changePwd: {open: any}, inputConfirmPwd: {open: any}, clickRegistration: {open: *}, inputEmpty: {open: any}, inputPhone: {open: any}, inputMail: {open: any}, readURL: {open: *}, clickUpload: {open: *}}}
     * @this {RegistrationPanelController}
     * @private
     */
    __getActions() {
        return {
            inputPhone: {
                open: this.__validatePhoneListener.bind(this)
            },
            changePwd: {
                open: this.__validatePasListener.bind(this)
            },
            inputConfirmPwd: {
                open: this.__validateConfirmPwdListener.bind(this)
            },
            inputMail: {
                open: this.__validateMailListener.bind(this)
            },
            inputEmpty: {
                open: this.__validateEmptyListener.bind(this)
            },
            clickRegistration: {
                open: this.__validateRegister.bind(this)
            },
            clickUpload: {
                open: this.__upload.bind(this)
            },
            readURL: {
                open: this.__read.bind(this)
            },
            showError: {
                open: showError.bind(this)
            },
            hideError: {
                open: hideError.bind(this)
            }
        };
    }


    /****
     * @author Ivan Gorshkov
     *
     * update profile picture action
     * @private
     * @param ev
     */
    __read(ev) {
        const firstIndex = 0;
        if (ev.target.files && ev.target.files[firstIndex]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const elem = document.getElementById('profile-pic');
                elem.src = e.target.result;
            };

            this.__isPicAdd = true;
            reader.readAsDataURL(ev.target.files[firstIndex]);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system menu action
     * @private
     */
    __upload() {
        const elem = document.getElementById('file-upload');
        elem.click();
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input phone
     * @param{Event} ev
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     */
    __validatePhoneListener(ev) {
        telMask(ev);

        if (this.__validatePhone(ev.target) === false) {
            document.getElementById('phoneError').classList.remove('error-hidden');
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for phone value
     * @param target
     * @return {boolean}
     * @this {RegistrationPanelController}
     * @private
     */
    __validatePhone(target) {
        const {error, message} = this.__model.validationTelephone(parseTelNumber(target.value));
        if (!error) {
            addSuccesses(target, 'phoneError');
            return true;
        }
        insertError(target, 'phoneError', createMessageError(`
                  <ul class="list-errors">
                    <li>${message}</li>
                  </ul>
    `));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input password
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     * @param ev
     */
    __validatePasListener(ev) {
        if (this.__validatePas(ev.target) === false) {
            document.getElementById('passwordError').classList.remove('error-hidden');
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for password value
     * @param target
     * @return {boolean}
     * @this {RegistrationPanelController}
     * @private
     */
    __validatePas(target) {
        const {error, message} = this.__model.validationPassword(target.value);
        if (!error) {
            addSuccesses(target, 'passwordError');
            const element = document.getElementById('passwordConfirm');
            this.__validateConfirmPwd(element);
            return true;
        }

        insertError(target, 'passwordError', createMessageError(`
                        <ul class="list-errors">
                        ${message.reduce((prev, cur) => `${prev}<li>${cur}</li>`, '')}
                        </ul>
    `));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input confirmpassword
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     * @param ev
     */
    __validateConfirmPwdListener(ev) {
        if (this.__validateConfirmPwd(ev.target) === false) {
            document.getElementById('passwordConfirmError').classList.remove('error-hidden');
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for ConfirmPwd value
     * @param target
     * @return {boolean}
     * @this {RegistrationPanelController}
     * @private
     */
    __validateConfirmPwd(target) {
        const element = document.getElementById('password');
        const {error, message} = this.__model.validationConfirmPassword(element.value, target.value);
        if (!error) {
            addSuccesses(target, 'passwordConfirmError');
            return true;
        }
        insertError(target, 'passwordConfirmError', createMessageError(`
                 <ul class="list-errors">
                     <li>${message}</li>
                 </ul>
    `));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input mail
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     * @param ev
     */
    __validateMailListener(ev) {
        if (this.__validateMail(ev.target) === false) {
            document.getElementById('MailError').classList.remove('error-hidden');
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for email value
     * @param target
     * @return {boolean}
     * @this {RegistrationPanelController}
     * @private
     */
    __validateMail(target) {
        const {error, message} = this.__model.validationEmail(target.value);
        if (!error) {
            addSuccesses(target, 'MailError');
            return true;
        }
        insertError(target, 'MailError', createMessageError(`
              <ul class="list-errors">
                 <li>${message}</li>
             </ul>
        `));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input fields witch can not be empty
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     * @param ev
     */
    __validateEmptyListener(ev) {
        if (this.__validateEmpty(ev.target) === false) {
            document.getElementById(`${ev.target.id}Error`).classList.remove('error-hidden');
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for empty value
     * @param target
     * @return {boolean}
     * @this {RegistrationPanelController}
     * @private
     */
    __validateEmpty(target) {
        const {error, message} = this.__model.validationString(target.value);
        if (!error) {
            addSuccesses(target, `${target.id}Error`);
            return true;
        }
        insertError(target, `${target.id}Error`, createMessageError(`
                  <ul class="list-errors">
                         <li>${message}</li>
                     </ul>
        `));
        return false;
    }

    /***
     * Validate photo is selected
     * @returns {boolean}
     * @private
     */
    __validatePhoto() {
        if (this.__isPicAdd === true) {
            document.getElementById('circle-avatar').classList.remove('reg-panel__input-error');
            document.getElementById('circle-avatar').classList.add('reg-panel__input-susses');
            return true;
        }
        document.getElementById('circle-avatar').classList.add('reg-panel__input-error');
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action witch validate all fields (registration button)
     * @private
     * @this {RegistrationPanelController}
     */
    __validateRegister() {
        const passwordConfirm = document.getElementById('passwordConfirm');
        const phone = document.getElementById('phone');
        const password = document.getElementById('password');
        const mail = document.getElementById('mail');
        const name = document.getElementById('name');
        const surname = document.getElementById('surname');
        const date = document.getElementById('date');
        const isValidpwdConfirm = this.__validateConfirmPwd(passwordConfirm);
        const isValidPhone = this.__validatePhone(phone);
        const isValidPwd = this.__validatePas(password);
        const isValidMail = this.__validateMail(mail);
        const isValidName = this.__validateEmpty(name);
        const isValidSurname = this.__validateEmpty(surname);
        const isValidDate = this.__validateEmpty(date);
        const isPhoto = this.__validatePhoto();
        const sex = document.getElementById('sex');

        if (isPhoto && isValidDate && isValidMail && isValidName && isValidPhone && isValidPwd && isValidpwdConfirm && isValidSurname) {
            this.__model.fillUserData({
                name: name.value,
                surname: surname.value,
                sex: sex.options[sex.selectedIndex].value,
                dateBirth: date.value,
                telephone: parseTelNumber(phone.value),
                email: mail.value,
                password: password.value
            });

            this.__model.registration(document.getElementById('registration-from'))
                .then(() => {
                    router.redirect(frontUrls.main);
                }).catch((data) => {
                this.__registartion.errorText(data);
            });
        }
    }
}