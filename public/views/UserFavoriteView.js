import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {ProductTable} from '../components/ProductTable/ProductTable.js';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu.js';

import {mobile} from '../modules/mobile';

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
     * Get view context
     * @param {Object} context - presenter context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            favoriteList: {
                title: 'Избранное',
                text: 'В избранном пусто',
                id: 'fav',
                data: context.favoriteList.data,
                listeners: context.favoriteList.listeners
            },
            profileSettings: {
                data: context.profileSettings.data
            }
        };
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Избранное';
    }

    /***
     * Render mobile components
     * @private
     */
    __renderMobile() {
        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        this.__favoriteList = new ProductTable(parent);
        this.__favoriteList.render(this.__context.favoriteList);
    }

    /***
     * Render desktop components
     * @private
     */
    __renderDesktop() {
        const layout = new Layout(this.__app, true);
        layout.render({layoutCount: 'two'});

        const left = layout.leftParent;
        const right = layout.rightParent;

        const profileMenu = new ProfileMenu(left, {page: 'favorites'});
        profileMenu.render(this.__context.profileSettings);

        this.__favoriteList = new ProductTable(right);
        this.__favoriteList.render(this.__context.favoriteList);
    }

    /***
     * Render view
     * @param {Object} context - view context
     */
    render(context) {
        this.__makeContext(context);
        super.render();

        if (mobile.isMobile()) {
            this.__renderMobile();
        } else {
            this.__renderDesktop();
        }

        super.renderFooter();
    }
}