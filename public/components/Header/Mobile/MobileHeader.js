import mobileHeaderTemplate from './MobileHeader.hbs';
import './MobileHeader.scss';

import {sentryManager} from '../../../modules/sentry';

/***
 * Header component
 */
export class MobileHeader {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Get back button
     * @returns {HTMLElement}
     * @private
     */
    __getBackButton() {
        return document.getElementById('mobile-header-back');
    }

    /***
     * Get theme button
     * @returns {HTMLElement}
     * @private
     */
    __getThemeButton() {
        return document.getElementById('mobile-header-theme');
    }

    /***
     * Add back button
     */
    addBackButton() {
        this.__getBackButton().classList.remove('mobile-header-left__back_disabled');
    }

    /***
     * Add theme button
     */
    addThemeButton() {
        this.__getThemeButton().classList.remove('mobile-header-left__theme_disabled');
    }

    /***
     * Remove back button
     */
    removeBackButton() {
        this.__getBackButton().classList.add('mobile-header-left__back_disabled');
    }

    /***
     * Remove back button
     */
    removeThemeButton() {
        this.__getThemeButton().classList.add('mobile-header-left__theme_disabled');
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        document
            .getElementById('mobile-header')
            .addEventListener(this.__context.listeners.headerClick.type, this.__context.listeners.headerClick.listener);
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('mobile-header')
            .removeEventListener(this.__context.listeners.headerClick.type, this.__context.listeners.headerClick.listener);
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', mobileHeaderTemplate(this.__context.data));
            this.__addListeners();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}
