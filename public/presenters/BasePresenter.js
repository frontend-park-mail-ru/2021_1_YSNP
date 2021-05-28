import {AuthUserModel} from '../models/AuthUserModel.js';
import {user} from '../models/ProfileUserModel.js';

import {eventHandler} from '../modules/handlers/eventHandler.js';
import {parseTelNumber, telMask} from '../modules/layout/mask.js';
import {YandexMap} from '../modules/layout/yandexMap.js';
import {OfflineError, UnauthorizedError} from '../modules/http/httpError.js';

import {router} from '../modules/router.js';
import {frontUrls} from '../modules/urls/frontUrls.js';
import {mobile} from '../modules/mobile';
import {chat} from '../models/ChatModel';
import {customLocalStorage} from '../modules/storage/customLocalStorage';

import {sentryManager} from '../modules/sentry';

/***
 * Base presenter
 */
export class BasePresenter {
    /***
     * Class constructor
     * @param {BaseView} view - presenter view
     */
    constructor(view) {
        this.__view = view;
        this.__userModel = user;
        this.__isShownMap = false;
        this.__isShownAuth = false;
        this.__yaMap = new YandexMap();
        mobile.start(this.__resizeCallback.bind(this));

        this.__authModel = new AuthUserModel();
        this.__chatModel = chat;
        this.__chatModel.updateHeaderCallbackList(this.__createBaseCallbacks());
    }

    /***
     * Update user data
     * @returns {Promise<{data: *, status: number}>}
     */
    async update() {
        return this.__userModel.update()
            .then(() => {
                this.__view.baseContext = this.__makeBaseContext();

                if (this.__userModel.isAuth) {
                    this.__chatModel.updateUserID(this.__userModel.getData().id);
                    return this.__chatModel.connect();
                }

                return Promise.resolve();
            })
            .catch((err) => {
                this.__view.baseContext = this.__makeBaseContext();

                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                if (!UnauthorizedError.isError(err)) {
                    sentryManager.captureException(err);
                }

                this.checkOfflineStatus(err);
            });
    }

    /***
     * Control view
     * @returns {Promise<void>}
     */
    async control() {
        throw new Error('virtual method not initialized!');
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        if (this.__isShownAuth) {
            this.__view.removeAuth();
        }

        if (this.__isShownMap) {
            this.__view.removeMap();
        }

        mobile.remove();
        this.__view.removeHeaderListeners();
    }

    /***
     * Update unread message count
     * @param count
     * @private
     */
    __updateUnreadMessageCountCallback(count) {
        console.log('update', count);
        // this.__view.updateHeaderUnreadMessages(count);
    }

    /***
     * Delete unread message count
     * @private
     */
    __deleteUnreadMessageCountCallback() {
        console.log('delete');
        // this.__view.deleteHeaderUnreadMessages();
    }

    /***
     * Create base callback list
     * @returns {{deleteUnreadMessageCount: *, updateUnreadMessage: *}}
     * @private
     */
    __createBaseCallbacks() {
        return {
            updateUnreadMessage: this.__updateUnreadMessageCountCallback.bind(this),
            deleteUnreadMessageCount: this.__deleteUnreadMessageCountCallback.bind(this)
        };
    }

    /***
     * Resize callback
     * @private
     */
    __resizeCallback() {
        router.redirectCurrent();
    }

    /***
     * Scroll up page
     */
    scrollUp() {
        window.scrollTo(0, 0);
    }

    /***
     * Check scroll offset
     */
    checkScrollOffset() {
        const state = router.getState();

        if (state && state.x !== undefined && state.y !== undefined) {
            window.scrollTo(state.x, state.y);
            return;
        }

        window.scrollTo(0, 0);
    }

    /***
     * Save scroll offset
     */
    saveScrollOffset() {
        router.setState({x: window.scrollX, y: window.scrollY});
    }

    /***
     * Check user offline
     * @returns {boolean}
     */
    checkOffline() {
        if (this.__offline) {
            this.__view.renderOffline();
            return true;
        }

        return false;
    }

    /***
     * Check user offline status
     * @param err
     */
    checkOfflineStatus(err) {
        if (err instanceof OfflineError) {
            this.__offline = true;
            return;
        }

        this.__offline = false;
    }

    /***
     * Page listener
     * @private
     */
    __listenerPageClick() {
        this.closeAllComponents();
    }

    /***
     * Header click listener
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerHeaderClick(ev) {
        ev.preventDefault();

        eventHandler(ev, this.__getBaseActions().header, true);
    }

    /***
     * Dropdown menu click listener
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerDropdownClick(ev) {
        ev.stopPropagation();
        router.redirectEvent(ev);

        eventHandler(ev, this.__getBaseActions().header);
    }

    /***
     * Auth component click listener
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerAuthClick(ev) {
        ev.stopPropagation();

        eventHandler(ev, this.__getBaseActions().auth);
    }

    /***
     * Submit auth listener
     * @param {MouseEvent} ev - event
     * @private
     */
    async __listenerSubmitForm(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        const telephone = parseTelNumber(this.__view.getTelephone());
        const password = this.__view.getPassword();

        const {error, message} = this.__authModel.validateData({
            telephone: telephone,
            password1: password
        });

        if (error) {
            this.__view.authErrorText(message);
            return;
        }

        this.__authModel.auth()
            .then(() => {
                this.__view.removeOverflowHidden();
                router.redirectCurrent();
            })
            .catch((err) => {
                this.__view.authErrorText(err.message);
            });
    }

