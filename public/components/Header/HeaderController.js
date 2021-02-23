'use strict';

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
        this.__header.render();

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
        this.__header.removeListeners();

        const actions = this.__getActions();
        Object
            .entries(ev.path)
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open();
                }
            });
    }

    /***
     * Get header listeners
     * @returns {{headerClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            headerClick: {
                type: 'click',
                listener: this.__listenerHeaderClick.bind(this)
            }
        };
    }

    /***
     * Header brand click callback
     * @private
     */
    __openLanding() {
        const landing = new Landing(this.__parent);
        landing.render();
    }

    /***
     * Header map click callback
     * @private
     */
    __openMap() {
        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * Header create product click callback
     * @private
     */
    __openCreateProduct() {
        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * Header account click callback
     * @private
     */
    __openAccount() {
        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * Get header actions
     * @returns {{createProductClick: {open: *}, accountClick: {open: *}, locationClick: {open: *}, brandClick: {open: *}}}
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
            }
        };
    }
}