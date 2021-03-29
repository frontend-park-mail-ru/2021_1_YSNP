/***
 * User model
 */
export class UserModel {
    /***
     * Class constructor
     * @param {Object} data - user object
     */
    constructor(data = {}) {
        this.fillUserData(data);
    }

    /***
     * Get first image
     * @returns {string}
     */
    __getFirstImage() {
        const start = 0;
        return this.__linkImages[start];
    }

    /***
     * Validate user name/surname/patronymic/location
     * @param {string} value - value of user field
     * @returns {{message: string, error: boolean}}
     */
    validationString(value) {
        const maxLength = 31;
        if (value.length > 0 && value.length < maxLength) {
            return {
                message: '',
                error: false
            };
        } else if (value.length === 0) {
            return {
                message: 'Поле не должно быть пустым',
                error: true
            };
        }
        return {
            message: 'Поле не должно привышать 30 знаков',
            error: true
        };
    }

    /***
     * Validate user surname
     * @param {string} surname - user surname
     * @returns {{message: string, error: boolean}}
     */
    validationSurname(surname) {
        if (surname !== '') {
            return {
                message: '',
                error: false
            };
        }


        return {
            message: 'Поле не должно быть пустым',
            error: true
        };
    }

    /***
     * Validate user sex
     * @param {string} sex - user sex
     * @returns {{message: string, error: boolean}}
     */
    validationSex(sex) {
        if (sex === 'мужской' || sex === 'женский') {
            return {
                message: '',
                error: false
            };
        }


        return {
            message: 'Поле не должно быть пустым',
            error: true
        };
    }

    /***
     * Validate user year
     * @param {string} year - user year
     * @returns {{message: string, error: boolean}}
     */
    validationYear(year) {
        if (year !== '') {
            return {
                message: '',
                error: false
            };
        }


        return {
            message: 'Поле не должно быть пустым',
            error: true
        };
    }

    /***
     * Validate user email
     * @param {string} email - user email
     * @returns {{message: string, error: boolean}}
     */
    validationEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            return {
                message: '',
                error: false
            };
        }

        return {
            message: 'Неправильный формат почты',
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
        const found = phoneNumber.search(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/);
        return found > f;
    }

    /***
     * Validate user telephone
     * @param {string} telephone - user telephone
     * @returns {{message: string, error: boolean}}
     */
    validationTelephone(telephone) {
        const telSize = 12;
        if (telephone.length === telSize && this.__isValidPhone(telephone)) {
            return {
                message: '',
                error: false
            };
        }

        return {
            message: 'Неверный формат телефона',
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
        this.__linkImages = data.linkImages !== undefined ? data.linkImages : [];
    }
}
