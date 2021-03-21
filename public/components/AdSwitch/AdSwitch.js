import adSwitchTemplate from './AdSwitch.hbs';
import './AdSwitch.css';

/***
 * Ad switch component
 */
export class AdSwitch {
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
        this.__parent.insertAdjacentHTML('beforeend', adSwitchTemplate());
    }
}
