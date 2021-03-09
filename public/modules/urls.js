/***
 * Get backend urls
 */
class Urls {
    /***
     * Class constructor
     */
    constructor() {
        // this.__url = 'http://89.208.199.170:8080';
        this.__url = 'http://localhost:8080';
        this.__api = '/api/v1';
    }

    /***
     * Get product list url
     * @returns {string}
     */
    get productList() {
        return `${this.__url}${this.__api}/`;
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

    get productUploadPhotos() {
        return `${this.__url}${this.__api}/product/upload`;
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
     * Get logout user url
     * @returns {string}
     */
    get logout() {
        return `${this.__url}${this.__api}/logout`;
    }

    get newPassword() {
        return `${this.__url}${this.__api}/settings/password`;
    }
}

export const urls = new Urls();
