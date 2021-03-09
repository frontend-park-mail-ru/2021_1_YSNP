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
     * @param {number} id - id of product
     * @constructor
     * @this {Product}
     * @public
     */
    constructor(parent, id) {
        this.__parent = parent;
        this.__id = id;
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
    async render() {
        this.__parent.innerHTML = '';

        this.__header = new Header(this.__parent);
        this.__headerController = new HeaderController(this.productRemoveListeners.bind(this), this.__parent, this.__header);
        await this.__headerController.control();

        const navigation = new Navigation(this.__parent, 'В результаты поиска', {route: ['С пробегом', 'Mercedes-Benz']});
        navigation.render();
        this.__navigationController = new NavigationController(this.productRemoveListeners.bind(this), this.__parent, navigation);
        this.__navigationController.control();

        const board = new Board(this.__parent, {identity: {id: 2099347381, title: 'Mercedes-Benz S-класс, 2014'}});
        // board.render();
        this.__boardController = new BoardController(this.__parent, board, this.__id);
        await this.__boardController.control();

        // const productList = new ProductList(this.__parent, this.__getProductListData());
        // productList.render();
        // this.__productListController = new ProductListController(this.productRemoveListeners.bind(this), this.__parent, productList);
        // this.__productListController.control();
    }
}
