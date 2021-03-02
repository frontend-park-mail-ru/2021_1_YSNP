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
     * @return {String}
     * @private
     * @this {Description}
     * @readonly
     */
    get __getDescription() {
        const descriptions = this.__data.description;
        let des = '';
        descriptions.forEach((value) => {
            des += `
            <div class="product-des">
                <div class="product-des-topic">
                    <p class="product-des-topic__title">${value.title}</p>
                </div>
                <div class="product-des-inner">
                    <p class="product-des__text"> ${value.text.replaceAll('\n', '<br/>')}</p>
                </div>
            </div>
            <hr class="hr-des"/>
            `;
        });
        return des;
    }

    /***
     * @author Ivan Gorshkov
     *
     * main template of component
     * @return {String}
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
