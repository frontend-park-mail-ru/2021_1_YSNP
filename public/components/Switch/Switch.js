import adSwitchTemplate from './Switch.hbs';
import './Switch.css';

/***
 * Ad switch component
 */
export class Switch {
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
    render(context) {
        this.__parent.insertAdjacentHTML('beforeend', adSwitchTemplate(context.data));
    }
}
