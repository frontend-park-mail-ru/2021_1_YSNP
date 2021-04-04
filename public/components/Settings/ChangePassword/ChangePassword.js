import changePasswordTemplate from './ChangePassword.hbs';
import './ChangePassword.css';

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
     * Render component
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', changePasswordTemplate());
    }
}