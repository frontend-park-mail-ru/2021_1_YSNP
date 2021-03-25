import {Header} from '../components/Header/Header.js';
import {Auth} from '../components/Auth/Auth.js';

/***
 * Application base view
 */
export class BaseView {
    /***
     * Class constructor
     * @param {HTMLElement} app - parent element
     */
    constructor(app) {
        this.__app = app;
    }

    /***
     * Get view context
     * @returns {Object}
     */
    get baseContext() {
        return this.__baseContext;
    }

    /***
     * Set view context
     * @param {Object} baseContext - view context
     */
    set baseContext(baseContext) {
        this.__baseContext = baseContext;
    }

    /***
     * Render auth component
     */
    renderAuth() {
        this.__auth = new Auth(this.__app);
        this.__auth.render(this.__baseContext.auth);
    }

    /***
     * Get user telephone from auth component
     * @returns {string}
     */
    getTelephone() {
        return this.__auth.getTelephone();
    }

    /***
     * Get user password from auth component
     * @returns {string}
     */
    getPassword() {
        return this.__auth.getPassword();
    }

    /***
     * Set auth component error message
     * @param str
     */
    authErrorText(str) {
        this.__auth.errorText(str);
    }

    /***
     * Remove auth component
     */
    removeAuth() {
        this.__auth.remove();
    }

    /***
     * Open map component
     */
    renderMap() {
        //TODO (Sergey) release renderMap

        console.log('Open map');
    }

    /***
     * Remove map component
     */
    removeMap() {
        //TODO (Sergey) release removeMap

        console.log('remove map');
    }

    /***
     * Open / Close dropdown menu
     */
    toggleDropdown() {
        this.__header.toggleDropdown();
    }

    /***
     * Remove dropdown menu
     */
    removeDropdown() {
        this.__header.removeDropdown();
    }

    /***
     * Render view
     */
    render() {
        this.__app.innerHTML = '';

        this.__header = new Header(this.__app);
        this.__header.render(this.__baseContext.header);
    }
}