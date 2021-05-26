import awaitReviewListTemplate from './AwaitReviewList.hbs';
import './AwaitReviewList.scss';

import {OneAwaitReview} from './OneAwaitReview/OneAwaitReview';
import {EmptyList} from './EmptyList/EmptyList';

import {sentryManager} from '../../modules/sentry';

/***
 * Await review list component
 */
export class AwaitReviewList {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Await review list body element
     * @returns {HTMLElement}
     * @private
     */
    __getAwaitReviewListBody() {
        return document.getElementById(`await-review-list-${this.__context.data.type}-body`);
    }

    /***
     * Await review list body scroll element
     * @returns {HTMLElement}
     */
    getAwaitReviewListScroll() {
        return document.getElementById(`await-review-list-${this.__context.data.type}-scroll`);
    }

    /***
     * Add one await review
     * @param {Object} data - await review data
     * @private
     */
    __addOneAwaitReview(data) {
        const awaitReview = new OneAwaitReview(this.__getAwaitReviewListBody());
        awaitReview.render(data);
    }

    /***
     * Add await review list
     * @private
     */
    __addAwaitReviews() {
        this.__context.data.list.forEach((el) => {
            this.__addOneAwaitReview(el);
        });
    }

    /***
     * Add new await review list
     * @param {Object} data - new await list
     */
    addNewAwaitReview(data) {
        this.__addAwaitReviews(data);
    }

    /***
     * Add listeners
     * @private
     */
    __addListeners() {
        this.__getAwaitReviewListBody()
            .addEventListener(this.__context.listeners.awaitReviewClick.type, this.__context.listeners.awaitReviewClick.listener);
    }

    /***
     * Remove listeners
     */
    removeListeners() {
        this.__getAwaitReviewListBody()
            .removeEventListener(this.__context.listeners.awaitReviewClick.type, this.__context.listeners.awaitReviewClick.listener);
    }

    /***
     * Render empty list
     * @private
     */
    __renderEmptyList() {
        const emptyList = new EmptyList(this.__getAwaitReviewListBody());
        emptyList.render();
    }

    /***
     * Render component
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', awaitReviewListTemplate(this.__context.data));

            if (this.__context.data.list.length === 0) {
                this.__renderEmptyList();
                return;
            }

            this.__addListeners();
            this.__addAwaitReviews();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}