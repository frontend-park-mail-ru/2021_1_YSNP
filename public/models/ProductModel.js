/* eslint-disable camelcase */

import {BaseModel} from './BaseModel.js';

import {http} from '../modules/http/http.js';
import {backUrls} from '../modules/urls/backUrls.js';

import {YandexMap} from '../modules/layout/yandexMap.js';

/***
 * Product model
 */
export class ProductModel extends BaseModel {
    /***
     * Class constructor
     * @param data
     */
    constructor(data = {}) {
        super();
        this.fillProductModel(data);
    }

    /***
     * Get id
     * @returns {number}
     */
    get id() {
        return this.__id;
    }

    /***
     * Get user like
     * @returns {boolean}
     */
    get userLiked() {
        return this.__userLiked;
    }

    /***
     * Set user like
     */
    setLike() {
        this.__userLiked = true;
    }

    /***
     * Set user dislike
     */
    setDislike() {
        this.__userLiked = false;
    }

    /***
     * Get first image
     * @returns {string}
     */
    __getFirstImage() {
        if (this.__linkImages) {
            return this.__linkImages[0];
        }

        return '';
    }

    /***
     * Validate product name
     * @param {string} name - product name
     * @returns {{message: [string], error: boolean}}
     */
    validationName(name) {
        const maxSize = 100;
        const minSize = 0;
        if (name.length > maxSize) {
            return {
                message: ['Слишком длинное название. Название не должен привышать 100 символов'],
                error: true
            };
        }

        if (name.length === minSize) {
            return {
                message: ['Название не должно быть пустым'],
                error: true
            };
        }

        return {
            message: [''],
            error: false
        };
    }

    /***
     * validation address, validator watching address in ymap
     * @param{string} address
     * @return {Promise<{message: [string], error: boolean}|{message: string, error: boolean}|{message: [string], error: boolean}>}
     */
    async validationPos(address) {
        const minSize = 0;

        if (address.length === minSize) {
            return {
                message: ['Адрес не должен быть пустым'],
                error: true
            };
        }

        return await YandexMap.isAdressCorrect(address).then(
            (res) => {
                if (res) {
                    return {
                        message: '',
                        error: false
                    };
                }
                return {
                    message: ['Адрес не корректен'],
                    error: true
                };

            }
        );
    }

    /***
     * Validate description
     * @param {string} description - product description
     * @returns {{message: [string], error: boolean}}
     */
    validationDescription(description) {
        const maxSize = 4000;
        const minSize = 10;
        if (description.length >= maxSize && description.length >= minSize) {
            return {
                message: ['Слишком длинный текст. Текст не должен привышать 4000 символов'],
                error: true
            };
        }

        if (description.length < minSize) {
            return {
                message: ['Слишком короткое описание (минимум 10 знаков)'],
                error: true
            };
        }

        return {
            message: [''],
            error: false
        };
    }

