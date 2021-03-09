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

    get main() {
        return `${this.__url}${this.__api}/`;
    }

    get product() {
        return `${this.__url}${this.__api}/product/`;
    }

    get productCreate() {
        return `${this.__url}${this.__api}/product/create`;
    }

    get me() {
        return `${this.__url}${this.__api}/me`;
    }

    get login() {
        return `${this.__url}${this.__api}/login`;
    }

    get singUp() {
        return `${this.__url}${this.__api}/signup`;
    }

    get upload() {
        return `${this.__url}${this.__api}/upload`;
    }

    get settings() {
        return `${this.__url}${this.__api}/settings`;
    }

    get logout() {
        return `${this.__url}${this.__api}/logout`;
    }
}

export const urls = new Urls();
