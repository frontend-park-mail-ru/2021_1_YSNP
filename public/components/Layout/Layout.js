import layoutTemplate from './Layout.hbs';
import './Layout.css';

/***
 * Layout component
 */
export class Layout {
    /***
     * Class constructor
     * @param {HTMLElement} parent - parent element
     * @param {boolean} isMain - is main layout
     */
    constructor(parent, isMain = false) {
        this.__parent = parent;
        this.__isMain = isMain;
    }

    /***
     * Get main parent
     * @returns {Element}
     */
    get parent() {
        return document
            .querySelector('[class="layout-inner"]');
    }

    /***
     * Get left parent
     * @returns {Element}
     */
    get leftParent() {
        return document
            .querySelector('[class="layout-left"]');
    }

    /***
     * Get right parent
     * @returns {Element}
     */
    get rightParent() {
        return document
            .querySelector('[class="layout-right"]');
    }

    /***
     * Check is main layout
     * @private
     */
    __checkIsMain() {
        if (this.__isMain) {
            document
                .getElementById('layout')
                .classList
                .add('layout__main');
        }
    }

    /***
     * Get main parent
     * @returns {HTMLElement}
     */
    get mainParent() {
        this.__checkIsMain();
        return document.getElementById('layout');
    }

    /***
     * Render component
     * @param context
     */
    render(context = {
        layoutCount: 'one'
    }) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', layoutTemplate(context));
            this.__checkIsMain();
        } catch (err) {
            console.log(err.message);
        }
    }
}