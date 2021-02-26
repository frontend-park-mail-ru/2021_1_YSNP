'use strict';

/***
 * @author Ivan Gorshkov
 * RegistrationPanel class for contain product
 * @class RegistrationPanel
 */
export class RegistrationPanel {

    /***
     * @author Ivan Gorshkov
     * init of class RegistrationPanel
     * @param {HTMLElement} parent - parent element
     * @param {Object} data - JSON Object
     * @constructor
     * @this {RegistrationPanel}
     * @public
     */
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
    }

    /***
     * @author Ivan Gorshkov
     * main template of component
     * @return {string}
     * @private
     * @this {RegistrationPanel}
     */


    __drawForm() {
        let fields = '';
        for (const prop in this.__data) {
            const element = this.__data[prop];
            fields += `<div class="product--description">
                <div class="product--description--topic">
                    <p class="product--description--description__title">${element.title}</p>
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"><input id="${element.id}" type="${element.inputType}" placeholder="${element.placeholder}" name="${element.id}"/></p>
                </div>
            </div>`;
        }

        return fields;
    }

    __getTemplate() {
        return `           
           <div class="reg-panel">
               <div class="reg-panel--title">
                   <p class="reg-panel--title__product-name">Регистрация</p>
               </div>
               
               <form>
            ${this.__drawForm()}
            <div class="product--description">
                <div class="product--description--topic">
                
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"> <input type="submit" id="register" value="Зарегистрироваться"/></p>
                </div>
            </div>
            
               </form>
           </div>
        `;
    }


    /***
     * @author Ivan Gorshkov
     *
     * get Navigation listeners
     * @this {RegistrationPanel}
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
     * @this {RegistrationPanel}
     * @param  {Object[]} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
    }



    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {RegistrationPanel}
     * @public
     */

    addListeners() {
        for (const prop in this.__data) {
            const element = this.__data[prop];
            document
                .getElementById(element.id)
                .addEventListener(element.listener.type, element.listener.listener);
        }

        document
            .getElementById('register')
            .addEventListener(this.listeners.register.type, this.listeners.register.listener);
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
        this.addListeners();
    }
}
