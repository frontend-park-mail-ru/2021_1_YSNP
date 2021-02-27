'use strict';

/***
 * @author Ivan Gorshkov
 * Navigation class for top navigation
 * @class Navigation
 */
export class Navigation {

    /***
     * @author Ivan Gorshkov
     * init of class Navigation
     * @param {HTMLElement} parent - parent element
     * @param {string} title - title for back button
     * @param {Object} route - route to current product
     * @constructor
     * @this {Navigation}
     * @public
     */
    constructor(parent, title, route) {
        this.__parent = parent;
        this.__title = title;
        this.__route = route;
    }

    /***
     * @author Ivan Gorshkov
     *
     * get string of route to product
     * @this {Navigation}
     * @private
     * @readonly
     * @return  {string} return string with route
     */
    get route() {
        let text = '';
        this.__route.route.forEach((value) => {
            text += ` • ${value}`;
        });
        return text;
    }

    /***
     * @author Ivan Gorshkov
     *
     * get Navigation listeners
     * @this {Navigation}
     * @private
     * @return  {string} return part of html
     */
    __getTemplate() {
        return `           
           <div class="navigation">
             <div class="navigation-inner">
                <span class="navigation-back" id="navigate-back" data-action="backClick">
                    <svg class="navigation-back__img" width="23" height="8" viewBox="0 0 23 8" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.5" d="M0.646447 3.64644C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976309 4.7308 0.659727 4.53553 0.464464C4.34027 0.269202 4.02369 0.269202 3.82843 0.464464L0.646447 3.64644ZM23 3.5L1 3.5L1 4.5L23 4.5L23 3.5Z" fill="black"/> </svg>
                    <a class="navigation-back__title">${this.__title}</a>
                </span>
                <span class="navigation__route">${this.route}</span>
             </div>
           </div>
        `;
    }

    /***
     * @author Ivan Gorshkov
     *
     * get Navigation listeners
     * @this {Navigation}
     * @private
     * @readonly
     * @return  {Object[]} array of listeners
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Set new listeners
     * @this {Navigation}
     * @param  {Object[]} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add listeners from component
     * @private
     * @this {Slider}
     */
    addListeners() {
        document
            .getElementById('navigate-back')
            .addEventListener(this.listeners.backButton.type, this.listeners.backButton.listener);
    }

    /***
     * @author Ivan Gorshkov
     *
     * Remove listeners from component
     * @this {Navigation}
     * @public
     */
    removeListeners() {
        document
            .getElementById('navigate-back')
            .removeEventListener(this.listeners.backButton.type, this.listeners.backButton.listener);
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Navigation}
     * @public
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
