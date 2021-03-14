import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';
import {httpStatus} from '../modules/httpStatus.js';

import {deleteSymbolsXSS} from '../modules/xss.js';

/***
 * Settings user model
 */
export class SettingsUserData extends PasswordUserModel {
    /***
     * Fill user model data
     * @param {Object} data - user data
     */
    fillUserData(data) {
        super.fillUserData(data);
    }

    /***
     * Fill user new password
     * @param data
     */
    fillNewPassword(data) {
        this.__oldPassword = deleteSymbolsXSS(data.oldPass);
        this.__newPassword = deleteSymbolsXSS(data.newPass);
    }

    /***
     * Get passwords user model Json
     * @returns {{oldPassword, newPassword}}
     * @private
     */
    __jsonPassword() {
        return {
            oldPassword: this.__oldPassword,
            newPassword: this.__newPassword
        };
    }

    /***
     * Get settings user model Json
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
            linkImages: [this.__linkImages]
        };
    }

    /***
     * Get first image
     * @returns {string}
     */
    getFirstImage() {
        return super.__getFirstImage();
    }

    /***
     * Get user Data for settings
     * @returns {{linkImage: (*|null), surname: (Object.surname|string|*), sex: (Object.sex|string|*), name: (Object.name|string|*), telephone: (Object.telephone|string|*), dateBirth: (Object.dateBirth|string|*), email: (Object.email|string|*)}}
     */
    getData() {
        return {
            isAuth: this.__isAuth,
            name: this.__name,
            surname: this.__surname,
            dateBirth: this.__dateBirth,
            sex: this.__sex,
            email: this.__email,
            telephone: this.__telephone,
            linkImage: this.__linkImages !== undefined ? this.getFirstImage() : []
        };
    }

    /***
     * Post settings user data to backend
     * @returns {Promise<{isUpdate: boolean}>}
     */
    async settings() {
        return await http.post(urls.settings, this.__jsonData())
            .then(({status}) => {
                if (status === httpStatus.StatusOK) {
                    // this.__linkImages.push(data.linkImages);
                    this.__isAuth = false;
                    return {isUpdate: true};
                }

                if (status === httpStatus.StatusBadRequest) {
                    throw Error('Попробуйте еще раз');
                }

                if (status === httpStatus.StatusUnauthorized) {
                    throw Error('Пользователь не авторизован');
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw Error('Ошибка сервера');
                }

                return {isUpdate: true};
            });
    }

    /***
     * Post new user password to backend
     * @returns {Promise<void>}
     */
    async newPassword() {
        const data = this.__jsonPassword();
        return await http.post(urls.newPassword, data)
            .then(({status}) => {
                if (status === httpStatus.StatusBadRequest) {
                    throw Error('Неправильно введен пароль');
                }
            });
    }

    /***
     * Get user data from backend
     * @returns {Promise<void>}
     */
    async update() {
        if (!this.__isAuth) {
            return await http.get(urls.me)
                .then(({status, data}) => {
                    if (status === httpStatus.StatusOK) {
                        this.fillUserData(data);
                        this.__isAuth = true;
                        return {isUpdate: true};
                    }

                    if (status === httpStatus.StatusUnauthorized) {
                        throw data;
                    }

                    if (status === httpStatus.StatusInternalServerError) {
                        throw data;
                    }

                    this.__isAuth = false;
                    return {isUpdate: false};
                })
                .catch((err) => {
                    console.log('UserModel update', err.message);
                });
        }

        return Promise.resolve();
    }

    /***
     * Logout user
     * @returns {Promise<{isLogout: boolean} | void>}
     */
    async logout() {
        return await http.post(urls.logout, null)
            .then(({status, data}) => {
                if (status === httpStatus.StatusOK) {
                    this.__isAuth = false;
                    return {isLogout: true};
                }

                if (status === httpStatus.StatusUnauthorized) {
                    throw data;
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw data;
                }

                return {isLogout: false};
            })
            .catch((err) => {
                console.log('UserModel logout', err.message);
            });
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
            dateBirth: this.__dateBirth,
            email: this.__email,
            telephone: this.__telephone,
            linkImage: this.__linkImage,
            password: this.__password
        });
    }
}

export const user = new SettingsUserData();