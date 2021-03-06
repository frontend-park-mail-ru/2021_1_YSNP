import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';

/***
 * Auth user model
 */
export class AuthUserData extends PasswordUserModel {
    /***
     * Fill user model data
     * @param {Object} data - user data
     */
    fillUserData(data) {
        super.fillUserData(data);
    }

    /***
     * Get auth user model Json
     * @returns {{password: string, telephone: (Object.telephone|string|*)}}
     * @private
     */
    __jsonData() {
        return {
            telephone: this.__telephone,
            password: this.__password
        };
    }

    /***
     * Post auth user data to backend
     * @returns {Promise<{data: *, status: number}>}
     */
    async auth() {
        const data = this.__jsonData();
        return await http.post(urls.login, data);
    }

    /***
     * Log current data
     */
    log() {
        console.dir({
            telephone: this.__telephone,
            password: this.__password
        });
    }
}
