import {ProductListModel} from './ProductListModel.js';

import {http} from '../modules/http/http.js';
import {backUrls} from '../modules/urls/backUrls.js';

/***
 * Favorite list model
 */
export class RecListModel extends ProductListModel {

    /***
     * Get data from backend
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateNewDataPage() {
        return http.get(backUrls.recProducts)
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.parseData(data);
            });
    }
}
