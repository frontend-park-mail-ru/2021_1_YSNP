import changePasswordTemplate from './ChangePassword.hbs';
import './ChangePassword.css';

/***
 * Change password box on profile page
 */
export class ChangePassword {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} listeners - component listeners
     */
    constructor(parent, listeners = {}) {
        this.__parent = parent;
        this.__listeners = listeners;
    }

    render() {
        this.__parent.insertAdjacentHTML('beforeend', changePasswordTemplate());
    }
}