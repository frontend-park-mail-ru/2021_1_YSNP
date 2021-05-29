import {BasePresenter} from './BasePresenter.js';

import {ProductModel} from '../models/ProductModel.js';
import {ProdRecListModel} from '../models/ProdRecListModel';
import {UserModel} from '../models/UserModel';

import {
    eventHandler,
    eventHandlerWithDataType,
    eventProductListHandler,
    eventSelectUserHandler
} from '../modules/handlers/eventHandler.js';
import {NotFoundError, UnauthorizedError} from '../modules/http/httpError';

import {router} from '../modules/router.js';
import {frontUrls} from '../modules/urls/frontUrls';

import {sentryManager} from '../modules/sentry';
import {ReviewModel} from '../models/ReviewModel';

/***
 *  ProductPresenter class, extends from BasePresenter
 */
export class ProductPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {ProductView} view - view
     * @param {string} id - id of product
     * @this {ProductPresenter}
     */
    constructor(view, id) {
        super(view);
        this.__view = view;
        this.__id = parseInt(id, 10);
        this.__numberIsShowed = false;
        this.__notFound = false;

        this.__recListModel = new ProdRecListModel(this.__id);
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
            .then(() => this.__recListModel.update())
            .then(() => this.__model.setStat(this.__model.getData().name))
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                if (!UnauthorizedError.isError(err)) {
                    sentryManager.captureException(err);
                }

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

        if (this.__notFound || isNaN(this.__id)) {
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
     * Product list rec click event
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerRecListClick(ev) {
        ev.stopPropagation();
        eventProductListHandler(ev, this.__getActions().recList);
    }

    /***
     * Listener Close Product page click
     * @private
     */
    __listenerCloseProductPageClick() {
        this.__closeProductClose();
    }

    /***
     * Listener Close Product key click
     * @param {KeyboardEvent} ev - event
     * @private
     */
    __listenerCloseProductKeyClick(ev) {
        if (ev.key === 'Escape') {
            this.__closeProductClose();
        }
    }

    /***
     * Listener Close Product click
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerCloseProductClick(ev) {
        ev.stopPropagation();

        eventHandler(ev, this.__getActions().closeProduct);
    }

    /***
     * Select user key click
     * @param {KeyboardEvent} ev - event
     * @private
     */
    __listenerSelectUserKeyClick(ev) {
        if (ev.key === 'Escape') {
            this.__selectUserClose();
        }
    }

    /***
     * Select user page click
     * @private
     */
    __listenerSelectUserPageClick() {
        this.__selectUserClose();
    }

    /***
     * Select user click
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerSelectUserClick(ev) {
        ev.stopPropagation();

        eventHandler(ev, this.__getActions().selectUser);
    }

    /***
     * Listener select user body click
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerSelectUserBodyClick(ev) {
        ev.stopPropagation();

        eventSelectUserHandler(ev, this.__getActions().selectUser);
    }

    /***
     * Listener review user key click
     * @param {KeyboardEvent} ev - event
     * @private
     */
    __listenerReviewUserKeyClick(ev) {
        if (ev.key === 'Escape') {
            this.__reviewUserClose();
        }
    }

    /***
     * Listener review user page click
     * @private
     */
    __listenerReviewUserPageClick() {
        this.__reviewUserClose();
    }

    /***
     * Listener review user click
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerReviewUserClick(ev) {
        ev.stopPropagation();

        eventHandler(ev, this.__getActions().reviewUser);
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
            },
            recList: {
                productCardClick: {
                    type: 'click',
                    listener: this.__listenerRecListClick.bind(this)
                }
            },
            closeProduct: {
                pageClick: {
                    type: 'click',
                    listener: this.__listenerCloseProductPageClick.bind(this)
                },
                closeProductClick: {
                    type: 'click',
                    listener: this.__listenerCloseProductClick.bind(this)
                },
                keyClick: {
                    type: 'keydown',
                    listener: this.__listenerCloseProductKeyClick.bind(this)
                }
            },
            selectUser: {
                keyClick: {
                    type: 'keydown',
                    listener: this.__listenerSelectUserKeyClick.bind(this)
                },
                pageClick: {
                    type: 'click',
                    listener: this.__listenerSelectUserPageClick.bind(this)
                },
                selectUserClick: {
                    type: 'click',
                    listener: this.__listenerSelectUserClick.bind(this)
                },
                selectUserBodyClick: {
                    type: 'click',
                    listener: this.__listenerSelectUserBodyClick.bind(this)
                }
            },
            reviewUser: {
                keyClick: {
                    type: 'keydown',
                    listener: this.__listenerReviewUserKeyClick.bind(this)
                },
                pageClick: {
                    type: 'click',
                    listener: this.__listenerReviewUserPageClick.bind(this)
                },
                reviewUserClick: {
                    type: 'click',
                    listener: this.__listenerReviewUserClick.bind(this)
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
     * Open card rec callback
     * @param {string} id - product card id
     * @private
     */
    __openCardRec(id) {
        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.product(numberId), '', {title: 'Koya'});
    }

    /***
     * Like card rec callback
     * @param {string} id - product card id
     * @private
     */
    __likeCardRec(id) {
        const numberId = parseInt(id, 10);
        if (!this.__userModel.isAuth) {
            super.openAuth();
            return;
        }

        this.__recListModel.voteProduct(numberId)
            .then(({status}) => {
                if (status === 'dislike') {
                    this.__view.dislikeProduct(numberId);
                    return;
                }

                this.__view.likeProduct(numberId);
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
     * Close product open
     * @private
     */
    __closeProductOpen() {
        this.__view.renderCloseProduct(this.__makeContext().closeProduct);
    }

    /***
     * Close product close
     * @private
     */
    __closeProductClose() {
        this.__view.removeCloseProduct();
    }

    /***
     * Sell product click
     * @private
     */
    __closeProductSellProductClick() {
        this.__model.close()
            .then(() => {
                this.__closeProductClose();
                this.__selectUserOpen();
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
     * Close product click
     * @private
     */
    __closeProductCloseProductClick() {
        this.__model.close()
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
     * Select user open
     * @private
     */
    __selectUserOpen() {
        this.__view.renderSelectUser(this.__makeContext().selectUser);
    }

    /***
     * Select user close
     * @private
     */
    __selectUserClose() {
        this.__view.removeSelectUser();
    }

    /***
     * Skip Select User click
     * @private
     */
    __selectUserSkipClick() {
        router.redirectCurrent();
    }

    /***
     * Select one user click
     * @param {string} id - user id
     * @private
     */
    __selectUserOneUserClick(id) {
        const numberId = parseInt(id, 10);
        this.__model.setBuyer(numberId)
            .then(() => {
                this.__selectUserClose();
                this.__reviewUserOpen();
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
     * Review user open
     * @private
     */
    __reviewUserOpen() {
        this.__view.renderReviewUser(this.__makeContext().reviewUser);
    }

    /***
     * Review user close
     * @private
     */
    __reviewUserClose() {
        this.__view.removeReviewUser();
    }

    /***
     * Review user back button click
     * @private
     */
    __reviewUserBackClick() {
        this.__reviewUserClose();
        this.__selectUserOpen();
    }

    /***
     * Review user skip button click
     * @private
     */
    __reviewUserSkipClick() {
        router.redirectCurrent();
    }

    /***
     * Review user review button click
     * @private
     */
    __reviewUserReviewClick() {
        const text = this.__view.reviewUserText();
        const star = this.__view.reviewUserStar();

        if (text === '' || star === 0) {
            this.__view.reviewUserError('Оставьте отзыв и комментарий');
            return;
        }

        const reviewModel = new ReviewModel();
        reviewModel.setBuyerData(this.__model.id, this.__model.buyerId);
        reviewModel.review(text, star)
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
                userClick: {
                    open: this.__listenerUserClick.bind(this)
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
            },
            recList: {
                cardClick: {
                    open: this.__openCardRec.bind(this)
                },
                likeClick: {
                    open: this.__likeCardRec.bind(this)
                }
            },
            closeProduct: {
                closeClick: {
                    open: this.__closeProductClose.bind(this)
                },
                sellProductClick: {
                    open: this.__closeProductSellProductClick.bind(this)
                },
                closeProductClick: {
                    open: this.__closeProductCloseProductClick.bind(this)
                }
            },
            selectUser: {
                closeClick: {
                    open: this.__selectUserClose.bind(this)
                },
                skipClick: {
                    open: this.__selectUserSkipClick.bind(this)
                },
                oneUserClick: {
                    open: this.__selectUserOneUserClick.bind(this)
                }
            },
            reviewUser: {
                closeClick: {
                    open: this.__reviewUserClose.bind(this)
                },
                backClick: {
                    open: this.__reviewUserBackClick.bind(this)
                },
                skipClick: {
                    open: this.__reviewUserSkipClick.bind(this)
                },
                reviewClick: {
                    open: this.__reviewUserReviewClick.bind(this)
                }
            }
        };
    }

    /***
     * Listener edit product
     * @private
     */
    __listenerEditProduct() {
        router.redirect(frontUrls.editProduct(this.__model.id), '', {title: document.title});
    }

    /***
     * Listener close product
     * @private
     */
    __listenerCloseProduct() {
        this.__closeProductOpen();
    }

    /***
     * User Click action
     */
    __listenerUserClick() {
        this.removePageListeners();
        router.redirect(frontUrls.sellerAd(this.__model.getData().ownerId), '', {title: 'Koya'});
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
            this.__user.getUserTelephone(this.__model.getData().ownerId)
                .then(() => {
                    if (this.__user.getData().telephone === '') {
                        this.__view.showNumber('Нет телефона');
                        this.__numberIsShowed = false;
                    } else {
                        this.__view.showNumber(this.__user.getData().telephone);
                        this.__numberIsShowed = true;
                    }
                })
                .catch((err) => {
                    //TODO(Sergey) нормальная обработка ошибок

                    sentryManager.captureException(err);
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

                sentryManager.captureException(err);
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
            },
            recList: {
                data: this.__recListModel.getData(),
                listeners: this.__createListeners().recList
            },
            closeProduct: {
                listeners: this.__createListeners().closeProduct
            },
            selectUser: {
                data: this.__model.getBuyerList(),
                listeners: this.__createListeners().selectUser
            },
            reviewUser: {
                data: this.__model.getBuyer(),
                listeners: this.__createListeners().reviewUser
            }
        };
    }
}