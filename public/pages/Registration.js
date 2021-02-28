'use strict';

import {RegistrationPanel} from '../components/RegistrationPanel/RegistrationPanel.js';
import {HeaderController} from '../components/Header/HeaderController.js';
import {Header} from '../components/Header/Header.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {NavigationController} from '../components/Navigation/NavigationController.js';
import {RegistrationPanelController} from '../components/RegistrationPanel/RegistrationPanelController.js';


export class Registration {
    constructor(parent) {
        this.__parent = parent;
    }

    __RegistrationForm() {
        return {
            name: {
                title: 'Имя*',
                placeholder: 'Имя',
                inputType: 'text',
                id: 'name',
                dataAction: 'inputEmpty'
            },
            surname: {
                title: 'Фамилия*',
                placeholder: 'Фамилия',
                inputType: 'text',
                id: 'surname',
                dataAction: 'inputEmpty'
            },
            phone: {
                title: 'Телефон*',
                placeholder: 'Телефон',
                inputType: 'tel',
                id: 'phone',
                dataAction: 'inputPhone'
            },
            mail: {
                title: 'Почта*',
                placeholder: 'Почта',
                inputType: 'email',
                id: 'mail',
                dataAction: 'inputMail'
            },
            password: {
                title: 'Пароль*',
                placeholder: 'Пароль',
                inputType: 'password',
                id: 'password',
                dataAction: 'changePwd'
            },
            passwordConfirm: {
                title: 'Повторите пароль*',
                placeholder: 'Пароль',
                inputType: 'password',
                id: 'passwordConfirm',
                dataAction: 'inputConfirmPwd'
            },
            date: {
                title: 'Дата рождения*',
                placeholder: null,
                inputType: 'date',
                id: 'date',
                dataAction: 'inputEmpty'
            }
        };
    }


    __getHeaderData() {
        return {
            isAuth: false,
            user: 'Алехин Сергей',
            avatar: '/img/test-avatar.jpg',
            location: 'Москва'
        };
    }

    __removePageListeners() {
        this.__headerController.removeControllerListeners();
    }

    render() {
        this.__parent.innerHTML = '';

        this.__header = new Header(this.__parent, this.__getHeaderData());
        this.__header.render();
        this.__headerController = new HeaderController(this.__removePageListeners.bind(this), this.__parent, this.__header);
        this.__headerController.control();

        this.__navigation = new Navigation(this.__parent, 'Главная страница', {route: ['Регистрация профиля']});
        this.__navigation.render();
        this.__navigationController = new NavigationController(this.__removePageListeners.bind(this), this.__parent, this.__navigation);
        this.__navigationController.control();


        const form = this.__RegistrationForm();

        this.__registrationPanel = new RegistrationPanel(this.__parent, form);
        this.__registrationPanel.render();
        this.__registrationPanelController = new RegistrationPanelController(this.__parent, this.__registrationPanel);
        this.__registrationPanelController.control();
    }
}