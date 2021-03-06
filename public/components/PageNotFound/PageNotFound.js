import notFoundTemplate from './PageNotFound.hbs';
import './PageNotFound.scss';

import {sentryManager} from '../../modules/sentry';

/***
 * Page not found component
 */
export class PageNotFound {
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

            this.__parent.insertAdjacentHTML('beforeend', notFoundTemplate(context));
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}