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
     * Make context
     * @param {Object} context - context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            linkImage: context.data.linkImage,
            surname: context.data.surname,
            name: context.data.name,
            owner: context.owner,
            id: context.data.id
        };
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__makeContext(context);
            this.__parent.insertAdjacentHTML('beforeend', profileMenuTemplate(this.__context));
            document.getElementById(`profile-menu-${this.__page.page}`).classList.add('profile-menu__selected');
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}