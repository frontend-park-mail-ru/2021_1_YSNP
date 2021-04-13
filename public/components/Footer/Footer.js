import footerTemplate from './Footer.hbs';
import './Footer.scss';

/***
 * Header component
 */
export class Footer {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        document
            .getElementById('footer')
            .addEventListener(this.__context.listeners.headerClick.type, this.__context.listeners.headerClick.listener);
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('footer')
            .removeEventListener(this.__context.listeners.headerClick.type, this.__context.listeners.headerClick.listener);
    }

    /***
     * Add component to parent
     */
    render(context) {
        this.__context = context;
        this.__parent.insertAdjacentHTML('beforeend', footerTemplate(this.__context.data));
        this.__addListeners();
    }
}
