import reviewsBlockTemplate from './ReviewsBlock.hbs';
import './ReviewsBlock.scss';

import {OneReview} from './OneReview/OneReview';

import {sentryManager} from '../../modules/sentry';
import {EmptyReviews} from './EmptyReviews/EmptyReviews';

/***
 * Profile menu
 */
export class ReviewsBlock {
    /***
     * Class constructor
     * @param {Element} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;

        this.__reviewList = new Map();
    }

    __getReviewsBlock() {
        return document.getElementById(`reviews-${this.__context.data.type}`);
    }

    __getReviewsBlockBody() {
        return document.getElementById(`reviews-${this.__context.data.type}-body`);
    }

    getReviewsBlockScroll() {
        return document.getElementById(`reviews-${this.__context.data.type}-scroll`);
    }

    /***
     * Add component listeners
     * @this {Settings}
     */
    __addListeners() {
        this.__getReviewsBlock()
            .addEventListener(this.__context.listeners.reviewsClick.type, this.__context.listeners.reviewsClick.listener);
    }

    /***
     * Remove component listeners
     * @this {Settings}
     */
    removeListeners() {
        this.__getReviewsBlock()
            .removeEventListener(this.__context.listeners.reviewsClick.type, this.__context.listeners.reviewsClick.listener);
    }

    __addOneReview(data) {
        const oneReview = new OneReview(this.__getReviewsBlockBody());
        oneReview.render(data);
    }

    __addReviews() {
        this.__context.data.list.forEach((el) => {
            this.__addOneReview(el);
        });
    }

    addNewReviews(data) {
        this.__addReviews(data);
    }

    __renderEmptyReviews() {
        const emptyReviews = new EmptyReviews(this.__getReviewsBlockBody());
        emptyReviews.render();
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', reviewsBlockTemplate(this.__context.data));

            if (this.__context.data.list.length === 0) {
                this.__renderEmptyReviews();
                return;
            }

            this.__addListeners();
            this.__addReviews();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}