import {PageUp} from '../../components/PageUp/PageUp.js';

/***
 * Page up / down component handler
 */
export class PageUpHandler {
    /***
     * Class constructor
     */
    constructor() {
        this.__isShown = false;
        this.__pageUp = new PageUp(document.getElementById('app'));

        this.__listener = this.__scrollListener.bind(this);
    }

    /***
     * Start page up
     */
    start() {
        this.__pageUp.render(this.__createListeners());
        this.__addListener();
    }

    /***
     * Remove page up
     */
    remove() {
        this.__removeListeners();
        this.__pageUp.remove();
    }

    /***
     * Set page up
     * @private
     */
    __setUp() {
        window.scrollTo(0, 0);
        this.__pageUp.setDown();
        this.__isSetUp = true;
    }

    /***
     * Set page down
     * @private
     */
    __setDown() {
        window.scrollTo(0, this.__currentYOffset);
        this.__pageUp.setUp();
        this.__isSetUp = false;
    }

    /***
     * Add scroll listener
     * @private
     */
    __scrollListener() {
        if (this.__isSetUp && window.pageYOffset * 2 > window.innerHeight) {
            this.__isSetUp = false;
            this.__pageUp.setUp();
        }

        if (!this.__isShown && window.pageYOffset * 2 > window.innerHeight) {
            this.__isShown = true;
            this.__pageUp.setUp();
            this.__pageUp.unable();
        }

        // if (this.__isShown && !this.__isSetUp && window.pageYOffset * 2 < window.innerHeight) {
        //     this.__isShown = false;
        //     this.__pageUp.disable();
        // }

        if (this.__isShown && window.pageYOffset * 2 < window.innerHeight) {
            this.__isShown = false;
            this.__pageUp.disable();
        }
    }

    /***
     * Add page up listeners
     * @private
     */
    __addListener() {
        window.addEventListener('scroll', this.__listener);
    }

    /***
     * Remove page up listeners
     * @private
     */
    __removeListeners() {
        window.removeEventListener('scroll', this.__listener);
    }


    /***
     * Page up click callback
     * @private
     */
    __pageUpClick() {
        if (!this.__isSetUp) {
            this.__currentYOffset = window.pageYOffset;
            this.__setUp();
        } else {
            this.__setDown();
        }
    }

    /***
     * Create page up listeners
     * @returns {{pageUpClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            pageUpClick: {
                type: 'click',
                listener: this.__pageUpClick.bind(this)
            }
        };
    }
}