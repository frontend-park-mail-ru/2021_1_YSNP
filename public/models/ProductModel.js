import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';
import {httpStatus} from '../modules/httpStatus.js';

import {deleteSymbolsXSS} from '../modules/xss.js';

/***
 * Product model
 */
export class ProductModel {
    /***
     * Class constructor
     * @param data
     */
    constructor(data = {}) {
        this.fillProductModel(data);
    }

    /***
     * Get product id
     * @returns {string}
     */
    get id() {
        return this.__id;
    }

    /***
     * Set product id
     * @param {string} id - product id
     */
    set id(id) {
        this.__id = id;
    }

    /***
     * Get product category
     * @returns {string}
     */
    get category() {
        return this.__category;
    }

    /***
     * Set product category
     * @param {string} category - product category
     */
    set category(category) {
        this.__category = category;
    }

    /***
     * Get product name
     * @returns {string}
     */
    get name() {
        return this.__name;
    }

    /***
     * Set product name
     * @param {string} name - product name
     */
    set name(name) {
        this.__name = name;
    }

    /***
     * Get product create date
     * @returns {string}
     */
    get date() {
        return this.__date;
    }

    /***
     * Set product create date
     * @param {string} date - product create date
     */
    set date(date) {
        this.__date = date;
    }

    /***
     * Get product amount
     * @returns {number}
     */
    get amount() {
        return this.__amount;
    }

    /***
     * Set product amount
     * @param {number} amount - product amount
     */
    set amount(amount) {
        this.__amount = amount;
    }

    /***
     * Get product description
     * @returns {string}
     */
    get description() {
        return this.__description;
    }

    /***
     * Set product description
     * @param {string} description - product description
     */
    set description(description) {
        this.__description = description;
    }

    /***
     * Get product views
     * @returns {number}
     */
    get views() {
        return this.__views;
    }

    /***
     * Set product views
     * @param {number} views - product views
     */
    set views(views) {
        this.__views = views;
    }

    /***
     * Get product likes
     * @returns {number}
     */
    get likes() {
        return this.__likes;
    }

    /***
     * Set product likes
     * @param {number} likes - product likes
     */
    set likes(likes) {
        this.__likes = likes;
    }

    /***
     * Get user like this product
     * @returns {boolean}
     */
    get userLiked() {
        return this.__userLiked;
    }

    /***
     * Set user like this product
     * @param {boolean} userLiked - user liked
     */
    set userLiked(userLiked) {
        this.__userLiked = userLiked;
    }

    /***
     * Get owner id
     * @returns {string}
     */
    get ownerId() {
        return this.__ownerId;
    }

    /***
     * Set owner id
     * @param {string} ownerId - owner id
     */
    set ownerId(ownerId) {
        this.__ownerId = ownerId;
    }

    /***
     * Get owner name
     * @returns {string}
     */
    get ownerName() {
        return this.__ownerName;
    }

    /***
     * Set owner name
     * @param {string} ownerName - owner name
     */
    set ownerName(ownerName) {
        this.__ownerName = ownerName;
    }

    /***
     * Get owner surname
     * @returns {string}
     */
    get ownerSurname() {
        return this.__ownerSurname;
    }

    /***
     * Set owner surname
     * @param {string} ownerSurname - owner surname
     */
    set ownerSurname(ownerSurname) {
        this.__ownerSurname = ownerSurname;
    }

    /***
     * Get owner stars
     * @returns {number}
     */
    get ownerStars() {
        return this.__ownerStars;
    }

