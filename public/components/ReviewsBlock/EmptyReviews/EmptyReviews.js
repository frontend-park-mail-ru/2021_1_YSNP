import emptyReviewsTemplate from './EmptyReviews.hbs';
import './EmptyReviews.scss';

import {sentryManager} from '../../../modules/sentry';

/***
 * Empty reviews component
 */
export class EmptyReviews {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Render component
     */
    render() {
        try {
            this.__parent.insertAdjacentHTML('beforeend', emptyReviewsTemplate());
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}