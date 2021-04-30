import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {InfoText} from '../components/InfoText/InfoText';
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

    __renderFavorite(parent) {
        if (this.__context.favoriteList.data.length === 0) {
            (new InfoText(parent)).render({
                title: 'Избранное',
                text: 'В избранном пусто'
            });

            return;

        }

        this.__favoriteList = new ProductTable(parent);
        this.__favoriteList.render(this.__context.favoriteList);
    }

    __renderMobile() {
        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        this.__renderFavorite(parent);
    }

    __renderDesktop() {
        const layout = new Layout(this.__app, true);
        layout.render({layoutCount: 'two'});

        const left = layout.leftParent;
        const right = layout.rightParent;

        const profileMenu = new ProfileMenu(left, {page: 'favorites'});
        profileMenu.render(this.__context.profileSettings);

        this.__renderFavorite(right);
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