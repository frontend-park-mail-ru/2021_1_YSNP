/***
 * Mobile class
 */
class Mobile {
    /***
     * Class constructor
     */
    constructor() {
        this.__mobileSize = 576;
        this.__resizeTimeout = null;
        this.__isMobile = this.isMobile();

        this.__resizeListener = this.__resizeHandler.bind(this);
    }

    /***
     * Check is mobile
     * @returns {boolean}
     */
    isMobile() {
        return window.innerWidth <= this.__mobileSize;
    }

    /***
     * Start working resize
     * @param {Function} callback
     */
    start(callback) {
        this.__resizeCallback = callback;
        this.__addListeners();
    }

    /***
     * Stop working resize
     */
    remove() {
        this.__removeListeners();
    }

    /***
     * Throttle resize callback
     * @private
     */
    __resizeThrottler() {
        if (!this.__resizeTimeout) {
            this.__resizeTimeout = setTimeout(() => {
                this.__resizeTimeout = null;

                this.__resizeHandler();
            }, 1000 / 60);
        }
    }

    /***
     * Handle resize event
     * @private
     */
    __resizeHandler() {
        const currentIsMobile = this.isMobile();

        if (!this.__isMobile && currentIsMobile) {
            this.__isMobile = true;
            this.__resizeCallback();
        }

        if (this.__isMobile && !currentIsMobile) {
            this.__isMobile = false;
            this.__resizeCallback();
        }
    }

    /***
     * Add listeners
     * @private
     */
    __addListeners() {
        window.addEventListener('resize', this.__resizeListener);
    }

    /***
     * Remove listeners
     * @private
     */
    __removeListeners() {
        window.removeEventListener('resize', this.__resizeListener);
    }
}

export const mobile = new Mobile();