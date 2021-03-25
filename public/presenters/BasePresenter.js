import {router} from '../modules/router.js';
import {frontUrls} from '../modules/frontUrls.js';
import {eventHandler} from '../modules/eventHandler.js';
import {parseTelNumber, telMask} from '../modules/telMask';

import {user} from '../models/SettingsUserData.js';
import {AuthUserData} from '../models/AuthUserData.js';

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
        this.__authModel = new AuthUserData();
        this.__isShownMap = false;
        this.__isShownAuth = false;
    }

    /***
     * Update user data
     * @returns {Promise<void>}
     */
    async update() {
        await this.__userModel.update();
        this.__view.baseContext = this.__makeBaseContext();
    }

    /***
     * Page listener
     * @private
     */
    __listenerPageClick() {
        this.__closeAllComponents();
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
        eventHandler(ev, this.__getBaseActions().header);
    }

    /***
     * Submit auth listener
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerSubmitForm(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        const telephone = parseTelNumber(this.__view.getTelephone());
        const password = this.__view.getPassword();

        const {error, message} = this.__authModel.validateData({
            telephone: telephone,
            password: password
        });

        if (!error) {
            this.__authModel.auth()
                .then(({isAuth, message}) => {
                    if (isAuth) {
                        router.redirect(frontUrls.main);
                    } else {
                        this.__view.authErrorText(message);
                    }
                });

            return;
        }

        this.__view.authErrorText(message);
    }

    /***
     * Key click listener
     * @param {KeyboardEvent} ev - event
     * @private
     */
    __listenerKeyClick(ev) {
        if (ev.key === 'Escape') {
            this.__closeAuth();
        }
    }

    /***
     * Create view listeners
     * @returns {{auth: {submitForm: {listener: any, type: string}, authClick: {listener: *, type: string}, keyClick: {listener: *, type: string}, telFocus: {listener: telMask, type: string}, telInput: {listener: telMask, type: string}, telBlur: {listener: telMask, type: string}}, header: {dropdownClick: {listener: *, type: string}, pageClick: {listener: *, type: string}, headerClick: {listener: *, type: string}}}}
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
        this.__closeAllComponents();
        this.__isShownMap = true;
        this.__view.renderMap();
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
        this.__closeAllComponents();
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
     * @private
     */
    __closeAllComponents() {
        this.__closeMap();
        this.__closeAuth();
        this.__closeDropdownMenu();
    }

    /***
     * Logout user
     * @private
     */
    __logout() {
        this.__userModel.logout()
            .then(({isLogout}) => {
                if (isLogout) {
                    router.redirect(frontUrls.main);
                }
            });
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
            }
        };
    }

    /***
     * Make view context
     * @returns {{auth: {listeners: {submitForm: {listener: *, type: string}, authClick: {listener: *, type: string}, keyClick: {listener: *, type: string}, telFocus: {listener: telMask, type: string}, telInput: {listener: telMask, type: string}, telBlur: {listener: telMask, type: string}}}, header: {data: {isAuth: (boolean|*), linkImage: (*|null), surname: (Object.surname|string|*), name: (Object.name|string|*)}, listeners: {dropdownClick: {listener: *, type: string}, pageClick: {listener: *, type: string}, headerClick: {listener: *, type: string}}}}}
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
            }
        };
    }
}