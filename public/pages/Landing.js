import {Header} from '../components/Header/Header.js';

import {ProductList} from '../components/ProductList/ProductList.js';
import {ProductListController} from '../components/ProductList/ProductListController.js';

import {Profile} from './Profile.js';

/***
 * First (main) page
 */
export class Landing {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Header click callback
     * @param {Event} ev - event
     */
    listenerHeaderClick(ev) {
        ev.preventDefault();
        this.__header.removeListeners();

        const actions = this.__getActions().header;
        Object
            .entries(ev.path)
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open();
                }
            });
    }

    /***
     * Header brand click callback
     * @private
     */
    __openLanding() {
        const landing = new Landing(this.__parent);
        landing.render();
    }

    /***
     * Header map click callback
     * @private
     */
    __openMap() {
        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * Header create product click callback
     * @private
     */
    __openCreateProduct() {
        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * Header account click callback
     * @private
     */
    __openAccount() {
        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * Callback actions
     * @returns {{header: {createProductClick: {open: *}, accountClick: {open: *}, locationClick: {open: *}, brandClick: {open: *}}, productList: {likeClick: {open: *}, cardClick: {open: *}}}}
     * @private
     */
    __getActions() {
        return {
            header: {
                brandClick: {
                    open: this.__openLanding.bind(this)
                },
                locationClick: {
                    open: this.__openMap.bind(this)
                },
                createProductClick: {
                    open: this.__openCreateProduct.bind(this)
                },
                accountClick: {
                    open: this.__openAccount.bind(this)
                }
            }
        };
    }

    /***
     * Page listeners
     * @returns {{header: {headerClick: {listener: *, type: string}}, productList: {productCardClick: {listener: *, type: string}}}}
     * @private
     */
    __createListeners() {
        return {
            header: {
                headerClick: {
                    type: 'click',
                    listener: this.listenerHeaderClick.bind(this)
                }
            }
        };
    }

    /***
     * Test product list data
     * @returns {({date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string})[]}
     * @private
     */
    __getProductListData() {
        return [
            {
                id: '1',
                img: '/img/test-productCart.jpg',
                name: 'Land Rover новый',
                date: '9 февраля 12:07',
                amount: '2 000 &#8381'
            },
            {
                id: '2',
                img: '/img/test-productCart.jpg',
                name: 'Игровой пк',
                date: '9 февраля 12:07',
                amount: '422 000 &#8381'
            },
            {
                id: '3',
                img: '/img/test-productCart.jpg',
                name: 'Дом прикольный',
                date: '9 февраля 12:07',
                amount: '760 000 &#8381'
            },
            {
                id: '4',
                img: '/img/test-productCart.jpg',
                name: 'Apple iphone x',
                date: '9 февраля 12:07',
                amount: '43 000 &#8381'
            },
            {
                id: '5',
                img: '/img/test-productCart.jpg',
                name: 'Honda Shadow Classic 400',
                date: '9 февраля 12:07',
                amount: '434 000 &#8381'
            }
        ];
    }

    /***
     * Add component to parent
     */
    render() {
        this.__parent.innerHTML = '';
        const listeners = this.__createListeners();

        this.__header = new Header(this.__parent, {location: 'Москва'});
        this.__header.listeners = listeners.header;
        this.__header.render();


        const productList = new ProductList(this.__parent, this.__getProductListData());
        this.__productListListeners = new ProductListController(productList);
        this.__productListListeners.control();
    }
}