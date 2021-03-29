import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';
import {httpStatus} from '../modules/httpStatus.js';

/***
 * Settings user model
 */
export class ProfileUserModel extends PasswordUserModel {
    /***
     * Class constructor
     */
    constructor() {
        super();
        this.__isAuth = false;
    }

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
        this.__oldPassword = data.oldPass;
        this.__newPassword = data.newPass;
    }

    /***
     * Is auth user
     * @returns {boolean|*}
     */
    get isAuth() {
        return this.__isAuth;
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
        return await http.post(backUrls.settings, this.__jsonData())
            .then(({status}) => {
                if (status === httpStatus.StatusUnauthorized) {
                    throw new Error('Пользователь не авторизован');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusBadRequest) {
                    throw new Error('Попробуйте еще раз');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                this.__isAuth = false;
                return {isUpdate: true};
            })
            .catch((err) => {
                console.log(err.message);
                return {isUpdate: false, message: err.message};
            });
    }

    /***
     * Post new user password to backend
     * @returns {Promise<{isUpdate: boolean}|{message: *, isUpdate: boolean}>}
     */
    async newPassword() {
        return await http.post(backUrls.newPassword, this.__jsonPassword())
            .then(({status}) => {
                if (status === httpStatus.StatusBadRequest) {
                    throw new Error('Неправильно введен пароль');
                    // throw new Error(data.message);
                }

                return {isUpdate: true};
            })
            .catch((err) => {
                console.log(err.message);
                return {isUpdate: false, message: err.message};
            });
    }

    /***
     * Get user data from backend
     * @returns {Promise<void>}
     */
    async update() {
        if (this.__isAuth) {
            return;
        }

        return await http.get(backUrls.me)
            .then(({status, data}) => {
                if (status === httpStatus.StatusUnauthorized) {
                    throw new Error('Пользователь не авторизован');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                this.fillUserData(data);
                this.__isAuth = true;
            })
            .catch((err) => {
                console.log(err.message);
                // throw err;
            });
    }

    /***
     * Logout user
     * @returns {Promise<void>}
     */
    async logout() {
        return await http.post(backUrls.logout, null)
            .then(({status}) => {
                if (status === httpStatus.StatusUnauthorized) {
                    throw new Error('Пользователь не авторизован');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                this.__isAuth = false;
            })
            .catch((err) => {
                console.log(err.message);
                throw err;
            });
    }
}

export const user = new ProfileUserModel();