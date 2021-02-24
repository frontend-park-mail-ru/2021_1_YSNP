'use strict';

export class Map {
    constructor(parent) {
        this.__parent = parent;
    }

    __getTemplate() {
        return `   <div id="map">
                   </div>
        `;
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
