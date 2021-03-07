'use strict';

import { ProductModel } from '../../models/ProductModel.js';

/***
 * @author Ivan Gorshkov
 *
 * BoardController control events of board and board component
 * @class BoardController
 */
export class BoardController {

    /***
     * @author Ivan Gorshkov
     *
     * init of class BoardController
     * @param {HTMLElement} parent - parent component
     * @param {Board} board - control component
     * @constructor
     * @this {BoardController}
     * @public
     */
    constructor(parent, board, id) {
        this.__parent = parent;
        this.__board = board;
        this.__id = id;
        this.__model = new ProductModel({id: this.__id});
    }

    /***
     * @author Ivan Gorshkov
     * listener for tern next picture
     * @this {BoardController}
     * @private
     */
    __listenerToNext() {
        this.__board.__carousel.rotateForward();
        const scrollingPanel = document.getElementById('sliderPanel');
        scrollingPanel.classList.add('button_disabled');
        const carousel = document.getElementById('carousel');

        // eslint-disable-next-line no-magic-numbers
        this.__board.__carousel.animate(-this.__board.__carousel.__carousel.rowHeight, 0, () => {
            carousel.style.top = '0';
            scrollingPanel.classList.remove('button_disabled');
        });
    }

    /***
     * @author Ivan Gorshkov
     * listener for tern previous picture
     * @this {BoardController}
     * @private
     */
    __listenerToBack() {
        const scrollingPanel = document.getElementById('sliderPanel');
        scrollingPanel.classList.add('button_disabled');
        const carousel = document.getElementById('carousel');

        // eslint-disable-next-line no-magic-numbers
        this.__board.__carousel.animate(0, -this.__board.__carousel.__carousel.rowHeight, () => {
            this.__board.__carousel.rotateBackward();
            carousel.style.top = '0';
            scrollingPanel.classList.remove('button_disabled');
        });
    }

    /***
     * @author Ivan Gorshkov
     *
     * listener for select photo
     * @private
     * @this {BoardController}
     * @param {MouseEvent} ev - event
     */
    __listenerSelectImage(ev) {
        ev.preventDefault();
        const elem = document.getElementById('pic');
        elem.src = ev.target.src;
        const carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img');
        for (let i = 0; i < images.length; ++i) {
            images[i].style.opacity = '0.3';
        }
        ev.target.style.opacity = '1.0';
    }

    /***
     * @author Ivan Gorshkov
     *
     * main listener
     * @private
     * @this {BoardController}
     * @param {MouseEvent} ev - event
     */
    __listenerBoardClick(ev) {
        ev.preventDefault();
        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open(ev);
                }
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {BoardController}
     * @return {{board: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            board: {
                type: 'click',
                listener: this.__listenerBoardClick.bind(this)
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * set listeners to all components
     * @this {BoardController}
     * @public
     */
   async control() {
        await this.__model.update();
        this.__board.data = this.__model.getData();
        this.__board.render();

        this.__board.listeners(this.__createListeners());
        this.__board.addListeners();
    }

    /***
     * Remove Controller listeners
     */
    removeControllerListeners() {
        this.__board.removeListeners();
    }

    /***
     * @author Ivan Gorshkov
     * listener to show number
     * @this {BoardController}
     * @private
     */
    __listenerShowNumber() {
        // TODO(Ivan) release __listenerShowNumber
        console.log('number');
    }

    /***
     * @author Ivan Gorshkov
     * listener for write massage
     * @this {BoardController}
     * @private
     */
    __listenerWriteMassage() {
        // TODO(Ivan) release __listenerWriteMassage
        console.log('massage');
    }

    /***
     * @author Ivan Gorshkov
     *
     * Object with all actions
     * @return {{selectClick: {open: *}, backClick: {open: *}, nextClick: {open: *}}}
     * @this {BoardController}
     * @private
     */
    __getActions() {
        return {
            nextClick: {
                open: this.__listenerToNext.bind(this)
            },
            backClick: {
                open: this.__listenerToBack.bind(this)
            },
            selectClick: {
                open: this.__listenerSelectImage.bind(this)
            },
            numberCLick: {
                open: this.__listenerShowNumber.bind(this)
            },
            massageClick: {
                open: this.__listenerWriteMassage.bind(this)
            }
        };
    }
}