import emptyChat from './EmptyChat.hbs';
import './EmptyChat.scss';

import {sentryManager} from '../../../modules/sentry';

/***
 * One user message component
 */
export class EmptyChat {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Add component to parent
     */
    render() {
        try {
            this.__parent.insertAdjacentHTML('beforeend', emptyChat());
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}