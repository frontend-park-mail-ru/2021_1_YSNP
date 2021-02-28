import {Profile} from '../../pages/Profile.js';
import {Landing} from '../../pages/Landing.js';
import {Registration} from '../../pages/Registration.js';

/***
 * Header controller controller
 */
export class HeaderController {
    /***
     * Class constructor
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {Header} header - header
     */
    constructor(pageRemoveListeners, parent, header) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__header = header;
    }

    /***
     * Add listeners
     */
    control() {
        this.__header.listeners = this.__createListeners();
        this.__header.addListeners();
    }

    /***
     * Remove Controller listeners
     */
    removeControllerListeners() {
        this.__header.removeListeners();
    }

    /***
     * Header click event
     * @param {Event} ev - event
     * @private
     */
    __listenerHeaderClick(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open();
                }
            });
    }

    /***
     * Dropdown click event
     * @param {Event} ev - event
     * @private
     */
    __listenerDropdownClick(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open();
                }
            });
    }

    /***
     * Page click event
     * @param {Event} ev - event
     * @private
     */
    __listenerPageClick(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        document
            .getElementById('header-dropdown-content')
            .classList
            .add('header-dropdown-content_hidden');
    }

    /***
     * Get header listeners
     * @returns {{dropdownClick: {listener: *, type: string}, headerClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            headerClick: {
                type: 'click',
                listener: this.__listenerHeaderClick.bind(this)
            },
            dropdownClick: {
                type: 'click',
                listener: this.__listenerDropdownClick.bind(this)
            },
            pageClick: {
                type: 'click',
                listener: this.__listenerPageClick.bind(this)
            }
        };
    }

    /***
     * Header brand click callback
     * @private
     */
    __openLanding() {
        this.__pageRemoveListeners();

        console.log('open landing');

         const landing = new Landing(this.__parent);
         landing.render();
    }

    /***
     * Header map click callback
     * @private
     */
    __openMap() {
        // this.__pageRemoveListeners();

        console.log('Open map');
    }

    /***
     * Header create product click callback
     * @private
     */
    __openCreateProduct() {
        // this.__pageRemoveListeners();

        console.log('Open create product');
    }

    /***
     * Header account click callback
     * @private
     */
    __openAccount() {
        this.__pageRemoveListeners();
        this.register = new Registration(this.__parent);
        this.register.render();
        console.log('Open account');
    }

    /***
     * Header dropdown menu click callback
     * @private
     */
    __openDropdownMenu() {
        document
            .getElementById('header-dropdown-content')
            .classList
            .toggle('header-dropdown-content_hidden');
    }

    /***
     * Header profile click callback
     * @private
     */
    __openProfile() {
        // this.__pageRemoveListeners();

        console.log('Open profile');

        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * Header my products click callback
     * @private
     */
    __openMyProducts() {
        // this.__pageRemoveListeners();

        console.log('Open my products');
    }

    /***
     * Header messages click callback
     * @private
     */
    __openMessages() {
        // this.__pageRemoveListeners();

        console.log('Open messages');
    }

    /***
     * Header favorites click callback
     * @private
     */
    __openFavorites() {
        // this.__pageRemoveListeners();

        console.log('Open favorites');
    }

    /***
     * Header logout click callback
     * @private
     */
    __logout() {
        // this.__pageRemoveListeners();

        console.log('Logout');
    }


    /***
     * Get header actions
     * @returns {{createProductClick: {open: *}, accountClick: {open: *}, dropdownClick: {open: *}, locationClick: {open: *}, brandClick: {open: *}}}
     * @private
     */
    __getActions() {
        return {
            brandClick: {
                open: this.__openLanding.bind(this)
            },
            locationClick: {
                open: this.__openMap.bind(this)
            },
            createProductClick: {
                open: this.__openCreateProduct.bind(this)
            },
            accountClick: {
                open: this.__openAccount.bind(this)
            },
            dropdownClick: {
                open: this.__openDropdownMenu.bind(this)
            },
            profileClick: {
                open: this.__openProfile.bind(this)
            },
            myProductsClick: {
                open: this.__openMyProducts.bind(this)
            },
            messagesClick: {
                open: this.__openMessages.bind(this)
            },
            favoritesClick: {
                open: this.__openFavorites.bind(this)
            },
            logoutClick: {
                open: this.__logout.bind(this)
            }
        };
    }
}