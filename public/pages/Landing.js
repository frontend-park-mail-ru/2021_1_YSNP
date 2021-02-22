import {Header} from '../components/Header/Header.js';
import {Search} from '../components/Search/Search.js';

import {Product} from './Product.js';
import {Profile} from './Profile.js';

export class Landing {
    constructor(parent) {
        this.__parent = parent;
    }

    listenerToProduct(ev) {
        ev.preventDefault();

        this.__search.removeListeners();

        const product = new Product(this.__parent);
        product.render();
    }

    listenerToProfile(ev) {
        ev.preventDefault();

        this.__header.removeListeners();

        const profile = new Profile(this.__parent);
        profile.render();
    }

    __createListeners() {
        return {
            header: {
                toProductCreate: {
                    type: 'click',
                    listener: this.listenerToProfile.bind(this)
                }
            },
            search: {
                toProduct: {
                    type: 'click',
                    listener: this.listenerToProduct.bind(this)
                }
            }
        };
    }

    render() {
        this.__parent.innerHTML = '';
        const listeners = this.__createListeners();

        this.__header = new Header(this.__parent, {location: 'Москва'});
        this.__header.listeners = listeners.header;
        this.__header.render();

        this.__search = new Search(this.__parent);
        this.__search.listeners = listeners.search;
        this.__search.render();
    }
}