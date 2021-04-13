import {ProductListModel} from './ProductListModel.js';

import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';
import {httpStatus} from '../modules/httpStatus.js';

import {BadRequestError, OfflineError, InternalServerError} from '../modules/customError.js';

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
                if (status === httpStatus.StatusBadRequest) {
                    throw new BadRequestError();
                    // throw new BadRequestError(data.message);
                }

                if (status === httpStatus.StatusOffline) {
                    throw new OfflineError();
                    // throw new OfflineError(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new InternalServerError();
                    // throw new InternalServerError(data.message);
                }

                this.parseData(data);
            });
    }
}