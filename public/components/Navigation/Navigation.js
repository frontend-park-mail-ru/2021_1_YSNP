import './Navigation.scss';
import navigationTemplate from './Navigation.hbs';

/***
 * @author Ivan Gorshkov
 *
 * Navigation class for top navigation
 * @class Navigation
 */
export class Navigation {

    /***
     * @author Ivan Gorshkov
     *
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
     * @return {string} return string with route
     */
    __getRoute() {
        return this.__route.route.reduce(((previousValue, currentValue) => `${previousValue} • ${currentValue}`), '');
    }


    /***
     * @author Ivan Gorshkov
     *
     * get Navigation listeners
     * @this {Navigation}
     * @private
     * @readonly
     * @return {Object} array of listeners
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Set new listeners
     * @this {Navigation}
     * @param  {Object} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add listeners from component
     * @public
     * @this {Slider}
     */
    addListeners() {
        document
            .getElementById('navigate-back')
            .addEventListener(this.listeners.backClick.type, this.listeners.backClick.listener);
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
            .removeEventListener(this.listeners.backClick.type, this.listeners.backClick.listener);
    }

    /***
     * @author Ivan Gorshkov
     *
     * context for template
     * @return {{route: string, title: string}}
     * @private
     */
    __context() {
        return {
            title: this.__title,
            route: this.__getRoute()
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Navigation}
     * @public
     */
    render(ctx) {
        this.listeners = ctx.navigation.listeners;
        this.__parent.insertAdjacentHTML('beforeend', navigationTemplate(this.__context()));
        this.addListeners();
    }
}