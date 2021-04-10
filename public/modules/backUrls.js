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
     * Get product list url
     * @returns {string}
     */
    get productList() {
        return `${this.__url}${this.__api}/product/list`;
    }

    /***
     * Get one product url
     * @returns {string}
     */
    get product() {
        return `${this.__url}${this.__api}/product/`;
    }

    /***
     * Get product create url
     * @returns {string}
     */
    get productCreate() {
        return `${this.__url}${this.__api}/product/create`;
    }

    /***
     * Get product upload photo url
     * @returns {string}
     */
    get productUploadPhotos() {
        return `${this.__url}${this.__api}/product/upload/`;
    }

    /***
     * Get user profile url
     * @returns {string}
     */
    get me() {
        return `${this.__url}${this.__api}/me`;
    }

    /***
     * Get login user url
     * @returns {string}
     */
    get login() {
        return `${this.__url}${this.__api}/login`;
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
     * Get change user url
     * @returns {string}
     */
    get settings() {
        return `${this.__url}${this.__api}/settings`;
    }

    /***
     * Get position user url
     * @returns {string}
     */
    get userPosition() {
        return `${this.__url}${this.__api}/user/position`;
    }

    /***
     * Get logout user url
     * @returns {string}
     */
    get logout() {
        return `${this.__url}${this.__api}/logout`;
    }

    /***
     * Get new password url
     * @returns {string}
     */
    get newPassword() {
        return `${this.__url}${this.__api}/settings/password`;
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
