/***
 * Get backend urls
 */
class Urls {
    /***
     * Class constructor
     */
    constructor() {
        // this.__url = 'http://89.208.199.170:3000';
        this.__url = 'http://localhost:3000';
    }

    get main() {
        return `${this.__url}/`;
    }

    get product() {
        return `${this.__url}/product/`;
    }

    get productCreate() {
        return `${this.__url}/product/create`;
    }

    get me() {
        return `${this.__url}/me`;
    }

    get login() {
        return `${this.__url}/login`;
    }

    get singUp() {
        return `${this.__url}/singup`;
    }

    get settings() {
        return `${this.__url}/settings`;
    }
}

export const urls = new Urls();
