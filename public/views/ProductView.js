import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {Board} from '../components/Board/Board.js';

export class ProductView extends BaseView {
    constructor(app) {
        super(app);
        this.layout = new Layout(this.__app);
    }

    __makeContext(context) {
        this.__context = {
            navigation: {
                data: context.navigation.data,
                listeners: context.navigation.listeners
            },
            product: {
                data: context.product.data,
                listeners: context.product.listeners
            }
        };
    }

    removingSubViews() {

    }

    getLayoutParent() {
        return this.layout.parent;
    }

    render(context) {
        super.render();
        this.layout.render();
        this.__makeContext(context);
        this.__navSubView = new Navigation(this.getLayoutParent(), 'Главная страница', {route: [this.__context.product.data.category, this.__context.product.data.name]});
        this.__navSubView.render(this.__context);
        this.__boardSubView = new Board(this.getLayoutParent());
        this.__boardSubView.render(this.__context);
    }
}