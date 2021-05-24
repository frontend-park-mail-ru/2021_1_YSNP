import {BaseModel} from './BaseModel.js';

import {http} from '../modules/http/http.js';
import {backUrls} from '../modules/urls/backUrls.js';

/***
 * User model
 */
export class UserModel extends BaseModel {
    /***
     * Class constructor
     * @param {Object} data - user object
     */
    constructor(data = {}) {
        super();
        this.fillUserData(data);
    }

    /***
     * Validate user name/surname/patronymic/location
     * @param {string} value - value of user field
     * @returns {{message: [string], error: boolean}}
     */
    validationString(value) {
        const maxLength = 31;
        if (value.length > 0 && value.length < maxLength) {
            return {
                message: [''],
                error: false
            };
        } else if (value.length === 0) {
            return {
                message: ['Поле не должно быть пустым'],
                error: true
            };
        }
        return {
            message: ['Поле не должно привышать 30 знаков'],
            error: true
        };
    }

    /***
     * Validate user surname
     * @param {string} surname - user surname
     * @returns {{message: [string], error: boolean}}
     */
    validationSurname(surname) {
        if (surname !== '') {
            return {
                message: [''],
                error: false
            };
        }


        return {
            message: ['Поле не должно быть пустым'],
            error: true
        };
    }

    /***
     * Validate user sex
     * @param {string} sex - user sex
     * @returns {{message: [string], error: boolean}}
     */
    validationSex(sex) {
        if (sex === 'мужской' || sex === 'женский') {
            return {
                message: [''],
                error: false
            };
        }


        return {
            message: ['Поле не должно быть пустым'],
            error: true
        };
    }

    /***
     * Validate user year
     * @param {string} year - user year
     * @returns {{message: [string], error: boolean}}
     */
    validationYear(year) {
        if (year !== '') {
            return {
                message: [''],
                error: false
            };
        }


        return {
            message: ['Поле не должно быть пустым'],
            error: true
        };
    }

    /***
     * Validate user email
     * @param {string} email - user email
     * @returns {{message: [string], error: boolean}}
     */
    validationEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email) || email.length === 0) {
            return {
                message: [''],
                error: false
            };
        }

        return {
            message: ['Неправильный формат почты'],
            error: true
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * validate number
     * @param{string} phoneNumber
     * @return {boolean}
     * @private
     */
    __isValidPhone(phoneNumber) {
        const f = -1;
        const found = phoneNumber.search(/^(\+*)(\d*)([(]\d{1,3}[)]*)*(\s?\d+|\+\d{2,3}\s\d+|\d+)[\s|-]?\d+([\s|-]?\d+){1,2}(\s)*$/);
        return found > f;
    }

    /***
     * Validate user telephone
     * @param {string} telephone - user telephone
     * @param {boolean} isOptional - optional user phone
     * @returns {{message: [string], error: boolean}}
     */
    validationTelephone(telephone, isOptional = false) {
        if (isOptional && telephone.length === 2) {
            return {
                message: [''],
                error: false
            };
        }

        const telSize = 12;
        if (telephone.length === telSize && this.__isValidPhone(telephone)) {
            return {
                message: [''],
                error: false
            };
        }

        return {
            message: ['Неверный формат телефона'],
            error: true
        };
    }

    /***
     * Validate images size
     * @param {HTMLElement} form - page form
     * @returns {{message: string, error: boolean}}
     */
    validationImage(form) {
        const maxSize = 3 * 1024 * 1024;
        const photo = (new FormData(form)).get('file-upload');
        if (photo.size < maxSize) {
            return {
                message: '',
                error: false
            };
        }

        return {
            message: 'Слишком большой размер фото',
            error: true
        };
    }

    /***
     * Fill user model data
     * @param {Object} data - user data
     */
    fillUserData(data) {
        this.__id = data.id;
        this.__name = data.name;
        this.__surname = data.surname;
        this.__sex = data.sex;
        this.__dateBirth = data.dateBirth;
        this.__email = data.email;
        this.__telephone = data.telephone;
        this.__latitude = data.latitude;
        this.__longitude = data.longitude;
        this.__radius = data.radius;
        this.__address = data.address;
        this.__linkImages = data.linkImages;
    }

    /***
     * Get user data
     * @returns {{linkImage, surname, sex, name, telephone, id, dateBirth, email}}
     */
    getData() {
        return {
            id: this.__id,
            name: this.__name,
            surname: this.__surname,
            sex: this.__sex,
            dateBirth: this.__dateBirth,
            email: this.__email,
            telephone: this.__telephone,
            linkImage: this.__linkImages
        };
    }

    /***
     * Get user
     * @param {number} id - user id
     * @returns {Promise<{data: *, status: number}>}
     */
    async getUserTelephone(id) {
        return http.get(backUrls.getUserTelephone(id))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message,
                    notFound: 'Нет такого пользователя'
                });

                this.fillUserData(data);
            });
    }

    /***
     * Get user without login
     * @param {number} id - user id
     * @returns {Promise<{surname: *, name: *, telephone: *, linkImages: *, id: *}>}
     */
    async getUser(id) {
        return http.get(backUrls.getUser(id))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message,
                    notFound: 'Нет такого пользователя'
                });
                console.log(data);
                this.fillUserData(data);
            });
    }
}
