import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu';
import {AwaitReviewList} from '../components/AwaitReviewList/AwaitReviewList';
import {ReviewUser} from '../components/ReviewProduct/ReviewUser/ReviewUser';

import {mobile} from '../modules/mobile';

/***
 * Await review user
 */
export class UserAwaitReviewView extends BaseView {
    /***
     * Make view context
     * @param {Object} context - view context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            sellerAwaitReview: {
                data: {
                    type: 'seller',
                    list: context.sellerAwaitReview.data.list
                },
                listeners: context.sellerAwaitReview.listeners
            },
            buyerAwaitReview: {
                data: {
                    type: 'buyer',
                    list: context.buyerAwaitReview.data.list
                },
                listeners: context.buyerAwaitReview.listeners
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
        document.title = 'Ожидает отзыв';
    }

    /***
     * Get seller scroll
     * @returns {HTMLElement}
     */
    getSellerScroll() {
        return this.__awaitReviewListSeller.getAwaitReviewListScroll();
    }

    /***
     * Get buyer scroll
     * @returns {HTMLElement}
     */
    getBuyerScroll() {
        return this.__awaitReviewListBuyer.getAwaitReviewListScroll();
    }

    /***
     * Add seller new data
     * @param {Object} data - new await review list
     */
    addSellerNewAwaitReview(data) {
        this.__awaitReviewListSeller.addNewAwaitReview(data);
    }

    /***
     * Add buyer new data
     * @param {Object} data - new await review list
     */
    addBuyerNewAwaitReview(data) {
        this.__awaitReviewListBuyer.addNewAwaitReview(data);
    }

    /***
     * Render review user component
     * @param context
     */
    renderReviewUser(context) {
        this.__reviewUser = new ReviewUser(this.__app);
        this.__reviewUser.render(context);
    }

    /***
     * Set review user error
     * @param {string} msg - message
     */
    reviewUserError(msg) {
        this.__reviewUser.setReviewError(msg);
    }

    /***
     * Get review user text
     * @returns {string}
     */
    reviewUserText() {
        return this.__reviewUser.getReviewText();
    }

    /***
     * Get review user star
     * @returns {number}
     */
    reviewUserStar() {
        return this.__reviewUser.getReviewStar();
    }

    /***
     * Remove review user component
     */
    removeReviewUser() {
        this.__reviewUser.remove();
        this.__reviewUser = undefined;
    }

    /***
     * Render mobile components
     * @private
     */
    __renderMobile() {
        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        this.__awaitReviewListSeller = new AwaitReviewList(parent);
        this.__awaitReviewListSeller.render(this.__context.sellerAwaitReview);

        this.__awaitReviewListBuyer = new AwaitReviewList(parent);
        this.__awaitReviewListBuyer.render(this.__context.buyerAwaitReview);
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

        const profileMenu = new ProfileMenu(left, {page: 'review-await'});
        profileMenu.render(this.__context.profileSettings);

        this.__awaitReviewListSeller = new AwaitReviewList(right);
        this.__awaitReviewListSeller.render(this.__context.sellerAwaitReview);

        this.__awaitReviewListBuyer = new AwaitReviewList(right);
        this.__awaitReviewListBuyer.render(this.__context.buyerAwaitReview);
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