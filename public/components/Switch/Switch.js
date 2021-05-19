import adSwitchTemplate from './Switch.hbs';
import './Switch.scss';

import {sentryManager} from '../../modules/sentry';

/***
 * Ad switch component
 */
export class Switch {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Select button
     * @param {string} name - button name
     */
    selectButton(name) {
        this.__parent
            .querySelector(`[name="${name}"]`)
            .classList
            .add('switch-buttons__button_selected');
    }

    /***
     * Unselect button
     * @param {string} name - button name
     */
    unSelectButton(name) {
        this.__parent
            .querySelector(`[name="${name}"]`)
            .classList
            .remove('switch-buttons__button_selected');
    }

    /***
     * Unselect all buttons
     */
    unSelectAllButtons() {
        this.__context.data.buttons.forEach((el) => {
            this.unSelectButton(el.name);
        });
    }

    /***
     * Add listeners
     */
    __addListeners() {
        if (this.__context.data.hasButtons) {
            document
                .getElementById('switch-buttons')
                .addEventListener(this.__context.listeners.buttonsClick.type, this.__context.listeners.buttonsClick.listener);
        }
    }

    /***
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', adSwitchTemplate(this.__context.data));
            this.__addListeners();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}
