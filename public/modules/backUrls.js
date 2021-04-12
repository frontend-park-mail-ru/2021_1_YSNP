/***
 * Get backend urls
 */
class BackUrls {
    /***
     * Class constructor
     */
    constructor() {
        // this.__url = 'https://ykoya.ru';
        this.__url = 'http://localhost:8080';
        this.__api = '/api/v1';
    }

    /***
     * Get login user url
     * @returns {string}
     */
    get login() {
        return `${this.__url}${this.__api}/login`;
    }

    /***
     * Get logout user url
     * @returns {string}
     */
    get logout() {
        return `${this.__url}${this.__api}/logout`;
    }

    /***
     * Get sing up url
     * @returns {string}
     */
    get singUp() {
        return `${this.__url}${this.__api}/signup`;
    }

    /***
     * Get upload user avatar url
     * @returns {string}
     */
    get upload() {
        return `${this.__url}${this.__api}/upload`;
    }

    /***
     * Get user profile url
     * @returns {string}
     */
    get me() {
        return `${this.__url}${this.__api}/me`;
    }


    /***
     * Get user url
     * @param {number} id - user id
     * @returns {string}
     */
    getUser(id) {
        return `${this.__url}${this.__api}/user/${id}`;
    }

    /***
     * Get change user url
     * @returns {string}
     */
    get settings() {
        return `${this.__url}${this.__api}/user`;
    }

    /***
     * Get new password url
     * @returns {string}
     */
    get newPassword() {
        return `${this.__url}${this.__api}/user/password`;
    }

    /***
     * Get product list url
     * @param {number} from - page number paginator
     * @param {number} count - count product per page
     * @returns {string}
     */
    productList(from, count) {
        return `${this.__url}${this.__api}/product/list?from=${from}&count=${count}`;
    }

    /***
     * Get product create url
     * Get position user url
     * @returns {string}
     */
    get userPosition() {
        return `${this.__url}${this.__api}/user/position`;
    }

    /***
     * Get user ad list
     * @param {number} from - page number paginator
     * @param {number} count - count product per page
     * @returns {string}
     */
    userAdList(from, count) {
        return `${this.__url}${this.__api}/user/ad/list?from=${from}&count=${count}`;
    }

    /***
     * Get user favorite list
     * @param {number} from - page number paginator
     * @param {number} count - count product per page
     * @returns {string}
     */
    userFavoriteList(from, count) {
        return `${this.__url}${this.__api}/user/favorite/list?from=${from}&count=${count}`;
    }

    /***
     * User like product
     * @param {number} id - product id
     * @returns {string}
     */
    userLikeProduct(id) {
        return `${this.__url}${this.__api}/user/favorite/like/${id}`;
    }

    /***
     * User dislike product
     * @param {number} id - product id
     * @returns {string}
     */
    userDislikeProduct(id) {
        return `${this.__url}${this.__api}/user/favorite/dislike/${id}`;
    }

    /***
     * Get one product url
     * @param {number} id - product id
     * @returns {string}
     */
    product(id) {
        return `${this.__url}${this.__api}/product/${id}`;
    }

    /***
     * Get logout user url
     * @returns {string}
     */
    get productCreate() {
        return `${this.__url}${this.__api}/product/create`;
    }

    /***
     * Get product upload photo url
     *  @param {number} id - product id
     * @returns {string}
     */
    productUploadPhotos(id) {
        return `${this.__url}${this.__api}/product/upload/${id}`;
    }


    /***
     * Get find products url
     * @returns {string}
     */
    get search() {
        return `${this.__url}${this.__api}/search`;
    }

    /***
     *
     * @return {string}
     */
    get categories() {
        return `${this.__url}${this.__api}/categories`;
    }
}

export const backUrls = new BackUrls();
