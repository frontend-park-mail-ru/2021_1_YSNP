import {Header} from '../components/Header/Header.js';
import {HeaderController} from '../components/Header/HeaderController.js';

import {ProductList} from '../components/ProductList/ProductList.js';
import {ProductListController} from '../components/ProductList/ProductListController.js';

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
     * Test header data
     * @returns {{isAuth: boolean, location: string, avatar: string, user: string}}
     * @private
     */
    __getHeaderData() {
        return {
            isAuth: false,
            user: 'Алехин Сергей',
            avatar: '/img/test-avatar.jpg',
            location: 'Москва'
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
     * Remove page listeners
     * @private
     */
    __removePageListeners() {
        this.__headerController.removeControllerListeners();
        this.__productListController.removeControllerListeners();
    }

    /***
     * Add component to parent
     */
    async render() {
        this.__parent.innerHTML = '';

        const header = new Header(this.__parent);
        // header.render();
        this.__headerController = new HeaderController(this.__removePageListeners.bind(this), this.__parent, header);
        await this.__headerController.control();

        const productList = new ProductList(this.__parent);
        // productList.render();
        this.__productListController = new ProductListController(this.__removePageListeners.bind(this), this.__parent, productList);
        await this.__productListController.control();
    }
}