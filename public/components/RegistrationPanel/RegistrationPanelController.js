import { Landing } from '../../pages/Landing.js';
import { RegUserData } from '../../models/RegUserData.js';
import {telMask, parseTelNumber} from '../../modules/telMask.js';

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
     * main listener
     * @private
     * @this {RegistrationPanelController}
     * @param{Event} ev - event
     */
    __listenersRegistrarion(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open(ev);
                }
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {RegistrationPanelController}
     * @return {{validateChange: {listener: *, type: string}, hideError: {listener: *, type: string}, validateInput: {listener: *, type: string}, showError: {listener: *, type: string}, registrationClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            registrationClick: {
                type: 'click',
                listener: this.__listenersRegistrarion.bind(this)
            },
            validateInput: {
                type: 'input',
                listener: this.__listenersRegistrarion.bind(this)
            },
            validateChange: {
                type: 'change',
                listener: this.__listenersRegistrarion.bind(this)
            },
            showError: {
                type: 'mouseover',
                listener: this.__listenersMouseIn.bind(this)

            },
            hideError: {
                type: 'mouseout',
                listener: this.__listenersMouseOut.bind(this)

            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     *  listener for MouseIn Event
     * @private
     * @this {RegistrationPanelController}
     * @param{Event} ev - event
     */
    __listenersMouseIn(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'move' in el.dataset) {
                    actions[el.dataset.move].open(ev.target);
                }
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     *  listener for MouseOut Event
     * @private
     * @this {RegistrationPanelController}
     * @param{Event} ev - event
     */
    __listenersMouseOut(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'moveout' in el.dataset) {
                    actions[el.dataset.moveout].open(ev.target);
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
            mouseIn: {
                open: this.mouseInInput.bind(this)
            },
            mouseOut: {
                open: this.mouseOutInput.bind(this)
            }
        };
    }


    /****
     * @author Ivan Gorshkov
     *
     * action with mouse out event
     * @param{Object} target - input element
     * @private
     */
    mouseOutInput(target) {
        if (target.nextSibling.className === '') {
            target.nextElementSibling.classList.add('error-hidden');
        }

    }

    /****
     * @author Ivan Gorshkov
     *
     * action with mouse in event
     * @param{Object} target - input element
     * @private
     */
    mouseInInput(target) {
        if (target.nextSibling.className === 'error-hidden') {
            target.nextElementSibling.classList.remove('error-hidden');
        }

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
     * add to DOM error massage
     * @param{Object} target
     * @param{string} idError
     * @param{string} textError
     * @private
     */
    __insertError(target, idError, textError) {
        target.classList.add('reg-panel__input-error');
        if (document.getElementById(idError) === null) {
            const el = document.createElement('div');
            el.id = idError;
            el.innerHTML = textError;
            el.className = 'error-hidden';
            target.parentNode.insertBefore(el, target.nextSibling);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * add success massage
     * @param{Object} target
     * @param{string} idError
     * @private
     */
    __addSuccesses(target, idError) {
        target.classList.remove('reg-panel__input-error');
        target.classList.add('reg-panel__input-susses');
        if (document.getElementById(idError)) {
            target.parentNode.removeChild(target.nextSibling);
        }
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
        return this.__validatePhone(ev.target);
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
        const { error, message } = this.__model.validationTelephone(target.value);
        if (!error) {
            this.__addSuccesses(target, 'phoneError');
            return true;
        }
        this.__insertError(target, 'phoneError', this.__createMessageError(`
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
        return this.__validatePas(ev.target);
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
        const { error, message } = this.__model.validationPassword(target.value);
        if (!error) {
            this.__addSuccesses(target, 'passwordError');
            const element = document.getElementById('passwordConfirm');
            this.__validateConfirmPwd(element);
            return true;
        }

        this.__insertError(target, 'passwordError', this.__createMessageError(`
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
        return this.__validateConfirmPwd(ev.target);
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
        const { error, message } = this.__model.validationConfirmPassword(element.value, target.value);
        if (!error) {
            this.__addSuccesses(target, 'passwordConfirmError');
            return true;
        }

        this.__insertError(target, 'passwordConfirmError', this.__createMessageError(`
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
        return this.__validateMail(ev.target);
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
        const { error, message } = this.__model.validationEmail(target.value);
        if (!error) {
            this.__addSuccesses(target, 'MailError');
            return true;
        }
        this.__insertError(target, 'MailError', this.__createMessageError(`
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
        return this.__validateEmpty(ev.target);
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
        if (target.value !== '') {
            this.__addSuccesses(target, `${target.id}Error`);
            return true;
        }

        this.__insertError(target, `${target.id}Error`, this.__createMessageError(`
                  <ul class="list-errors">
                         <li>Поле не должно быть пустым</li>
                     </ul>
    `));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * create box massage with errors
     * @param{string} errText
     * @return {string}
     * @private
     * @this {RegistrationPanelController}
     */
    __createMessageError(errText) {
        return `
            <div class="message-container">
              <div class="message__arrow">
                <div class="message-outer"></div>
                <div class="message-inner"></div>
              </div>
              <div class="message-body">
                    ${errText}
              </div>
            </div>
    `;
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
        const sex = document.getElementById('sex');

        if (isValidDate && isValidMail && isValidName && isValidPhone && isValidPwd && isValidpwdConfirm && isValidSurname) {
            this.__model.fillUserData({
                name: name.value,
                surname: surname.value,
                sex: sex.options[sex.selectedIndex].text,
                dateBirth: date.value,
                telephone: parseTelNumber(phone.value),
                email: mail.value,
                password: password.value
            });

            this.__model.log();

            this.__model.registration(document.getElementById('registration-from'))
                .then(() => {
                    const landing = new Landing(this.__parent);
                    landing.render();
                });
        }
    }
}