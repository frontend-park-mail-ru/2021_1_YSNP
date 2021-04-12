import {frontUrls} from './frontUrls';

/***
 * Application router
 */
class Router {
    /***
     * Class constructor
     */
    constructor() {
        this.__routes = [];
        this.__addRouterListeners();
    }

    /***
     * Start rote application
     */
    start() {
        const route = this.__routes.find((route) => this.__getCurrentPath().match(route.regExp), this);

        if (route === undefined) {
            this.redirectNotFound();
            return;
        }

        this.__removeListeners = route.callback.call(this, this.__getParamsFromRegExp(route));
    }

    /***
     * Add new route
     * @param {string} url - route url
     * @param {Function} callback - route callback
     */
    add(url, callback) {
        const lowerUrl = url.toLowerCase();
        if (!url.startsWith('/')) {
            throw new Error(`router error: invalid path ${url}; every path should start with /.`);
        }

        this.__routes.forEach((route) => {
            if (lowerUrl === route.url) {
                throw new Error(`router error: route ${url} already exists.`);
            }
        });

        const params = this.__convertParamsToRegExp(lowerUrl);
        const regExp = this.__convertUrlToRegExp(lowerUrl, params);

        this.__routes.push({
            url: lowerUrl,
            callback: callback,
            parameters: params,
            regExp: regExp
        });
    }

    /***
     * Add not found callback
     * @param {Function} callback - not found callback
     */
    addNotFound(callback) {
        this.__notFoundCallback = callback;
    }

    /***
     * Go to previous page
     */
    goBack() {
        window.history.back();
    }

    /***
     * Go to next page
     */
    goForward() {
        window.history.forward();
    }

    /***
     * Go back from navigation bar
     */
    navigateBack() {
        if (this.historyLength() === 2) {
            this.redirect(frontUrls.main);
            return;
        }

        this.goBack();
    }

    /***
     * count of history stack
     * @return {number}
     */
    historyLength() {
        return window.history.length;
    }

    /***
     * Redirect to url
     * @param {string} url - redirect url
     * @param {string} title - redirect title
     * @param {Object} state - redirect state
     */
    redirect(url, title = '', state = {}) {
        this.__removePageListeners();

        window.history.pushState(state, title, url);
        return this.start();
    }


    /***
     * Push state without redirect
     * @param {string} url - redirect url
     * @param {string} title - redirect title
     * @param {Object} state - redirect state
     */
    pushState(url, title = '', state = {}) {
        window.history.pushState(state, title, url);
    }

    /***
     * Redirect current page
     */
    redirectCurrent() {
        this.redirect(this.__getCurrentPath());
    }

    /***
     * Redirect not found
     */
    redirectNotFound() {
        this.__removePageListeners();

        this.__removeNotFoundListeners = this.__notFoundCallback();
    }


    /***
     * Set page state
     * @param {Object} state - page state
     */
    setState(state) {
        const title = '';
        window.history.replaceState(state, title, this.__getCurrentPath());
    }

    /***
     * Get page state
     * @returns {Object}
     */
    getState() {
        return window.history.state;
    }

    /***
     * Remove page listeners
     * @private
     */
    __removePageListeners() {
        if (this.__removeListeners) {
            this.__removeListeners();
            this.__removeListeners = undefined;
        }

        if (this.__removeNotFoundListeners) {
            this.__removeNotFoundListeners();
            this.__removeNotFoundListeners = undefined;
        }
    }

    /***
     * Get parameters from route
     * @param route
     * @returns {{}|{parameters: {}}}
     * @private
     */
    __getParamsFromRegExp(route) {
        const emptyLength = 0;
        if (route.parameters.length === emptyLength) {
            return {};
        }

        const routeMatched = this.__getCurrentPath().match(route.regExp);
        if (!routeMatched) {
            return {};
        }
        routeMatched.shift();

        const params = routeMatched.reduce((accum, param, i) => {
            const key = route.parameters[i].name;
            accum[key] = param;
            return accum;
        }, {});

        return {
            parameters: params
        };
    }

    /***
     * Convert url to regular expression
     * @param {string} url - route url
     * @param {Array} parameters - route parameters
     * @returns {RegExp}
     * @private
     */
    __convertUrlToRegExp(url, parameters) {
        let regExp = url
            .replace(/\//g, '\\/')
            .replace(/\./g, '\\.')
            .replace('/', '/?');

        if (this.__hasParameters(url)) {
            regExp = regExp.replace(/{\w+}/g, (param) => {
                const paramName = param
                    .replace('{', '')
                    .replace('}', '');

                return parameters.find((p) => p.name === paramName).value.regExp;
            });
        }

        return new RegExp(`^${regExp}$`);
    }

    /***
     * Convert parameters to regular expression
     * @param url
     * @returns {*[]|*}
     * @private
     */
    __convertParamsToRegExp(url) {
        if (this.__hasParameters(url)) {
            const params = url.match(/\{\w+\}/g);
            return params.reduce((accum, param) => {
                const paramName = param
                    .replace('{', '')
                    .replace('}', '');

                accum.push({
                    name: paramName,
                    value: {
                        regExp: '([^\\/]+)',
                        value: null
                    }
                });

                return accum;
            }, []);
        }

        return [];
    }

    /***
     * Check thar url has parameters
     * @param {string} url - url
     * @returns {boolean}
     * @private
     */
    __hasParameters(url) {
        const search = /{\w+}/g;
        return search.test(url);
    }

    /***
     * Get current page path
     * @returns {string}
     * @private
     */
    __getCurrentPath() {
        return window.location.pathname;
    }

    /***
     * Redirect event
     * @param {MouseEvent} ev - mouse event
     */
    redirectEvent(ev) {
        if (ev.target instanceof HTMLAnchorElement && ev.target.pathname !== '') {
            ev.preventDefault();

            this.redirect(ev.target.pathname);
        }

        if (ev.target.parentElement instanceof HTMLAnchorElement && ev.target.pathname !== '') {
            ev.preventDefault();

            this.redirect(ev.target.parentElement.pathname);
        }
    }

    /***
     * Add route listeners
     * @private
     */
    __addRouterListeners() {
        // if (!window.PopStateEvent && !('pushState' in history)) {
        //     return;
        // }

        window.addEventListener('click', (ev) => {
            this.redirectEvent(ev);
        });

        window.addEventListener('popstate', () => {
            this.start();
        });
    }
}

export const router = new Router();