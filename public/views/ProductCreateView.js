import {BaseView} from './BaseView.js';

import {Navigation} from '../components/Navigation/Navigation.js';
import {Layout} from '../components/Layout/Layout.js';
import {ProductCreateForm} from '../components/ProductCreateForm/ProductCreateForm.js';

import {router} from '../modules/router';
import {mobile} from '../modules/mobile';

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
        this.__baseProductCreate = baseProductCreate;
    }

    /***
     * @author Ivan Gorshkov
     *
     * remove listeners from components
     * @this {ProductCreateView}
     */
    removingSubViews() {
        if (this.__navSubView) {
            this.__navSubView.removeListeners();
        }

        if (this.__productCreate) {
            this.__productCreate.removeListeners();
        }
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
     * hide error
     * @param {string} target
     * @this {ProductCreateView}
     */
    hideError(target) {
        this.__productCreate.hideError(target);
    }

    /***
     * @author Ivan Gorshkov
     *
     * get HTMLElement of form in view
     * @return {HTMLElement}
     * @this {ProductCreateView}
     */
    getForm() {
        return this.__productCreate.getForm();
    }

    /***
     * @author Ivan Gorshkov
     *
     * get all fields
     * @return {Object}
     * @this {ProductCreateView}
     */
    getAllFields() {
        return this.__productCreate.getAllFields();
    }

    /***
     * @author Ivan Gorshkov
     *
     * get id from target
     * @param {Object} target
     * @return {string}
     * @this {ProductCreateView}
     */
    getErrorId(target) {
        return this.__productCreate.getErrorId(target);
    }

    /***
     * @author Ivan Gorshkov
     *
     * add Error to Field
     * @param {[string]} message
     * @return {string}
     * @this {ProductCreateView}
     */
    addErrorForm(message) {
        return this.__productCreate.addErrorForm(message);
    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system
     * @param {HTMLElement} target
     * @this {ProductCreateView}
     */
    openFileSystem(target) {
        this.__productCreate.openFileSystem(target);
    }

    /***
     * @author Ivan Gorshkov
     *
     * show cross when move in
     * @param {EventTarget} target
     * @this {ProductCreateView}
     */
    showCross(target) {
        this.__productCreate.showCross(target);
    }

    /***
     * @author Ivan Gorshkov
     *
     * hide cross when move out
     * @param {EventTarget} target
     * @this {ProductCreateView}
     */
    hideCross(target) {
        this.__productCreate.hideCross(target);
    }

    /***
     * @author Ivan Gorshkov
     *
     * delete selected picture
     * @param {HTMLElement} target
     * @param {number} handler
     * @return {Function}
     * @this {ProductCreateView}
     */
    deletePicture(target, handler) {
        return this.__productCreate.deletePicture(target, handler);
    }

    /***
     * @author Ivan Gorshkov
     *
     * callback after photo has been loaded
     * @param {HTMLElement} input
     * @param {number} count
     * @param {Function} incFunc
     * @param {Event} e
     * @this {ProductCreateView}
     */
    onReaderLoad(input, count, incFunc, e) {
        this.__productCreate.onReaderLoad.call(this, input, e, count, incFunc);
    }

    /***
     * @author Ivan Gorshkov
     *
     * change title of button and disable
     * @param {string} title
     * @this {ProductCreateView}
     */
    changeDisableButton(title = 'Загрузка...') {
        this.__productCreate.changeDisableButton(title);
    }

    /***
     * get class of cross element
     */
    getCrossClass() {
        return this.__productCreate.getCrossClass();
    }

    /***
     * make enable btn
     * @param{string} title
     */
    changeEnableButton(title = 'Загрузка...') {
        this.__productCreate.changeEnableButton(title);
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Новое объявление';
    }

    /***
     * get address from product create
     * @return {string}
     */
    getAddress() {
        return this.__productCreate.getAddress();
    }

    /***
     * get position from product create
     * @return {{latitude: number, longitude: number}}
     */
    getPos() {
        return this.__productCreate.getPos();
    }

    /***
     * output global errors
     * @param{string} message
     */
    errorText(message) {
        this.__productCreate.errorText(message);
    }

    /***
     * @author Ivan Gorshkov
     *
     * render with context
     * @param{Object} context
     * @this {ProductCreateView}
     */
    render(context) {
        this.__makeContext(context);
        super.render();

        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        if (!mobile.isMobile()) {
            this.__navSubView = new Navigation(parent, router.getPreviousTitle(), {route: ['Создание товара']});
            this.__navSubView.render(this.__context);
        }

        this.__productCreate = new ProductCreateForm(parent);
        this.__productCreate.render(this.__context.productCreate);

        super.renderFooter();
    }
}