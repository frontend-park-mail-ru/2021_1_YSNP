import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu.js';
import {ReviewsBlock} from '../components/ReviewsBlock/ReviewsBlock';

import {mobile} from '../modules/mobile';

/***
 * User reviews view
 */
export class UserReviewsView extends BaseView {

    /***
     * Make context
     * @param context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            sellerReviews: {
                data: {
                    type: 'seller',
                    list: context.sellerReviews.data.list
                },
                listeners: context.sellerReviews.listeners
            },
            buyerReviews: {
                data: {
                    type: 'buyer',
                    list: context.buyerReviews.data.list
                },
                listeners: context.buyerReviews.listeners
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
        document.title = 'Отзывы';
    }

    /***
     * Get seller scroll
     * @returns {HTMLElement}
     */
    getSellerScroll() {
        return this.__sellerReviews.getReviewsBlockScroll();
    }

    /***
     * Add seller new reviews
     * @param {Object[]} data - reviews data
     */
    addSellerNewReviews(data) {
        this.__sellerReviews.addNewReviews(data);
    }

    /***
     * Toggle review content
     * @param {number} id - review id
     */
    toggleSellerReviewContent(id) {
        this.__sellerReviews.toggleReviewContent(id);
    }

    /***
     * Rerender seller reviews
     * @param {Object[]} context - seller review list
     */
    rerenderSellerReviews(context) {
        this.__sellerReviews.rerenderReviews(context);
    }

    /***
     * Get buyer scroll
     * @returns {HTMLElement}
     */
    getBuyerScroll() {
        return this.__buyerReviews.getReviewsBlockScroll();
    }

    /***
     * Add buyer new reviews
     * @param {Object[]} data - reviews data
     */
    addBuyerNewReviews(data) {
        this.__buyerReviews.addNewReviews(data);
    }

    /***
     * Toggle review content
     * @param {number} id - review id
     */
    toggleBuyerReviewContent(id) {
        this.__buyerReviews.toggleReviewContent(id);
    }

    /***
     * Rerender buyer reviews
     * @param {Object[]} context - buyer review list
     */
    rerenderBuyerReviews(context) {
        this.__buyerReviews.rerenderReviews(context);
    }

    /***
     * Render mobile components
     * @private
     */
    __renderMobile() {
        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        this.__sellerReviews = new ReviewsBlock(parent);
        this.__sellerReviews.render(this.__context.sellerReviews);

        this.__buyerReviews = new ReviewsBlock(parent);
        this.__buyerReviews.render(this.__context.buyerReviews);
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

        const profileMenu = new ProfileMenu(left, {page: 'comments'});
        profileMenu.render(this.__context.profileSettings);

        this.__sellerReviews = new ReviewsBlock(right);
        this.__sellerReviews.render(this.__context.sellerReviews);

        this.__buyerReviews = new ReviewsBlock(right);
        this.__buyerReviews.render(this.__context.buyerReviews);
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