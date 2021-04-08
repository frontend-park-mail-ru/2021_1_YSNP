import {router} from '../modules/router.js';
import {frontUrls} from '../modules/frontUrls.js';
import {eventHandler} from '../modules/eventHandler.js';
import {parseTelNumber, telMask} from '../modules/mask.js';

import {user} from '../models/ProfileUserModel.js';
import {AuthUserModel} from '../models/AuthUserModel.js';
import {YandexMap} from '../modules/yandexMap';

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
        this.__authModel = new AuthUserModel();
        this.__isShownMap = false;
        this.__isShownAuth = false;
        this.__yaMap = new YandexMap();
    }

    /***
     * Update user data
     * @returns {Promise<void>}
     */
    async update() {
        return this.__userModel.update()
            .then(() => {
                this.__view.baseContext = this.__makeBaseContext();
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
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

        this.__view.removeHeaderListeners();
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

        router.redirectEvent(ev);
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
                router.redirect(frontUrls.main);
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
     * @returns {{auth: {submitForm: {listener: any, type: string}, authClick: {listener: *, type: string}, keyClick: {listener: *, type: string}, telFocus: {listener: mask, type: string}, telInput: {listener: mask, type: string}, telBlur: {listener: mask, type: string}}, header: {dropdownClick: {listener: *, type: string}, pageClick: {listener: *, type: string}, headerClick: {listener: *, type: string}}}}
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
     * @private
     */
    __openCreateProduct() {
        if (this.__userModel.isAuth) {
            router.redirect(frontUrls.productCreate);
        } else {
            this.__openAuth();
        }
    }

    /***
     * Open map
     * @private
     */
    __openMap() {
        this.closeAllComponents();
        this.__isShownMap = true;
        this.__view.renderMap();
        this.__yaMap.render({
            searchControl: true,
            geolocationControl: true,
            listeners: true,
            id: 'ya-map'
        });
    }

    /***
     * Close map
     * @private
     */
    __closeMap() {
        if (this.__isShownMap) {
            this.__isShownMap = false;
            this.__view.removeMap();
        }
    }

    /***
     * Open auth
     * @private
     */
    __openAuth() {
        this.closeAllComponents();
        this.__isShownAuth = true;
        this.__view.renderAuth();
    }

    /***
     * Close auth
     * @private
     */
    __closeAuth() {
        if (this.__isShownAuth) {
            this.__isShownAuth = false;
            this.__view.removeAuth();
        }
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
                router.redirect(frontUrls.main);
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
            });
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
        console.log(this.__yaMap.getPointPos());
        console.log(this.__yaMap.getAddress());

        this.__closeMap();
    }

    /***
     * Get listeners actions
     * @returns {{auth: {closeClick: {open: *}}, header: {logoutClick: {open: *}, createProductClick: {open: *}, authClick: {open: *}, dropdownClick: {open: *}, locationClick: {open: *}}}}
     * @private
     */
    __getBaseActions() {
        return {
            header: {
                locationClick: {
                    open: this.__openMap.bind(this)
                },
                createProductClick: {
                    open: this.__openCreateProduct.bind(this)
                },
                authClick: {
                    open: this.__openAuth.bind(this)
                },
                dropdownClick: {
                    open: this.__toggleDropdownMenu.bind(this)
                },
                logoutClick: {
                    open: this.__logout.bind(this)
                }
            },
            auth: {
                closeClick: {
                    open: this.__closeAuth.bind(this)
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
     * Make view context
     * @returns {{auth: {listeners: {submitForm: {listener: *, type: string}, authClick: {listener: *, type: string}, keyClick: {listener: *, type: string}, telFocus: {listener: mask, type: string}, telInput: {listener: mask, type: string}, telBlur: {listener: mask, type: string}}}, header: {data: {isAuth: (boolean|*), linkImage: (*|null), surname: (Object.surname|string|*), name: (Object.name|string|*)}, listeners: {dropdownClick: {listener: *, type: string}, pageClick: {listener: *, type: string}, headerClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeBaseContext() {
        return {
            header: {
                data: {
                    isAuth: this.__userModel.getData().isAuth,
                    surname: this.__userModel.getData().surname,
                    name: this.__userModel.getData().name,
                    linkImage: this.__userModel.getData().linkImage
                },
                listeners: this.__createBaseListeners().header
            },
            auth: {
                listeners: this.__createBaseListeners().auth
            },
            map: {
                listeners: this.__createBaseListeners().map
            }
        };
    }
}