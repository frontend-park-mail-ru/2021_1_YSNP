import offlineTemplate from './PageOffline.hbs';
import './PageOffline.scss';

import {sentryManager} from '../../modules/sentry';

/***
 * Page offline component
 */
export class PageOffline {
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
            this.__parent.insertAdjacentHTML('beforeend', offlineTemplate());
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}