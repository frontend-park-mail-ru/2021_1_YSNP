'use strict';


export class BoardController {

    constructor(parent, board) {
        this.__parent = parent;
        this.__board = board;
    }

    __listenerToNext(ev) {
        console.log(ev);
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

    __listenerToBack(ev) {
        console.log(ev);
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

    __listenerScrollingClick(ev) {
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

    __createListeners() {
        return {
            scrolling: {
                type: 'click',
                listener: this.__listenerScrollingClick.bind(this)
            }
        };
    }

    control() {
        this.__board.listenersTMP(this.__createListeners());
        this.__board.addListeners();
    }

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
            }
        };
    }
}