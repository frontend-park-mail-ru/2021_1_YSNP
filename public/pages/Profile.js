import {Header} from '../components/Header/Header.js';
import {HeaderController} from '../components/Header/HeaderController.js';

import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu.js';

import {Settings} from '../components/Settings/Settings.js';

/***
 * ProfileMenu page
 */
export class Profile {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
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
    async render() {
        this.__parent.innerHTML = '';

        const header = new Header(this.__parent);
        this.__headerController = new HeaderController(this.__removePageListeners.bind(this), this.__parent, header);
        await this.__headerController.control();

        this.__parent.insertAdjacentHTML('beforeend',
            `<div class="profile">
                <div class="profile-box" id="profile">

                </div>
            </div>`);
        const profilePage = document.getElementById('profile');

        // const profile = new ProfileMenu(profilePage, {page: 'settings'});
        // this.__profileController = new ProfileMenuController(this.__removePageListeners.bind(this), this.__parent, profile);
        // await this.__profileController.control();

        // const settings = new Settings(profilePage);
        // this.__settingsController = new SettingsController(this.__removePageListeners.bind(this), this.__parent, settings);
        // await this.__settingsController.control();
    }
}