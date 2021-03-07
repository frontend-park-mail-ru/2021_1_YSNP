/***
 * Search controller
 */
export class SearchController {
    /***
     * Class constructor
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {Search} search - search
     */
    constructor(pageRemoveListeners, parent, search) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__search = search;
    }

    /***
     * Add listeners
     */
    control() {
        this.__search.listeners = this.__createListeners();
        this.__search.addListeners();
    }

    /***
     * Remove Controller listeners
     */
    removeControllerListeners() {
        this.__search.removeListeners();
    }

    /***
     * Search click event
     * @param {Event} ev - event
     * @private
     */
    __listenerSearchClick(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open(ev.target);
                }
            });
    }

    /***
     * Get search listeners
     * @returns {{searchClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            searchClick: {
                type: 'click',
                listener: this.__listenerSearchClick.bind(this)
            }
        };
    }

    /***
     * Get search actions
     * @returns {{}}
     * @private
     */
    __getActions() {
        return {
            searchSettingsClick: {
                open: this.__searchSettings.bind(this)
            },
            searchButtonClick: {
                open: this.__searchButton.bind(this)
            },
            categoryClick: {
                open: this.__openCategoryPage.bind(this)
            }
        };
    }

    /***
     * Search settings click handler
     * @private
     */
    __searchSettings() {
        // this.__pageRemoveListeners();
        //TODO open search settings
        console.log('Click search settings');
    }

    /***
     * Search button click handler
     * @private
     */
    __searchButton() {
        // this.__pageRemoveListeners();
        //TODO go search something
        console.log('Click search button, search: ', document.getElementById('search-input').value);
    }

    /***
     * Open category
     * @private
     */
    __openCategoryPage(target) {
        // this.__pageRemoveListeners();
        //TODO open category page

        console.log('Click category:', target.id);
    }

}

