import {Header} from '../components/Header/Desktop/Header.js';
import {Auth} from '../components/Auth/Auth.js';
import {Map} from '../components/Map/Map.js';
import {Footer} from '../components/Footer/Footer';
import {PageOffline} from '../components/PageOffline/PageOffline';
import {MobileHeader} from '../components/Header/Mobile/MobileHeader';
import {UserMenu} from '../components/Header/Mobile/UserMenu/UserMenu';

import {mobile} from '../modules/mobile';

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
     * Remove page
     */
    removePage() {
        this.__app.innerHTML = '';
    }

    /***
     * Delete unread count
     */
    deleteHeaderUnreadMessages() {
        if (!mobile.isMobile()) {
            this.__header.deactivateChatUnread();
        }
    }

    /***
     * Update unread count
     * @param count
     */
    updateHeaderUnreadMessages(count) {
        if (!mobile.isMobile()) {
            this.__header.updateUnreadMessages(count);
        }
    }

    /***
     * add overflow hidden
     */
    addOverflowHidden() {
        document.body.classList.add('overflow-hidden');
    }

    /***
     * Remove overflow hidden
     */
    removeOverflowHidden() {
        document.body.classList.remove('overflow-hidden');
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
        this.__map = new Map(this.__app);
        this.__map.render(this.__baseContext.map);
    }

    /***
     * Update map context
     * @param {Object} context - map context
     */
    updateMapContext(context) {
        this.__baseContext.map.data.radius = context.radius;
    }

    /***
     * Remove map component
     */
    removeMap() {
        this.__map.remove();
    }

    /***
     * Open / Close dropdown menu
     */
    toggleDropdown() {
        if (!mobile.isMobile()) {
            this.__header.toggleDropdown();
        }
    }

    /***
     * Remove dropdown menu
     */
    removeDropdown() {
        if (!mobile.isMobile()) {
            this.__header.removeDropdown();
        }
    }

    /***
     * Remove header listeners
     */
    removeHeaderListeners() {
        if (this.__header) {
            this.__header.removeListeners();
            this.__header = undefined;
        }

        if (this.__mobileHeader) {
            this.__mobileHeader.removeListeners();
            this.__mobileHeader = undefined;
        }
    }

    /***
     * Update user address
     * @param address
     */
    updateAddress(address) {
        if (!mobile.isMobile()) {
            this.__header.updateAddress(address);
        }
    }

    /***
     * Add back button
     */
    addBackButton() {
        if (mobile.isMobile()) {
            this.__mobileHeader.addBackButton();
            this.__mobileHeader.removeThemeButton();
        }
    }

    /***
     * Remove back button
     */
    removeBackButton() {
        if (mobile.isMobile()) {
            this.__mobileHeader.removeBackButton();
            this.__mobileHeader.addThemeButton();
        }
    }

    /***
     * Render user menu
     */
    renderUserMenu() {
        this.__userMenu = new UserMenu(this.__app);
        this.__userMenu.render(this.__baseContext.header);
    }

    /***
     * Remove user menu
     */
    removeUserMenu() {
        this.__userMenu.remove();
    }

    /***
     * Render offline
     */
    renderOffline() {
        this.__app.innerHTML = '';

        const offline = new PageOffline(this.__app);
        offline.render();
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        throw new Error('virtual method not initialized!');
    }

    /***
     * Render view
     */
    render() {
        this.__app.innerHTML = '';
        this.__setTitle();

        if (!mobile.isMobile()) {
            this.__header = new Header(this.__app);
            this.__header.render(this.__baseContext.header);
        } else {
            this.__mobileHeader = new MobileHeader(this.__app);
            this.__mobileHeader.render(this.__baseContext.header);
        }
    }

    /***
     * Render footer
     */
    renderFooter() {
        this.__footer = new Footer(this.__app);
        this.__footer.render(this.__baseContext.header);
    }
}