    /***
     * Validate product amount
     * @param {string} amount - product amount
     * @returns {{message: [string], error: boolean}}
     */
    validationAmount(amount) {
        if (amount !== '') {
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
     * Validate images size
     * @param {HTMLElement} form - page form
     * @returns {{message: string, error: boolean}}
     */
    validationImages(form) {
        const maxSize = 10 * 1024 * 1024;
        const photos = (new FormData(form)).getAll('photos');

        let size = 0;
        photos.forEach((file) => {
            if (file.name !== '') {
                size += file.size;
            }
        });

        if (size < maxSize) {
            return {
                message: '',
                error: false
            };
        }

        return {
            message: 'Слишком большой общий размер фото',
            error: true
        };
    }

    /***
     * Set liked product
     */
    setLiked() {
        this.__userLiked = true;
    }

    /***
     * Fill product model
     * @param {Object} data - product data
     */
    fillProductModel(data) {
        this.__id = data.id;
        this.__name = data.name;
        this.__date = data.date;
        this.__amount = data.amount;
        this.__linkImages = data.linkImages;
        this.__description = data.description;
        this.__category = data.category;
        this.__adress = data.address;
        this.__longitude = data.longitude;
        this.__latitude = data.latitude;
        this.__views = data.views;
        this.__likes = data.likes;
        this.__userLiked = data.userLiked;
        this.__tariff = data.tariff;
        this.__ownerId = data.ownerId;
        this.__ownerName = data.ownerName;
        this.__ownerSurname = data.ownerSurname;
        this.__ownerLinkImages = data.ownerLinkImages;
        this.__ownerStars = data.owner_rating;
        this.__close = data.close;
    }

    /***
     * Get product model Json
     * @returns {{amount: (Object.amount|number|*), name: (Object.name|string|*), description: (Object.description|string|*)}}
     * @private
     */
    __jsonData() {
        return {
            name: this.__name,
            description: this.__description,
            amount: this.__amount,
            category: this.__category,
            latitude: this.__latitude,
            longitude: this.__longitude,
            address: this.__adress
        };
    }

    /***
     * JSon data with urls
     * @returns {{amount: (Object.amount|number|*), name: (Object.name|string|*), description: (Object.description|string|*)} & {linkImages, id: (*), ownerId}}
     * @private
     */
    __jsonDataWithUrls() {
        return Object.assign({}, this.__jsonData(), {
            id: this.__id,
            linkImages: this.__linkImages,
            ownerId: this.__ownerId
        });
    }

    /***
     * Get model data to view
     * @returns {{date, amount, address, latitude, description, ownerId, ownerName, ownerLinkImages, name, ownerSurname, linkImages, tariff, id: (*), category, views, longitude, likes}}
     */
    getData() {
        return {
            id: this.__id,
            name: this.__name,
            date: this.__date,
            amount: this.__amount,
            linkImages: this.__linkImages,
            description: this.__description,
            category: this.__category,
            address: this.__adress,
            longitude: this.__longitude,
            latitude: this.__latitude,
            views: this.__views,
            likes: this.__likes,
            userLiked: this.__userLiked,
            tariff: this.__tariff,
            ownerId: this.__ownerId,
            ownerName: this.__ownerName,
            ownerSurname: this.__ownerSurname,
            ownerLinkImages: this.__ownerLinkImages,
            ownerStars: this.__ownerStars,
            close: this.__close
        };
    }

    /***
     * Get model data to view
     * @returns {{date: (Object.date|string|*), amount: (Object.amount|number|*), linkImage: string, name: (Object.name|string|*), id: (Object.id|string|*), userLiked: (Object.userLiked|boolean|*)}}
     */
    getMainData() {
        return {
            id: this.__id,
            name: this.__name,
            date: this.__getDate(),
            amount: this.__getAmount(),
            userLiked: this.__userLiked,
            linkImage: this.__getFirstImage(),
            tariff: this.__tariff
        };
    }

    /***
     * Get ad user data
     * @returns {{date: string, amount: string, linkImage: string, name, tariff, id: (*), userLiked: (boolean|*), status: string}}
     */
    getAdData() {
        return {
            id: this.__id,
            name: this.__name,
            date: this.__getDate(),
            amount: this.__getAmount(),
            userLiked: this.__userLiked,
            linkImage: this.__getFirstImage(),
            tariff: this.__tariff,
            status: this.__close ? 'закрыто' : 'открыто'
        };
    }

    /***
     * Fill one buyer
     * @param {Object} data - one user
     */
    fillOneBuyer(data) {
        const buyer = {
            isBack: true,
            isBuyer: true,
            id: data.id,
            userImg: data.linkImages,
            userName: data.name
        };

        this.__buyerList.push(buyer);
    }

    /***
     * Fill buyer data
     * @param {Object[]} data - buyer list
     */
    fillBuyerData(data) {
        this.__buyerList = [];

        data.forEach((user) => {
            this.fillOneBuyer(user);
        });
    }

    /***
     * Get buyer list
     * @returns {Object[]}
     */
    getBuyerList() {
        return this.__buyerList;
    }

    /***
     * Get buyer
     * @returns {{}|Object}
     */
    getBuyer() {
        if (this.__buyerList) {
            return this.__buyerList.find((el) => el.id === this.__buyerId);
        }

        return {};
    }

    /***
     * Get buyer id
     * @returns {number}
     */
    get buyerId() {
        return this.__buyerId;
    }

    /***
     * Get locale date
     * @returns {string}
     * @private
     */
    __getDate() {
        const date = new Date(this.__date);
        return date.toLocaleDateString('ru-RU', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    /***
     * Get locale amount
     * @returns {string}
     * @private
     */
    __getAmount() {
        return `${this.__amount.toLocaleString()} ₽`;
    }

    /***
     * Get product data from backend
     * @returns {Promise<{data: *, status: number}>}
     */
    async update() {
        return http.get(backUrls.product(this.__id))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message,
                    notFound: 'Нет такого товара'
                });

                this.fillProductModel(data);
            });
    }

    /***
     * Post close product
     * @returns {Promise<{data: *, status: number}>}
     */
    async close() {
        return http.post(backUrls.closeProduct(this.__id), null)
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.fillBuyerData(data);
            });
    }

    /***
     * Set product buyer
     * @param {number} id - product buyer
     * @returns {Promise<{data: *, status: number}>}
     */
    async setBuyer(id) {
        this.__buyerId = id;

        return http.post(backUrls.setProductBuyer(this.__id), {
            buyer_id: this.__buyerId
        }).then(({status, data}) => {
            this.checkError(status, {
                message: data.message
            });
        });
    }

    /***
     * Post create new product
     * @returns {Promise<{id: *}>}
     */
    async create(form) {
        return this.__sendData(form, backUrls.productCreate, this.__jsonData());
    }

    /***
     * Edit product
     * @param {FormData} form
     * @returns {Promise<{id: *}>}
     */
    async edit(form) {
        return this.__sendData(form, backUrls.editPage, this.__jsonDataWithUrls());
    }

    /***
     * Send data
     * @param {FormData} form
     * @param {string} url
     * @param {Object} data
     * @returns {Promise<{id: *}>}
     * @private
     */
    __sendData(form, url, data) {
        return http.post(url, data)
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.__id = data.id;
                return http.post(backUrls.productUploadPhotos(this.__id), new FormData(form), true)
                    .then(({status, data}) => {
                        this.checkError(status, {
                            message: data.message
                        });

                        return {id: this.__id};
                    });
            });
    }

    /***
     * Set stat
     * @param {string} productName - product name
     * @returns {Promise<{data: *, status: number}>}
     */
    async setStat(productName) {
        return http.post(backUrls.recStat, {text: productName})
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });
            });
    }
}