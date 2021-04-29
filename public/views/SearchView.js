import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout';
import {Navigation} from '../components/Navigation/Navigation';
import {SearchBar} from '../components/SearchBar/SearchBar.js';

import {router} from '../modules/router';
import {isMobile} from '../modules/mobile';

/***
 *  SearchView
 */
export class SearchView extends BaseView {
    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Поиск';
    }

    /***
     * Like product
     * @param {number} id - product id
     */
    likeProduct(id) {
        this.__searchBar.likeProduct(id);
    }

    /***
     * Add new cards to view
     * @param {Object[]} context - new cards
     */
    addNewCards(context) {
        this.__searchBar.addNewCards(context);
    }

    /***
     * Dislike product
     * @param {number} id - product id
     */
    dislikeProduct(id) {
        this.__searchBar.dislikeProduct(id);
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
                    title: 'Поиск объявлений'
                }
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * removing subviews
     * @this {SearchView}
     */
    removingSubViews() {
        this.__searchBar.removeListeners();
        this.__navSubView.removeListeners();
    }

    /***
     * @author Ivan Gorshkov
     *
     * rerender only product list with context
     * @param {Object} ctx - product list context
     * @this {SearchView}
     */
    rerenderProductList(ctx) {
        this.__makeContext(ctx);
        this.__searchBar.rerenderProductList(this.__context);
    }

    /***
     * Delete product list
     */
    deleteProductList() {
        this.__searchBar.deleteProductList();
    }

    /***
     * @author Ivan Gorshkov
     *
     * get all fields of search
     * @return {Object}
     * @this {SearchView}
     */
    getAllFields() {
        return this.__searchBar.getAllFields();
    }

    /***
     * @author Ivan Gorshkov
     *
     * render with context
     * @param {Object} context
     * @this {SearchView}
     */
    async render(context) {
        super.render();
        this.layout = new Layout(this.__app, true);
        this.layout.render();
        this.__makeContext(context);

        if (!isMobile()) {
            this.__navSubView = new Navigation(this.getLayoutParent(), router.getPreviousTitle(), {route: ['Поиск объявлений']});
            this.__navSubView.render(context);
        }

        this.__searchBar = new SearchBar(this.getLayoutParent());
        this.__searchBar.render(this.__context);

        super.renderFooter();
    }
}