'use strict';

/***
 * @author Ivan Gorshkov
 * Footer class for render footer of web-app
 * @class Footer
 */
export class Footer {

    /***
     * @author Ivan Gorshkov
     *
     * init of class Footer
     * @param {HTMLElement} parent - parent element
     * @constructor
     * @this {Footer}
     * @public
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * @author Ivan Gorshkov
     *
     * main template of component
     * @return {string}
     * @private
     * @this {Footer}
     */
    __getTemplate() {
        return `           
           <div class="footer">
             <hr class="footer-hr"/>
             <div class="footer-inner">
             <div class="footer-content">
                <p class="footer__link">Помощь</p>
                <p class="footer__link">Реклама на koya</p>
                <p class="footer__link">Лицензионное соглашение</p>
             </div>
             <div class="footer-content">
                <p class="footer__link">Безопасность</p>
                <p class="footer__link">О компании</p>
             </div>
             <div class="footer-content">
                <p class="footer__link">г. Москва</p>
                <p class="footer__link">Профиль</p>
                <p class="footer__link">Разместить объявление</p>
             </div>
             <div class="footer-content">
                <p class="footer__corp">© 2021 YSNP</p>
             </div>
             </div>
           </div>
        `;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Footer}
     * @public
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
