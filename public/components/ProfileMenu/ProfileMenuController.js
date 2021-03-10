import {SettingsUserData} from '../../models/SettingsUserData.js';

/***
 * ProfileMenu controller
 */
export class ProfileMenuController {
    /***
     * Class constructor
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {ProfileMenu} profile - profile
     */
    constructor(pageRemoveListeners, parent, profile) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__profile = profile;
        this.__model = new SettingsUserData();
    }

    /***
     * Add listeners
     */
    async control() {
        await this.__model.update();
        this.__profile.data = this.__model.getData();
        this.__profile.render();

        this.__profile.listeners = this.__createListeners();
        this.__profile.addListeners();
    }

    /***
     * Remove Controller listeners
     */
    removeControllerListeners() {
        this.__profile.removeListeners();
    }

    /***
     * ProfileMenu click event
     * @param {Event} ev - mouse event
     * @private
     */
    __listenerProfileClick(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open();
                }
            });
    }

    /***
     * Get profile listeners
     * @returns {{pageClick: {listener: *, type: string}, profileClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            profileClick: {
                type: 'click',
                listener: this.__listenerProfileClick.bind(this)
            }
        };
    }

    /***
     * Get profile actions
     * @returns {{favoritesClick: {open: *}, myPostsClick: {open: *}, settingsClick: {open: *}, messagesClick: {open: *}, supportClick: {open: *}}}
     * @private
     */
    __getActions() {
        return {
            settingsClick: {
                open: this.__openSettings.bind(this)
            },
            favoritesClick: {
                open: this.__openFavorites.bind(this)
            },
            myPostsClick: {
                open: this.__openPosts.bind(this)
            },
            messagesClick: {
                open: this.__openMessages.bind(this)
            },
            supportClick: {
                open: this.__openSupport.bind(this)
            }
        };
    }

    /***
     * ProfileMenu settings click callback
     * @private
     */
    __openSettings() {
        // this.__pageRemoveListeners();

        console.log('Click settings page');
    }

    /***
     * ProfileMenu favorites click callback
     * @private
     */
    __openFavorites() {
        // this.__pageRemoveListeners();

        console.log('Click favorites page');
    }

    /***
     * ProfileMenu my posts click callback
     * @private
     */
    __openPosts() {
        // this.__pageRemoveListeners();

        console.log('Click my posts page');
    }

    /***
     * ProfileMenu messages click callback
     * @private
     */
    __openMessages() {
        // this.__pageRemoveListeners();

        console.log('Click messages page');
    }

    /***
     * ProfileMenu support click callback
     * @private
     */
    __openSupport() {
        // this.__pageRemoveListeners();

        console.log('Click support page');
    }
}