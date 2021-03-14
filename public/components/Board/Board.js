import './Board.css';

import { InfoCard } from './InfoCard/InfoCard.js';
import { Slider } from './Carousel/Carousel.js';
import { Description } from './Description/Description.js';
import { Map } from './Map/Map.js';

/***
 * @author Ivan Gorshkov
 * Board class for contain product
 * @class Board
 */
export class Board {

    /***
     * @author Ivan Gorshkov
     * init of class Board
     * @param {HTMLElement} parent - parent element
     * @param {Object} data - JSON Object
     * @constructor
     * @this {Board}
     * @public
     */
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter for data product
     * @return {Object}
     * @private
     * @readonly
     * @this {Board}
     */
    get data() {
        return this.__data;
    }

    /***
     * @author Ivan Gorshkov
     *
     * setter for data product
     * @param {Object} data - data of product
     * @this {Board}
     */
    set data(data) {
        this.__data = data;
    }

    /***
     * @author Ivan Gorshkov
     * getter for id product
     * @return {Number}
     * @private
     * @readonly
     * @this {Board}
     */
    get __getId() {
        return this.__data.id;
    }

    /***
     * @author Ivan Gorshkov
     * getter for title of product
     * @return {String}
     * @private
     * @readonly
     * @this {Board}
     */
    get __getTitle() {
        return this.__data.name;
    }

    /***
     * @author Ivan Gorshkov
     * main template of component
     * @return {String}
     * @private
     * @this {Board}
     */
    __getTemplate() {
        return `           
           <div class="board">
               <div class="board-title">
                   <p class="board-title__product-id">№ ${this.__getId}</p>
                   <p class="board-title__product-name">${this.__getTitle}</p>
               </div>
               <div class="board-inner">
                   <div class="board-left"  id="board-left-side"></div>
                   <div class="board-right" id="board-right-side"></div>
               </div>
           </div>
           
           <!--  <div class="same-product">Похожие объявления</div>-->
        `;
    }

    /***
     * @author Ivan Gorshkov
     *
     * add listeners to components
     * @public
     * @this {Board}
     */
    addListeners() {
        this.__carousel.addListeners();
        this.__infoCard.addListeners();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Remove listeners from component
     * @public
     * @this {Board}
     */
    removeListeners() {
        this.__carousel.removeListeners();
        this.__infoCard.removeListeners();
    }

    /***
     * @author Ivan Gorshkov
     *
     * init listeners in components
     * @public
     * @this {Board}
     * @param {Object} val Object of listeners
     */
    listeners(val) {
        this.__carousel.listeners = val;
        this.__infoCard.listeners = val;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Board}
     * @public
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);

        const parentRightSide = document.getElementById('board-right-side');
        const parentLeftSide = document.getElementById('board-left-side');

        this.__infoCard = new InfoCard(parentRightSide, this.__data);
        this.__infoCard.render();


        this.__carousel = new Slider(parentLeftSide, this.__data);
        this.__carousel.render();

        this.__description = new Description(parentLeftSide, {
            description: [{
                    title: 'Описание',
                    text: this.__data.description
                },
                {
                    title: 'Категория',
                    text: this.__data.category
                },
                {
                    title: 'Подкатегория',
                    text: 'С пробегом'
                },
                {
                    title: 'Адрес',
                    text: 'Москва, Профсоюзная улица, 132к2, Коньково'
                }]
        });
        this.__description.render();

        this.__map = new Map(parentLeftSide);
        this.__map.render();
    }
}