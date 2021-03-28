import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';
import {httpStatus} from '../modules/httpStatus.js';

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
            name: this.__name,
            surname: this.__surname,
            dateBirth: this.__dateBirth,
            sex: this.__sex,
            email: this.__email,
            telephone: this.__telephone,
            password: this.__password,
            linkImages: this.__linkImages
        };
    }


    /***
     * Post registration user data to backend
     * @returns {Promise<{}|void>}
     */
    async registration(form) {
        return await http.post(backUrls.singUp, this.__jsonData())
            .then(({status, data}) => {
                if (status === httpStatus.StatusOK) {
                    return http.post(backUrls.upload, new FormData(form), true)
                        .then(({status, data}) => {
                            if (status === httpStatus.StatusOK) {
                                return {};
                            }

                            if (status === httpStatus.StatusBadRequest) {
                                throw new Error(data.message);
                            }

                            if (status === httpStatus.StatusUnauthorized) {
                                throw new Error(data.message);
                            }

                            if (status === httpStatus.StatusInternalServerError) {
                                throw new Error(data.message);
                            }

                            return {};
                        })
                        .catch((err) => {
                            throw err;
                        });
                }

                if (status === httpStatus.StatusBadRequest) {
                    throw new Error('Пользователь уже существует');
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error(data.message);
                }

                return {};
            }).catch((err) => Promise.reject(err));
    }
}
