import {UserModel} from './UserModel.js';
import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';

export class RegAuthUserModel extends UserModel {
    constructor() {
        super();
        this.__password = '';
    }

    get password() {
        return this.__password;
    }

    set password(password) {
        this.__password = password;
    }

    validationFields(str) {
        if (str !== '') {
            return {
                message: '',
                error: false
            };
        }


        return {
            message: [
                'Поле не должно быть пустым'
            ],
            error: true
        };
    }

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

    validationEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            return {
                message: '',
                error: false
            };
        }

        return {
            message: [
                'Неправильный формат почты'
            ],
            error: true
        };
    }

    validationTelephone(telephone) {
        const telSize = 12;
        if (telephone.length === telSize) {
            return {
                message: '',
                error: false
            };
        }

        return {
            message: [
                'Неверный формат телефона'
            ],
            error: true
        };
    }

    __jsonData() {
        return {
            name: this.__name,
            surname: this.__surname,
            year: this.__year,
            email: this.__email,
            telephone: this.__telephone
        };
    }

    async auth() {
        const data = this.__jsonData();
        return await http.post(urls.singIn, data);
    }

    async registration() {
        const data = this.__jsonData();
        return await http.post(urls.singUp, data);
    }

    log() {
        console.dir({
            id: this.__id,
            name: this.__name,
            surname: this.__surname,
            sex: this.__sex,
            year: this.__year,
            telephone: this.__telephone,
            email: this.__email,
            password: this.__password
        });
    }

}