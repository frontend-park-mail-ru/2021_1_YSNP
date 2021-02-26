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
        const element1 = document.getElementById(this.__RegistrationForm().passwordConfirm.id);
        const element2 = document.getElementById(this.__RegistrationForm().phone.id);
        const element3 = document.getElementById(this.__RegistrationForm().password.id);
        const element4 = document.getElementById(this.__RegistrationForm().mail.id);
        const element5 = document.getElementById(this.__RegistrationForm().name.id);
        const element6 = document.getElementById(this.__RegistrationForm().surname.id);
        const element7 = document.getElementById(this.__RegistrationForm().date.id);
        this._phone(element2);
        this.__pas(element3);
        this.__confPas(element1);
        this.__mail(element4);
        this.__empty(element5);
        this.__empty(element6);
        this.__empty(element7);
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
        var found = phoneNumber.search(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/);
        return found > -1;
    }

    __validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    __checkPassword(inputtxt) {
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return re.test(inputtxt);
    }

    listenerPhone(ev) {
        ev.preventDefault();
        this._phone(ev.target);
    }

    _phone(target) {
        if (this.__isValidPhone(target.value)) {
            target.style.border = '0.5px solid green';
            target.parentNode.removeChild(target.nextSibling);
        } else {
            target.style.border = '0.5px solid red';
            if (document.getElementById('phoneError') === null) {
                const el = document.createElement('div');
                el.id = 'phoneError';
                el.innerHTML = `
                        <ul>
                          <li>Неверный формат телефона</li>
                        </ul>
                    `;
                this.insertAfter(target, el);
            }
        }
    }

    __pas(target) {
        if (this.__checkPassword(target.value)) {
            target.style.border = '0.5px solid green';
            target.parentNode.removeChild(target.nextSibling);
        } else {
            target.style.border = '0.5px solid red';
            if (document.getElementById('passwordError') === null) {
                const el = document.createElement('div');
                el.id = 'passwordError';
                el.innerHTML = `
                        <ul>
                          <li>От шести или более символов</li>
                          <li>Содержит хотя бы одну цифру</li>
                          <li>Хотя бы один символ нижнего регистра</li>
                          <li>Хотя бы один символ верхнего регистра</li>
                          <li>Только латинские символы</li>
                        </ul>
                    `;
                this.insertAfter(target, el);
            }
        }
    }

    listenerPassWord(ev) {
        ev.preventDefault();
        this.__pas(ev.target);
    }

    insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }


    __confPas(target) {
        const element = document.getElementById(this.__RegistrationForm().password.id);
        if (element.value === target.value && target.value !== '') {
            target.style.border = '0.5px solid green';
            target.parentNode.removeChild(target.nextSibling);
        } else {
            target.style.border = '0.5px solid red';
            if (document.getElementById('passwordConfirmError') === null) {
                const el = document.createElement('div');
                el.id = 'passwordConfirmError';
                el.innerHTML = `
                 <ul>
                     <li>Пароли не совпадают</li>
                 </ul>
`;
                this.insertAfter(target, el);
            }
        }
    }

    __mail(target) {
        if (this.__validateEmail(target.value)) {
            target.style.border = '0.5px solid green';
            target.parentNode.removeChild(target.nextSibling);
        } else {
            target.style.border = '0.5px solid red';
            if (document.getElementById('MailError') === null) {
                const el = document.createElement('div');
                el.id = 'MailError';
                el.innerHTML = `
                 <ul>
                     <li>Неправильный формат mail</li>
                 </ul>
`;
                this.insertAfter(target, el);
            }
        }
    }

    __empty(target) {
        if (target.value !== '') {
            target.style.border = '0.5px solid green';
            target.parentNode.removeChild(target.nextSibling);
        } else {
            target.style.border = '0.5px solid red';
            if (document.getElementById(`${target.id}Error`) === null) {
                const el = document.createElement('div');
                el.id = `${target.id}Error`;
                el.innerHTML = `
                 <ul>
                     <li>Поле не должно быть пустым</li>
                 </ul>
`;
                this.insertAfter(target, el);
            }
        }
    }

    listenerConfirmPassword(ev) {
        ev.preventDefault();
        this.__confPas(ev.target);
    }

    listenerMail(ev) {
        ev.preventDefault();
        if (this.__validateEmail(ev.target.value)) {
            ev.target.style.border = '0.5px solid green';
        } else {
            ev.target.style.border = '0.5px solid red';
        }
    }

    listenerName(ev) {
        ev.preventDefault();
        this.__empty(ev.target);
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
                    listener: this.listenerName.bind(this)
                }
            },
            surname: {
                title: 'Фамилия',
                placeholder: 'Фамилия',
                inputType: 'text',
                id: 'surname',
                listener: {
                    type: 'input',
                    listener: this.listenerName.bind(this)
                }
            },
            phone: {
                title: 'Телефон',
                placeholder: 'Телефон',
                inputType: 'tel',
                id: 'phone',
                listener: {
                    type: 'input',
                    listener: this.listenerPhone.bind(this)
                }
            },
            mail: {
                title: 'Почта',
                placeholder: 'Почта',
                inputType: 'email',
                id: 'mail',
                listener: {
                    type: 'input',
                    listener: this.listenerMail.bind(this)
                }
            },
            password: {
                title: 'Пароль',
                placeholder: 'Пароль',
                inputType: 'password',
                id: 'password',
                listener: {
                    type: 'change',
                    listener: this.listenerPassWord.bind(this)
                }
            },
            passwordConfirm: {
                title: 'Повторите пароль',
                placeholder: 'Пароль',
                inputType: 'password',
                id: 'passwordConfirm',
                listener: {
                    type: 'change',
                    listener: this.listenerConfirmPassword.bind(this)
                }
            },
            date: {
                title: 'Дата рождения',
                placeholder: null,
                inputType: 'date',
                id: 'date',
                listener: {
                    type: 'change',
                    listener: this.listenerName.bind(this)
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