/***
 * Endless scroll
 */
export class EndlessScroll {
    /***
     * Class constructor
     * @param {Object} listeners - scroll listeners
     * @param {number} offset - page offset %
     */
    constructor(listeners, offset = 30) {
        this.__listeners = listeners;
        this.__offset = offset;
    }

    /***
     * Start endless scroll
     */
    start() {
        this.__addListeners();
    }

    /***
     * Add scroll listener
     * @private
     */
    __scrollListener() {
        if (document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight * (this.__offset / 100 + 1)) {
            this.__listeners.scrollEnd();
        }
    }

    /***
     * Add listeners
     * @private
     */
    __addListeners() {
        window.addEventListener('scroll', this.__scrollListener.bind(this));
    }
}