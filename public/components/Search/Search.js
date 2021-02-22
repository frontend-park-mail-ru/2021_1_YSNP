export class Search {
    constructor(parent) {
        this.__parent = parent;
        this.__listeners = {};
    }

    get listeners() {
        return this.__listeners;
    }

    set listeners(val) {
        this.__listeners = val;
    }

    addListeners() {
        document
            .getElementById('product')
            .addEventListener(this.__listeners.toProduct.type, this.__listeners.toProduct.listener);
    }

    removeListeners() {
        document
            .getElementById('product')
            .removeEventListener(this.__listeners.toProduct.type, this.__listeners.toProduct.listener);
    }

    __getTemplate() {
        return `
            <a href="/product" id="product">Product</a>
        `;
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);

        this.addListeners();
    }
}
