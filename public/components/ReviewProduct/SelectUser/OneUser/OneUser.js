import oneUserTemplate from './OneUser.hbs';
import './OneUser.scss';

import {sentryManager} from '../../../../modules/sentry';

/***
 * One User component
 */
export class OneUser {
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
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', oneUserTemplate(this.__context));
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}
