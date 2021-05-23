import {BaseModel} from './BaseModel';

import {http} from '../modules/http/http';
import {backUrls} from '../modules/urls/backUrls';

/***
 * User reviews model
 */
export class UserReviewsModel extends BaseModel {
    /***
     * Class constructor
     * @param {number} id - user id
     * @param {number} sellerPageCount - seller per page count
     * @param {number} buyerPageCount - buyer per page count
     */
    constructor(id, sellerPageCount = 20, buyerPageCount = 20) {
        super();

        this.__userId = id;

        this.__sellerReviewsList = [];
        this.__isUpdateSeller = false;
        this.__sellerPage = 0;
        this.__sellerPageCount = sellerPageCount;

        this.__buyerReviewList = [];
        this.__isUpdateBuyer = false;
        this.__buyerPage = 0;
        this.__buyerPageCount = buyerPageCount;
    }

    /***
     * Get locale date
     * @param {string} date - date
     * @returns {string}
     * @private
     */
    __getDate(date) {
        const localDate = new Date(date);
        return localDate.toLocaleDateString('ru-RU', {
            timeZone: 'Europe/Moscow',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
    }

    /***
     * Get seller review data
     * @returns {Object[]}
     */
    get sellerReviewData() {
        return this.__sellerReviewsList;
    }

    /***
     * Get seller review new data
     * @returns {Object[]}
     */
    get sellerReviewNewData() {
        return this.__sellerReviewListNewData;
    }

    /***
     * Parse one seller review
     * @param {Object} data - seller data
     * @returns {{}}
     * @private
     */
    __parseOneSellerReview(data) {
        return {
            reviewId: data.id,
            content: data.content,
            rating: data.rating,
            date: this.__getDate(data.creation_time),
            userId: data.reviewer_id,
            userName: data.reviewer_name,
            userImg: data.reviewer_avatar,
            productId: data.product_id,
            productName: data.product_name,
            productImg: data.product_image
        };
    }

    /***
     * Parse seller review list data
     * @param {Object[]} data - seller list
     * @private
     */
    __parseSellerReviewData(data) {
        this.__isUpdateSeller = false;
        if (!Array.isArray(data)) {
            throw new Error('no data');
        }

        this.__sellerReviewListNewData = data.reduce((accum, el) => {
            const sellerReview = this.__parseOneSellerReview(el);
            accum.push(sellerReview);

            return accum;
        }, []);

        this.__sellerReviewsList = this.__sellerReviewsList.concat(this.__sellerReviewListNewData);
    }

    /***
     * Update seller review
     * @returns {Promise<void>}
     */
    async updateSellerReview() {
        this.__sellerReviewsList = [];
        this.__sellerPage = 0;

        return this.__updateSellerReviewNewDataPage();
    }

    /***
     * Update seller review new data
     * @returns {Promise<void>}
     */
    async updateSellerReviewNewData() {
        if (!this.__isUpdateSeller) {
            this.__isUpdateSeller = true;
            this.__sellerPage++;
            return this.__updateSellerReviewNewDataPage();
        }

        return Promise.reject({message: 'isUpdate'});
    }

    /***
     * Update seller review data page
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateSellerReviewNewDataPage() {
        return http.get(backUrls.userSellerReviews(this.__userId, this.__sellerPage, this.__sellerPageCount))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.__parseSellerReviewData(data);
            });
    }

    /***
     * Get buyer review data
     * @returns {Object[]}
     */
    get buyerReviewData() {
        return this.__buyerReviewList;
    }

    /***
     * Get buyer review new data
     * @returns {Object[]}
     */
    get buyerReviewNewData() {
        return this.__buyerReviewListNewData;
    }

    /***
     * Parse one buyer review
     * @param {Object} data - buyer review
     * @returns {{}}
     * @private
     */
    __parseOneBuyerReviewData(data) {
        return {
            reviewId: data.id,
            content: data.content,
            rating: data.rating,
            date: this.__getDate(data.creation_time),
            userId: data.reviewer_id,
            userName: data.reviewer_name,
            userImg: data.reviewer_avatar,
            productId: data.product_id,
            productName: data.product_name,
            productImg: data.product_image
        };
    }

    /***
     * Parse buyer review list data
     * @param {Object[]} data - buyer list
     * @private
     */
    __parseBuyerReviewData(data) {
        this.__isUpdateBuyer = false;
        if (!Array.isArray(data)) {
            throw new Error('no data');
        }

        this.__buyerReviewListNewData = data.reduce((accum, el) => {
            const buyerReview = this.__parseOneBuyerReviewData(el);
            accum.push(buyerReview);

            return accum;
        }, []);

        this.__buyerReviewList = this.__buyerReviewList.concat(this.__buyerReviewListNewData);
    }

    /***
     * Update buyer review
     * @returns {Promise<void>}
     */
    async updateBuyerReview() {
        this.__buyerReviewList = [];
        this.__buyerPage = 0;

        return this.__updateBuyerReviewNewDataPage();
    }

    /***
     * Update buyer review new data
     * @returns {Promise<void>}
     */
    async updateBuyerReviewNewData() {
        if (!this.__isUpdateBuyer) {
            this.__isUpdateBuyer = true;
            this.__buyerPage++;
            return this.__updateBuyerReviewNewDataPage();
        }

        return Promise.reject({message: 'isUpdate'});
    }

    /***
     * Update buyer review page data
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateBuyerReviewNewDataPage() {
        return http.get(backUrls.userBuyerReviews(this.__userId, this.__buyerPage, this.__buyerPageCount))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.__parseBuyerReviewData(data);
            });
    }
}