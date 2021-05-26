import emptyListTemplate from './EmptyList.hbs';
import './EmptyList.scss';

import {sentryManager} from '../../../modules/sentry';

/***
 * Empty list component
 */
export class EmptyList {
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
            this.__parent.insertAdjacentHTML('beforeend', emptyListTemplate());
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}