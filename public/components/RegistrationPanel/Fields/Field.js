/***
 * basic class of Field
 */
export class Field {
    /***
     * @author Ivan Gorshkov
     *
     * init of class Field
     * @param {HTMLElement} parent
     * @param {Object} data
     */
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Field}
     * @public
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', this.__data.template(this.__data));
    }
}