const mobileSize = 576;

/***
 * Check is mobile
 * @returns {boolean}
 */
export function isMobile() {
    return window.innerWidth <= mobileSize;
}