import {ProductCard} from '../ProductCard/ProductCard.js';

export class ProductList {
    constructor(parent, data) {
        this.__parent = parent;
        this.__listeners = {};
        this.__data = data;
    }

    get listeners() {
        return this.__listeners;
    }

    set listeners(val) {
        this.__listeners = val;
    }

    addListeners() {
        document
            .getElementById('product-list')
            .addEventListener(this.__listeners.productCardClick.type, this.__listeners.productCardClick.listener);
    }

    removeListeners() {
        document
            .getElementById('product-list')
            .removeEventListener(this.__listeners.productCardClick.type, this.__listeners.productCardClick.listener);
    }

    __getTemplate() {
        return `
            <div class="product-list" id="product-list">
                <div class="product-list-inner">
                </div>
            </div>
        `;
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);

        const list = document.getElementById('product-list').firstElementChild;
        this.__data.forEach((el) => {
            const productCard = new ProductCard(list, el);
            productCard.render();
        });

        this.addListeners();
    }
}