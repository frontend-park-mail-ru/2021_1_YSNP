import {ProductModel} from './ProductModel.js';


import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';
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
     * Get product list data
     * @returns {[]}
     */
    getData() {
        return this.__productList.reduce((data, el) => {
            data.push(el.getMainData());
            return data;
        }, []);
    }

    /***
     * Get product list data from backend
     * @returns {Promise<void>}
     */
    async update() {
        return http.get(backUrls.productList)
            .then(({status, data}) => {
                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                this.__parseData(data);
            })
            .catch((err) => {
                console.log(err.message);
                throw err;
            });
    }
}