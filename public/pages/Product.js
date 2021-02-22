import {Header} from '../components/Header/Header.js';
import {Profile} from './Profile.js';
import {Landing} from './Landing.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {Board} from '../components/Board/Board.js';


export class Product {
    constructor(parent) {
        this.__parent = parent;
    }

    listenerToProfile(ev) {
        ev.preventDefault();

        this.__header.removeListeners();
        this.__navigation.removeListeners();

        const profile = new Profile(this.__parent);
        profile.render();
    }

    listenerToBack(ev) {
        ev.preventDefault();
        this.__navigation.removeListeners();
        this.__header.removeListeners();
        const landing = new Landing(this.__parent);
        landing.render();
    }

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

    render() {
        this.__parent.innerHTML = '';
        const listeners = this.__createListeners();

        this.__header = new Header(this.__parent, {location: 'Москва'});
        this.__header.listeners = listeners.header;
        this.__header.render();


        this.__navigation = new Navigation(this.__parent, 'В результаты поиска', {route: ['С пробегом', 'Mercedes-Benz']});
        this.__navigation.listeners = listeners.backBtn;
        this.__navigation.render();

        this.__board = new Board(this.__parent);
        this.__board.render();
    }
}
