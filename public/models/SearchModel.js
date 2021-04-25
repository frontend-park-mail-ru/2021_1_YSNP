import {ProductListModel} from './ProductListModel.js';

import {http} from '../modules/http';
import {backUrls} from '../modules/backUrls';

/***
 * Registration user model
 */
export class SearchModel extends ProductListModel {
    /***
     * Fill product model
     * @param {Object} data - product data
     */
    fillSearchData(data) {
        this.__category = data.category;
        this.__fromAmount = data.fromAmount;
        this.__toAmount = data.toAmount;
        this.__date = data.date;
        this.__radius = data.radius;
        this.__latitude = data.latitude;
        this.__longitude = data.longitude;
        this.__sorting = data.sorting;
        this.__search = data.search;
    }

    /***
     * Get product model Json
     * @returns {{amount: (Object.amount|number|*), name: (Object.name|string|*), description: (Object.description|string|*)}}
     * @private
     */
    __jsonSearchData() {
        return {
            category: this.__category ? this.__category : '',
            fromAmount: this.__fromAmount ? this.__fromAmount : '',
            toAmount: this.__toAmount ? this.__toAmount : '',
            date: this.__date ? this.__date : '',
            radius: this.__radius ? this.__radius : '',
            latitude: this.__latitude ? this.__latitude : '',
            longitude: this.__longitude ? this.__longitude : '',
            sorting: this.__sorting ? this.__sorting : '',
            search: this.__search ? this.__search : '',
            from: this.__page,
            count: this.__pageCount
        };
    }

    /***
     * Get data from backend with pagination
     * @returns {Promise<{data: *, status: number}>}
     * @private
     */
    async __updateNewDataPage() {
        return http.get(backUrls.search(this.__jsonSearchData()))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message,
                    notFound: 'Больше объявлений нет'
                });

                this.parseData(data);
            });
    }
}