    /***
     * Key click listener
     * @param {KeyboardEvent} ev - event
     * @private
     */
    __listenerKeyClick(ev) {
        if (ev.key === 'Escape') {
            this.__closeAuth();
            this.__closeMap();
        }
    }

    /***
     * YandexMap popup click event
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerMapClick(ev) {
        ev.stopPropagation();

        const actions = this.__getBaseActions().map;
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    if (el.dataset.action === 'groupClick') {
                        actions[el.dataset.action].open(ev.target);
                    } else {
                        actions[el.dataset.action].open();
                    }
                }
            });
    }

    /***
     * Create view listeners
     * @returns {{auth: {submitForm: {listener: any, type: string}, authClick: {listener: *, type: string}, keyClick: {listener: *, type: string}, telFocus: {listener: telMask, type: string}, telInput: {listener: telMask, type: string}, telBlur: {listener: telMask, type: string}}, header: {dropdownClick: {listener: *, type: string}, pageClick: {listener: *, type: string}, headerClick: {listener: *, type: string}}, map: {mapClick: {listener: *, type: string}, keyClick: {listener: *, type: string}}}}
     * @private
     */
    __createBaseListeners() {
        return {
            header: {
                headerClick: {
                    type: 'click',
                    listener: this.__listenerHeaderClick.bind(this)
                },
                dropdownClick: {
                    type: 'click',
                    listener: this.__listenerDropdownClick.bind(this)
                },
                pageClick: {
                    type: 'click',
                    listener: this.__listenerPageClick.bind(this)
                }
            },
            auth: {
                authClick: {
                    type: 'click',
                    listener: this.__listenerAuthClick.bind(this)
                },
                keyClick: {
                    type: 'keydown',
                    listener: this.__listenerKeyClick.bind(this)
                },
                submitForm: {
                    type: 'submit',
                    listener: this.__listenerSubmitForm.bind(this)
                },
                telFocus: {
                    type: 'focus',
                    listener: telMask
                },
                telInput: {
                    type: 'input',
                    listener: telMask
                },
                telBlur: {
                    type: 'blur',
                    listener: telMask
                }
            },
            map: {
                mapClick: {
                    type: 'click',
                    listener: this.__listenerMapClick.bind(this)
                },
                keyClick: {
                    type: 'keydown',
                    listener: this.__listenerKeyClick.bind(this)
                }
            }
        };
    }

    /***
     * Open create product view
     */
    openCreateProduct() {
        if (this.__userModel.isAuth) {
            router.redirect(frontUrls.productCreate, '', {title: document.title});
        } else {
            this.openAuth();
        }
    }

    /***
     * Open map
     */
    openMap() {
        this.closeAllComponents();
        this.__isShownMap = true;
        this.__view.updateMapContext(this.__getUserPosition());
        this.__view.addOverflowHidden();
        this.__view.renderMap();
        this.__yaMap.render({
            searchControl: true,
            geolocationControl: true,
            listeners: true,
            id: 'ya-map'
        });

        if (this.__userModel.isAuth) {
            this.__yaMap.setInitialData(this.__getUserPosition().pos, this.__getUserPosition().radius * 1000, this.__getUserPosition().address);
        }
    }

    /***
     * Close map
     * @private
     */
    __closeMap() {
        if (this.__isShownMap) {
            this.__isShownMap = false;
            this.__view.removeOverflowHidden();
            this.__view.removeMap();
        }
    }

    /***
     * Open auth
     */
    openAuth() {
        this.closeAllComponents();
        this.__isShownAuth = true;
        this.__view.addOverflowHidden();
        this.__view.renderAuth();
    }

    /***
     * Close auth
     * @private
     */
    __closeAuth() {
        if (this.__isShownAuth) {
            this.__isShownAuth = false;
            this.__view.removeOverflowHidden();
            this.__view.removeAuth();
        }
    }

    /***
     * Registration click
     * @private
     */
    __regClick(ev) {
        ev.preventDefault();
        router.redirect(frontUrls.registration);
    }

    /***
     * Open / close dropdown menu
     * @private
     */
    __toggleDropdownMenu() {
        this.__view.toggleDropdown();
    }

    /***
     * Close dropdown menu
     * @private
     */
    __closeDropdownMenu() {
        this.__view.removeDropdown();
    }

    /***
     * Close all view components
     * @public
     */
    closeAllComponents() {
        this.__closeMap();
        this.__closeAuth();
        this.__closeDropdownMenu();
    }

