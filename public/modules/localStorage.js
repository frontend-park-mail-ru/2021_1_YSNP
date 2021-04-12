/***
 * Local storage
 */
class LocalStorage {
    /***
     * Class constructor
     */
    constructor() {
    }

    /***
     * Get csrf token
     * @returns {string}
     */
    getCSRF() {
        try {
            return sessionStorage.getItem('csrf');
        } catch (err) {
            console.log(err);
            return '';
        }
    }

    /***
     * Set csrf token
     * @constructor
     * @param {string} csrfToken - csrf token
     */
    setCSRF(csrfToken) {
        sessionStorage.setItem('csrf', csrfToken);
    }
}

export const localStorage = new LocalStorage();
