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

    getErrorId(target, name) {
        return this.subviews[name].getErrorId(target);
    }

    addErrorForm(message, name) {
        return this.subviews[name].addErrorForm(message);
    }

    hideError(target, name) {
        this.subviews[name].hideError(target);
    }

    openFileSystem(name) {
        this.subviews[name].openFileSystem();
    }

    getForm(name) {
        return this.subviews[name].getForm();
    }

    getAllFields(name) {
        return this.subviews[name].getAllFields();
    }

    avatarOnLoad(name, ev) {
        this.subviews[name].avatarOnLoad.call(this, ev);
    }

    addErrorAvatar(name) {
        this.subviews[name].addErrorAvatar();
    }

    removeErrorAvatar(name) {
        this.subviews[name].removeErrorAvatar();
    }

    errorText(val, name) {
        this.subviews[name].errorText(val);
    }

    getLayoutParent() {
        return this.layout.parent;
    }

    removingSubViews() {
        for (const key in this.subviews) {
            this.subviews[key].removeListeners();
        }
    }

    render(context) {
        super.render();
        this.__makeContext(context);

        this.layout.render();

        for (const key in this.subviews) {
            this.subviews[key].render(this.getLayoutParent(), context);
        }
    }
}