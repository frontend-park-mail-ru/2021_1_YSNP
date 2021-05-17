import changePasswordTemplate from './ChangePassword.hbs';
import './ChangePassword.scss';

import {sentryManager} from '../../../modules/sentry';

/***
 * Change password box on profile page
 */
export class ChangePassword {
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
            this.__parent.insertAdjacentHTML('beforeend', changePasswordTemplate());
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}