/* eslint-disable */

export class Test {
    constructor(parent) {
        this.__parent = parent;
    }

    render() {
        this.__parent.innerHTML = '';
    }
}