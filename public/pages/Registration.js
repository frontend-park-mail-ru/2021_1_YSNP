
import {Header} from '../components/Header/Header.js';
import {Profile} from './Profile.js';
import {Landing} from './Landing.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {RegistrationPanel} from '../components/RegistrationPanel/RegistrationPanel.js';


export class Registration {
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * @author Ivan Gorshkov
     * listener for profile page
     * @param {Event} ev - event
     * @this {Registration}
     * @public
     */
    listenerToProfile(ev) {
        ev.preventDefault();

        this.__header.removeListeners();
        this.__navigation.removeListeners();
        const profile = new Profile(this.__parent);
        profile.render();
    }

    /***
     * @author Ivan Gorshkov
     * listener for previous page
     * @param {Event} ev - event
     * @this {Registration}
     * @public
     */
    listenerToBack(ev) {
        ev.preventDefault();
        this.__navigation.removeListeners();
        this.__header.removeListeners();
        const landing = new Landing(this.__parent);
        landing.render();
    }

    /***
     * @author Ivan Gorshkov
     * func for create object of listeners
     * @return {{backBtn: {toBack: {listener: *, type: string}}, header: {toProductCreate: {listener: *, type: string}}}}
     * @this {Registration}
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

    render() {
        this.__parent.innerHTML = '';
        const listeners = this.__createListeners();
        this.__header = new Header(this.__parent, {location: 'Москва'});
        this.__header.listeners = listeners.header;
        this.__header.render();

        this.__navigation = new Navigation(this.__parent, 'В результаты поиска', {route: ['С пробегом', 'Mercedes-Benz']});
        this.__navigation.listeners = listeners.backBtn;
        this.__navigation.render();

        this.__registrationPanel = new RegistrationPanel(this.__parent);
        this.__registrationPanel.render();
    }
}