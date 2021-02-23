'use strict';

import {InfoCard} from './InfoCard/InfoCard.js';
import {Slider} from './Carousel/Carousel.js';

export class Board {
    constructor(parent) {
        this.__parent = parent;
    }


    __getTemplate() {
        return `           
           <div class="board">
               <div class="board--title">
                   <p class="board--title__product-id">№ 2099347381</p>
                   <p class="board--title__product-name">Mercedes-Benz S-класс, 2014</p>
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
        this.__carousel.animate(-this.__carousel.Carousel.rowHeight, 0, () => {
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
        this.__carousel.animate(0, -this.__carousel.Carousel.rowHeight, () => {
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
                    listener: this.listenerToNext.bind(this)
                },
                toBack: {
                    type: 'click',
                    listener: this.listenerToBack.bind(this)
                }
            }
        };
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
        const parentRightSide = document.getElementById('board--right-side');
        const parentLeftSide = document.getElementById('board--left-side');

        const infoCard = new InfoCard(parentRightSide);
        infoCard.render();

        const listeners = this.__createListeners();
        this.__carousel = new Slider(parentLeftSide);
        console.log(listeners);
        this.__carousel.listeners = listeners.scrolling;
        this.__carousel.render();
    }
}
