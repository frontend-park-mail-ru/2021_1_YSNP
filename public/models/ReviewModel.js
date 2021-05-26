/* eslint-disable camelcase */

import {BaseModel} from './BaseModel';

import {http} from '../modules/http/http';
import {backUrls} from '../modules/urls/backUrls';

/***
 * Review model
 */
export class ReviewModel extends BaseModel {
    /***
     * Class constructor
     * @param {number} sellerPageCount - seller per page count
     * @param {number} buyerPageCount - buyer per page count
     */
    constructor(sellerPageCount = 20, buyerPageCount = 20) {
        super();
        this.__sellerReviewsAwait = [];
        this.__isUpdateSeller = false;
        this.__sellerPage = 0;
        this.__sellerPageCount = sellerPageCount;

        this.__buyerReviewAwait = [];
        this.__isUpdateBuyer = false;
        this.__buyerPage = 0;
        this.__buyerPageCount = buyerPageCount;
    }

    /***
     * Get seller data
     * @returns {Object[]}
     */
    get sellerData() {
        return this.__sellerReviewsAwait;
    }

    /***
     * Get seller new data
     * @returns {Object[]}
     */
    get sellerNewData() {
        return this.__sellerNewData;
    }

    /***
     * Ger one seller data
     * @param {number} sellerId - selller id
     * @returns {Object}
     */
    getOneSeller(sellerId) {
        return this.__sellerReviewsAwait.find((el) => el.userId === sellerId);
    }

    /***
     * Parse one seller
     * @param {Object} data - seller data
     * @returns {{userImg: *, productId, productImg: *, userName: *, userId, productName: *}}
     * @private
     */
    __parseOneSeller(data) {
        return {
            productId: data.product_id,
            productName: data.product_name,
            productImg: data.product_image,
            userId: data.target_id,
            userName: data.target_name,
            userImg: data.target_avatar
        };
    }

    /***
     * Parse seller data
     * @param {Object[]} data - seller list
     * @private
     */
    __parseSellerData(data) {
        this.__isUpdateSeller = false;
        if (!Array.isArray(data)) {
            throw new Error('no data');
        }

        this.__sellerNewData = data.reduce((accum, el) => {
            const sellerReviewAwait = this.__parseOneSeller(el);
            accum.push(sellerReviewAwait);

            return accum;
        }, []);

        this.__sellerReviewsAwait = this.__sellerReviewsAwait.concat(this.__sellerNewData);
    }

    /***
     * Update seller
     * @returns {Promise<void>}
     */
    async updateSeller() {
        this.__sellerReviewsAwait = [];
        this.__sellerPage = 0;

        return this.__updateSellerNewDataPage();
    }

    /***
     * Update seller new data
     * @returns {Promise<void>}
     */
    async updateSellerNewData() {
        if (!this.__isUpdateSeller) {
            this.__isUpdateSeller = true;
            this.__sellerPage++;
            return this.__updateSellerNewDataPage();
        }

        return Promise.reject({message: 'isUpdate'});
    }

    /***
     * Update seller data per page
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateSellerNewDataPage() {
        return http.get(backUrls.getSellerReviewAwait(this.__sellerPage, this.__sellerPageCount))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.__parseSellerData(data);
            });
    }

    /***
     * Get buyer data
     * @returns {Object[]}
     */
    get buyerData() {
        return this.__buyerReviewAwait;
    }

    /***
     * Get buyer new data
     * @returns {Object[]}
     */
    get buyerNewData() {
        return this.__buyerNewData;
    }

    /***
     * Get one buyer data
     * @param buyerId
     * @returns {Object}
     */
    getOneBuyer(buyerId) {
        return this.__buyerReviewAwait.find((el) => el.userId === buyerId);
    }

    /***
     * Parse one buyer
     * @param {Object} data - buyer data
     * @returns {{userImg: *, productId, productImg: *, userName: *, isBuyer: boolean, userId, productName: *}}
     * @private
     */
    __parseOneBuyer(data) {
        return {
            isBuyer: true,
            productId: data.product_id,
            productName: data.product_name,
            productImg: data.product_image,
            userId: data.target_id,
            userName: data.target_name,
            userImg: data.target_avatar
        };
    }

    /***
     * Parse buyer data
     * @param {Object[]} data - buyer list
     * @private
     */
    __parseBuyerData(data) {
        this.__isUpdateBuyer = false;
        if (!Array.isArray(data)) {
            throw new Error('no data');
        }

        this.__buyerNewData = data.reduce((accum, el) => {
            const buyerReviewAwait = this.__parseOneBuyer(el);
            accum.push(buyerReviewAwait);

            return accum;
        }, []);

        this.__buyerReviewAwait = this.__buyerReviewAwait.concat(this.__buyerNewData);
    }

    /***
     * Update buyer
     * @returns {Promise<void>}
     */
    async updateBuyer() {
        this.__buyerReviewAwait = [];
        this.__buyerPage = 0;

        return this.__updateBuyerNewDataPage();
    }

    /***
     * Update buyer new data
     * @returns {Promise<void>}
     */
    async updateBuyerNewData() {
        if (!this.__isUpdateBuyer) {
            this.__isUpdateBuyer = true;
            this.__buyerPage++;
            return this.__updateBuyerNewDataPage();
        }

        return Promise.reject({message: 'isUpdate'});
    }

    /***
     * Update buyer data per page
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateBuyerNewDataPage() {
        return http.get(backUrls.getBuyerReviewAwait(this.__buyerPage, this.__buyerPageCount))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.__parseBuyerData(data);
            });
    }

    /***
     * Set seller data
     * @param {number} productId - product id
     * @param {number} sellerId - seller id
     */
    setSellerData(productId, sellerId) {
        this.__productId = productId;
        this.__sellerId = sellerId;

        this.__active = 'seller';
    }

    /***
     * Set buyer data
     * @param {number} productId - product id
     * @param {number} buyerId - buyer id
     */
    setBuyerData(productId, buyerId) {
        this.__productId = productId;
        this.__buyerId = buyerId;

        this.__active = 'buyer';
    }

    /***
     * Get review data
     * @returns {{}|Object}
     */
    getReviewData() {
        switch (this.__active) {
            case 'seller': {
                return this.getOneSeller(this.__sellerId);
            }

            case 'buyer': {
                return this.getOneBuyer(this.__buyerId);
            }
        }

        return {};
    }

    /***
     * Json review data
     * @param {string} content - review text
     * @param {number} rating - review rating
     * @param {number} targetId - review target
     * @param {string} type - review type
     * @returns {{product_id: (number|*), rating, target_id, type, content}}
     * @private
     */
    __jsonReview(content, rating, targetId, type) {
        return {
            content: content,
            rating: rating,
            product_id: this.__productId,
            target_id: targetId,
            type: type
        };
    }

    /***
     * Review
     * @param {string} text - review text
     * @param {number} rating - review rating
     * @returns {Promise<void>}
     */
    async review(text, rating) {
        switch (this.__active) {
            case 'seller': {
                return this.__reviewUser(text, rating, this.__sellerId, 'buyer');
            }

            case 'buyer': {
                return this.__reviewUser(text, rating, this.__buyerId, 'seller');
            }
        }

        return Promise.reject({message: 'not active'});
    }

    /***
     * Review user
     * @param {string} text - review text
     * @param {number} rating - review rating
     * @param {number} targetId - review target
     * @param {string} type - review type
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __reviewUser(text, rating, targetId, type) {
        return http.post(backUrls.setProductReview(this.__productId), this.__jsonReview(text, rating, targetId, type))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });
            });
    }
}