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
     * Check max width
     * @private
     */
    __checkWidth() {
        if (this.__context.layoutCount === 'two') {
            if (this.__context.leftWidth + this.__context.rightWidth > 100) {
                throw new Error('leftWidth + rightWidth > 100');
            }
        }
    }

    /***
     * Set layout width
     * @param {number} left - left width
     * @param {number} right - right width
     * @private
     */
    __setWidth(left, right) {
        this.__context.leftWidth = left;
        this.__context.rightWidth = right;
    }

    /***
     * Get layout
     * @private
     */
    __getWidth() {
        if (this.__context.layoutCount === 'one') {
            return;
        }

        switch (this.__context.layoutWidth) {
            case '30/70': {
                this.__setWidth(30, 70);
                break;
            }

            case '40/60': {
                this.__setWidth(40, 60);
                break;
            }

            case '60/40': {
                this.__setWidth(60, 40);
                break;
            }

            case '70/30': {
                this.__setWidth(70, 30);
                break;
            }

            case 'custom': {
                this.__checkWidth();
                break;
            }

            default : {
                throw new Error('unexpected width');
            }
        }
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
            this.__getWidth();

            this.__parent.insertAdjacentHTML('beforeend', layoutTemplate(context));
            this.__checkIsMain();
        } catch (err) {
            console.log(err.message);
        }
    }
}