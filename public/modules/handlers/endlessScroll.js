/***
 * Endless scroll
 */
export class EndlessScroll {
    /***
     * Class constructor
     * @param {Object} callbackList - scroll listeners
     * @param {number} offset - page offset %
     */
    constructor(callbackList, offset = 30) {
        this.__callbackList = callbackList;
        this.__offset = offset;

        this.__scrollTimeout = null;
        this.__listener = this.__scrollThrottler.bind(this);
    }

    /***
     * Start endless scroll
     */
    start() {
        this.__addListeners();
    }

    /***
     * Remove endless scroll
     */
    remove() {
        this.__removeListeners();
    }

    /***
     * Add scroll listener
     * @private
     */
    __scrollListener() {
        const clientRect = document.documentElement.getBoundingClientRect();
        const clientHeight = document.documentElement.clientHeight;

        if (clientRect.bottom < clientHeight * (this.__offset / 100 + 1)) {
            this.__callbackList.scrollEnd(clientRect);
        }
    }

    /***
     * Throttle resize callback
     * @private
     */
    __scrollThrottler() {
        if (!this.__scrollTimeout) {
            this.__scrollTimeout = setTimeout(() => {
                this.__scrollTimeout = null;

                this.__scrollListener();
            }, 1000 / 60);
        }
    }

    /***
     * Add listeners
     * @private
     */
    __addListeners() {
        window.addEventListener('scroll', this.__listener);
    }

    /***
     * Remove listeners
     * @private
     */
    __removeListeners() {
        window.removeEventListener('scroll', this.__listener);
    }
}