import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';

/***
 * Settings user model
 */
export class SettingsUserData extends PasswordUserModel {
    fillUserData(data) {
        super.fillUserData(data);
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
     * Get user Data for settings
     * @returns {{linkImage: (*|null), surname: (Object.surname|string|*), sex: (Object.sex|string|*), name: (Object.name|string|*), telephone: (Object.telephone|string|*), dateBirth: (Object.dateBirth|string|*), email: (Object.email|string|*)}}
     */
    getData() {
        return {
            name: this.__name,
            surname: this.__surname,
            dateBirth: this.__dateBirth,
            sex: this.__sex,
            email: this.__email,
            telephone: this.__telephone,
            linkImage: this.__linkImages !== undefined ? this.__linkImages[0] : null
        };
    }

    /***
     * Post settings user data to backend
     * @returns {Promise<{isUpdate: boolean}>}
     */
    async settings() {
        const data = this.__jsonData();
        return await http.post(urls.settings, data)
            .then(({status}) => {
                if (status === 200) {
                    // this.__linkImages.push(data.linkImages);
                    return {isUpdate: true};
                }
                if (status === 401) {
                    throw Error('user unauthorized');
                }
                if (status === 400) {
                    throw Error('Bad request');
                }
                if (status === 500) {
                    throw Error('Internal server error');
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
                if (status === 400) {
                    throw Error('Неправильно введен пароль');
                }
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
