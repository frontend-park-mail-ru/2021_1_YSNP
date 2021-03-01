'use strict';

export class Footer {

    constructor(parent) {
        this.__parent = parent;
    }

    __getTemplate() {
        return `           
           <div class="footer">
             <hr class="footer-hr"/>
             <div class="footer-inner">
             <div class="footer-content">
                <p>Помощь</p>
                <p>Реклама на koya</p>
                <p>Лицензионное соглашение</p>
             </div>
             <div class="footer-content">
                <p>Безопасность</p>
                <p>О компании</p>
             </div>
             <div class="footer-content">
                <p>г. Москва</p>
                <p>Профиль</p>
                <p>Разместить объявление</p>
             </div>
             <div class="footer-content">
                <p>© 2021 YSNP</p>
             </div>
             </div>
           </div>
        `;
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
