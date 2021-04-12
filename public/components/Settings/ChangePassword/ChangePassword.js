import changePasswordTemplate from './ChangePassword.hbs';
import './ChangePassword.scss';

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
        this.__parent.insertAdjacentHTML('beforeend', changePasswordTemplate());
    }
}