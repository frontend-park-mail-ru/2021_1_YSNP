import {ProductModel} from './ProductModel.js';

import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';

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
        data.forEach((productJson) => {
            const product = new ProductModel(productJson);
            this.__productList.push(product);
        });
    }

    /***
     * Get product list data from backend
     * @returns {Promise<void>}
     */
    async update() {
        await http.get(urls.main)
            .then(({status, data}) => {
                if (status === 200) {
                    this.__parseData(data);
                }
            })
            .catch((err) => {
                console.log(err.message);
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
