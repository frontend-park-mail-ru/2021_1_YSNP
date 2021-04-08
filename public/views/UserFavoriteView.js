import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {Switch} from '../components/Switch/Switch.js';
import {ProductTable} from '../components/ProductTable/ProductTable.js';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu.js';

/***
 * Favorite view
 */
export class UserFavoriteView extends BaseView {
    /***
     * Like product
     * @param {number} id - product id
     */
    likeProduct(id) {
        this.__favoriteList.like(id);
    }

    /***
     * Dislike product
     * @param {number} id - product id
     */
    dislikeProduct(id) {
        this.__favoriteList.dislike(id);
    }

    /***
     * Add new cards to view
     * @param {Object[]} context - new cards
     */
    addNewCards(context) {
        this.__favoriteList.addNewCards(context);
    }

    /***
     * Remove product list listeners
     */
    removeProductListListeners() {
        this.__favoriteList.removeListeners();
    }

    /***
     * Get view context
     * @param {Object} context - presenter context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            favoriteList: {
                data: context.favoriteList.data,
                listeners: context.favoriteList.listeners
            },
            profileSettings: {
                data: context.profileSettings.data
            },
            switch: {
                data: {
                    title: 'Избранное'
                }
            }
        };
    }

    /***
     * Render view
     * @param {Object} context - view context
     */
    render(context) {
        super.render();
        this.__makeContext(context);

        const layout = new Layout(this.__app, true);
        layout.render({layoutCount: 'two'});
        const left = layout.leftParent;
        const right = layout.rightParent;

        const profileMenu = new ProfileMenu(left, {page: 'favorites'});
        profileMenu.render(this.__context.profileSettings);

        const adSwitch = new Switch(right);
        adSwitch.render(this.__context.switch);

        this.__favoriteList = new ProductTable(right);
        this.__favoriteList.render(this.__context.favoriteList);
    }
}