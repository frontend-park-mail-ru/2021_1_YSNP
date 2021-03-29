import {BaseView} from './BaseView.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {Layout} from '../components/Layout/Layout.js';
import {ProductCreateForm} from '../components/ProductCreateForm/ProductCreateForm.js';

/***
 * class ProductCreateView extends BaseView
 */
export class ProductCreateView extends BaseView {

    /***
     * @author Ivan Gorshkov
     *
     * Class constructor
     * @param {HTMLElement} app - parent element
     * @param {Object} baseProductCreate - list of fields
     * @this {ProductCreateView}
     */
    constructor(app, baseProductCreate) {
        super(app);
        this.layout = new Layout(this.__app);
        this.__baseProductCreate = baseProductCreate;
    }

    /***
     * @author Ivan Gorshkov
     *
     * remove listeners from components
     * @this {ProductCreateView}
     */
    removingSubViews() {
        this.__navSubView.removeListeners();
        this.__productCreate.removeListeners();
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
            productCreate: {
                data: context.productCreate.data,
                listeners: context.productCreate.listeners,
                fields: this.__baseProductCreate
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * get HTMLElement of layout
     * @return {HTMLElement}
     * @this {ProductCreateView}
     */
    getLayoutParent() {
        return this.layout.parent;
    }

    hideError(target) {
        this.__productCreate.hideError(target);
    }

    getForm() {
        return this.__productCreate.getForm();
    }

    getAllFields() {
        return this.__productCreate.getAllFields();
    }

    getErrorId(target) {
        return this.__productCreate.getErrorId(target);
    }

    addErrorForm(message) {
        return this.__productCreate.addErrorForm(message);
    }

    openFileSystem(target) {
        this.__productCreate.openFileSystem(target);
    }

    showCross(target) {
        this.__productCreate.showCross(target);
    }

    hideCross(target) {
        this.__productCreate.hideCross(target);
    }

    deletePicture(target, handler) {
        return this.__productCreate.deletePicture(target, handler);
    }

    onReaderLoad(input, count, incFunc, e) {
        this.__productCreate.onReaderLoad.call(this, input, e, count, incFunc);
    }


    changeDisableButton(title = 'Загрузка...') {
        this.__productCreate.changeDisableButton(title);
    }

    /***
     * @author Ivan Gorshkov
     *
     * render with context
     * @param{Object} context
     * @this {ProductCreateView}
     */
    render(context) {
        super.render();
        this.layout.render();
        this.__makeContext(context);
        this.__navSubView = new Navigation(this.getLayoutParent(), 'Главная страница', {route: ['Регистрация профиля']});
        this.__navSubView.render(this.__context);
        this.__productCreate = new ProductCreateForm(this.getLayoutParent());
        this.__productCreate.render(this.__context);
    }
}