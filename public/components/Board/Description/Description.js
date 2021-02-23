'use strict';

export class Description {
    constructor(parent) {
        this.__parent = parent;
    }


    __getTemplate() {
        return `    
    <div class="product-inner">
            <div class="product--description">
                <div class="product--description--topic">
                    <p  class="product--description--description__title">Описание</p>
                </div> 
                <div class="product--description--description">
                    <p class="product--description--description__text">
                    Идеальное состояние, самая максимально возможная комплектация. Сделан рестайлинг полностью из оригинальных запчастей AMG63. Выхлопная система тоже AMG63. 1000% всё оригинал. Автомобиль полностью обслужен и не требует не рубля вложений. Вся ходовая новая, пневмо новая, все масла во всех агрегатах заменяны вместе с фильтрами. Колодки новые.
АВТОМОБИЛЬ НЕ ТРЕБУЕТ НЕ РУБЛЯ ВЛОЖЕНИЙ!

Комплект летних дисков с резиной R20 от W222 ОРИГИНАЛ.
                    </p>
                </div>
            </div>
             <hr class="hr-description"/>
            <div class="product--description">
                <div class="product--description--topic">
                    <p  class="product--description--description__title">Категория</p>
                </div> 
                <div class="product--description--description">
                    <p class="product--description--description__text">Автомобиль</p>
                </div>
            </div>
            <hr class="hr-description"/>
            <div class="product--description">
                <div class="product--description--topic">
                    <p  class="product--description--description__title">Подкатегория</p>
                </div> 
                <div class="product--description--description">
                    <p class="product--description--description__text">С пробегом</p>
                </div>
            </div>
             <hr class="hr-description"/>
            <div class="product--description">
                <div class="product--description--topic">
                    <p  class="product--description--description__title">Адрес</p>
                </div> 
                <div class="product--description--description">
                    <p class="product--description--description__text">Москва, Профсоюзная улица, 132к2,  Коньково</p>
                </div>
            </div>
            <hr class="hr-description"/>
            </div>
        `;
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
