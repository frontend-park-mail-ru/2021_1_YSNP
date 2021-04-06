import './ProfileMenu.css';
import profileMenuTemplate from './ProfileMenu.hbs';

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
        this.__context = context;

        this.__parent.insertAdjacentHTML('beforeend', profileMenuTemplate(this.__context.data));
        document.getElementById(`profile-menu-${this.__page.page}`).classList.add('profile-menu__selected');
    }
}