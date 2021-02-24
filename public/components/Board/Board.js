'use strict';

import {InfoCard} from './InfoCard/InfoCard.js';
import {Slider} from './Carousel/Carousel.js';
import {Description} from './Description/Description.js';
import {Map} from './Map/Map.js';

export class Board {
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
    }

    get __getId() {
        return this.__data.identity.id;
    }

    get __getTitle() {
        return this.__data.identity.title;
    }

    __getTemplate() {
        return `           
           <div class="board">
               <div class="board--title">
                   <p class="board--title__product-id">№ ${this.__getId}</p>
                   <p class="board--title__product-name">${this.__getTitle}</p>
               </div>
               <div class="board--inner">
                   <div class="board--inner--left-side"  id="board--left-side">
                   </div>
                   <div class="board--inner--right-side" id="board--right-side">
                   </div>
               </div>
           </div>
        `;
    }

    listenerToNext(ev) {
        ev.preventDefault();
        this.__carousel.rotateForward();
        const prevButton = document.getElementById('prev'),
            nextButton = document.getElementById('next');
        prevButton.classList.add('ThisLink');
        nextButton.classList.add('ThisLink');
        console.log(prevButton, nextButton);
        const carousel = document.getElementById('carousel');
        this.__carousel.animate(-this.__carousel.__carousel.rowHeight, 0, () => {
            carousel.style.top = '0';
            prevButton.classList.remove('ThisLink');
            nextButton.classList.remove('ThisLink');
        });
    }

    listenerToBack(ev) {
        ev.preventDefault();
        const prevButton = document.getElementById('prev'),
            nextButton = document.getElementById('next');
        prevButton.classList.add('ThisLink');
        nextButton.classList.add('ThisLink');
        const carousel = document.getElementById('carousel');
        this.__carousel.animate(0, -this.__carousel.__carousel.rowHeight, () => {
            this.__carousel.rotateBackward();
            carousel.style.top = '0';
            prevButton.classList.remove('ThisLink');
            nextButton.classList.remove('ThisLink');
        });
    }

    __createListeners() {
        return {
            scrolling: {
                toNext: {
                    type: 'click',
                    listener: this.listenerToBack.bind(this)
                },
                toBack: {
                    type: 'click',
                    listener: this.listenerToNext.bind(this)
                }
            }
        };
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
        const parentRightSide = document.getElementById('board--right-side');
        const parentLeftSide = document.getElementById('board--left-side');

        this.__infoCard = new InfoCard(parentRightSide, {infoCard: {price: 3990000, name: 'Екатерина П.', rating: 4.1, views: 72358,
             likes: 2123, date: '11 февраля в 11:17'}});
        this.__infoCard.render();

        const listeners = this.__createListeners();
        this.__carousel = new Slider(parentLeftSide, {photos: ['../../../img/pic1.jpeg', '../../../img/pic2.jpeg', '../../../img/pic3.jpeg', '../../../img/pic4.jpeg', '../../../img/pic5.jpeg', '../../../img/pic6.jpeg', '../../../img/pic7.jpeg']});
        this.__carousel.listeners = listeners.scrolling;
        this.__carousel.render();

        this.__description = new Description(parentLeftSide, { description:
            [
                 {
                 title: 'Описание',
                 text: `Идеальное состояние, самая максимально возможная комплектация. Сделан рестайлинг полностью из оригинальных запчастей AMG63. Выхлопная система тоже AMG63. 1000% всё оригинал. Автомобиль полностью обслужен и не требует не рубля вложений. Вся ходовая новая, пневмо новая, все масла во всех агрегатах заменяны вместе с фильтрами. Колодки новые.
АВТОМОБИЛЬ НЕ ТРЕБУЕТ НЕ РУБЛЯ ВЛОЖЕНИЙ!

Комплект летних дисков с резиной R20 от W222 ОРИГИНАЛ.`
                 },
                {
                    title: 'Категория',
                    text: 'Автомобиль'
                },
                {
                    title: 'Подкатегория',
                    text: 'С пробегом'
                },
                {
                title: 'Адрес',
                text: 'Москва, Профсоюзная улица, 132к2, Коньково'
                }
            ]
        });
        this.__description.render();

        this.__map = new Map(parentLeftSide);
        this.__map.render();
    }
}
