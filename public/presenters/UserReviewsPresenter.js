import {BasePresenter} from './BasePresenter.js';

import {UserModel} from '../models/UserModel';
import {UserReviewsModel} from '../models/UserReviewsModel';

import {UnauthorizedError, NotFoundError} from '../modules/http/httpError';
import {EndlessScroll} from '../modules/handlers/endlessScroll.js';
import {eventReviewListHandler} from '../modules/handlers/eventHandler';

import {sentryManager} from '../modules/sentry';

/***
 * User reviews presenter
 */
export class UserReviewsPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param view
     * @param id - user id
     */
    constructor(view, id) {
        super(view);
        this.__view = view;

        this.__userID = parseInt(id, 10);
        this.__sellerModel = new UserModel();
        this.__userReviews = new UserReviewsModel(this.__userID);

        this.__sellerEndlessScroll = new EndlessScroll(this.__createListeners().scrollSeller);
        this.__buyerEndlessScroll = new EndlessScroll(this.__createListeners().scrollBuyer);

        this.__sortSeller = 'date';
        this.__sortBuyer = 'date';
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        return super.update()
            .then(() => {
                // if (this.__userModel.getData().id === this.__userID) {
                //     this.__sellerModel.fillUserData(this.__userModel.getData());
                //     return;
                // }

                this.__sellerModel.getUser(this.__userID);
            })
            .then(() => this.__userReviews.updateSellerReview(this.__sortSeller))
            .then(() => this.__userReviews.updateBuyerReview(this.__sortBuyer))
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
     * Listener seller review click
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerSellerReviewClick(ev) {
        eventReviewListHandler(ev, this.__getActions().sellerReview);
    }

    /***
     * Listener buyer review click
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerBuyerReviewClick(ev) {
        eventReviewListHandler(ev, this.__getActions().buyerReview);
    }

    /***
     * Scroll seller end
     * @private
     */
    __scrollSellerEnd() {
        this.__userReviews.updateSellerReviewNewData(this.__sortSeller)
            .then(() => {
                const newData = this.__userReviews.sellerReviewNewData;
                if (newData.length === 0) {
                    this.__sellerEndlessScroll.remove();
                    return;
                }

                this.__view.addSellerNewReviews(newData);
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
        this.__userReviews.updateBuyerReviewNewData(this.__sortBuyer)
            .then(() => {
                const newData = this.__userReviews.buyerReviewNewData;
                if (newData.length === 0) {
                    this.__buyerEndlessScroll.remove();
                    return;
                }

                this.__view.addBuyerNewReviews(newData);
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
     * Get view listeners
     * @returns {{scrollBuyer: {scrollEnd: *}, buyerReviews: {reviewsClick: {listener: *, type: string}}, sellerReviews: {reviewsClick: {listener: *, type: string}}, scrollSeller: {scrollEnd: *}}}
     * @private
     */
    __createListeners() {
        return {
            sellerReviews: {
                reviewsClick: {
                    type: 'click',
                    listener: this.__listenerSellerReviewClick.bind(this)
                }
            },
            buyerReviews: {
                reviewsClick: {
                    type: 'click',
                    listener: this.__listenerBuyerReviewClick.bind(this)
                }
            },
            scrollSeller: {
                scrollEnd: this.__scrollSellerEnd.bind(this)
            },
            scrollBuyer: {
                scrollEnd: this.__scrollBuyerEnd.bind(this)
            }
        };
    }

    /***
     * Sort reviews for seller by date
     * @private
     */
    async __sortSellerByDate() {
        //TODO request to sort
        this.__sortSeller = 'date';
        await this.__userReviews.updateSellerReview(this.__sortSeller)
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                sentryManager.captureException(err);

                this.checkOfflineStatus(err);
            });
        this.__view.setCheckedButton('seller', 'date');
        this.__view.rerenderSellerReviews(this.__userReviews.sellerReviewData);
    }

    /***
     * Sort reviews for seller by rate
     * @private
     */
    async __sortSellerByRate() {
        //TODO request to sort
        this.__sortSeller = 'rate';
        await this.__userReviews.updateSellerReview(this.__sortSeller)
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                sentryManager.captureException(err);

                this.checkOfflineStatus(err);
            });
        this.__view.setCheckedButton('seller', 'rate');
        this.__view.rerenderSellerReviews(this.__userReviews.sellerReviewData);
    }

    /***
     * Seller content click
     * @param {string} id - review id
     * @private
     */
    __contentSellerClick(id) {
        const numberId = parseInt(id, 10);

        this.__view.toggleSellerReviewContent(numberId);
    }

    /***
     * Sort reviews for seller by date
     * @private
     */
    async __sortBuyerByDate() {
        //TODO request to sort
        this.__sortBuyer = 'date';
        await this.__userReviews.updateBuyerReview(this.__sortBuyer)
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                sentryManager.captureException(err);

                this.checkOfflineStatus(err);
            });
        this.__view.setCheckedButton('buyer', 'date');
        this.__view.rerenderBuyerReviews(this.__userReviews.buyerReviewData);
    }

    /***
     * Sort reviews for seller by rate
     * @private
     */
    async __sortBuyerByRate() {
        //TODO request to sort
        this.__sortBuyer = 'rate';
        await this.__userReviews.updateBuyerReview(this.__sortBuyer)
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                sentryManager.captureException(err);

                this.checkOfflineStatus(err);
            });
        this.__view.setCheckedButton('buyer', 'rate');
        this.__view.rerenderBuyerReviews(this.__userReviews.buyerReviewData);
    }

    /***
     * Buyer content click
     * @param {string} id - review id
     * @private
     */
    __contentBuyerClick(id) {
        const numberId = parseInt(id, 10);

        this.__view.toggleBuyerReviewContent(numberId);
    }

    /***
     * Get presenter actions
     * @returns {{sellerReview: {contentClick: {open: *}, sortByDateClick: {open: *}, sortByRateClick: {open: *}}, buyerReview: {contentClick: {open: *}, sortByDateClick: {open: *}, sortByRateClick: {open: *}}}}
     * @private
     */
    __getActions() {
        return {
            sellerReview: {
                sortByDateClick: {
                    open: this.__sortSellerByDate.bind(this)
                },
                sortByRateClick: {
                    open: this.__sortSellerByRate.bind(this)
                },
                contentClick: {
                    open: this.__contentSellerClick.bind(this)
                }
            },
            buyerReview: {
                sortByDateClick: {
                    open: this.__sortBuyerByDate.bind(this)
                },
                sortByRateClick: {
                    open: this.__sortBuyerByRate.bind(this)
                },
                contentClick: {
                    open: this.__contentBuyerClick.bind(this)
                }
            }
        };
    }

    /***
     * Get view context
     * @returns {{buyerReviews: {data: {list: Object[]}, listeners: {reviewsClick: {listener: *, type: string}}}, profileSettings: {owner: boolean, data: {linkImage, surname, sex, name, telephone, id, dateBirth, email}}, sellerReviews: {data: {list: Object[]}, listeners: {reviewsClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            sellerReviews: {
                data: {
                    list: this.__userReviews.sellerReviewData
                },
                listeners: this.__createListeners().sellerReviews
            },
            buyerReviews: {
                data: {
                    list: this.__userReviews.buyerReviewData
                },
                listeners: this.__createListeners().buyerReviews
            },
            profileSettings: {
                data: this.__sellerModel.getData(),
                owner: this.__sellerModel.getData().id === this.__userModel.getData().id
            }
        };
    }
}