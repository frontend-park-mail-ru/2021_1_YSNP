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

        this.__isShowContent = false;
        this.__isBigContent = false;
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
     * Get text element
     * @returns {HTMLElement}
     * @private
     */
    __getTextElement() {
        return document.getElementById(`one-review-${this.__context.reviewId}-text`);
    }

    /***
     * Get more element
     * @returns {HTMLElement}
     * @private
     */
    __getMoreElement() {
        return document.getElementById(`one-review-${this.__context.reviewId}-more`);
    }

    /***
     * Make stars active
     * @param {number} count - star count
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
     * Show content
     * @private
     */
    __showContent() {
        if (!this.__isBigContent) {
            return;
        }

        this.__getTextElement().classList.add('one-review-content__text_show');
        this.__getMoreElement().innerText = 'скрыть';
        this.__isShowContent = true;
    }

    /***
     * Hide content
     * @private
     */
    __hideContent() {
        if (!this.__isBigContent) {
            return;
        }

        this.__getTextElement().classList.remove('one-review-content__text_show');
        this.__getMoreElement().innerText = 'читать дальше';
        this.__isShowContent = false;
    }

    /***
     * Check content height
     * @private
     */
    __checkHeight() {
        if (this.__getTextElement().scrollHeight > this.__getTextElement().clientHeight) {
            this.__getMoreElement().classList.add('one-review-content__more_active');
            this.__isBigContent = true;
        }
    }

    /***
     * Toggle (show/hide) content
     */
    toggleContent() {
        if (this.__isShowContent) {
            this.__hideContent();
            return;
        }

        this.__showContent();
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', oneCommentTemplate(this.__context));
            this.__renderStars(this.__context);
            this.__checkHeight();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}