'use strict';

import {Landing} from '../../pages/Landing.js';


export class NavigationController {

    constructor(removingListeners, parent, navigation) {
        this.__parent = parent;
        this.__navigation = navigation;
        this.__removingListeners = removingListeners;
    }

    control() {
        this.__navigation.listeners = this.__createListeners();
        this.__navigation.addListeners();
    }

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

    __createListeners() {
        return {
            backButton: {
                type: 'click',
                listener: this.__listenerBackClick.bind(this)
            }
        };
    }

    __openLanding() {
        this.__removingListeners();
        const landing = new Landing(this.__parent);
        landing.render();
    }

    __getActions() {
        return {
            backClick: {
                open: this.__openLanding.bind(this)
            }
        };
    }
}