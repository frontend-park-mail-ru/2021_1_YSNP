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
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * @author Ivan Gorshkov
     * main template of component
     * @return {string}
     * @private
     * @this {RegistrationPanel}
     */
    __getTemplate() {
        return `           
           <div class="reg-panel">
               <div class="reg-panel--title">
                   <p class="reg-panel--title__product-name">Регистрация</p>
               </div>
               
            <div class="product--description">
                <div class="product--description--topic">
                    <p class="product--description--description__title">Имя</p>
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"> <input type="text" placeholder="Имя"/></p>
                </div>
            </div>
            
            <div class="product--description">
                <div class="product--description--topic">
                    <p class="product--description--description__title">Фамилия</p>
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"> <input type="text" placeholder="Фамилия"/></p>
                </div>
            </div>
            
            <div class="product--description">
                <div class="product--description--topic">
                    <p class="product--description--description__title">Телефон</p>
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"> <input type="text" placeholder="Телефон"/></p>
                </div>
            </div>
            <div class="product--description">
                <div class="product--description--topic">
                    <p class="product--description--description__title">Почта</p>
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"> <input type="email" placeholder="Почта"/></p>
                </div>
            </div>
            <div class="product--description">
                <div class="product--description--topic">
                    <p class="product--description--description__title">Пароль</p>
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"> <input type="password" placeholder="Пароль"/></p>
                </div>
            </div>
            
            <div class="product--description">
                <div class="product--description--topic">
                    <p class="product--description--description__title">Повторите пароль</p>
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"> <input type="password" placeholder="Пароль"/></p>
                </div>
            </div>
            
            
            <div class="product--description">
                <div class="product--description--topic">
                    <p class="product--description--description__title">Дата рождения</p>
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"> <input type="date"/></p>
                </div>
            </div>
           </div>
        `;
    }


    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {RegistrationPanel}
     * @public
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
