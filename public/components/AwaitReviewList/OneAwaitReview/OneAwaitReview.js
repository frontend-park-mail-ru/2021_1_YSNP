import awaitReviewTemplate from './OneAwaitReview.hbs';
import './OneAwaitReview.scss';

import {sentryManager} from '../../../modules/sentry';

/***
 * One await review component
 */
export class OneAwaitReview {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Render component
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', awaitReviewTemplate(this.__context));
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}