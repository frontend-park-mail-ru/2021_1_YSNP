import {CreateButton} from '../../components/Header/Mobile/CreateButton/CreateButton';
import {EndlessScroll} from './endlessScroll';

import {mobile} from '../mobile';

/***
 * Create button handler
 */
export class CreateButtonHandler {
    /***
     * Class constructor
     * @param callback
     */
    constructor(callback) {
        this.__callback = callback;
        this.__scrollTop = 0;
        this.__isShown = false;

        this.__createButton = new CreateButton(document.getElementById('app'));
        this.__endlessScroll = new EndlessScroll(this.__createListeners().scroll);
    }

    /***
     * Start create button
     */
    start() {
        if (mobile.isMobile()) {
            this.__createButton.render(this.__makeContext());
            this.__endlessScroll.start();
            this.__isShown = true;
        }
    }

    /***
     * Remove create button
     */
    remove() {
        if (this.__isShown) {
            this.__createButton.remove();
            this.__endlessScroll.remove();
            this.__isShown = false;
        }
    }

    /***
     * Handel scroll end
     * @param {DOMRect} clientRect
     * @private
     */
    __scrollEnd(clientRect) {
        if (clientRect.top <= this.__scrollTop && clientRect.top < -20) {
            this.__createButton.disable();
        } else {
            this.__createButton.unable();
        }

        this.__scrollTop = clientRect.top;
    }

    /***
     * Create handler listeners
     * @returns {{scroll: {scrollEnd: *}}}
     * @private
     */
    __createListeners() {
        return {
            scroll: {
                scrollEnd: this.__scrollEnd.bind(this)
            }
        };
    }

    /***
     * Make component context
     * @returns {{listeners: {createButtonClick: {listener, type: string}}}}
     * @private
     */
    __makeContext() {
        return {
            listeners: {
                createButtonClick: {
                    type: 'click',
                    listener: this.__callback
                }
            }
        };
    }
}