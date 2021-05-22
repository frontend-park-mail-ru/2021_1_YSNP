import reviewUserTemplate from './ReviewUser.hbs';
import './ReviewUser.scss';

import {sentryManager} from '../../../modules/sentry';

/***
 * Review User component
 */
export class ReviewUser {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Get review user element
     * @returns {HTMLElement}
     * @private
     */
    __getReviewUser() {
        return document.getElementById('review-user');
    }

    /***
     * Get review user content element
     * @returns {HTMLElement}
     * @private
     */
    __getReviewUserContent() {
        return document.getElementById('review-user-content');
    }

    /***
     * Get review user error element
     * @returns {HTMLElement}
     * @private
     */
    __getReviewUserError() {
        return document.getElementById('review-user-error');
    }

    /***
     * Get review user textarea
     * @returns {HTMLElement}
     * @private
     */
    __getReviewUserTextarea() {
        return document.getElementById('review-user-textarea');
    }

    /***
     * Get review user star element
     * @param {number} id - star id
     * @returns {HTMLElement}
     * @private
     */
    __getReviewUserStar(id) {
        return document.getElementById(`review-user-star-${id}`);
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        window
            .addEventListener(this.__context.listeners.keyClick.type, this.__context.listeners.keyClick.listener);

        this.__getReviewUser()
            .addEventListener(this.__context.listeners.pageClick.type, this.__context.listeners.pageClick.listener);

        this.__getReviewUserContent()
            .addEventListener(this.__context.listeners.reviewUserClick.type, this.__context.listeners.reviewUserClick.listener);
    }

    /***
     * Remove component listeners
     */
    __removeListeners() {
        window
            .removeEventListener(this.__context.listeners.keyClick.type, this.__context.listeners.keyClick.listener);

        this.__getReviewUser()
            .removeEventListener(this.__context.listeners.pageClick.type, this.__context.listeners.pageClick.listener);

        this.__getReviewUserContent()
            .removeEventListener(this.__context.listeners.reviewUserClick.type, this.__context.listeners.reviewUserClick.listener);
    }

    /***
     * Set review user error
     * @param {string} msg - message
     */
    setReviewError(msg) {
        this.__getReviewUserError().innerText = msg;
    }

    /***
     * Get review user text
     * @returns {string}
     */
    getReviewText() {
        return this.__getReviewUserTextarea().value;
    }

    /***
     * Get review user star
     * @returns {number}
     */
    getReviewStar() {
        for (let i = 1; i <= 5; i++) {
            const star = this.__getReviewUserStar(i);

            if (star.checked) {
                return i;
            }
        }

        return 0;
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            console.log(this.__context);
            this.__parent.insertAdjacentHTML('beforeend', reviewUserTemplate(this.__context.data));
            this.__addListeners();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }

    /***
     * Remove component
     */
    remove() {
        try {
            this.__removeListeners();
            this.__getReviewUser().remove();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}
