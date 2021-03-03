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

    /***
     * Get auth user url
     * @returns {string}
     */
    get me() {
        return `${this.__url}/me`;
    }
}

export const urls = new Urls();
