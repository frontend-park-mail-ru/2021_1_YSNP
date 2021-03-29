import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';
import {httpStatus} from '../modules/httpStatus.js';

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
        const maxSize = 100;
        const minSize = 0;
        if (name.length > maxSize) {
            return {
                message: 'Слишком длинное название. Название не должен привышать 100 символов',
                error: true
            };
        }

        if (name.length === minSize) {
            return {
                message: 'Название не должно быть пустым',
                error: true
            };
        }
        return {
            message: '',
            error: false
        };
    }

    /***
     * Validate description
     * @param {string} description - product description
     * @returns {{message: string, error: boolean}}
     */
    validationDescription(description) {
        const maxSize = 4000;
        const minSize = 10;
        if (description.length >= maxSize && description.length >= minSize) {
            return {
                message: 'Слишком длинный текст. Текст не должен привышать 4000 символов',
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
        this.__id = data.id;
        this.__name = data.name;
        this.__date = data.date;
        this.__amount = data.amount;
        this.__description = data.description;
        this.__views = data.views;
        this.__likes = data.likes;
        this.__userLiked = data.userLiked;
        this.__linkImages = data.linkImages;
        this.__ownerId = data.ownerId;
        this.__ownerName = data.ownerName;
        this.__ownerSurname = data.ownerSurname;
        this.__ownerStars = data.ownerStars;
        this.__category = data.category;

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
        const day = date.toLocaleDateString('ru-RU', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        return {
            id: this.__id,
            name: this.__name,
            date: day,
            amount: `${this.__amount.toLocaleString()} ₽`,
            userLiked: this.__userLiked,
            linkImage: this.__getFirstImage(),
            status: 0
        };
    }

    /***
     * Get product data from backend
     * @returns {Promise<{isUpdate: boolean}|void>}
     */
    async update() {
        return await http.get(backUrls.product + this.__id)
            .then(({status, data}) => {
                if (status === httpStatus.StatusNotFound) {
                    throw new Error('Нет такого товара');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                this.fillProductModel(data);
                return {isUpdate: true};
            })
            .catch((err) => {
                console.log(err.message);
                return {isUpdate: false, message: err.message};
            });
    }

    /***
     * Post create new product
     * @returns {Promise<void>}
     */
    async create(form) {
        return await http.post(backUrls.productUploadPhotos, new FormData(form), true)
            .then(({status, data}) => {
                if (status === httpStatus.StatusUnauthorized) {
                    throw new Error('Пользователь не авторизован');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusBadRequest) {
                    throw new Error('Неправильные данные');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                this.__linkImages = data.linkImages;
                const model = this.__jsonData();
                return http.post(backUrls.productCreate, model);
                // TODO(Ivan) а проверка на ошибки?
            }).catch((err) => {
                console.log(err.message);
            });
    }
}