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
            fields += `<div class="product-des form-spacing">
                <div class="product-des-topic">
                    <p class="product-des-topic__title">${element.title}</p>
                </div>
                <div class="product-des-inner">
                    <input class="reg-panel__textfield" data-action="${element.dataAction}" id="${element.id}" type="${element.inputType}" placeholder="${element.placeholder}" name="${element.id}"/>
                </div>
            </div>`;
        }

        return fields;
    }

    __getTemplate() {
        return `           
           <div class="board">
               <div class="board--title">
                   <p class="reg-panel--title__product-name">Регистрация</p>
               </div>
               
               <form id="registrationForm">
                    ${this.__drawForm()}
            <div class="product-des">
                <div class="product-des-topic">
                
                </div>
                <div class="product-des-inner">
                  <input class="header-right__create-button reg__button" data-action="clickRegistration" type="submit" id="register" value="Зарегистрироваться"/>
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

        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.registrationClick.type, this.listeners.registrationClick.listener);
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
