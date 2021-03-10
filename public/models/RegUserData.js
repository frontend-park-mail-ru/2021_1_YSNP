import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';
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
            id: 0,
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
        return await http.post(urls.upload, new FormData(form), true)
            .then(({status, data}) => {
                if (status === httpStatus.StatusOK) {
                    console.log(data);
                    this.__linkImages.push(data.linkImages);

                    return http.post(urls.singUp, this.__jsonData()).then(({status, data}) => {
                        if (status === httpStatus.StatusOK) {
                            return {};
                        }

                        if (status === httpStatus.StatusBadRequest) {
                            throw new Error(data.message);
                        }

                        return {};
                    }).catch((err) => {
                        throw err;
                    });
                }

                return {};
            }).catch((err) => Promise.reject(err));
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
            linkImages: this.__linkImages,
            password: this.__password
        });
    }
}
