import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';

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
     * @returns {Promise<{data: *, status: number}>}
     */
    async registration(form) {
        return await http.post(urls.upload, new FormData(form), true)
        .then(({status, data}) => {
            if (status === 200) {
                console.log(data);
                this.__linkImages.push(data.linkImages);

                http.post(urls.singUp, this.__jsonData());
            }

            // if (status === 400) {
            //     throw new Error('Слишком большой размер фото, пожалуйста, загрузите фото меньшего размера');
            // }

            // if (status === 403) {
            //     throw new Error('Пожалуйста, загрузите фото с вашим лицом');
            // }

            // if (status === 500) {
            //     throw new Error('Неизвестная ошибка, пожалуйста, попробуйте позже');
            // }
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
            linkImages: this.__linkImages,
            password: this.__password
        });
    }
}
