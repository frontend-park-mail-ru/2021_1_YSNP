import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http/http.js';
import {backUrls} from '../modules/urls/backUrls.js';

/***
 * Registration user model
 */
export class RegUserModel extends PasswordUserModel {
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
                this.checkError(status, {
                    message: data.message,
                    badRequest: 'Пользователь уже существует'
                });

                return http.post(backUrls.upload, new FormData(form), true)
                    .then(({status, data}) => {
                        this.checkError(status, {
                            message: data.message
                        });
                    });
            });
    }
}
