import {BaseView} from './BaseView.js';
import {SearchBox} from '../components/Search/SearchBox.js';
import {Switch} from '../components/Switch/Switch.js';
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
    }

    /***
     * Dislike product
     * @param {number} id - product id
     */
    dislikeProduct(id) {
        this.__mainList.dislike(id);
    }

    /***
     * Add new cards to view
     * @param {Object[]} context - new cards
     */
    addNewCards(context) {
        this.__mainList.addNewCards(context);
    }

    /***
     * Remove product list listeners
     */
    removeProductListListeners() {
        this.__mainList.removeListeners();
    }

    /***
     * Get view context
     * @param {Object} context - presenter context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            mainList: {
                data: context.mainList.data,
                listeners: context.mainList.listeners
            },
            search: {
                data: context.search.data,
                listeners: context.search.listeners
            },
            switch: {
                data: {
                    title: 'Все объявления'
                }
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
     * Render view
     * @param {Object} context - view context
     */
    render(context) {
        super.render();
        this.__makeContext(context);


        this.__searchBox = new SearchBox(this.__app);
        this.__searchBox.render(this.__context.search);

        const layout = new Layout(this.__app, true);
        layout.render();
        const parent = layout.parent;

        const adSwitch = new Switch(parent);
        adSwitch.render(this.__context.switch);
        this.__mainList = new ProductTable(parent);
        this.__mainList.render(this.__context.mainList);


    }
}