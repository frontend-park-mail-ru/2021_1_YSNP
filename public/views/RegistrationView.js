import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {RegistrationPanel} from '../components/RegistrationPanel/RegistrationPanel.js';

/***
 * class RegistrationView extends BaseView
 */
export class RegistrationView extends BaseView {

    /***
     * @author Ivan Gorshkov
     *
     * Class constructor
     * @param {HTMLElement} app - parent element
     * @param {Object} baseRegistration - list of fields
     * @this {RegistrationView}
     */
    constructor(app, baseRegistration) {
        super(app);
        this.layout = new Layout(this.__app);
        this.__baseRegistration = baseRegistration;
    }

    /***
     * @author Ivan Gorshkov
     *
     * make new context from context presenter and view
     * @param{Object} context - context from Presenter
     * @private
     */
    __makeContext(context) {
        this.__context = {
            navigation: {
                data: context.navigation.data,
                listeners: context.navigation.listeners
            },
            registrationPanel: {
                data: context.registrationPanel.data,
                listeners: context.registrationPanel.listeners,
                fields: this.__baseRegistration
            }
        };
    }

    getErrorId(target) {
        return this.__regSubView.getErrorId(target);
    }

    addErrorForm(message) {
        return this.__regSubView.addErrorForm(message);
    }

    hideError(target) {
        this.__regSubView.hideError(target);
    }

    openFileSystem() {
        this.__regSubView.openFileSystem();
    }

    getForm() {
        return this.__regSubView.getForm();
    }

    getAllFields() {
        return this.__regSubView.getAllFields();
    }

    avatarOnLoad(ev) {
        this.__regSubView.avatarOnLoad.call(this, ev);
    }

    addErrorAvatar() {
        this.__regSubView.addErrorAvatar();
    }

    removeErrorAvatar() {
        this.__regSubView.removeErrorAvatar();
    }

    errorText(val) {
        this.__regSubView.errorText(val);
    }

    getLayoutParent() {
        return this.layout.parent;
    }

    /***
     * @author Ivan Gorshkov
     *
     * remove listeners from components
     * @this {RegistrationView}
     */
    removingSubViews() {
        this.__navSubView.removeListeners();
        this.__regSubView.removeListeners();
    }

    /***
     * @author Ivan Gorshkov
     *
     * render with context
     * @param{Object} context
     * @this {RegistrationView}
     */
    render(context) {
        super.render();
        this.layout.render();
        this.__makeContext(context);


        this.__navSubView = new Navigation(this.getLayoutParent(), 'Главная страница', {route: ['Регистрация профиля']});
        this.__regSubView = new RegistrationPanel(this.getLayoutParent());
        this.__navSubView.render(this.__context);
        this.__regSubView.render(this.__context);
    }
}