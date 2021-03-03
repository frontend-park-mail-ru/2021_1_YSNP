'use strict';

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
     * @param{RegistrationPanel} registartion - control component
     * @constructor
     * @this {RegistrationPanelController}
     * @public
     */
    constructor(parent, registartion) {
        this.__parent = parent;
        this.__registartion = registartion;
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
                    actions[el.dataset.action].open(ev.target);
                }
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {RegistrationPanelController}
     * @return {{validateChange: {listener: *, type: string}, validateInput: {listener: *, type: string}, registrationClick: {listener: *, type: string}}}
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
                listener: this.__listenersMouseMove.bind(this)

            },
            hideError: {
                type: 'mouseout',
                listener: this.__listenersMouseOut.bind(this)

            }
        };
    }

    __listenersMouseMove(ev) {
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
                open: this._validatePhone.bind(this)
            },
            changePwd: {
                open: this.__validatePas.bind(this)
            },
            inputConfirmPwd: {
                open: this.__validateConfirmPwd.bind(this)
            },
            inputMail: {
                open: this.__validateMail.bind(this)
            },
            inputEmpty: {
                open: this.__validateEmpty.bind(this)
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

    mouseOutInput(target) {
        if (target.nextSibling.className === '') {
            target.nextElementSibling.classList.add('error-hidden');
        }

    }

    mouseInInput(target) {
        if (target.nextSibling.className === 'error-hidden') {
            target.nextElementSibling.classList.remove('error-hidden');
        }

    }

    /****
     * @author Ivan Gorshkov
     *
     * update profile picture action
     * @param input
     * @private
     */
    __read(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const elem = document.getElementById('profile-pic');
                elem.src = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
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
     * validate number
     * @param{string} phoneNumber
     * @return {boolean}
     * @private
     */
    __isValidPhone(phoneNumber) {
        const found = phoneNumber.search(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/);
        return found > -1;
    }

    /***
     * @author Ivan Gorshkov
     *
     * validate mail
     * @param{string} email
     * @return {boolean}
     * @private
     */
    __isValidEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    /***
     * @author Ivan Gorshkov
     *
     * validate password
     * @param{string} inputtxt
     * @return {boolean}
     * @private
     */
    __isValidPwd(inputtxt) {
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return re.test(inputtxt);
    }

    /***
     * @author Ivan Gorshkov
     *
     * add to DOM error massage
     * @param{HTMLElement} target
     * @param{string} idError
     * @param{string} textError
     * @private
     */
    __insertError(target, idError, textError) {
        target.classList.add('input-error');
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
     * @param{HTMLElement} target
     * @param{string} idError
     * @private
     */
    __addSuccesses(target, idError) {
        target.classList.remove('input-error');
        target.classList.add('input-susses');
        if (document.getElementById(idError)) {
            target.parentNode.removeChild(target.nextSibling);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input phone
     * @param{HTMLElement} target
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     */
    _validatePhone(target) {
        if (this.__isValidPhone(target.value)) {
            this.__addSuccesses(target, 'phoneError');
            return true;
        }
        this.__insertError(target, 'phoneError', this.__createMessageError(`
                  <ul class="list-errors">
                    <li>Неверный формат телефона</li>
                  </ul>
    `));
        return false;
    }



    /***
     * @author Ivan Gorshkov
     *
     * action to validate input password
     * @param{HTMLElement} target
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     */
    __validatePas(target) {
        if (this.__isValidPwd(target.value)) {
            this.__addSuccesses(target, 'passwordError');
            const element = document.getElementById('passwordConfirm');
            this.__validateConfirmPwd(element);
            return true;
        }

        this.__insertError(target, 'passwordError', this.__createMessageError(`
                        <ul class="list-errors">
                          <li>От шести или более символов</li>
                          <li>Содержит хотя бы одну цифру</li>
                          <li>Хотя бы один символ нижнего регистра</li>
                          <li>Хотя бы один символ верхнего регистра</li>
                          <li>Только латинские символы</li>
                        </ul>
    `));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input confirmpassword
     * @param{HTMLElement} target
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     */
    __validateConfirmPwd(target) {
        const element = document.getElementById('password');
        if (element.value === target.value && target.value !== '') {
            this.__addSuccesses(target, 'passwordConfirmError');
            return true;
        }

        this.__insertError(target, 'passwordConfirmError', this.__createMessageError(`
                 <ul class="list-errors">
                     <li>Пароли не совпадают</li>
                 </ul>
    `));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input mail
     * @param{HTMLElement} target
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     */
    __validateMail(target) {
        if (this.__isValidEmail(target.value)) {
            this.__addSuccesses(target, 'MailError');
            return true;
        }
        this.__insertError(target, 'MailError', this.__createMessageError(`
                  <ul class="list-errors">
                     <li>Неправильный формат mail</li>
                 </ul>
    `));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input fields witch can not be empty
     * @param{HTMLElement} target
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
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
        const isValidPhone = this._validatePhone(phone);
        const isValidPwd = this.__validatePas(password);
        const isValidMail = this.__validateMail(mail);
        const isValidName = this.__validateEmpty(name);
        const isValidSurname = this.__validateEmpty(surname);
        const isValidDate = this.__validateEmpty(date);
        if (isValidDate && isValidMail && isValidName && isValidPhone && isValidPwd && isValidpwdConfirm && isValidSurname) {
           //TODO(Ivan) Отправка формы
        }
    }
}