import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http/http.js';
import {backUrls} from '../modules/urls/backUrls.js';

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
            oldPassword: this.__password,
            newPassword1: this.__password1,
            newPassword2: this.__password2
        };
    }

    /***
     * Get settings user model Json
     * @returns {{surname, sex, name, telephone, dateBirth, email}}
     * @private
     */
    __jsonData() {
        return {
            name: this.__name,
            surname: this.__surname,
            dateBirth: this.__dateBirth,
            sex: this.__sex,
            email: this.__email,
            telephone: this.__telephone
        };
    }

    /***
     * Get user model json position
     * @returns {{address: Object.address, latitude: Object.latitude, radius: Object.radius, longitude: Object.longitude}}
     * @private
     */
    __jsonPosition() {
        return {
            latitude: this.__latitude,
            longitude: this.__longitude,
            radius: this.__radius,
            address: this.__address
        };
    }

    /***
     * Get user Data for settings
     * @returns {{address: (*|string), sex, latitude, telephone, isAuth: boolean, linkImage, surname, name, id, dateBirth, radius, email, longitude}}
     */
    getData() {
        return {
            id: this.__id,
            isAuth: this.__isAuth,
            name: this.__name,
            surname: this.__surname,
            dateBirth: this.__dateBirth,
            sex: this.__sex,
            email: this.__email,
            telephone: this.__telephone,
            linkImage: '/img/search-background.webp',
            // linkImage: this.__linkImages,
            latitude: this.__latitude,
            longitude: this.__longitude,
            radius: this.__radius,
            address: this.__address ? this.__address : 'Москва'
        };
    }

    /***
     * Post settings user data to backend
     * @param {HTMLElement} form - settings form
     * @param {boolean} isChangeImg - is image been changed
     * @returns {Promise<{isUpdate: boolean}|void|{message: string, isUpdate: boolean}>}
     */
    async settings(form, isChangeImg) {
        return http.post(backUrls.settings, this.__jsonData())
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                if (!isChangeImg) {
                    this.__isAuth = false;
                    return {isUpdate: true};
                }

                return http.post(backUrls.upload, new FormData(form), true)
                    .then(({status, data}) => {
                        this.checkError(status, {
                            message: data.message
                        });

                        this.__isAuth = false;
                        return {isUpdate: true};
                    });
            })
            .catch((err) => ({
                isUpdate: false, message: err.message
            }));
    }

    /***
     * Post new user password to backend
     * @returns {Promise<{isUpdate: boolean}|{message: *, isUpdate: boolean}>}
     */
    async newPassword() {
        return http.post(backUrls.newPassword, this.__jsonPassword())
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message,
                    badRequest: 'Неправильно введен пароль'
                });

                return {isUpdate: true};
            })
            .catch((err) => ({
                isUpdate: false, message: err.message
            }));
    }

    /***
     * Get user data from backend
     * @returns {Promise<{data: *, status: number}>}
     */
    async update() {
        if (this.__isAuth) {
            return Promise.resolve();
        }

        return http.get(backUrls.me)
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.fillUserData(data);
                this.__isAuth = true;
            });
    }

    /***
     * Logout user
     * @returns {Promise<{data: *, status: number}>}
     */
    async logout() {
        return http.post(backUrls.logout, null)
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.__isAuth = false;
            });
    }

    /***
     * Change position
     * @returns {Promise<{data: *, status: number}>}
     */
    async position() {
        return http.post(backUrls.userPosition, this.__jsonPosition())
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.__isAuth = false;
            });
    }
}

export const user = new ProfileUserModel();