import {Header} from '../components/Header/Header.js';
import {HeaderController} from '../components/Header/HeaderController.js';

import {Profile} from '../components/Profile/Profile.js';
import {ProfileController} from '../components/Profile/ProfileController.js';

import {Settings} from '../components/Settings/Settings.js';
import {SettingsController} from '../components/Settings/SettingsController.js';

/***
 * Profile page
 */
export class ProfilePage {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Test header data
     * @returns {{isAuth: boolean, location: string, avatar: string, user: string}}
     * @private
     */
    __getUserData() {
        return {
            isAuth: true,
            user: 'Алехин Сергей',
            name: 'Сергей',
            surname: 'Алехин',
            patronymic: '',
            // eslint-disable-next-line no-magic-numbers
            birthday: '1999-11-11',
            telephone: '+79998761234',
            email: 'al.ser@ya.ru',
            avatar: '/img/test-avatar.jpg',
            location: 'Москва',
            rate: '4.8'
        };
    }

    /***
     * Remove page listeners
     * @private
     */
    __removePageListeners() {
        this.__headerController.removeControllerListeners();
        this.__profileController.removeControllerListeners();
        this.__settingsController.removeControllerListeners();
    }

    /***
     * Add component to parent
     */
    render() {
        this.__parent.innerHTML = '';

        const header = new Header(this.__parent, this.__getUserData());
        header.render();
        this.__headerController = new HeaderController(this.__removePageListeners.bind(this), this.__parent, header);
        this.__headerController.control();

        this.__parent.insertAdjacentHTML('beforeend',
            `<div class="profile">
                <div class="profile-box" id="profile">

                </div>
            </div>`);
        const profilePage = document.getElementById('profile');

        const profile = new Profile(profilePage, this.__getUserData());
        profile.render();
        this.__profileController = new ProfileController(this.__removePageListeners.bind(this), profilePage, profile);
        this.__profileController.control();

        const settings = new Settings(profilePage, this.__getUserData());
        settings.render();
        this.__settingsController = new SettingsController(this.__removePageListeners.bind(this), profilePage, settings);
        this.__settingsController.control();
    }
}