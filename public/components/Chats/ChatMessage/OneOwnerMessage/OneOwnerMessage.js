import oneOwnerMessageTemplate from './OneOwnerMessage.hbs';
import './OneOwnerMessage.scss';

import {sentryManager} from '../../../../modules/sentry';

/***
 * One owner message
 */
export class OneOwnerMessage {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;

            if (context.isDown) {
                this.__parent.insertAdjacentHTML('beforeend', oneOwnerMessageTemplate(this.__context));
                return;
            }

            this.__parent.insertAdjacentHTML('afterbegin', oneOwnerMessageTemplate(this.__context));
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}