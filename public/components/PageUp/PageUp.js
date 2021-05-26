import pageUpTemplate from './PageUp.hbs';
import './PageUp.scss';

import {sentryManager} from '../../modules/sentry';

/***
 * Page up component
 */
export class PageUp {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;

        this.__upImg = '/img/svg/page-up.svg';
        this.__downImg = 'img/svg/page-down.svg';
    }

    /***
     * Set up img and text
     */
    setUp() {
        this.__getImg().src = this.__upImg;
        this.__getText().innerText = 'Наверх';
    }

    /***
     * Set down img and text
     */
    setDown() {
        this.__getImg().src = this.__downImg;
        this.__getText().innerText = 'Вниз';
    }

    /***
     * Unable component
     */
    unable() {
        this.__getPageUp().classList.remove('page-up__disabled');
    }

    /***
     * Disable component
     */
    disable() {
        this.__getPageUp().classList.add('page-up__disabled');
    }

    /***
     * Get img Element
     * @returns {HTMLElement}
     * @private
     */
    __getImg() {
        return document
            .getElementById('page-up-img');
    }

    /***
     * Get text element
     * @returns {HTMLElement}
     * @private
     */
    __getText() {
        return document
            .getElementById('page-up-text');
    }

    /***
     * Get page up element
     * @returns {HTMLElement}
     * @private
     */
    __getPageUp() {
        return document
            .getElementById('page-up');
    }

    /***
     * Add listeners
     */
    __addListeners() {
        this.__getPageUp().addEventListener(this.__context.pageUpClick.type, this.__context.pageUpClick.listener);
    }

    /***
     * Remove listeners
     * @private
     */
    __removeListeners() {
        this.__getPageUp().removeEventListener(this.__context.pageUpClick.type, this.__context.pageUpClick.listener);
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', pageUpTemplate());
            this.__addListeners();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }

    /***
     * Remove component from parent
     */
    remove() {
        try {
            this.__removeListeners();
            this.__getPageUp().remove();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}