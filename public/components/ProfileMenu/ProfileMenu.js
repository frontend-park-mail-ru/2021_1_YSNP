import './ProfileMenu.css';
import profileMenuTemplate from './ProfileMenu.hbs';

/***
 * Profile menu
 */
export class ProfileMenu {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} page - name of opened page
     * @param {Object} listeners - component listeners
     */
    constructor(parent, page, listeners = {}) {
        this.__parent = parent;
        this.data = {};
        this.__listeners = listeners;
        this.__page = page;
    }

    /***
     * Get listeners
     * @returns {Object}
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * Set listeners
     * @param {Object} val - listener to set
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * Add component listeners
     */
    addListeners() {
        document
            .getElementById('profile-menu')
            .addEventListener(this.__listeners.profileClick.type, this.__listeners.profileClick.listener);
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('profile-menu')
            .removeEventListener(this.__listeners.profileClick.type, this.__listeners.profileClick.listener);
    }

    /***
     * Add component to parent
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', profileMenuTemplate(this.data));

        document.getElementById(`profile-menu-${this.__page.page}`).classList.add('profile-menu__selected');
    }
}