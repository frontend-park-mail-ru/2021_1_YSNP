'use strict';

import {Header} from '../components/Header/Header.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {NavigationController} from '../components/Navigation/NavigationController.js';
import {Board} from '../components/Board/Board.js';
import {BoardController} from '../components/Board/BoardController.js';
import {HeaderController} from '../components/Header/HeaderController.js';

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

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Product}
     * @public
     */
    render() {
        this.__parent.innerHTML = '';

        const header = new Header(this.__parent, {
            isAuth: true,
            user: 'Алехин Сергей',
            avatar: '/img/test-avatar.jpg',
            location: 'Москва'
        });
        header.render();
        this.__headerController = new HeaderController(this.productRemoveListeners.bind(this), this.__parent, header);
        this.__headerController.control();


        const navigation = new Navigation(this.__parent, 'В результаты поиска', {route: ['С пробегом', 'Mercedes-Benz']});
        navigation.render();
        this.__navigationController = new NavigationController(this.productRemoveListeners.bind(this), this.__parent, navigation);
        this.__navigationController.control();


        const board = new Board(this.__parent, {identity: {id: 2099347381, title: 'Mercedes-Benz S-класс, 2014'}});
        board.render();
        this.__boardController = new BoardController(this.__parent, board);
        this.__boardController.control();
    }
}
