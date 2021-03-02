/***
 * Profile controller
 */
export class ProfileController {
    /***
     * Class constructor
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {Profile} profile - profile
     */
    constructor(pageRemoveListeners, parent, profile) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__profile = profile;
    }

    /***
     * Add listeners
     */
    control() {
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
     * Profile click event
     * @param {Event} ev - event
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
     * @returns {{}}
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
     * Profile settings click callback
     * @private
     */
    __openSettings() {
        // this.__pageRemoveListeners();
        document
            .getElementById('profile-menu-messages')
            .style.color = '#000000';
        document
            .getElementById('profile-menu-settings')
            .style.color = '#2e64f5';
        document
            .getElementById('profile-menu-favorites')
            .style.color = '#000000';
        document
            .getElementById('profile-menu-posts')
            .style.color = '#000000';

        console.log('Click settings page');
    }

    /***
     * Profile favorites click callback
     * @private
     */
    __openFavorites() {
        // this.__pageRemoveListeners();
        document
            .getElementById('profile-menu-messages')
            .style.color = '#000000';
        document
            .getElementById('profile-menu-settings')
            .style.color = '#000000';
        document
            .getElementById('profile-menu-favorites')
            .style.color = '#2e64f5';
        document
            .getElementById('profile-menu-posts')
            .style.color = '#000000';
        console.log('Click favorites page');
    }

    /***
     * Profile my posts click callback
     * @private
     */
    __openPosts() {
        // this.__pageRemoveListeners();
        document
            .getElementById('profile-menu-messages')
            .style.color = '#000000';
        document
            .getElementById('profile-menu-settings')
            .style.color = '#000000';
        document
            .getElementById('profile-menu-favorites')
            .style.color = '#000000';
        document
            .getElementById('profile-menu-posts')
            .style.color = '#2e64f5';
        console.log('Click my posts page');
    }

    /***
     * Profile messages click callback
     * @private
     */
    __openMessages() {
        // this.__pageRemoveListeners();

        document
            .getElementById('profile-menu-messages')
            .style.color = '#2e64f5';
        document
            .getElementById('profile-menu-settings')
            .style.color = '#000000';
        document
            .getElementById('profile-menu-favorites')
            .style.color = '#000000';
        document
            .getElementById('profile-menu-posts')
            .style.color = '#000000';

        console.log('Click messages page');
    }

    /***
     * Profile support click callback
     * @private
     */
    __openSupport() {
        // this.__pageRemoveListeners();

        console.log('Click support page');
    }
}