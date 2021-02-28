'use strict';

import {Header} from '../components/Header/Header.js';
import {HeaderController} from '../components/Header/HeaderController.js';

import {Navigation} from '../components/Navigation/Navigation.js';
import {NavigationController} from '../components/Navigation/NavigationController.js';

import {Board} from '../components/Board/Board.js';
import {BoardController} from '../components/Board/BoardController.js';

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
        this.__header.removeListeners();
        this.__navigation.removeListeners();
        this.__board.removeListeners();
    }

    __getHeaderData() {
        return {
            isAuth: true,
            user: 'Алехин Сергей',
            avatar: '/img/test-avatar.jpg',
            location: 'Москва'
        };
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


        this.__navigation = new Navigation(this.__parent, 'В результаты поиска', {route: ['С пробегом', 'Mercedes-Benz']});
        this.__navigation.render();
        this.__navigationController = new NavigationController(this.productRemoveListeners.bind(this), this.__parent, this.__navigation);
        this.__navigationController.control();


        this.__board = new Board(this.__parent, {identity: {id: 2099347381, title: 'Mercedes-Benz S-класс, 2014'}});
        this.__board.render();
        this.__boardController = new BoardController(this.__parent, this.__board);
        this.__boardController.control();
    }
}
