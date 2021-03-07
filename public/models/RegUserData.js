import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';

/***
 * Registration user model
 */
export class RegUserData extends PasswordUserModel {
    /***
     * Fill user model data
     * @param {Object} data - user data
     */
    fillUserData(data) {
        super.fillUserData(data);
    }

    /***
     * Get registration user model Json
     * @returns {{password: string, year: (Object.year|string|*), surname: (Object.surname|string|*), sex: (Object.sex|string|*), name: (Object.name|string|*), telephone: (Object.telephone|string|*), email: (Object.email|string|*)}}
     * @private
     */
    __jsonData() {
        return {
            id: 0,
            name: this.__name,
            surname: this.__surname,
            date_birth: this.__date_birth,
            sex: this.__sex,
            email: this.__email,
            telephone: this.__telephone,
            password: this.__password
        };
    }

    /***
     * Post registration user data to backend
     * @returns {Promise<{data: *, status: number}>}
     */
    async registration() {
        const data = this.__jsonData();
        return await http.post(urls.singUp, data);
    }

    /***
     * Log current data
     */
    log() {
        console.dir({
            id: this.__id,
            name: this.__name,
            surname: this.__surname,
            sex: this.__sex,
            date_birth: this.__date_birth,
            email: this.__email,
            telephone: this.__telephone,
            linkImage: this.__linkImage,
            password: this.__password
        });
    }
}
