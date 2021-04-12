import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';
import {httpStatus} from '../modules/httpStatus.js';
import {YandexMap} from '../modules/yandexMap';

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
        const start = 0;
        return this.__linkImages;
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
        // this.__userLiked = data.userLiked;
        this.__tariff = data.tariff;
        this.__ownerId = data.ownerId;
        this.__ownerName = data.ownerName;
        this.__ownerSurname = data.ownerSurname;
        this.__ownerLinkImages = data.ownerLinkImages;
        this.__ownerStars = 4.8;
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
            category: this.__category,
            latitude: this.__latitude,
            longitude: this.__longitude,
            address: this.__adress
        };
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
            // userLiked: this.__userLiked,
            tariff: this.__tariff,
            ownerId: this.__ownerId,
            ownerName: this.__ownerName,
            ownerSurname: this.__ownerSurname,
            ownerLinkImages: this.__ownerLinkImages,
            ownerStars: this.__ownerStars
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
                if (status === httpStatus.StatusBadRequest) {
                    throw new Error('Неправильные данные');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusNotFound) {
                    throw new Error('Нет такого товара');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new Error('Ошибка сервера');
                    // throw new Error(data.message);
                }

                this.fillProductModel(data);
            });
    }

    /***
     * Post create new product
     * @returns {Promise<{id: *}>}
     */
    async create(form) {
        return http.post(backUrls.productCreate, this.__jsonData())
            .then(({status, data}) => {
                if (status === httpStatus.StatusUnauthorized) {
                    throw new Error('Пользователь не авторизован');
                    // throw new Error(data.message);
                }

                if (status === httpStatus.StatusForbidden) {
                    throw new Error('Доступ запрещен');
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

                this.__id = data.id;
                return http.post(backUrls.productUploadPhotos(this.__id), new FormData(form), true)
                    .then(({status}) => {
                        if (status === httpStatus.StatusUnauthorized) {
                            throw new Error('Пользователь не авторизован');
                            // throw new Error(data.message);
                        }

                        if (status === httpStatus.StatusForbidden) {
                            throw new Error('Доступ запрещен');
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

                        return {id: this.__id};
                    });
            });
    }
}