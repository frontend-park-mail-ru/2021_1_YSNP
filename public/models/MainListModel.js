import {ProductListModel} from './ProductListModel.js';

import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';

/***
 * Main list model
 */
export class MainListModel extends ProductListModel {
    /***
     * Get data from backend with pagination
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateNewDataPage() {
        return http.get(backUrls.productList(this.__page, this.__pageCount))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.parseData(data);
            });
    }
}