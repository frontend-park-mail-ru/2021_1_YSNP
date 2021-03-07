/***
 * Search box on main page
 */
export class Search {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} data - element data
     * @param {Object} listeners - component listeners
     */
    constructor(parent, data, listeners = {}) {
        this.__parent = parent;
        this.__data = data;
        this.__listeners = listeners;
    }

    /***
     * Get listeners
     * @returns {Object}
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * Set listeners
     * @param {Object} val - listener to set
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * Add component listeners
     */
    addListeners() {
        // document
        //     .getElementById('profile-menu')
        //     .addEventListener(this.__listeners.profileClick.type, this.__listeners.profileClick.listener);
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        // document
        //     .getElementById('profile-menu')
        //     .removeEventListener(this.__listeners.profileClick.type, this.__listeners.profileClick.listener);
    }

    /***
     * Component HTML
     * @returns {string} - html layout
     * @private
     */
    __getTemplate() {
        return `
            <div class="">
                
            </div>
`;
    }

    /***
     * Add component to parent
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}