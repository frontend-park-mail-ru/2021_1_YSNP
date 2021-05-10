import {BasePresenter} from './BasePresenter.js';

import {ProductModel} from '../models/ProductModel.js';
import {UserModel} from '../models/UserModel';

import {eventHandlerWithDataType} from '../modules/handlers/eventHandler.js';
import {NotFoundError} from '../modules/http/httpError';

import {router} from '../modules/router.js';
import {frontUrls} from '../modules/urls/frontUrls';

/***
 *  ProductPresenter class, extends from BasePresenter
 */
export class ProductPresenter extends BasePresenter {

    /***
     * Class constructor
     * @param {ProductView} view - view
     * @param {number} id - id of product
     * @this {ProductPresenter}
     */
    constructor(view, id) {
        super(view);
        this.__view = view;
        this.__id = parseInt(id, 10);
        this.__numberIsShowed = false;
        this.__notFound = false;

        this.__model = new ProductModel({id: this.__id});
        this.__user = new UserModel();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Update view data
     * @returns {Promise<{}>}
     * @this {ProductPresenter}
     */
    async update() {
        return super.update()
            .then(() => this.__model.update())
            .then(() => this.__model.setStat(this.__model.getData().name))
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
                this.checkOfflineStatus(err);

                if (err instanceof NotFoundError) {
                    this.__notFound = true;
                }
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * Control view
     * @returns {Promise<void>}
     * @this {ProductPresenter}
     */
    async control() {
        await this.update();
        if (this.checkOffline()) {
            return;
        }

        if (this.__notFound) {
            router.redirectNotFound();
            return;
        }

        this.__view.render(this.__makeContext());

        this.checkScrollOffset();
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__view.removePage();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Header click listener
     * @param {MouseEvent} ev - event
     * @param {string} dataType
     * @param {Object} actions
     * @private
     * @this {ProductPresenter}
     */
    __listenerProduct(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {ProductPresenter}
     * @return {Object}
     * @private
     */
    __createListeners() {
        return {
            navigation: {
                backClick: {
                    type: 'click',
                    listener: this.__listenerProduct.bind(this, 'action', this.__getActions().navigation)
                }
            },
            product: {
                product: {
                    type: 'click',
                    listener: this.__listenerProduct.bind(this, 'action', this.__getActions().product)
                }
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * action for navigation to back
     * @this {ProductPresenter}
     * @private
     */
    __navBack() {
        this.closeAllComponents();
        this.__view.removingSubViews();
        router.navigateBack();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Get product actions
     * @this {ProductPresenter}
     * @returns {Object}
     * @private
     */
    __getActions() {
        return {
            navigation: {
                backClick: {
                    open: this.__navBack.bind(this)
                }
            },
            product: {
                nextClick: {
                    open: this.__listenerToNext.bind(this)
                },
                backClick: {
                    open: this.__listenerToBack.bind(this)
                },
                selectClick: {
                    open: this.__listenerSelectImage.bind(this)
                },
                numberClick: {
                    open: this.__listenerShowNumber.bind(this)
                },
                massageClick: {
                    open: this.__listenerWriteMassage.bind(this)
                },
                closeProduct: {
                    open: this.__listenerCloseProduct.bind(this)
                },
                editProduct: {
                    open: this.__listenerEditProduct.bind(this)
                }
            }
        };
    }

    __listenerEditProduct() {
        router.redirect(frontUrls.editProduct(this.__model.id), '', {title: document.title});
    }
    
    __listenerCloseProduct() {
        if (confirm('Вы уверены, что хотите закрыть объявление')) {
            this.__model.close(this.__model.getData().id)
            .then(() => {
                router.redirectCurrent();
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to tern next pic in slider
     * @this {ProductPresenter}
     * @private
     */
    __listenerToNext() {
        this.__view.rotateForward();
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to tern back pic in slider
     * @this {ProductPresenter}
     * @private
     */
    __listenerToBack() {
        this.__view.rotateBackward();
    }

    /***
     * @author Ivan Gorshkov
     *
     * listener for select photo
     * @private
     * @this {ProductPresenter}
     * @param {MouseEvent} ev - event
     */
    __listenerSelectImage(ev) {
        this.__view.selectPicture(ev.target);
    }

    /***
     * @author Ivan Gorshkov
     * listener for show number
     * @this {ProductPresenter}
     * @private
     */
    __listenerShowNumber() {
        if (!this.__userModel.isAuth) {
            super.openAuth();
            return;
        }

        if (!this.__numberIsShowed) {
            this.__user.getUser(this.__model.getData().ownerId)
                .then(() => {
                    this.__view.showNumber(this.__user.getData().telephone);
                    this.__numberIsShowed = true;
                })
                .catch((err) => {
                    console.log(err.message);
                    this.__view.showNumber(err.message);
                    this.__numberIsShowed = false;
                    this.checkOfflineStatus(err);
                    this.checkOffline();
                });
        } else {
            window.open(`tel: ${this.__view.getTelNumber()}`);
        }
    }

    /***
     * @author Ivan Gorshkov
     * listener for write massage
     * @this {ProductPresenter}
     * @private
     */
    __listenerWriteMassage() {
        if (!this.__userModel.isAuth) {
            super.openAuth();
            return;
        }

        this.__chatModel.createChat(this.__id, this.__model.getData().ownerId)
            .then((data) => {
                router.redirect(frontUrls.userChat(data.id));
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * Make view context
     * @returns {Object}
     * @private
     * @this {ProductPresenter}
     */
    __makeContext() {
        return {
            navigation: {
                data: null,
                listeners: this.__createListeners().navigation
            },
            product: {
                data: this.__model,
                listeners: this.__createListeners().product,
                owner: this.__userModel.getData().id === this.__model.getData().ownerId
            }
        };
    }
}