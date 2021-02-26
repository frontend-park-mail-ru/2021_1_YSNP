import {Profile} from '../../pages/Profile.js';
import {Landing} from '../../pages/Landing.js';

/***
 * Header controller
 */
export class HeaderController {
    /***
     *
     * @param {HTMLElement} parent - element callback will work with
     * @param {Header} header - header
     */
    constructor(parent, header) {
        this.__parent = parent;
        this.__header = header;
    }

    /***
     * Render and add listeners
     */
    control() {
        this.__header.listeners = this.__createListeners();
        this.__header.addListeners();
    }

    /***
     * Header click event
     * @param {Event} ev - event
     * @private
     */
    __listenerHeaderClick(ev) {
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
     *  Page click event
     * @private
     */
    __listenerPageClick() {
        document
            .getElementById('header-dropdown')
            .classList
            .add('header-dropdown-content_hidden');
    }

    /***
     * Get header listeners
     * @returns {{pageClick: {listener: *, type: string}, headerClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            headerClick: {
                type: 'click',
                listener: this.__listenerHeaderClick.bind(this)
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
        this.__header.removeListeners();

        const landing = new Landing(this.__parent);
        landing.render();
    }

    /***
     * Header map click callback
     * @private
     */
    __openMap() {
        this.__header.removeListeners();

        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * Header create product click callback
     * @private
     */
    __openCreateProduct() {
        this.__header.removeListeners();

        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * Header dropdown menu click callback
     * @private
     */
    __openDropdownMenu() {
        document
            .getElementById('header-dropdown')
            .classList
            .toggle('header-dropdown-content_hidden');
    }

    /***
     * Header account click callback
     * @private
     */
    __openAccount() {
        this.__header.removeListeners();

        const profile = new Profile(this.__parent);
        profile.render();
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
            }
        };
    }
}