import {ProductListModel} from './ProductListModel.js';

import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';
import {httpStatus} from '../modules/httpStatus.js';

/***
 * Main list model
 */
export class MainListModel extends ProductListModel {
    /***
     * Get data from backend with pagination
     * @returns {Promise<void>}
     * @private
     */
    async __updateNewDataPage() {
        return http.get(backUrls.productList(this.__page, this.__pageCount))
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