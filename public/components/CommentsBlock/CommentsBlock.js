import './CommentsBlock.scss';
import commentBlockTemplate from './CommentsBlock.hbs';

import {sentryManager} from '../../modules/sentry';

/***
 * Profile menu
 */
export class CommentsBlock {
    /***
     * Class constructor
     * @param {Element} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Make context
     * @param {Object} context - context
     * @private
     */
    __makeContext(context) {
        this.__context = {

        };
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__makeContext(context);
            this.__parent.insertAdjacentHTML('beforeend', commentBlockTemplate(this.__context));
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}