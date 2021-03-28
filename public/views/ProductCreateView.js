import {BaseView} from './BaseView.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {Layout} from '../components/Layout/Layout.js';
import {ProductCreateForm} from '../components/ProductCreateForm/ProductCreateForm.js';

export class ProductCreateView extends BaseView {
    constructor(app, baseProductCreate) {
        super(app);
        this.layout = new Layout(this.__app);
        this.__baseProductCreate = baseProductCreate;
    }

    removingSubViews() {
        this.__navSubView.removeListeners();
        this.__productCreate.removeListeners();
    }

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

    onReaderLoad(input, count, e) {
        this.__productCreate.onReaderLoad.call(this, input, e, count);
    }


    changeDisableButton(title = 'Загрузка...') {
        this.__productCreate.changeDisableButton(title);
    }

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