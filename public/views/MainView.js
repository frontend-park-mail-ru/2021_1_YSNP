import {BaseView} from './BaseView.js';

import {SearchBox} from '../components/SearchBox/SearchBox.js';
import {Layout} from '../components/Layout/Layout.js';
import {ProductTable} from '../components/ProductTable/ProductTable.js';

/***
 * Main view
 */
export class MainView extends BaseView {
    /***
     * Like product
     * @param {number} id - product id
     */
    likeProduct(id) {
        this.__mainList.like(id);
        this.__trendsList.like(id);
    }

    /***
     * Dislike product
     * @param {number} id - product id
     */
    dislikeProduct(id) {
        this.__mainList.dislike(id);
        this.__trendsList.dislike(id);
    }

    /***
     * Add new cards to view
     * @param {Object[]} context - new cards
     */
    addNewCards(context) {
        this.__mainList.addNewCards(context);
    }

    /***
     * Get view context
     * @param {Object} context - presenter context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            mainList: {
                title: 'Все объявления',
                text: 'Товары закончились',
                id: 'main',
                data: context.mainList.data,
                listeners: context.mainList.listeners
            },
            trendsList: {
                title: 'Рекомендации',
                text: 'Пока нет новых рекомендаций',
                id: 'trends',
                data: context.recList.data,
                listeners: context.recList.listeners
            },
            search: {
                data: context.search.data,
                listeners: context.search.listeners
            }
        };
    }

    /***
     *
     * @return {string}
     */
    getTextFromSearch() {
        return this.__searchBox.getTextFromSearch();
    }

    /***
     * get category from subcategory
     * @param{HTMLElement} element
     * @return {string}
     */
    getCategory(element) {
        return this.__searchBox.getCategory(element);
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Koya';
    }

    /***
     * Render view
     * @param {Object} context - view context
     */
    render(context) {
        this.__makeContext(context);
        super.render();
        this.removeBackButton();

        this.__searchBox = new SearchBox(this.__app);
        this.__searchBox.render(this.__context.search);

        const layout = new Layout(this.__app);
        layout.render();

        const parent = layout.parent;

        this.__trendsList = new ProductTable(parent);
        this.__trendsList.render(this.__context.trendsList);

        this.__mainList = new ProductTable(parent);
        this.__mainList.render(this.__context.mainList);

        super.renderFooter();
    }
}