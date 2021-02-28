'use strict';

import {RegistrationPanel} from '../components/RegistrationPanel/RegistrationPanel.js';
import {HeaderController} from '../components/Header/HeaderController.js';
import {Header} from '../components/Header/Header.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {NavigationController} from '../components/Navigation/NavigationController.js';
import {RegistrationPanelController} from '../components/RegistrationPanel/RegistrationPanelController.js';

/***
 * @author Ivan Gorshkov
 * Registration class for registration page
 * @class Registration
 */
export class Registration {

    /***
     * @author Ivan Gorshkov
     *
     * init of class Registration
     * @param {HTMLElement} parent - parent element
     * @constructor
     * @this {Registration}
     * @public
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * @author Ivan Gorshkov
     * TMP DATA
     *
     * @return {{date: {dataAction: string, inputType: string, placeholder: null, id: string, title: string}, password: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}, mail: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}, phone: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}, passwordConfirm: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}, surname: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}, name: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}}}
     * @private
     */
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

    /***
     * @author Ivan Gorshkov
     * TMP DATA
     *
     * @return {{isAuth: boolean, location: string, avatar: string, user: string}}
     * @private
     */
    __getHeaderData() {
        return {
            isAuth: false,
            user: 'Алехин Сергей',
            avatar: '/img/test-avatar.jpg',
            location: 'Москва'
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * remove listeners
     * @this {Product}
     * @public
     */
    __removePageListeners() {
        this.__headerController.removeControllerListeners();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Registration}
     * @public
     */
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