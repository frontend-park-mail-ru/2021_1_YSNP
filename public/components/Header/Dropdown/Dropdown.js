'use strict';

export class Dropdown {
    constructor(parent, data, listeners = undefined) {
        this.__parent = parent;
        this.__listeners = listeners;
        this.__data = data;
    }

    get listeners() {
        return this.__listeners;
    }

    set listeners(val) {
        this.__listeners = val;
    }

    // addListeners() {
    //     document
    //         .getElementById('header')
    //         .addEventListener(this.__listeners.headerClick.type, this.__listeners.headerClick.listener);
    // }
    //
    // removeListeners() {
    //     document
    //         .getElementById('header')
    //         .removeEventListener(this.__listeners.headerClick.type, this.__listeners.headerClick.listener);
    // }

    __getTemplate() {
        return `
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>       
        `;
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
