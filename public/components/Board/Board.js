import './Board.css';
import boardTemplate from './Board.hbs';
import {InfoCard} from './InfoCard/InfoCard.js';
import {Slider} from './Carousel/Carousel.js';
import {Description} from './Description/Description.js';
import {Map} from './Map/Map.js';

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
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * @author Ivan Gorshkov
     *
     * add listeners to components
     * @public
     * @this {Board}
     */
    addListeners() {
        document
            .getElementById('board')
            .addEventListener(this.listeners.product.type, this.listeners.product.listener);
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


    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Ivan Gorshkov
     *
     * init listeners in components
     * @public
     * @this {Board}
     * @param {Object} val Object of listeners
     */
    set listeners(val) {
        this.__listeners = val;
    }



    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Board}
     * @public
     */
    render(ctx) {
        //  const template = this.__getTemplate();
        this.__context = ctx.product;
        this.listeners = ctx.product.listeners;
        this.__parent.insertAdjacentHTML('beforeend', boardTemplate(this.__context.data));

        const parentRightSide = document.getElementById('board-right-side');
        const parentLeftSide = document.getElementById('board-left-side');
        this.__carousel = new Slider(parentLeftSide, this.__context.data);
        this.__carousel.render();


        this.__description = new Description(parentLeftSide, {
            description: [{
                title: 'Описание',
                text: this.__context.data.__description
            },
                {
                    title: 'Категория',
                    text: this.__context.data.__category
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

        this.__infoCard = new InfoCard(parentRightSide, this.__context.data);
        this.__infoCard.render();



        this.__map = new Map(parentLeftSide);
        this.__map.render();

        this.addListeners();
    }
}