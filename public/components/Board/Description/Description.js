'use strict';

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
     * getter of html with descriptions blocks
     * @return {string}
     * @private
     * @this {Description}
     * @readonly
     */
    get __getDescription() {
        const descriptions = this.__data.description;
        let des = '';
        descriptions.forEach((value) => {
            des += `
            <div class="product--description">
                <div class="product--description--topic">
                    <p class="product--description--description__title">${value.title}</p>
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"> ${value.text.replaceAll('\n', '<br/>')}</p>
                </div>
            </div>
            <hr class="hr-description"/>
            `;
        });
        return des;
    }

    /***
     * @author Ivan Gorshkov
     *
     * main template of component
     * @return {string}
     * @private
     * @this {Description}
     */
    __getTemplate() {
        return `    
             <div class="product-inner">
                ${this.__getDescription}
             </div>
        `;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Description}
     * @public
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
