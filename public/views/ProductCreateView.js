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

    render(context) {
        console.log(context);
        super.render();
        this.layout.render();
        this.__makeContext(context);
       this.__navSubView = new Navigation(this.getLayoutParent(), 'Главная страница', {route: ['Регистрация профиля']});
       this.__navSubView.render(this.__context);
       this.__productCreate = new ProductCreateForm(this.getLayoutParent());
       this.__productCreate.render(this.__context);
    }
}