import {BasePresenter} from './BasePresenter.js';

import {UserModel} from '../models/UserModel';
import {UserReviewsModel} from '../models/UserReviewsModel';

import {EndlessScroll} from '../modules/handlers/endlessScroll.js';
import {eventHandler} from '../modules/handlers/eventHandler';

import {sentryManager} from '../modules/sentry';

/***
 * Comments presenter
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
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        return super.update()
            .then(() => {
                if (this.__userModel.getData().id === this.__userID) {
                    this.__sellerModel.fillUserData(this.__userModel.getData());
                    return;
                }

                this.__sellerModel.getUser(this.__userID);
            })
            .then(() => this.__userReviews.updateSellerReview())
            .then(() => this.__userReviews.updateBuyerReview())
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                // if (!UnauthorizedError.isError(err)) {
                //     sentryManager.captureException(err);
                // }

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

    __listenerSellerReviewClick(ev) {
        ev.stopPropagation();

        eventHandler(ev, this.__getActions().sellerReview);
    }

    __listenerBuyerReviewClick(ev) {
        ev.stopPropagation();

        eventHandler(ev, this.__getActions().buyerReview);
    }

    __scrollSellerEnd() {
        console.log('seller end');

        this.__userReviews.updateSellerReviewNewData()
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
                // if (!NotFoundError.isError(err)) {
                //     sentryManager.captureException(err);
                // }

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    __scrollBuyerEnd() {
        console.log('buyer end');

        this.__userReviews.updateBuyerReviewNewData()
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
                // if (!NotFoundError.isError(err)) {
                //     sentryManager.captureException(err);
                // }

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /****
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
     * Sort comments for seller by date
     * @private
     */
    __sortSellerByDate() {
        //TODO request to sort
        console.log('Sort by date SELLERS');
    }

    /***
     * Sort comments for seller by rate
     * @private
     */
    __sortSellerByRate() {
        //TODO request to sort
        console.log('Sort by rate SELLERS');
    }

    /***
     * Sort comments for seller by date
     * @private
     */
    __sortBuyerByDate() {
        //TODO request to sort
        console.log('Sort by date BUYERS');
    }

    /***
     * Sort comments for seller by rate
     * @private
     */
    __sortBuyerByRate() {
        //TODO request to sort
        console.log('Sort by rate BUYERS');
    }

    /****
     * Get presenter actions
     * @returns {{sellerReview: {sortByDateClick: {open: *}, sortByRateClick: {open: *}}, buyerReview: {sortByDateClick: {open: *}, sortByRateClick: {open: *}}}}
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
                }
            },
            buyerReview: {
                sortByDateClick: {
                    open: this.__sortBuyerByDate.bind(this)
                },
                sortByRateClick: {
                    open: this.__sortBuyerByRate.bind(this)
                }
            }
        };
    }

    /***
     * Get view context
     * @returns {any}
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