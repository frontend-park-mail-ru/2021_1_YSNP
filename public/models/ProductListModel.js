import {ProductModel} from './ProductModel.js';


import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';
import {httpStatus} from '../modules/httpStatus.js';

/***
 * Product list model
 */
export class ProductListModel {
    /***
     * Class constructor
     */
    constructor() {
        this.__productList = [];
    }

    /***
     * Get product list
     * @returns {Array}
     */
    get productList() {
        return this.__productList;
    }

    /***
     * Set productList
     * @param {Array} productList - productList data
     */
    set productList(productList) {
        this.__productList = productList;
    }

    /***
     * Parse object to model
     * @param {Object} data - product list data
     * @private
     */
    __parseData(data) {
        data.product_list.forEach((productJson) => {
            const product = new ProductModel(productJson);
            this.__productList.push(product);
        });

    }

    /***
     * Get product list data from backend
     * @returns {Promise<{isUpdate: boolean}|{message: *, isUpdate: boolean}>}
     */
    async update() {
        return await http.get(urls.productList)
            .then(({status, data}) => {
                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                this.__parseData(data);
                return {isUpdate: true};
            })
            .catch((err) => {
                console.log('ProductListModel update', err.message);
                return {isUpdate: false, message: err.message};
            });
    }

    /***
     * Log current data
     */
    log() {
        this.__productList.forEach((el) => {
            el.log();
        });
    }
}