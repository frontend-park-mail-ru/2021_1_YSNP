import layoutTemplate from './Layout.hbs';
import './Layout.css';

/***
 * Layout component
 */
export class Layout {
    /***
     * Class constructor
     * @param {HTMLElement} parent - parent element
     */
    constructor(parent) {
        this.__parent = parent;
    }

    get parent() {
        return document.getElementById('layout-parent');
    }

    get leftParent() {
        return document.getElementById('layout-left-parent');
    }

    get rightParent() {
        return document.getElementById('layout-right-parent');
    }

    get mainParent() {
        return document.getElementById('layout-main-parent');
    }

    /***
     * Render component
     * @param context
     */
    render(context) {
        this.__parent.insertAdjacentHTML('beforeend', layoutTemplate(context));
    }
}