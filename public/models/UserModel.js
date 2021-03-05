import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';

export class UserModel {
    constructor(data = {}) {
        this.__fillUserData(data);
    }

    get id() {
        return this.__id;
    }

    set id(id) {
        this.__id = id;
    }

    get name() {
        return this.__name;
    }

    set name(name) {
        this.__name = name;
    }

    get surname() {
        return this.__surname;
    }

    set surname(surname) {
        this.__surname = surname;
    }

    get sex() {
        return this.__sex;
    }

    set sex(sex) {
        this.__sex = sex;
    }

    get year() {
        return this.__year;
    }

    set year(year) {
        this.__year = year;
    }

    get email() {
        return this.__email;
    }

    set email(email) {
        this.__email = email;
    }

    get telephone() {
        return this.__telephone;
    }

    set telephone(telephone) {
        this.__telephone = telephone;
    }

    get linkImage() {
        return this.__linkImage;
    }

    set linkImage(linkImage) {
        this.__linkImage = linkImage;
    }

    __fillUserData(data) {
        this.__id = data.id;
        this.__name = data.name;
        this.__surname = data.surname;
        this.__sex = data.sex;
        this.__year = data.year;
        this.__email = data.email;
        this.__telephone = data.telephone;
        this.__linkImage = data.linkImage;
    }

    async update() {
        http.get(urls.me)
            .then(({status, data}) => {
                if (status === 401) {
                    throw Error('user unauthorized');
                }

                this.__fillUserData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}

export const user = new UserModel();