export class ProductCreate {
    constructor(parent) {
        this.__parent = parent;
    }

    render() {
        this.__parent.innerHTML = '';

        this.__parent.insertAdjacentHTML('beforeend', `
            <div>ProductCreate</div>
        `);
    }
}