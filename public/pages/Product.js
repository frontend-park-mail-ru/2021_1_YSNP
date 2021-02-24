'use strict';

import {Header} from '../components/Header/Header.js';
import {Profile} from './Profile.js';
import {Landing} from './Landing.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {Board} from '../components/Board/Board.js';

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
     * listener for profile page
     * @param {Event} ev - event
     * @this {Product}
     * @public
     */
    listenerToProfile(ev) {
        ev.preventDefault();

        this.__header.removeListeners();
        this.__navigation.removeListeners();
        this.__board.removeListeners();
        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * @author Ivan Gorshkov
     * listener for previous page
     * @param {Event} ev - event
     * @this {Product}
     * @public
     */
    listenerToBack(ev) {
        ev.preventDefault();
        this.__navigation.removeListeners();
        this.__header.removeListeners();
        this.__board.removeListeners();
        const landing = new Landing(this.__parent);
        landing.render();
    }

    /***
     * @author Ivan Gorshkov
     * func for create object of listeners
     * @return {{backBtn: {toBack: {listener: *, type: string}}, header: {toProductCreate: {listener: *, type: string}}}}
     * @this {Product}
     * @private
     */
    __createListeners() {
        return {
            header: {
                toProductCreate: {
                    type: 'click',
                    listener: this.listenerToProfile.bind(this)
                }
            },
            backBtn: {
                toBack: {
                    type: 'click',
                    listener: this.listenerToBack.bind(this)
                }
            }
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
        const listeners = this.__createListeners();

        this.__header = new Header(this.__parent, {location: 'Москва'});
        this.__header.listeners = listeners.header;
        this.__header.render();


        this.__navigation = new Navigation(this.__parent, 'В результаты поиска', {route: ['С пробегом', 'Mercedes-Benz']});
        this.__navigation.listeners = listeners.backBtn;
        this.__navigation.render();

        this.__board = new Board(this.__parent, {identity: {id: 2099347381, title: 'Mercedes-Benz S-класс, 2014'}});
        this.__board.render();
    }
}
