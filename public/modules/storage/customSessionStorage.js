import {sentryManager} from '../sentry';

/***
 * Local storage
 */
class CustomSessionStorage {
    /***
     * Get string item
     * @param {string} key - key name
     * @returns {string|undefined}
     */
    get(key) {
        try {
            return sessionStorage.getItem(key);
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);

            return undefined;
        }
    }

    /***
     * Set string item
     * @param {string} key - key name
     * @param {string} val - value
     */
    set(key, val) {
        try {
            sessionStorage.setItem(key, val);
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }

    /***
     * Get JSON item
     * @param {string} key - key name
     * @returns {Object|undefined}
     */
    getJSON(key) {
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);

            return undefined;
        }
    }

    /***
     * Set JSON item
     * @param {string} key - key name
     * @param {Object} val - JSON value
     */
    setJSON(key, val) {
        try {
            sessionStorage.setItem(key, JSON.stringify((val)));
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }

    /***
     * Remove item
     * @param {string} key - key name
     */
    del(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}

export const customSessionStorage = new CustomSessionStorage();
