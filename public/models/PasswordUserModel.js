import {UserModel} from './UserModel.js';

/***
 * Password user model
 */
export class PasswordUserModel extends UserModel {
    /***
     * Class constructor
     */
    constructor() {
        super();
        this.__password = '';
    }

    /***
     * Fill user model data
     * @param {Object} data - user data
     */
    fillUserData(data) {
        super.fillUserData(data);
        this.__password = data.password;
    }

    /***
     * Validate user password
     * @param {string} password - user password
     * @returns {{message: [string, string, string, string, string], error: boolean}|{message: string, error: boolean}}
     */
    validationPassword(password) {
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (re.test(password)) {
            return {
                message: '',
                error: false
            };
        }

        return {
            message: [
                'От шести или более символов',
                'Содержит хотя бы одну цифру',
                'Хотя бы один символ нижнего регистра',
                'Хотя бы один символ верхнего регистра',
                'Только латинские символы'
            ],
            error: true
        };
    }

    /***
     * Validate user password1 and password2
     * @param {string} password1 - user password1
     * @param {string} password2 - user password2
     * @returns {{message: string, error: boolean}|{message: [string], error: boolean}}
     */
    validationConfirmPassword(password1, password2) {
        if (password1 === password2 && password1 !== '' && password2 !== '') {
            return {
                message: '',
                error: false
            };
        }

        return {
            message: [
                'Пароли не совпадают'
            ],
            error: true
        };
    }
}
