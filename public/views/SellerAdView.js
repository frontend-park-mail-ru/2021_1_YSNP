import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {ProductTable} from '../components/ProductTable/ProductTable.js';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu.js';

/***
 * Favorite view
 */
export class SellerAdView extends BaseView {
    /***
     * Like product
     * @param {number} id - product id
     */
    likeProduct(id) {
        this.__adList.like(id);
    }

    /***
     * Dislike product
     * @param {number} id - product id
     */
    dislikeProduct(id) {
        this.__adList.dislike(id);
    }

    /***
     * Add new cards to view
     * @param {Object[]} context - new cards
     */
    addNewCards(context) {
        this.__adList.addNewCards(context);
    }

    /***
     * Get view context
     * @param {Object} context - presenter context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            adList: {
                title: 'Все объявления',
                text: 'У пользователя еще нет объявлений',
                id: 'ad',
                data: context.adList.data,
                listeners: context.adList.listeners
            },
            profileSettings: {
                data: context.profileSettings.data,
                owner: context.profileSettings.owner
            }
        };
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Все объявления';
    }

    /***
     * Render view
     * @param {Object} context - view context
     */
    render(context) {
        this.__makeContext(context);
        super.render();

        const layout = new Layout(this.__app, true);
        layout.render({layoutCount: 'two'});

        const left = layout.leftParent;
        const right = layout.rightParent;

        const profileMenu = new ProfileMenu(left, {page: 'landing'});
        profileMenu.render(this.__context.profileSettings);

        this.__adList = new ProductTable(right);
        this.__adList.render(this.__context.adList);

        super.renderFooter();
    }
}