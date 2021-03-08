import {http} from '../modules/http.js';
import {urls} from '../modules/urls.js';

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
        if (description !== '' && description.length < maxSize) {
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
     * Validate product amount
     * @param {number} amount - product amount
     * @returns {{message: string, error: boolean}}
     */
    validationAmount(amount) {
        if (amount !== '' && typeof amount === 'number') {
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
            amount: this.__amount
        };
    }

    getData() {
        return {
            id: this.__id,
            name: this.__name,
            date: this.__date,
            amount: this.__amount,
            description: this.__description,
            views: this.__views,
            likes: this.__likes,
            userLiked: this.__userLiked,
            linkImages: this.__linkImages,
            ownerId: this.__ownerId,
            ownerName: this.__ownerName,
            ownerSurname: this.__ownerSurname,
            ownerStars: this.__ownerStars
        }
    }



    /***
     * Get product data from backend
     * @returns {Promise<void>}
     */
    async update() {
        await http.get(urls.product + this.__id)
            .then(({status, data}) => {
                if (status === 200) {
                    console.log(data);
                    this.fillProductModel(data);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    /***
     * Post create new product
     * @returns {Promise<{data: *, status: number}>}
     */
    async create() {
        const data = this.__jsonData();
        return await http.post(urls.productCreate, data);
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
            ownerStars: this.__ownerStars
        });
    }
}