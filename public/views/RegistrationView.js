import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout';
import {RegistrationPanel} from '../components/RegistrationPanel/RegistrationPanel';
import {Navigation} from '../components/Navigation/Navigation';

export class RegistrationView extends BaseView {
    constructor(app) {
        super(app);
    }

    __makeContext(context) {
        this.__context = {
            registrationPanel: {
                data: context.registrationPanel.data,
                listeners: context.registrationPanel.listeners
            }
        };
    }

    getErrorId(target) {
        return this.__registrationPanel.getErrorId(target);
    }

    addErrorForm(message) {
        return this.__registrationPanel.addErrorForm(message);
    }

    hideError(target) {
        this.__registrationPanel.hideError(target);
    }

    openFileSystem() {
        this.__registrationPanel.openFileSystem();
    }

    getPasswords() {
        return this.__registrationPanel.getPasswords();
    }

    getForm() {
        return this.__registrationPanel.getForm();
    }

    getAllFields() {
        return this.__registrationPanel.getAllFields();
    }

    avatarOnLoad(ev) {
        this.__registrationPanel.avatarOnLoad.apply(ev);
    }

    render(context) {
        super.render();
        this.__makeContext(context);

        const layout = new Layout(this.__app);
        layout.render();
        const parent = layout.parent;
        this.__navigation = new Navigation(parent, 'Главная страница', {route: ['Регистрация профиля']});
        this.__navigation.render();

        this.__registrationPanel = new RegistrationPanel(parent, this.__context.registrationPanel);
        this.__registrationPanel.render();
    }
}