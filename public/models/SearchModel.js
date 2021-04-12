import {http} from '../modules/http';
import {backUrls} from '../modules/backUrls';
import {httpStatus} from '../modules/httpStatus';

/***
 * Registration user model
 */
export class SearchModel {
    /***
     * Class constructor
     * @param data
     */
    constructor(data = {}) {
        this.fillProductModel(data);
    }


    /***
     * Fill product model
     * @param {Object} data - product data
     */
    fillProductModel(data) {
        this.__category = data.category;
        this.__fromAmount = data.fromAmount;
        this.__toAmount = data.toAmount;
        this.__date = data.date;
        this.__radius = data.radius;
        this.__sorting = data.sorting;
        this.__search = data.search;
    }

    /***
     * Get product model Json
     * @returns {{amount: (Object.amount|number|*), name: (Object.name|string|*), description: (Object.description|string|*)}}
     * @private
     */
    __jsonData() {
        return {
            category: this.__category,
            fromAmount: this.__fromAmount,
            toAmount: this.__toAmount,
            date: this.__date,
            radius: this.__radius,
            sorting: this.__sorting,
            search: this.__search
        };
    }

    /***
     * Get product data from backend
     * @returns {Promise<{isUpdate: boolean}|void>}
     */
    async update() {
        return http.post(backUrls.search, this.__jsonData())
            .then(({status, data}) => {
                if (status === httpStatus.StatusForbidden) {
                    throw new Error('Доступ запрещен');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusBadRequest) {
                    throw new Error('Неправильные данные');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusNotFound) {
                    throw new Error('Нет такого товара');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                return {isUpdate: true, data: data};
            });
    }
}
