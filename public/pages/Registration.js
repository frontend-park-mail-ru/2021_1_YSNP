'use strict';

import {Header} from '../components/Header/Header.js';
import {Profile} from './Profile.js';
import {Landing} from './Landing.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {RegistrationPanel} from '../components/RegistrationPanel/RegistrationPanel.js';


export class Registration {
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * @author Ivan Gorshkov
     * listener for profile page
     * @param {Event} ev - event
     * @this {Registration}
     * @public
     */
    listenerToProfile(ev) {
        ev.preventDefault();
        this.__header.removeListeners();
        this.__navigation.removeListeners();
        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * @author Ivan Gorshkov
     * listener for previous page
     * @param {Event} ev - event
     * @this {Registration}
     * @public
     */
    listenerToBack(ev) {
        ev.preventDefault();
        this.__navigation.removeListeners();
        this.__header.removeListeners();
        const landing = new Landing(this.__parent);
        landing.render();
    }


    listenerRegister(ev) {
        ev.preventDefault();
        const passwordConfirm = document.getElementById(this.__RegistrationForm().passwordConfirm.id);
        const phone = document.getElementById(this.__RegistrationForm().phone.id);
        const password = document.getElementById(this.__RegistrationForm().password.id);
        const mail = document.getElementById(this.__RegistrationForm().mail.id);
        const name = document.getElementById(this.__RegistrationForm().name.id);
        const surname = document.getElementById(this.__RegistrationForm().surname.id);
        const date = document.getElementById(this.__RegistrationForm().date.id);
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

    /***
     * @author Ivan Gorshkov
     * func for create object of listeners
     * @return {{backBtn: {toBack: {listener: *, type: string}}, header: {toProductCreate: {listener: *, type: string}}}}
     * @this {Registration}
     * @private
     */
    __createListeners() {
        return {
            header: {
                toProductCreate: {
                    type: 'click',
                    listener: this.listenerToProfile.bind(this)
                }
            },
            backBtn: {
                toBack: {
                    type: 'click',
                    listener: this.listenerToBack.bind(this)
                }
            },
            registration: {
                register: {
                    type: 'click',
                    listener: this.listenerRegister.bind(this)
                }
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
                        <ul>
                          <li>Неверный формат телефона</li>
                        </ul>`);
        return false;
    }

    __validatePas(target) {
        if (this.__isValidPwd(target.value)) {
            this.__addSuccesses(target, 'passwordError');
            return true;
        }

        this.__insertError(target, 'passwordError', `
                        <ul>
                          <li>От шести или более символов</li>
                          <li>Содержит хотя бы одну цифру</li>
                          <li>Хотя бы один символ нижнего регистра</li>
                          <li>Хотя бы один символ верхнего регистра</li>
                          <li>Только латинские символы</li>
                        </ul>`);
        return false;
    }

    __validateConfirmPwd(target) {
        const element = document.getElementById(this.__RegistrationForm().password.id);
        if (element.value === target.value && target.value !== '') {
            this.__addSuccesses(target, 'passwordConfirmError');
            return true;
        }

        this.__insertError(target, 'passwordConfirmError', `
                 <ul>
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
                 <ul>
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
                 <ul>
                     <li>Поле не должно быть пустым</li>
                 </ul>`);
        
        return false;
    }

    listenerValidateConfirmPwd(ev) {
        ev.preventDefault();
        this.__validateConfirmPwd(ev.target);
    }

    listenerValidateMail(ev) {
        ev.preventDefault();
        this.__validateMail(ev.target);
    }

    listenerValidateEmpty(ev) {
        ev.preventDefault();
        this.__validateEmpty(ev.target);
    }

    listenerValidatePhone(ev) {
        ev.preventDefault();
        this._validatePhone(ev.target);
    }

    listenerValidatePwd(ev) {
        ev.preventDefault();
        this.__validatePas(ev.target);
        const element = document.getElementById(this.__RegistrationForm().passwordConfirm.id);
        this.__validateConfirmPwd(element);
    }

    __RegistrationForm() {
        return {
            name: {
                title: 'Имя',
                placeholder: 'Имя',
                inputType: 'text',
                id: 'name',
                listener: {
                    type: 'input',
                    listener: this.listenerValidateEmpty.bind(this)
                }
            },
            surname: {
                title: 'Фамилия',
                placeholder: 'Фамилия',
                inputType: 'text',
                id: 'surname',
                listener: {
                    type: 'input',
                    listener: this.listenerValidateEmpty.bind(this)
                }
            },
            phone: {
                title: 'Телефон',
                placeholder: 'Телефон',
                inputType: 'tel',
                id: 'phone',
                listener: {
                    type: 'input',
                    listener: this.listenerValidatePhone.bind(this)
                }
            },
            mail: {
                title: 'Почта',
                placeholder: 'Почта',
                inputType: 'email',
                id: 'mail',
                listener: {
                    type: 'input',
                    listener: this.listenerValidateMail.bind(this)
                }
            },
            password: {
                title: 'Пароль',
                placeholder: 'Пароль',
                inputType: 'password',
                id: 'password',
                listener: {
                    type: 'change',
                    listener: this.listenerValidatePwd.bind(this)
                }
            },
            passwordConfirm: {
                title: 'Повторите пароль',
                placeholder: 'Пароль',
                inputType: 'password',
                id: 'passwordConfirm',
                listener: {
                    type: 'change',
                    listener: this.listenerValidateConfirmPwd.bind(this)
                }
            },
            date: {
                title: 'Дата рождения',
                placeholder: null,
                inputType: 'date',
                id: 'date',
                listener: {
                    type: 'change',
                    listener: this.listenerValidateEmpty.bind(this)
                }
            }
        };
    }

    render() {
        this.__parent.innerHTML = '';
        const listeners = this.__createListeners();
        this.__header = new Header(this.__parent, {location: 'Москва'});
        this.__header.listeners = listeners.header;
        this.__header.render();

        this.__navigation = new Navigation(this.__parent, 'Главная страница', {route: ['Регистрация профиля']});
        this.__navigation.listeners = listeners.backBtn;
        this.__navigation.render();

        const form = this.__RegistrationForm();
        this.__registrationPanel = new RegistrationPanel(this.__parent, form);
        this.__registrationPanel.listeners = listeners.registration;
        this.__registrationPanel.render();
    }
}