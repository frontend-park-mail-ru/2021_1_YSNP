import './Board.scss';
import boardTemplate from './Board.hbs';
import {InfoCard} from './InfoCard/InfoCard.js';
import {Slider} from './Carousel/Slider.js';
import {Description} from './Description/Description.js';
import {Map} from './Map/Map.js';
import {mobile} from '../../modules/mobile';

/***
 * @author Ivan Gorshkov
 *
 * Board class for contain product
 * @class Board
 */
export class Board {

    /***
     * @author Ivan Gorshkov
     *
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
            .getElementById('sliderPanel')
            .addEventListener(this.listeners.product.type, this.listeners.product.listener);
        document
            .getElementById('info-card-btns')
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
        document
            .getElementById('sliderPanel')
            .removeEventListener(this.listeners.product.type, this.listeners.product.listener);
        document
            .getElementById('info-card-btns')
            .addEventListener(this.listeners.product.type, this.listeners.product.listener);
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter listeners
     * @public
     * @this {Board}
     */
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
     * rotateForward carousel
     * @public
     * @this {Board}
     */
    rotateForward() {
        this.__carousel.rotateForward();
        const scrollingPanel = document.getElementById('sliderPanel');
        scrollingPanel.classList.add('button_disabled');
        const carousel = document.getElementById('carousel');
        this.__carousel.animate(-this.__carousel.__carousel.rowHeight, 0, () => {
            carousel.style.top = '0';
            scrollingPanel.classList.remove('button_disabled');
        });

    }


    /***
     * @author Ivan Gorshkov
     *
     * rotateBackward carousel
     * @public
     * @this {Board}
     */
    rotateBackward() {
        this.__carousel.rotateBackward();
        const scrollingPanel = document.getElementById('sliderPanel');
        scrollingPanel.classList.add('button_disabled');
        const carousel = document.getElementById('carousel');
        this.__carousel.animate(0, -this.__carousel.__carousel.rowHeight, () => {
            this.__carousel.rotateBackward();
            carousel.style.top = '0';
            scrollingPanel.classList.remove('button_disabled');
        });
    }


    /***
     * @author Ivan Gorshkov
     *
     * selection picture in slider
     * @public
     * @this {Board}
     * @param {HTMLElement} target - picture
     */
    selectImage(target) {
        const elem = document.getElementById('pic');
        elem.src = target.src;
        const carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img');
        for (let i = 0; i < images.length; ++i) {
            images[i].style.opacity = '0.3';
        }
        target.style.opacity = '1.0';
    }


    /***
     * Show number
     * @param tel
     */
    showNumber(tel) {
        this.__infoCard.showNumber(tel);
    }

    /***
     *
     * get tel
     * @return {string}
     */
    getTelNumber() {
        return this.__infoCard.getTelNumber();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Board}
     * @public
     */
    render(ctx) {
        this.__context = ctx.product;
        this.listeners = ctx.product.listeners;
        this.__parent.insertAdjacentHTML('beforeend', boardTemplate(this.__context.data));

        const parentRightSide = document.getElementById('board-right-side');
        const parentLeftSide = document.getElementById('board-left-side');

        this.__carousel = new Slider(parentLeftSide, this.__context.data);
        this.__carousel.render();

        if (mobile.isMobile()) {
            this.__infoCard = new InfoCard(parentLeftSide, this.__context.data);
            this.__infoCard.render();
        }

        this.__description = new Description(parentLeftSide, this.__context.data);
        this.__description.render();

        if (!mobile.isMobile()) {
            this.__infoCard = new InfoCard(parentRightSide, this.__context.data);
            this.__infoCard.render();
        }

        this.__map = new Map(parentLeftSide);
        this.__map.render(this.__context.data);

        this.addListeners();
    }
}