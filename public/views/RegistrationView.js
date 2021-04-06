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

    /***
     * @author Ivan Gorshkov
     *
     * get id from target
     * @param{HTMLElement} target
     * @return {string}
     * @this {RegistrationView}
     */
    getErrorId(target) {
        return this.__regSubView.getErrorId(target);
    }

    /***
     * @author Ivan Gorshkov
     *
     * create Error for field in form
     * @param {[string]} message
     * @this {RegistrationView}
     * @return {string}
     */
    addErrorForm(message) {
        return this.__regSubView.addErrorForm(message);
    }

    /***
     * @author Ivan Gorshkov
     *
     * @param {HTMLElement} target
     * @this {RegistrationView}
     */
    hideError(target) {
        this.__regSubView.hideError(target);
    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system
     * @this {RegistrationView}
     */
    openFileSystem() {
        this.__regSubView.openFileSystem();
    }

    /***
     * @author Ivan Gorshkov
     *
     * get HTMLElement of from
     * @return {HTMLElement}
     * @this {RegistrationView}
     */
    getForm() {
        return this.__regSubView.getForm();
    }

    /***
     * @author Ivan Gorshkov
     *
     * get all fields HTMLElement
     * @return {Object}
     * @this {RegistrationView}
     * */
    getAllFields() {
        return this.__regSubView.getAllFields();
    }

    /***
     * @author Ivan Gorshkov
     *
     * call back when photo loaded
     * @param{Event} ev
     * @this {RegistrationView}
     */
    avatarOnLoad(ev) {
        this.__regSubView.avatarOnLoad.call(this, ev);
    }

    /***
     * @author Ivan Gorshkov
     *
     * add error class to avatar
     * @this {RegistrationView}
     */
    addErrorAvatar() {
        this.__regSubView.addErrorAvatar();
    }

    /***
     * @author Ivan Gorshkov
     *
     * remove error class to avatar
     * @this {RegistrationView}
     */
    removeErrorAvatar() {
        this.__regSubView.removeErrorAvatar();
    }

    /***
     * @author Ivan Gorshkov
     *
     * get error text to registration subView
     * @param{string} val
     * @this {RegistrationView}
     */
    errorText(val) {
        this.__regSubView.errorText(val);
    }

    /***
     * @author Ivan Gorshkov
     *
     * get HTMLElement of layout
     * @return {HTMLElement}
     * @this {RegistrationView}
     */
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
        this.layout = new Layout(this.__app, true);
        this.layout.render();
        this.__makeContext(context);


        this.__navSubView = new Navigation(this.getLayoutParent(), 'Главная страница', {route: ['Регистрация профиля']});
        this.__regSubView = new RegistrationPanel(this.getLayoutParent());
        this.__navSubView.render(this.__context);
        this.__regSubView.render(this.__context);
    }
}