import {ProductListModel} from './ProductListModel.js';

import {http} from '../modules/http/http.js';
import {backUrls} from '../modules/urls/backUrls.js';

/***
 * Trends list model
 */
export class UserListProduct extends ProductListModel {
    /***
     * Constructor
     * @param id
     */
    constructor(id) {
        super();
        this.__id = id;
    }

    /***
     * Get data from backend with pagination
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateNewDataPage() {
        return http.get(backUrls.sellerAdList(this.__page, this.__pageCount, this.__id))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.parseData(data);
            });
    }
}
