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
     * @returns {{surname: Object.surname, sex: Object.sex, name: Object.name, telephone: Object.telephone, password2: string, linkImages: Object.linkImages, password1: string, dateBirth: Object.dateBirth, email: Object.email}}
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
            password1: this.__password1,
            password2: this.__password2,
            linkImages: this.__linkImages
        };
    }


    /***
     * Post registration user data to backend
     * @returns {Promise<{}|void>}
     */
    async registration(form) {
        return http.post(backUrls.singUp, this.__jsonData())
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

                            if (status === httpStatus.StatusForbidden) {
                                throw new Error('Доступ запрещен');
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
                if (status === httpStatus.StatusForbidden) {
                    throw new Error('Доступ запрещен');
                }
                return {};
            }).catch((err) => Promise.reject(err));
    }
}
