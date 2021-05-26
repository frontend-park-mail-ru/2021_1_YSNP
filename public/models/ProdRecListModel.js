import {ProductListModel} from './ProductListModel.js';

import {http} from '../modules/http/http.js';
import {backUrls} from '../modules/urls/backUrls.js';

/***
 * Product recommendation list model
 */
export class ProdRecListModel extends ProductListModel {
    /***
     * Constructor
     * @param id
     */
    constructor(id) {
        super();
        this.__id = id;
    }


    /***
     * Get data from backend
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateNewDataPage() {
        return http.get(backUrls.recForProductList(this.__id))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.parseData(data);
            });
    }
}
