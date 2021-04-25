import {ProductListModel} from './ProductListModel.js';

import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';

/***
 * Favorite list model
 */
export class AdListModel extends ProductListModel {
    /***
     * Get Array data from class
     * @param {ProductModel[]} list - product model list
     * @returns {Object[]}
     * @private
     */
    __getArrayData(list) {
        return list.reduce((data, el) => {
            data.push(el.getAdData());
            return data;
        }, []);
    }

    /***
     * Get data from backend with pagination
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateNewDataPage() {
        return http.get(backUrls.userAdList(this.__page, this.__pageCount))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.parseData(data);
            });
    }
}