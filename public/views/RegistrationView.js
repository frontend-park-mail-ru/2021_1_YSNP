import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout';

export class RegistrationView extends BaseView {

    constructor(app) {
        super(app);
        this.subviews = {};
        this.layout = new Layout(this.__app);
    }

    __makeContext(context) {
        this.__context = {
            registrationPanel: {
                data: context.registrationPanel.data,
                listeners: context.registrationPanel.listeners
            }
        };
    }

    insertSubview(name, view) {
        this.subviews[name] = view;
    }

    getErrorId(target) {
        return this.subviews['reg-panel'].getErrorId(target);
    }

    addErrorForm(message) {
        return this.subviews['reg-panel'].addErrorForm(message);
    }

    hideError(target) {
        this.subviews['reg-panel'].hideError(target);
    }

    openFileSystem() {
        this.subviews['reg-panel'].openFileSystem();
    }

    getForm() {
        return this.subviews['reg-panel'].getForm();
    }

    getAllFields() {
        return this.subviews['reg-panel'].getAllFields();
    }

    avatarOnLoad(ev) {
        this.subviews['reg-panel'].avatarOnLoad.call(this, ev);
    }

    addErrorAvatar() {
        this.subviews['reg-panel'].addErrorAvatar();
    }

    removeErrorAvatar() {
        this.subviews['reg-panel'].removeErrorAvatar();
    }

    errorText(val) {
        this.subviews['reg-panel'].errorText(val);
    }

    getLayoutParent() {
        return this.layout.parent;
    }

    render(context) {
        super.render();
        this.__makeContext(context);

        this.layout.render();

        for (const key in this.subviews) {
            this.subviews[key].render(this.getLayoutParent(), context.registrationPanel);
        }
    }
}