'use strict';

import {Landing} from '../../pages/Landing.js';

/***
 * @author Ivan Gorshkov
 *
 * NavigationController control events of navigation
 * @class NavigationController
 */
export class NavigationController {

    /***
     * @author Ivan Gorshkov
     *
     * init of class NavigationController
     * @param{function} removingListeners - function to remove all listeners
     * @param{HTMLElement} parent - parent component
     * @param{Navigation} navigation - control component
     * @constructor
     * @this {NavigationController}
     * @public
     */
    constructor(removingListeners, parent, navigation) {
        this.__parent = parent;
        this.__navigation = navigation;
        this.__removingListeners = removingListeners;
    }

    /***
     * @author Ivan Gorshkov
     *
     * set listeners to all components
     * @this {NavigationController}
     * @public
     */
    control() {
        this.__navigation.listeners = this.__createListeners();
        this.__navigation.addListeners();
    }

    /***
     * @author Ivan Gorshkov
     *
     * main listener
     * @private
     * @this {NavigationController}
     * @param{Event} ev - event
     */
    __listenerBackClick(ev) {
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
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {NavigationController}
     * @return {{backButton: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            backButton: {
                type: 'click',
                listener: this.__listenerBackClick.bind(this)
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to navigate back
     * @this {NavigationController}
     * @private
     */
    __openLanding() {
        this.__removingListeners();
        const landing = new Landing(this.__parent);
        landing.render();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Object with all actions
     * @return {{backClick: {open: *}}}
     * @this {NavigationController}
     * @private
     */
    __getActions() {
        return {
            backClick: {
                open: this.__openLanding.bind(this)
            }
        };
    }
}