import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout';
import {Navigation} from '../components/Navigation/Navigation';
import {Switch} from '../components/Switch/Switch';
import {SearchBar} from '../components/Search/SearchBar.js';

export class SearchView extends BaseView {
    constructor(app) {
        super(app);
    }

    /***
     * @author Ivan Gorshkov
     *
     * get HTMLElement of layout
     * @return {HTMLElement}
     * @this {SearchView}
     */
    getLayoutParent() {
        return this.layout.parent;
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
            productList: {
                data: context.productList.data,
                listeners: context.productList.listeners
            },
            navigation: {
                data: context.navigation.data,
                listeners: context.navigation.listeners
            },
            search: {
                data: context.search.data,
                listeners: context.search.listeners
            },
            switch: {
                data: {
                    title: 'Все категории'
                }
            }
        };
    }

    removingSubViews() {
        this.__searchBar.removeListeners();
        this.__navSubView.removeListeners();
    }


    rerenderProductList(ctx) {
        this.__makeContext(ctx);
        this.__searchBar.rerenderProductList(this.__context);
    }

    getAllFields() {
        return this.__searchBar.getAllFields();
    }

    render(context) {
        super.render();
        this.layout = new Layout(this.__app, true);
        this.layout.render();
        this.__makeContext(context);

        this.__navSubView = new Navigation(this.getLayoutParent(), 'Главная страница', {route: ['Регистрация профиля']});
        this.__navSubView.render(context);

        const adSwitch = new Switch(this.getLayoutParent());
        adSwitch.render(this.__context.switch);

        this.__searchBar = new SearchBar(this.getLayoutParent());
        this.__searchBar.render(this.__context);

    }
}