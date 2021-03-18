import './Description.css';
import descriptionTemplate from './Description.hbs';

/***
 * @author Ivan Gorshkov
 * Description class for product description
 * @class Description
 */
export class Description {

    /***
     * @author Ivan Gorshkov
     *
     * init of class Description
     * @param {HTMLElement} parent - parent element
     * @param {Object} data - JSON Object
     * @constructor
     * @this {Description}
     * @public
     */
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
    }

    /***
     * @author Ivan Gorshkov
     *
     * context for template
     * @return {{description: *}}
     * @private
     */
    __context() {
        return {
            description: this.__data.description.map((value) => ({
                    title: value.title,
                    text: value.text.replaceAll('\n', '<br/>')
                }))
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Description}
     * @public
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', descriptionTemplate(this.__context()));
    }
}
