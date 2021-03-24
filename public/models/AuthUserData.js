import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';
import {httpStatus} from '../modules/httpStatus.js';

/***
 * Auth user model
 */
export class AuthUserData extends PasswordUserModel {
    /***
     * Validate user data
     * @param {Object} data - user data
     * @returns {{message: string, error: boolean}}
     */
    validateData(data) {
        const telephoneValidate = this.validationTelephone(data.telephone);
        const passwordValidate = this.validationPassword(data.telephone);

        if (!telephoneValidate.error || !passwordValidate.error) {
            this.fillUserData(data);

            return {
                message: '',
                error: false
            };
        }

        return {
            message: 'Неправильный номер или пароль',
            error: true
        };
    }

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
            .then(({status}) => {
                if (status === httpStatus.StatusBadRequest) {
                    throw new Error('Неправильный номер или пароль');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                return {isAuth: true};
            })
            .catch((err) => {
                console.log('AuthUserData auth', err.message);
                return {isAuth: false, message: err.message};
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
