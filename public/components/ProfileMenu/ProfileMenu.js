import './ProfileMenu.scss';
import profileMenuTemplate from './ProfileMenu.hbs';

import {sentryManager} from '../../modules/sentry';

/***
 * Profile menu
 */
export class ProfileMenu {
    /***
     * Class constructor
     * @param {Element} parent - element where the component will be inserted
     * @param {Object} page - name of opened page
     */
    constructor(parent, page) {
        this.__parent = parent;
        this.__page = page;
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', profileMenuTemplate(this.__context.data));
            document.getElementById(`profile-menu-${this.__page.page}`).classList.add('profile-menu__selected');
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}