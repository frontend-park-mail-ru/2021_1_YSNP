import {BasePresenter} from './BasePresenter';

import {ReviewModel} from '../models/ReviewModel';

import {EndlessScroll} from '../modules/handlers/endlessScroll';
import {eventHandler, eventReviewAwaitHandler} from '../modules/handlers/eventHandler';
import {checkIsAuth} from '../modules/checkAuth';
import {NotFoundError, UnauthorizedError} from '../modules/http/httpError';

import {router} from '../modules/router';

import {sentryManager} from '../modules/sentry';

/***
 * Await review presenter
 */
export class UserAwaitReviewPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {UserAwaitReviewView} view - view
     */
    constructor(view) {
        super(view);
        this.__view = view;

        this.__reviewsModel = new ReviewModel();

        this.__sellerEndlessScroll = new EndlessScroll(this.__createListeners().scrollSeller);
        this.__buyerEndlessScroll = new EndlessScroll(this.__createListeners().scrollBuyer);
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        return super.update()
            .then(() => this.__reviewsModel.updateSeller())
            .then(() => this.__reviewsModel.updateBuyer())
            .catch((err) => {
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
        await this.update();
        if (this.checkOffline()) {
            return;
        }

        if (!checkIsAuth()) {
            return;
        }

        this.__view.render(this.__makeContext());

        this.__sellerEndlessScroll.startElement(this.__view.getSellerScroll());
        this.__buyerEndlessScroll.startElement(this.__view.getBuyerScroll());

        this.checkScrollOffset();
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__sellerEndlessScroll.remove();
        this.__buyerEndlessScroll.remove();

        this.__view.removePage();
    }

    /***
     * Listener seller click
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerSellerAwaitReviewClick(ev) {
        ev.preventDefault();

        eventReviewAwaitHandler(ev, this.__getActions().sellerAwaitReview);
    }

    /***
     * Listener buyer click
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerBuyerAwaitReviewClick(ev) {
        ev.preventDefault();

        eventReviewAwaitHandler(ev, this.__getActions().buyerAwaitReview);
    }

    /***
     * Scroll seller end
     * @private
     */
    __scrollSellerEnd() {
        this.__reviewsModel.updateSellerNewData()
            .then(() => {
                const newData = this.__reviewsModel.sellerNewData;
                if (newData.length === 0) {
                    this.__sellerEndlessScroll.remove();
                    return;
                }

                this.__view.addSellerNewAwaitReview(newData);
            })
            .catch((err) => {
                if (err.message === 'isUpdate') {
                    return;
                }

                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                if (!NotFoundError.isError(err)) {
                    sentryManager.captureException(err);
                }

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /***
     * Scroll buyer end
     * @private
     */
    __scrollBuyerEnd() {
        this.__reviewsModel.updateBuyerNewData()
            .then(() => {
                const newData = this.__reviewsModel.buyerData;
                if (newData.length === 0) {
                    this.__buyerEndlessScroll.remove();
                    return;
                }

                this.__view.addBuyerNewAwaitReview(newData);
            })
            .catch((err) => {
                if (err.message === 'isUpdate') {
                    return;
                }

                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                if (!NotFoundError.isError(err)) {
                    sentryManager.captureException(err);
                }

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
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
     * Create listeners
     * @returns {{sellerAwaitReview: {awaitReviewClick: {listener: *, type: string}}, scrollBuyer: {scrollEnd: *}, reviewUser: {reviewUserClick: {listener: *, type: string}, keyClick: {listener: *, type: string}, pageClick: {listener: *, type: string}}, buyerAwaitReview: {awaitReviewClick: {listener: *, type: string}}, scrollSeller: {scrollEnd: *}}}
     * @private
     */
    __createListeners() {
        return {
            sellerAwaitReview: {
                awaitReviewClick: {
                    type: 'click',
                    listener: this.__listenerSellerAwaitReviewClick.bind(this)
                }
            },
            buyerAwaitReview: {
                awaitReviewClick: {
                    type: 'click',
                    listener: this.__listenerBuyerAwaitReviewClick.bind(this)
                }
            },
            scrollSeller: {
                scrollEnd: this.__scrollSellerEnd.bind(this)
            },
            scrollBuyer: {
                scrollEnd: this.__scrollBuyerEnd.bind(this)
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
     * Seller click
     * @param {number} productId - product id
     * @param {number} userId - user id
     * @private
     */
    __sellerAwaitReviewClick(productId, userId) {
        this.__reviewsModel.setSellerData(productId, userId);

        this.__reviewUserOpen();
    }

    /***
     * Buyer click
     * @param {number} productId - product id
     * @param {number} userId - user id
     * @private
     */
    __buyerAwaitReviewClick(productId, userId) {
        this.__reviewsModel.setBuyerData(productId, userId);

        this.__reviewUserOpen();
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
     * Review user skip click
     * @private
     */
    __reviewUserSkipClick() {
        this.__reviewUserClose();
    }

    /***
     * Review user review click
     * @private
     */
    __reviewUserReviewClick() {
        const text = this.__view.reviewUserText();
        const star = this.__view.reviewUserStar();

        if (text === '' || star === 0) {
            this.__view.reviewUserError('Оставьте отзыв и комментарий');
            return;
        }

        this.__reviewsModel.review(text, star)
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
     * Get actions
     * @returns {{sellerAwaitReview: {awaitReviewClick: {open: *}}, reviewUser: {closeClick: {open: *}, reviewClick: {open: *}, skipClick: {open: *}}, buyerAwaitReview: {awaitReviewClick: {open: *}}}}
     * @private
     */
    __getActions() {
        return {
            sellerAwaitReview: {
                awaitReviewClick: {
                    open: this.__sellerAwaitReviewClick.bind(this)
                }
            },
            buyerAwaitReview: {
                awaitReviewClick: {
                    open: this.__buyerAwaitReviewClick.bind(this)
                }
            },
            reviewUser: {
                closeClick: {
                    open: this.__reviewUserClose.bind(this)
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
     * Make context
     * @returns {{sellerAwaitReview: {data: {list: []}, listeners: {awaitReviewClick: {listener: *, type: string}}}, profileSettings: {owner: boolean, data: {address: (*|string), sex, latitude, telephone, isAuth: boolean, linkImage, surname, name, id, dateBirth, radius, email, longitude}}, reviewUser: {data: (*|{}), listeners: {reviewUserClick: {listener: *, type: string}, keyClick: {listener: *, type: string}, pageClick: {listener: *, type: string}}}, buyerAwaitReview: {data: {list: []}, listeners: {awaitReviewClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            sellerAwaitReview: {
                data: {
                    list: this.__reviewsModel.sellerData
                },
                listeners: this.__createListeners().sellerAwaitReview
            },
            buyerAwaitReview: {
                data: {
                    list: this.__reviewsModel.buyerData
                },
                listeners: this.__createListeners().buyerAwaitReview
            },
            profileSettings: {
                data: this.__userModel.getData(),
                owner: true
            },
            reviewUser: {
                data: this.__reviewsModel.getReviewData(),
                listeners: this.__createListeners().reviewUser
            }
        };
    }
}