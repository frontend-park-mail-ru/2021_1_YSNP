import userMenuTemplate from './UserMenu.hbs';
import './UserMenu.scss';

/***
 * Profile pop up component
 */
export class UserMenu {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    __getUserMenu() {
        return document.getElementById('user-menu');
    }

    __getUserMenuContent() {
        return document.getElementById('user-menu-content');
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        this.__getUserMenuContent()
            .addEventListener(this.__context.listeners.headerClick.type, this.__context.listeners.headerClick.listener);
    }

    /***
     * Remove component listeners
     */
    __removeListeners() {
        this.__getUserMenuContent()
            .removeEventListener(this.__context.listeners.headerClick.type, this.__context.listeners.headerClick.listener);
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', userMenuTemplate(this.__context.data));
            this.__addListeners();
        } catch (err) {
            console.log(err.message);
        }
    }

    /***
     * Remove component
     */
    remove() {
        try {
            this.__removeListeners();
            this.__getUserMenu().remove();
        } catch (err) {
            console.log(err.message);
        }
    }
}
