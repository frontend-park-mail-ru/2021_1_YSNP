'use strict';


export class RegistrationPanelController {

    constructor(parent, productList) {
        this.__parent = parent;
        this.__registartion = productList;
    }


    control() {
        this.__registartion.listeners = this.__createListeners();
        this.__registartion.addListeners();
    }


    __listenerProductListClick(ev) {
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


    __createListeners() {
        return {
            registrationClick: {
                type: 'click',
                listener: this.__listenerProductListClick.bind(this)
            },
            validateInput: {
                type: 'input',
                listener: this.__listenerProductListClick.bind(this)
            },
            validateChange: {
                type: 'change',
                listener: this.__listenerProductListClick.bind(this)

            }
        };
    }


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
            }
        };
    }


    __isValidPhone(phoneNumber) {
        const found = phoneNumber.search(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/);
        return found > -1;
    }

    __isValidEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    __isValidPwd(inputtxt) {
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return re.test(inputtxt);
    }

    __insertError(target, idError, textError) {
        target.style.border = '0.5px solid red';
        if (document.getElementById(idError) === null) {
            const el = document.createElement('div');
            el.id = idError;
            el.innerHTML = textError;
            target.parentNode.insertBefore(el, target.nextSibling);
        }
    }

    __addSuccesses(target, idError) {
        target.style.border = '0.5px solid green';
        if (document.getElementById(idError) !== null) {
            target.parentNode.removeChild(target.nextSibling);
        }
    }

    _validatePhone(target) {
        if (this.__isValidPhone(target.value)) {
            this.__addSuccesses(target, 'phoneError');
            return true;
        }
        this.__insertError(target, 'phoneError', `
                        <ul class="list-errors">
                          <li>Неверный формат телефона</li>
                        </ul>`);
        return false;
    }

    __validatePas(target) {
        if (this.__isValidPwd(target.value)) {
            this.__addSuccesses(target, 'passwordError');
            const element = document.getElementById('passwordConfirm');
            this.__validateConfirmPwd(element);
            return true;
        }

        this.__insertError(target, 'passwordError', `
                        <ul class="list-errors">
                          <li>От шести или более символов</li>
                          <li>Содержит хотя бы одну цифру</li>
                          <li>Хотя бы один символ нижнего регистра</li>
                          <li>Хотя бы один символ верхнего регистра</li>
                          <li>Только латинские символы</li>
                        </ul>`);
        return false;
    }

    __validateConfirmPwd(target) {
        const element = document.getElementById('password');
        if (element.value === target.value && target.value !== '') {
            this.__addSuccesses(target, 'passwordConfirmError');
            return true;
        }

        this.__insertError(target, 'passwordConfirmError', `
                 <ul class="list-errors">
                     <li>Пароли не совпадают</li>
                 </ul>`);
        return false;
    }

    __validateMail(target) {
        if (this.__isValidEmail(target.value)) {
            this.__addSuccesses(target, 'MailError');
            return true;
        }
        this.__insertError(target, 'MailError', `
                 <ul class="list-errors">
                     <li>Неправильный формат mail</li>
                 </ul>`);

        return false;
    }

    __validateEmpty(target) {
        if (target.value !== '') {
            this.__addSuccesses(target, `${target.id}Error`);
            return true;
        }

        this.__insertError(target, `${target.id}Error`, `
                 <ul class="list-errors">
                     <li>Поле не должно быть пустым</li>
                 </ul>`);

        return false;
    }

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
            alert('ok');
        }
    }
}