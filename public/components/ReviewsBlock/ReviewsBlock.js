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

    /***
     * Get reviews block
     * @returns {HTMLElement}
     * @private
     */
    __getReviewsBlock() {
        return document.getElementById(`reviews-${this.__context.data.type}`);
    }

    /***
     * Get reviews body
     * @returns {HTMLElement}
     * @private
     */
    __getReviewsBlockBody() {
        return document.getElementById(`reviews-${this.__context.data.type}-body`);
    }

    /***
     * Get review scroll
     * @returns {HTMLElement}
     */
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

    /***
     * Add one review
     * @param {Object} data - review data
     * @private
     */
    __addOneReview(data) {
        const oneReview = new OneReview(this.__getReviewsBlockBody());
        oneReview.render(data);

        this.__reviewList.set(data.reviewId, oneReview);
    }

    /***
     * Add reviews
     * @private
     */
    __addReviews() {
        this.__context.data.list.forEach((el) => {
            this.__addOneReview(el);
        });
    }

    /***
     * Add new reviews
     * @param {Object[]} data - reviews list
     */
    addNewReviews(data) {
        this.__addReviews(data);
    }

    /***
     * Toggle review
     * @param {number} id - review id
     */
    toggleReviewContent(id) {
        this.__reviewList.get(id).toggleContent();
    }

    /***
     * Rerender reviews
     * @param {Object[]} context - review list
     */
    rerenderReviews(context) {
        this.__context.data.list = context;
        this.__reviewList = new Map();

        this.__getReviewsBlockBody().innerHTML = '';

        if (this.__context.data.list.length === 0 || this.__context.data.list.length === undefined) {
            this.__renderEmptyReviews();
            return;
        }

        this.__addReviews();
    }

    /***
     * Render empty reviews
     * @private
     */
    __renderEmptyReviews() {
        const emptyReviews = new EmptyReviews(this.__getReviewsBlockBody());
        emptyReviews.render();
    }

    /***
     * Set radio button checked
     * @param type
     * @param sort
     */
    setCheckedRadioButton(type, sort) {
        document.getElementById(`reviews-${type}-${sort}`).checked = true;
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', reviewsBlockTemplate(this.__context.data));
            this.__addListeners();

            if (this.__context.data.list.length === 0) {
                this.__renderEmptyReviews();
                return;
            }

            this.__addReviews();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}