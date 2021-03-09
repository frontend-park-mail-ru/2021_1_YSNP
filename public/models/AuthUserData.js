import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';
import {httpStatus} from '../modules/httpStatus.js';

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
     * @returns {Promise<{isAuth: boolean}|void>}
     */
    async auth() {
        return await http.post(urls.login, this.__jsonData())
            .then(({status, data}) => {
                if (status === httpStatus.StatusOK) {
                    return {isAuth: true, err: ''};
                }

                if (status === httpStatus.StatusBadRequest) {
                    throw new Error('Неправильный логин или пароль');
                    // throw data;
                }

                if (status === httpStatus.StatusNotFound) {
                    throw new Error('Неправильный логин или пароль');
                    // throw data;
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw data;
                }

                return {isAuth: false, err: ''};
            })
            .catch((err) => {
                console.log('AuthUserData auth', err.message);
                return {isAuth: false, err: err.message};
            });
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
