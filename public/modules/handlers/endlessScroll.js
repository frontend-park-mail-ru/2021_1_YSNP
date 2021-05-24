/***
 * Endless scroll
 */
export class EndlessScroll {
    /***
     * Class constructor
     * @param {Object} callbackList - scroll listeners
     * @param {number} offset - page offset %
     * @param {boolean} isDown - scroll direction
     */
    constructor(callbackList, isDown = true, offset = 30) {
        this.__callbackList = callbackList;
        this.__offset = offset;
        this.__isDown = isDown;

        this.__scrollTimeout = null;
        this.__listener = this.__scrollThrottler.bind(this);
    }

    /***
     * Start endless scroll
     */
    start() {
        this.__element = window;
        this.__checkScrollCallback();
        this.__addListeners();
    }

    /***
     * Start endless scroll with element
     * @param {HTMLElement} element
     */
    startElement(element) {
        this.__element = element;
        this.__checkScrollElementCallback();
        this.__addListeners();
    }

    /***
     * Remove endless scroll
     */
    remove() {
        this.__removeListeners();
    }

    /***
     * Scroll callback up
     * @private
     */
    __scrollCallbackUp() {
        console.log('release __scrollCallbackUp');
    }

    /***
     * Scroll callback down
     * @private
     */
    __scrollCallbackDown() {
        const clientRect = document.documentElement.getBoundingClientRect();
        const clientHeight = document.documentElement.clientHeight;

        if (clientRect.bottom < clientHeight * (this.__offset / 100)) {
            this.__callbackList.scrollEnd(clientRect);
        }
    }

    /***
     * Check scroll callback
     * @private
     */
    __checkScrollCallback() {
        if (this.__isDown) {
            this.__scrollCallbackHandler = this.__scrollCallbackDown.bind(this);
            return;
        }

        this.__scrollCallbackHandler = this.__scrollCallbackUp.bind(this);
    }

    /***
     * Scroll element callback up
     * @private
     */
    __scrollElementCallbackUp() {
        const scrollTop = this.__element.scrollTop;
        const scrollHeight = this.__element.scrollHeight;

        if (scrollTop < scrollHeight * (this.__offset / 100)) {
            this.__callbackList.scrollEnd();
        }
    }

    /***
     * Scroll element callback down
     * @private
     */
    __scrollElementCallbackDown() {
        const scrollTop = this.__element.scrollTop + this.__element.clientHeight;
        const scrollHeight = this.__element.scrollHeight;

        if (scrollTop > scrollHeight * (1 - this.__offset / 100)) {
            this.__callbackList.scrollEnd();
        }
    }

    /***
     * Check scroll element callback
     * @private
     */
    __checkScrollElementCallback() {
        if (this.__isDown) {
            this.__scrollCallbackHandler = this.__scrollElementCallbackDown.bind(this);
            return;
        }

        this.__scrollCallbackHandler = this.__scrollElementCallbackUp.bind(this);
    }

    /***
     * Throttle resize callback
     * @private
     */
    __scrollThrottler() {
        if (!this.__scrollTimeout) {
            this.__scrollTimeout = setTimeout(() => {
                this.__scrollTimeout = null;

                this.__scrollCallbackHandler();
            }, 1000 / 60);
        }
    }

    /***
     * Add listeners
     * @private
     */
    __addListeners() {
        if (this.__element) {
            this.__element.addEventListener('scroll', this.__listener);
        }
    }

    /***
     * Remove listeners
     * @private
     */
    __removeListeners() {
        if (this.__element) {
            this.__element.removeEventListener('scroll', this.__listener);
        }
    }
}