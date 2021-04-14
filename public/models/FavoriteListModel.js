import {ProductListModel} from './ProductListModel.js';

import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';
import {httpStatus} from '../modules/httpStatus.js';

import {BadRequestError, OfflineError, InternalServerError} from '../modules/customError.js';

/***
 * Favorite list model
 */
export class FavoriteListModel extends ProductListModel {
    /***
     * Get data from backend with pagination
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateNewDataPage() {
        return http.get(backUrls.userFavoriteList(this.__page, this.__pageCount))
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

                this.parseData(data, true);
            });
    }
}