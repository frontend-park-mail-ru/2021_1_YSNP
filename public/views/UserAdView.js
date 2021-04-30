import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {InfoText} from '../components/InfoText/InfoText';
import {ProductTable} from '../components/ProductTable/ProductTable.js';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu.js';
import {mobile} from '../modules/mobile';

/***
 * Favorite view
 */
export class UserAdView extends BaseView {
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
                title: 'Мои объявления',
                data: context.adList.data,
                listeners: context.adList.listeners
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
        document.title = 'Мои объявления';
    }

    __renderUserAd(parent) {
        if (this.__context.adList.data.length === 0) {
            (new InfoText(parent)).render({
                title: 'Мои объявления',
                text: 'У вас еще нет объявлений'
            });

            return;

        }

        this.__adList = new ProductTable(parent);
        this.__adList.render(this.__context.adList);
    }

    __renderMobile() {
        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        this.__renderUserAd(parent);
    }

    __renderDesktop() {
        const layout = new Layout(this.__app, true);
        layout.render({layoutCount: 'two'});

        const left = layout.leftParent;
        const right = layout.rightParent;

        const profileMenu = new ProfileMenu(left, {page: 'posts'});
        profileMenu.render(this.__context.profileSettings);

        this.__renderUserAd(right);
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