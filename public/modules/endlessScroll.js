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

        this.__listener = this.__scrollListener.bind(this);
    }

    /***
     * Start endless scroll
     */
    start() {
        this.__addListeners();
    }

    remove() {
        this.__removeListeners();
    }

    /***
     * Add scroll listener
     * @private
     */
    __scrollListener() {
        if (document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight * (this.__offset / 100 + 1)) {
            this.__callbackList.scrollEnd();
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