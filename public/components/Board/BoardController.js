'use strict';

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
     * @param{HTMLElement} parent - parent component
     * @param{Board} board - control component
     * @constructor
     * @this {BoardController}
     * @public
     */
    constructor(parent, board) {
        this.__parent = parent;
        this.__board = board;
    }

    /***
     * @author Ivan Gorshkov
     * listener for tern next picture
     * @this {BoardController}
     * @private
     */
    __listenerToNext() {
        this.__board.__carousel.rotateForward();
        const prevButton = document.getElementById('prev'),
            nextButton = document.getElementById('next');
        prevButton.classList.add('button_disabled');
        nextButton.classList.add('button_disabled');
        const carousel = document.getElementById('carousel');
        this.__board.__carousel.animate(-this.__board.__carousel.__carousel.rowHeight, 0, () => {
            carousel.style.top = '0';
            prevButton.classList.remove('button_disabled');
            nextButton.classList.remove('button_disabled');
        });
    }

    /***
     * @author Ivan Gorshkov
     * listener for tern previous picture
     * @this {BoardController}
     * @private
     */
    __listenerToBack() {
        const prevButton = document.getElementById('prev'),
              nextButton = document.getElementById('next');
        prevButton.classList.add('button_disabled');
        nextButton.classList.add('button_disabled');
        const carousel = document.getElementById('carousel');
        this.__board.__carousel.animate(0, -this.__board.__carousel.__carousel.rowHeight, () => {
            this.__board.__carousel.rotateBackward();
            carousel.style.top = '0';
            prevButton.classList.remove('button_disabled');
            nextButton.classList.remove('button_disabled');
        });
    }


    /***
     * @author Ivan Gorshkov
     *
     * listener for select photo
     * @private
     * @this {BoardController}
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
     * @param{Event} ev - event
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
     * @return {{backButton: {listener: *, type: string}}}
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
    control() {
        this.__board.listeners(this.__createListeners());
        this.__board.addListeners();
    }

    /***
     * @author Ivan Gorshkov
     * listener to show number
     * @this {BoardController}
     * @private
     */
    __listenerShowNumber() {
        console.log('number');
    }

    /***
     * @author Ivan Gorshkov
     * listener for write massage
     * @this {BoardController}
     * @private
     */
    __listenerWriteMassage() {
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