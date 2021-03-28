
export class Field {
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
    }

    render() {
        this.__parent.insertAdjacentHTML('beforeend', this.__data.template(this.__data));
    }
}