    /***
     * Logout user
     * @private
     */
    async __logout() {
        this.__userModel.logout()
            .then(() => {
                router.redirectCurrent();
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                sentryManager.captureException(err);
                console.log(err.message);

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /***
     * Go back
     * @private
     */
    __backClick() {
        router.navigateBack();
    }

    /***
     * Open user menu
     * @private
     */
    __openUserMenu() {
        this.__view.renderUserMenu();
    }

    /***
     * Close user menu
     * @private
     */
    __closeUserMenu() {
        this.__view.removeUserMenu();
    }

    /***
     * Group button click
     * @param {HTMLElement} el - element click
     * @private
     */
    __groupClick(el) {
        if (el instanceof HTMLInputElement) {
            this.__yaMap.addCircle(this.__yaMap.getPointPos(), el.value * 1000);
        }
    }

    /***
     * Create user address
     * @private
     */
    __createUserAddress() {
        if (!this.__userModel.isAuth) {
            this.openAuth();
            return;
        }

        this.__userModel.fillUserData({
            latitude: this.__yaMap.getPointPos().latitude,
            longitude: this.__yaMap.getPointPos().longitude,
            radius: this.__yaMap.getRadius() / 1000,
            address: this.__yaMap.getAddress()
        });

        this.__userModel.position()
            .then(() => {
                this.__view.removeOverflowHidden();
                router.redirectCurrent();
                this.__view.updateAddress(this.__userModel.getData().address);
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                sentryManager.captureException(err);
                console.log(err.message);

                this.checkOfflineStatus(err);
                this.checkOffline();

                this.__closeMap();
            });
    }

    /***
     *  Get listeners actions
     * @returns {{auth: {closeClick: {open: *}}, header: {logoutClick: {open: any}, createProductClick: {open: *}, authClick: {open: *}, dropdownClick: {open: *}, locationClick: {open: *}}, map: {closeClick: {open: *}, groupClick: {open: *}, createClick: {open: *}}}}
     * @private
     */
    __getBaseActions() {
        return {
            header: {
                locationClick: {
                    open: this.openMap.bind(this)
                },
                createProductClick: {
                    open: this.openCreateProduct.bind(this)
                },
                authClick: {
                    open: this.openAuth.bind(this)
                },
                dropdownClick: {
                    open: this.__toggleDropdownMenu.bind(this)
                },
                logoutClick: {
                    open: this.__logout.bind(this)
                },
                userMenuClick: {
                    open: this.__openUserMenu.bind(this)
                },
                backClick: {
                    open: this.__backClick.bind(this)
                },
                closeClick: {
                    open: this.__closeUserMenu.bind(this)
                },
                changeTheme: {
                    open: this.__changeTheme.bind(this)
                }
            },
            auth: {
                closeClick: {
                    open: this.__closeAuth.bind(this)
                },
                regClick: {
                    open: this.__regClick.bind(this)
                }
            },
            map: {
                closeClick: {
                    open: this.__closeMap.bind(this)
                },
                groupClick: {
                    open: this.__groupClick.bind(this)
                },
                createClick: {
                    open: this.__createUserAddress.bind(this)
                }
            }
        };
    }

    /***
     * Get user position
     * @returns {{pos: {latitude: number, longitude: number}, radius: number, address: string}}
     * @private
     */
    __getUserPosition() {
        return {
            pos: {
                latitude: this.__userModel.getData().latitude,
                longitude: this.__userModel.getData().longitude
            },
            radius: this.__userModel.getData().radius,
            address: this.__userModel.getData().address
        };
    }

    /***
     * Change theme
     * @private
     */
    __changeTheme() {
        const theme = customLocalStorage.get('theme');
        const app = document.getElementsByTagName('html').item(0);
        if (theme === 'light') {
            customLocalStorage.set('theme', 'dark');
            app.className = 'theme-dark';
        }
        if (theme === 'dark') {
            customLocalStorage.set('theme', 'light');
            app.className = 'theme-light';
        }
        if (theme === null) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                customLocalStorage.set('theme', 'dark');
                app.className = 'theme-dark';
            } else {
                customLocalStorage.set('theme', 'light');
                app.className = 'theme-light';
            }
        }
    }

    /***
     * Make view context
     * @returns {{auth: {listeners: {submitForm: {listener: *, type: string}, authClick: {listener: *, type: string}, keyClick: {listener: *, type: string}, telFocus: {listener: telMask, type: string}, telInput: {listener: telMask, type: string}, telBlur: {listener: telMask, type: string}}}, header: {data: {isAuth: boolean, address, linkImage: *, surname: *, name}, listeners: {dropdownClick: {listener: *, type: string}, pageClick: {listener: *, type: string}, headerClick: {listener: *, type: string}}}, map: {data: {latitude, radius: (number|*), longitude}, listeners: {mapClick: {listener: *, type: string}, keyClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeBaseContext() {
        return {
            header: {
                data: {
                    isAuth: this.__userModel.getData().isAuth,
                    surname: this.__userModel.getData().surname,
                    name: this.__userModel.getData().name,
                    address: this.__userModel.getData().address,
                    linkImage: this.__userModel.getData().linkImage,
                    id: this.__userModel.getData().id
                },
                listeners: this.__createBaseListeners().header
            },
            auth: {
                listeners: this.__createBaseListeners().auth
            },
            map: {
                data: {
                    radius: this.__userModel.getData().radius
                },
                listeners: this.__createBaseListeners().map
            }
        };
    }
}