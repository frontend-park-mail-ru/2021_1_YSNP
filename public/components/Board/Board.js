'use strict';

import {InfoCard} from './InfoCard/InfoCard.js';

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
                   <div class="board--inner--left-side">
                   </div>
                   <div class="board--inner--right-side" id="board--right-side">
                   </div>
               </div>
           </div>
        `;
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
        const parentRightSide = document.getElementById('board--right-side');

        const infoCard = new InfoCard(parentRightSide);
        infoCard.render();
    }
}
