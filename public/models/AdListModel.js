import {ProductListModel} from './ProductListModel.js';

import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';
import {httpStatus} from '../modules/httpStatus.js';

/***
 * Favorite list model
 */
export class AdListModel extends ProductListModel {
    /***
     * Get data from backend with pagination
     * @returns {Promise<void>}
     * @private
     */
    async __updateNewDataPage() {
        return http.get(backUrls.userAdList(this.__page, this.__pageCount))
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