'use strict';

export class Board {
    constructor(parent) {
        this.__parent = parent;
    }


    __getTemplate() {
        return `           
           <div class="board">
               
           </div>
        `;
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
