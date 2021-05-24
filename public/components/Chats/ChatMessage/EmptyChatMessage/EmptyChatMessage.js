import emptyChatMessage from './EmptyChatMessage.hbs';
import './EmptyChatMessage.scss';

import {sentryManager} from '../../../../modules/sentry';

/***
 * One user message component
 */
export class EmptyChatMessage {
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
    render() {
        try {
            this.__parent.insertAdjacentHTML('beforeend', emptyChatMessage());
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}