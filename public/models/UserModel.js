import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';

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
    get year() {
        return this.__year;
    }

    /***
     * Set user year
     * @param {string} year - user year
     */
    set year(year) {
        this.__year = year;
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
     * Validate user telephone
     * @param {string} telephone - user telephone
     * @returns {{message: string, error: boolean}}
     */
    validationTelephone(telephone) {
        const telSize = 12;
        if (telephone.length === telSize) {
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
        this.__year = data.year;
        this.__email = data.email;
        this.__telephone = data.telephone;
        this.__linkImage = data.linkImage;
    }

    /***
     * Get user model Json
     * @returns {{year: (Object.year|string|*), surname: (Object.surname|string|*), sex: (Object.sex|string|*), name: (Object.name|string|*), telephone: (Object.telephone|string|*), email: (Object.email|string|*)}}
     */
    jsonData() {
        return {
            name: this.__name,
            surname: this.__surname,
            sex: this.__sex,
            year: this.__year,
            email: this.__email,
            telephone: this.__telephone
        };
    }

    /***
     * Get user data from backend
     * @returns {Promise<void>}
     */
    async update() {
        await http.get(urls.me)
            .then(({status, data}) => {
                if (status === 401) {
                    throw Error('user unauthorized');
                }

                this.fillUserData(data);
            })
            .catch((err) => {
                console.log(err.message);
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
            year: this.__year,
            email: this.__email,
            telephone: this.__telephone,
            linkImage: this.__linkImage
        });
    }
}

export const user = new UserModel();