    /***
     * Set owner stars
     * @param {number} ownerStars - owner stars
     */
    set ownerStars(ownerStars) {
        this.__ownerStars = ownerStars;
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
     * Validate product name
     * @param {string} name - product name
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
     * Validate description
     * @param {string} description - product description
     * @returns {{message: string, error: boolean}}
     */
    validationDescription(description) {
        const maxSize = 1000;
        const minSize = 10;
        if (description.length >= maxSize && description.length >= minSize) {
            return {
                message: 'Слишком длинный текст. Текст не должен привышать 1000 символов',
                error: true
            };
        }

        if (description.length < minSize) {
            return {
                message: 'Слишком короткое описание (минимум 10 знаков)',
                error: true
            };
        }
        return {
            message: '',
            error: false
        };
    }

    /***
     * Validate product amount
     * @param {string} amount - product amount
     * @returns {{message: string, error: boolean}}
     */
    validationAmount(amount) {
        if (amount !== '') {
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
     * Fill product model
     * @param {Object} data - product data
     */
    fillProductModel(data) {
        this.__id = deleteSymbolsXSS(data.id);
        this.__name = deleteSymbolsXSS(data.name);
        this.__date = deleteSymbolsXSS(data.date);
        this.__amount = deleteSymbolsXSS(data.amount);
        this.__description = deleteSymbolsXSS(data.description);
        this.__views = deleteSymbolsXSS(data.views);
        this.__likes = deleteSymbolsXSS(data.likes);
        this.__userLiked = deleteSymbolsXSS(data.userLiked);
        this.__linkImages = data.linkImages;
        this.__ownerId = deleteSymbolsXSS(data.ownerId);
        this.__ownerName = deleteSymbolsXSS(data.ownerName);
        this.__ownerSurname = deleteSymbolsXSS(data.ownerSurname);
        this.__ownerStars = deleteSymbolsXSS(data.ownerStars);
        this.__category = deleteSymbolsXSS(data.category);

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
            linkImages: this.__linkImages,
            category: this.__category
        };
    }

    /***
     * Get model data to view
     * @returns {{date: (Object.date|string|*), ownerStars: (Object.ownerStars|number|*), amount: (Object.amount|number|*), description: (Object.description|string|*), ownerId: (Object.ownerId|string|*), userLiked: (Object.userLiked|boolean|*), ownerName: (Object.ownerName|string|*), name: (Object.name|string|*), ownerSurname: (Object.ownerSurname|string|*), linkImages: Object.linkImages, id: (Object.id|string|*), views: (Object.views|number|*), likes: (Object.likes|number|*)}}
     */
    getData() {
        return {
            id: this.__id,
            name: this.__name,
            date: this.__date,
            amount: this.__amount,
            category: this.__category,
            description: this.__description,
            views: this.__views,
            likes: this.__likes,
            userLiked: this.__userLiked,
            linkImages: this.__linkImages,
            ownerId: this.__ownerId,
            ownerName: this.__ownerName,
            ownerSurname: this.__ownerSurname,
            ownerStars: this.__ownerStars
        };
    }

    /***
     * Get model data to view
     * @returns {{date: (Object.date|string|*), amount: (Object.amount|number|*), linkImage: string, name: (Object.name|string|*), id: (Object.id|string|*), userLiked: (Object.userLiked|boolean|*)}}
     */
    getMainData() {
        const date = new Date(this.__date);
        const day = date.toLocaleDateString('ru-RU', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'});

        return {
            id: this.__id,
            name: this.__name,
            date: day,
            amount: `${this.__amount} ₽`,
            userLiked: this.__userLiked,
            linkImage: this.__getFirstImage()
        };
    }

    /***
     * Get product data from backend
     * @returns {Promise<{isUpdate: boolean}|void>}
     */
    async update() {
        return await http.get(urls.product + this.__id)
            .then(({status, data}) => {
                if (status === httpStatus.StatusOK) {
                    this.fillProductModel(data);
                    return {isUpdate: true};
                }

                if (status === httpStatus.StatusBadRequest) {
                    throw data;
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw data;
                }

                return {isUpdate: false};
            })
            .catch((err) => {
                console.log('ProductModel update', err.message);
            });
    }

    /***
     * Post create new product
     * @returns {Promise<void>}
     */
    async create(form) {
        return http.post(urls.productUploadPhotos, new FormData(form), true).then(({status, data}) => {
            if (status === httpStatus.StatusOK) {
                this.__linkImages = data.linkImages;
                const model = this.__jsonData();
                return http.post(urls.productCreate, model);
            }

            return Promise.reject();
        }).catch((err) => {
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
            date: this.__date,
            amount: this.__amount,
            description: this.__description,
            views: this.__views,
            likes: this.__likes,
            userLiked: this.__userLiked,
            linkImage: this.__linkImages,
            ownerId: this.__ownerId,
            ownerName: this.__ownerName,
            ownerSurname: this.__ownerSurname,
            ownerStars: this.__ownerStars,
            category: this.__category
        });
    }
}