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
                dataAction: 'inputEmpty',
                params: ''
            },
            surname: {
                title: 'Фамилия*',
                placeholder: 'Фамилия',
                inputType: 'text',
                id: 'surname',
                dataAction: 'inputEmpty',
                params: ''
            },
            phone: {
                title: 'Телефон*',
                placeholder: 'Телефон',
                inputType: 'tel',
                id: 'phone',
                dataAction: 'inputPhone',
                params: ''
            },
            mail: {
                title: 'Почта*',
                placeholder: 'Почта',
                inputType: 'email',
                id: 'mail',
                dataAction: 'inputMail',
                params: ''
            },
            password: {
                title: 'Пароль*',
                placeholder: 'Пароль',
                inputType: 'password',
                id: 'password',
                dataAction: 'changePwd',
                params: ''
            },
            passwordConfirm: {
                title: 'Повторите пароль*',
                placeholder: 'Пароль',
                inputType: 'password',
                id: 'passwordConfirm',
                dataAction: 'inputConfirmPwd',
                params: ''
            },
            date: {
                title: 'Дата рождения*',
                placeholder: 'дд-мм-гггг',
                inputType: 'date',
                id: 'date',
                dataAction: 'inputEmpty',
                params: 'min="1890-01-01"'
            }
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
    async render() {
        this.__parent.innerHTML = '';

        this.__header = new Header(this.__parent);
        this.__headerController = new HeaderController(this.__removePageListeners.bind(this), this.__parent, this.__header);
        await this.__headerController.control();

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