import {BaseView} from './BaseView.js';

import {Switch} from '../components/Switch/Switch.js';
import {Layout} from '../components/Layout/Layout';
import {ProductList} from '../components/ProductList/ProductList';

/***
 * Main view
 */
export class MainView extends BaseView {
    /***
     * Class constructor
     * @param {HTMLElement} app - parent element
     */
    constructor(app) {
        super(app);
    }

    /***
     * Like product
     * @param {number} id - product id
     */
    likeProduct(id) {
        this.__productList.like(id);
    }

    /***
     * Dislike product
     * @param {number} id - product id
     */
    dislikeProduct(id) {
        this.__productList.dislike(id);
    }

    /***
     * Get view context
     * @param {Object} context - presenter context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            productList: {
                data: context.productList.data,
                listeners: context.productList.listeners
            },
            switch: {
                data: {
                    title: 'Все объявления'
                }
            }
        };
    }

    /***
     * Render view
     */
    render(context) {
        super.render();
        this.__makeContext(context);

        const layout = new Layout(this.__app);
        layout.render();
        const parent = layout.parent;

        const adSwitch = new Switch(parent);
        adSwitch.render(this.__context.switch);

        this.__productList = new ProductList(parent);
        this.__productList.render(this.__context.productList);
    }
}