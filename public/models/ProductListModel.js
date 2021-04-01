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
     * @param {number} pageCount - count of products in page
     */
    constructor(pageCount = 30) {
        this.__productList = [];
        this.__page = 1;
        this.__pageCount = pageCount;
    }

    /***
     * Parse object to model
     * @param {Object} data - product list data
     */
    parseData(data) {
        this.__newData = data.product_list.reduce((accum, el) => {
            const product = new ProductModel(el);
            accum.push(product);

            return accum;
        }, []);

        this.__productList = this.__productList.concat(this.__newData);
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
        return http.get(backUrls.productList)
            .then(({status, data}) => {
                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                this.parseData(data);
            })
            .catch((err) => {
                console.log(err.message);
                throw err;
            });
    }
}