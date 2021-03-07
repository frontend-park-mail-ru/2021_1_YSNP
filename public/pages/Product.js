'use strict';

import {Header} from '../components/Header/Header.js';
import {HeaderController} from '../components/Header/HeaderController.js';

import {Navigation} from '../components/Navigation/Navigation.js';
import {NavigationController} from '../components/Navigation/NavigationController.js';

import {Board} from '../components/Board/Board.js';
import {BoardController} from '../components/Board/BoardController.js';

import {ProductList} from '../components/ProductList/ProductList.js';
import {ProductListController} from '../components/ProductList/ProductListController.js';

/***
 * @author Ivan Gorshkov
 * Product class for product page
 * @class Product
 */
export class Product {

    /***
     * @author Ivan Gorshkov
     *
     * init of class Product
     * @param {HTMLElement} parent - parent element
     * @constructor
     * @this {Product}
     * @public
     */
    constructor(parent) {
        this.__parent = parent;
    }


    /***
     * @author Ivan Gorshkov
     *
     * remove listeners
     * @this {Product}
     * @public
     */
    productRemoveListeners() {
        this.__headerController.removeControllerListeners();
        this.__navigationController.removeControllerListeners();
        this.__boardController.removeControllerListeners();
    }

    __getHeaderData() {
        return {
            isAuth: true,
            user: 'Алехин Сергей',
            avatar: '/img/test-avatar.jpg',
            location: 'Москва'
        };
    }

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
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Product}
     * @public
     */
    render() {
        this.__parent.innerHTML = '';

        this.__header = new Header(this.__parent, this.__getHeaderData());
        this.__header.render();
        this.__headerController = new HeaderController(this.productRemoveListeners.bind(this), this.__parent, this.__header);
        this.__headerController.control();


        const navigation = new Navigation(this.__parent, 'В результаты поиска', {route: ['С пробегом', 'Mercedes-Benz']});
        navigation.render();
        this.__navigationController = new NavigationController(this.productRemoveListeners.bind(this), this.__parent, navigation);
        this.__navigationController.control();


        const board = new Board(this.__parent, {identity: {id: 2099347381, title: 'Mercedes-Benz S-класс, 2014'}});
        board.render();
        this.__boardController = new BoardController(this.__parent, board);
        this.__boardController.control();

        // const productList = new ProductList(this.__parent, this.__getProductListData());
        // productList.render();
        // this.__productListController = new ProductListController(this.productRemoveListeners.bind(this), this.__parent, productList);
        // this.__productListController.control();
    }
}
