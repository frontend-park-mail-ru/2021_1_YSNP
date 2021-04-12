import {ProductModel} from './ProductModel.js';
import {http} from '../modules/http';
import {backUrls} from '../modules/backUrls';
import {httpStatus} from '../modules/httpStatus';

/***
 * Product list model
 */
export class ProductListModel {
    /***
     * Class constructor
     * @param {number} pageCount - count of products in page
     */
    constructor(pageCount = 30) {
        this.__productList = [];
        this.__page = 0;
        this.__pageCount = pageCount;
    }

    /***
     * Parse object to model
     * @param {Object} data - product list data
     * @param {boolean} isLiked - product like
     */
    parseData(data, isLiked = false) {
        if (!Array.isArray(data)) {
            throw new Error('no data');
        }

        this.__newData = data.reduce((accum, el) => {
            const product = new ProductModel(el);
            if (isLiked) {
                product.setLiked();
            }
            accum.push(product);

            return accum;
        }, []);

        this.__productList = this.__productList.concat(this.__newData);
    }

    /***
     * Vote product
     * @param {number} id - product id
     * @returns {Promise<{status: string} | void>}
     */
    async voteProduct(id) {
        const product = this.__getProduct(id);
        if (product.userLiked) {
            return this.__dislikeProduct(id, product);
        }

        return this.__likeProduct(id, product);
    }

    /***
     * Get product
     * @param {number} id - product id
     * @returns {ProductModel}
     * @private
     */
    __getProduct(id) {
        return this.__productList.find((el) => el.id === id);
    }

    /***
     * Get product list data
     * @returns {Object[]}
     */
    getData() {
        return this.__getArrayData(this.__productList);
    }

    /***
     * Get product list new data
     * @returns {Object[]}
     */
    get newData() {
        return this.__getArrayData(this.__newData);
    }

    /***
     * Get Array data from class
     * @param {ProductModel[]} list - product model list
     * @returns {Object[]}
     * @private
     */
    __getArrayData(list) {
        return list.reduce((data, el) => {
            data.push(el.getMainData());
            return data;
        }, []);
    }

    /***
     * Get product list data from backend
     * @returns {Promise<void>}
     */
    async update() {
        this.__productList = [];
        return this.__updateNewDataPage();
    }

    /***
     * Get new product list data form backend
     * @returns {Promise<void>}
     */
    async updateNewData() {
        this.__page++;
        return this.__updateNewDataPage();
    }

    /***
     * Get data from backend with pagination
     * @returns {Promise<void>}
     * @private
     */
    async __updateNewDataPage() {
        throw new Error('virtual method not initialized!');
    }

    /***
     * Like product
     * @param {number} id - product id
     *  @param {ProductModel} product - product
     * @returns {Promise<{status: string}>}
     * @private
     */
    async __likeProduct(id, product) {
        return http.post(backUrls.userLikeProduct(id), null)
            .then(({status}) => {
                if (status === httpStatus.StatusUnauthorized) {
                    throw new Error('Пользователь не авторизован');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusForbidden) {
                    throw new Error('Доступ запрещен');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusBadRequest) {
                    throw new Error('Неправильные данные');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                product.setLike();
                return {status: 'like'};
            });
    }

    /***
     * Dislike product
     * @param {number} id - product id
     * @param {ProductModel} product - product
     * @returns {Promise<{status: string}>}
     * @private
     */
    async __dislikeProduct(id, product) {
        return http.post(backUrls.userDislikeProduct(id), null)
            .then(({status}) => {
                if (status === httpStatus.StatusUnauthorized) {
                    throw new Error('Пользователь не авторизован');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusForbidden) {
                    throw new Error('Доступ запрещен');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusBadRequest) {
                    throw new Error('Неправильные данные');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                product.setDislike();
                return {status: 'dislike'};
            });
    }
}