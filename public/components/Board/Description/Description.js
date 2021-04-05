import './Description.scss';
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
        this.__ctx = data;
        this.__context();
    }

    /***
     * @author Ivan Gorshkov
     *
     * context for template after reformatting
     * @return {{description: *}}
     * @private
     */
    __reformatContext() {
        this.__data = {
            description: this.__data.description.map((value) => ({
                title: value.title,
                text: value.text.replaceAll('\n', '<br/>')
            }))
        };
        return this.__data;
    }

    /***
     * @author Ivan Gorshkov
     *
     * context before reformat \n tp <br>
     * @this {Description}
     * @private
     */
    __context() {
        this.__data = {
            description: [{
                title: 'Описание',
                text: this.__ctx.__description
            },
            {
                title: 'Категория',
                text: this.__ctx.__category
            },
            {
                title: 'Подкатегория',
                text: 'С пробегом'
            },
            {
                title: 'Адрес',
                text: 'Москва, Профсоюзная улица, 132к2, Коньково'
            }]
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
        this.__parent.insertAdjacentHTML('beforeend', descriptionTemplate(this.__reformatContext()));
    }
}
