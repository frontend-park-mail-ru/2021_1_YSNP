import headerTemplate from './Header.hbs';
import './Header.scss';

/***
 * Header component
 */
export class Header {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
        this.__isUnread = false;
    }

    /***
     * Get unread
     * @returns {HTMLElement}
     * @private
     */
    __getUnread() {
        return document.getElementById('header-right-unread');
    }

    /***
     * Get unread count
     * @returns {HTMLElement}
     * @private
     */
    __getUnreadCount() {
        return document.getElementById('header-right-unread-count');
    }

    /***
     * Activate unread
     * @private
     */
    __activateChatUnread() {
        this.__isUnread = true;
        this.__getUnread().classList.add('header-right-avatar-unread_active');
    }

    /***
     * Deactivate unread
     */
    deactivateChatUnread() {
        this.__isUnread = false;
        this.__getUnread().classList.remove('header-right-avatar-unread_active');
    }

    /***
     * Update unread count
     * @param {number} count
     */
    updateUnreadMessages(count) {
        if (!this.__isUnread) {
            this.__activateChatUnread();
        }

        this.__getUnreadCount().innerText = count.toString();
    }

    /***
     * Open / Close dropdown menu
     */
    toggleDropdown() {
        if (this.__context.data.isAuth) {
            try {
                document
                    .getElementById('header-dropdown-content')
                    .classList
                    .toggle('header-dropdown-content_hidden');
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    /***
     * Close dropdown menu
     */
    removeDropdown() {
        if (this.__context.data.isAuth) {
            try {
                document
                    .getElementById('header-dropdown-content')
                    .classList
                    .add('header-dropdown-content_hidden');
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        document
            .getElementById('header')
            .addEventListener(this.__context.listeners.headerClick.type, this.__context.listeners.headerClick.listener);

        document
            .getElementById('app')
            .addEventListener(this.__context.listeners.pageClick.type, this.__context.listeners.pageClick.listener);

        if (this.__context.data.isAuth) {
            document
                .getElementById('header-dropdown')
                .addEventListener(this.__context.listeners.dropdownClick.type, this.__context.listeners.dropdownClick.listener);
        }
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        try {
            document
                .getElementById('header')
                .removeEventListener(this.__context.listeners.headerClick.type, this.__context.listeners.headerClick.listener);

            document
                .getElementById('app')
                .removeEventListener(this.__context.listeners.pageClick.type, this.__context.listeners.pageClick.listener);

            if (this.__context.data.isAuth) {
                document
                    .getElementById('header-dropdown')
                    .removeEventListener(this.__context.listeners.dropdownClick.type, this.__context.listeners.dropdownClick.listener);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    /***
     * Update user address
     * @param address
     */
    updateAddress(address) {
        document
            .getElementById('header-address')
            .innerText = address;
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', headerTemplate(this.__context.data));
            this.__addListeners();
        } catch (err) {
            console.log(err.message);
        }
    }
}
