import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';
import {httpStatus} from '../modules/httpStatus.js';

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
     * Get user id
     * @returns {string}
     */
    get id() {
        return this.__id;
    }

    /***
     * Set user id
     * @param {string} id - user id
     */
    set id(id) {
        this.__id = id;
    }

    /***
     * Get user authorized
     * @returns {boolean|*}
     */
    get isAuth() {
        return this.__isAuth;
    }

    /***
     * Get user name
     * @returns {string}
     */
    get name() {
        return this.__name;
    }

    /***
     * Set user name
     * @param {string} name - user name
     */
    set name(name) {
        this.__name = name;
    }

    /***
     * Get user surname
     * @returns {string}
     */
    get surname() {
        return this.__surname;
    }

    /***
     * Set user surname
     * @param {string} surname - user surname
     */
    set surname(surname) {
        this.__surname = surname;
    }

    /***
     * Get user sex
     * @returns {string}
     */
    get sex() {
        return this.__sex;
    }

    /***
     * Set user sex
     * @param {string} sex - user sex
     */
    set sex(sex) {
        this.__sex = sex;
    }

    /***
     * Get user year
     * @returns {string}
     */
    get dateBirth() {
        return this.__dateBirth;
    }

    /***
     * Set user year
     * @param {string} year - user year
     */
    set dateBirth(year) {
        this.__dateBirth = year;
    }

    /***
     * Get user email
     * @returns {string}
     */
    get email() {
        return this.__email;
    }

    /***
     * Set user email
     * @param {string} email - user email
     */
    set email(email) {
        this.__email = email;
    }

    /***
     * Get user telephone
     * @returns {string}
     */
    get telephone() {
        return this.__telephone;
    }

    /***
     * Set user telephone
     * @param {string} telephone - user telephone
     */
    set telephone(telephone) {
        this.__telephone = telephone;
    }

    /***
     * Get user avatar
     * @returns {string}
     */
    get linkImage() {
        return this.__linkImage;
    }

    /***
     * Set user avatar
     * @param {string} linkImage - user avatar link
     */
    set linkImage(linkImage) {
        this.__linkImage = linkImage;
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
     * Validate user name
     * @param {string} name - user name
     * @returns {{message: string, error: boolean}}
     */
    validationName(name) {
        if (name !== '') {
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
        const found = phoneNumber.search(/^(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/);
        return found > -1;
    }

    /***
     * Validate user telephone
     * @param {string} telephone - user telephone
     * @returns {{message: string, error: boolean}}
     */
    validationTelephone(telephone) {
        const telSize = 15;
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

    /***
     * Get user model Json
     * @returns {{year: (Object.year|string|*), surname: (Object.surname|string|*), sex: (Object.sex|string|*), name: (Object.name|string|*), telephone: (Object.telephone|string|*), email: (Object.email|string|*)}}
     */
    __jsonData() {
        return {
            name: this.__name,
            surname: this.__surname,
            sex: this.__sex,
            dateBirth: this.__dateBirth,
            email: this.__email,
            telephone: this.__telephone
        };
    }

    /***
     * Get model data to view
     * @returns {{linkImage: (string|null), surname: (Object.surname|string|*), sex: (Object.sex|string|*), name: (Object.name|string|*), telephone: (Object.telephone|string|*), dateBirth: (Object.dateBirth|string|*), email: (Object.email|string|*)}}
     */
    getData() {
        return {
            isAuth: this.__isAuth,
            name: this.__name,
            surname: this.__surname,
            sex: this.__sex,
            dateBirth: this.__dateBirth,
            email: this.__email,
            telephone: this.__telephone,
            linkImage: this.__linkImages !== undefined ? this.__getFirstImage() : null
        };
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
            linkImages: this.__linkImages
        });
    }
}

export const user = new UserModel();