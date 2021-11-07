import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout';
import {Navigation} from '../components/Navigation/Navigation';
import {SearchBar} from '../components/SearchBar/SearchBar.js';

import {router} from '../modules/router';
import {mobile} from '../modules/mobile';

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
     * make new context from context presenter and view
     * @param{Object} context - context from Presenter
     * @private
     */
    __makeContext(context) {
        this.__context = {
            productList: {
                data: context.productList.data,
                id: 'search',
                sortType: sessionStorage.getItem('sort'),
                listeners: context.productList.listeners
            },
            navigation: {
                data: context.navigation.data,
                listeners: context.navigation.listeners
            },
            search: {
                data: context.search.data,
                listeners: context.search.listeners
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
        this.__makeContext(context);
        super.render();

        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        if (!mobile.isMobile()) {
            this.__navSubView = new Navigation(parent, router.getPreviousTitle(), {route: ['Поиск объявлений']});
            this.__navSubView.render(context);
        }

        this.__searchBar = new SearchBar(parent);
        this.__searchBar.render(this.__context);

        super.renderFooter();
    }
}