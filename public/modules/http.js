/***
 * Http module
 */
class Http {
    /***
     * Create request that returns to fetch
     * @param {string} url -  http url
     * @param {string} method - http method
     * @param {any} data - http data
     * @returns {Request}
     * @private
     */
    __ajax(url, method, data) {
        const options = {
            method: method,
            mode: 'cors',
            credential: 'include'
        };

        if (data) {
            options['body'] = JSON.stringify(data);
        }

        return new Request(url, options);
    }

    /***
     * Ajax get request
     * @param {string} url - get request url
     * @returns {Promise<{data: any, status: number}>}
     */
    async get(url) {
        const response = await fetch(this.__ajax(url, 'GET', null));
        const responseData = await response.json();

        return {
            status: response.status,
            data: responseData
        };
    }

    /***
     * Ajax post request
     * @param {string} url - post request url
     * @param {any} data - post request data
     * @returns {Promise<{data: any, status: number}>}
     */
    async post(url, data) {
        const response = await fetch(this.__ajax(url, 'POST', data));
        const responseData = await response.json();

        return {
            status: response.status,
            data: responseData
        };
    }
}

export const http = new Http();