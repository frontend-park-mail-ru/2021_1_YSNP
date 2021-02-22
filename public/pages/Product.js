export class Product {
    constructor(parent) {
        this.__parent = parent;
    }

    render() {
        this.__parent.innerHTML = '';

        this.__parent.insertAdjacentHTML('beforeend', `
            <div>Product</div>
        `);
    }
}