import oneCommentTemplate from './OneReview.hbs';
import './OneReview.scss';

import {sentryManager} from '../../../modules/sentry';

/***
 * Change password box on profile page
 */
export class OneReview {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Get star element
     * @param id
     * @returns {HTMLElement}
     * @private
     */
    __getStarElement(id) {
        return document.getElementById(`star-${this.__context.reviewId}-${id}`);
    }

    /***
     * Make stars active
     * @param count
     * @private
     */
    __makeStarsActive(count) {
        for (let i = 1; i <= count; i++) {
            this.__getStarElement(i).classList.add('star-active');
        }
    }

    /***
     * Render stars in comment
     * @private
     */
    __renderStars(ctx) {
        const rate = Math.round(ctx.rating);
        switch (rate) {
            case 0:
                break;
            case 1:
                this.__makeStarsActive(1);
                break;
            case 2:
                this.__makeStarsActive(2);
                break;
            case 3:
                this.__makeStarsActive(3);
                break;
            case 4:
                this.__makeStarsActive(4);
                break;
            case 5:
                this.__makeStarsActive(5);
                break;
            default:
                break;
        }
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', oneCommentTemplate(this.__context));
            this.__renderStars(this.__context);
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}