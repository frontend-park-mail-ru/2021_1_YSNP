import createButtonTemplate from './CreateButton.hbs';
import './CreateButton.scss';

import {sentryManager} from '../../../../modules/sentry';

/***
 * Create button component
 */
export class CreateButton {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Get create button element
     * @returns {HTMLElement}
     * @private
     */
    __getCreateButton() {
        return document.getElementById('create-button');
    }

    /***
     * Unable button
     */
    unable() {
        this.__getCreateButton().classList.remove('create-button_disabled');
    }

    /***
     * Disable button
     */
    disable() {
        this.__getCreateButton().classList.add('create-button_disabled');
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        this.__getCreateButton()
            .addEventListener(this.__context.listeners.createButtonClick.type, this.__context.listeners.createButtonClick.listener);
    }

    /***
     * Remove component listeners
     */
    __removeListeners() {
        this.__getCreateButton()
            .removeEventListener(this.__context.listeners.createButtonClick.type, this.__context.listeners.createButtonClick.listener);
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', createButtonTemplate());
            this.__addListeners();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }

    /***
     * Remove component
     */
    remove() {
        try {
            this.__removeListeners();
            this.__getCreateButton().remove();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}
