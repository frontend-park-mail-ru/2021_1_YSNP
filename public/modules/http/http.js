import {customSessionStorage} from '../storage/customSessionStorage.js';

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
            credentials: 'include'
        };

        const csrf = customSessionStorage.get('csrf');
        if (csrf) {
            options['headers'] = {'X-CSRF-Token': csrf};
        }

        if (data) {
            options['body'] = data;
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

        const csrf = response.headers.get('X-CSRF-Token');
        if (csrf) {
            customSessionStorage.set('csrf', csrf);
        }

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
     * @param {boolean} photo - isPhoto?
     * @returns {Promise<{data: any, status: number}>}
     */
    async post(url, data, photo = false) {
        const response = await fetch(this.__ajax(url, 'POST', photo ? data : JSON.stringify(data)));

        const csrf = response.headers.get('X-CSRF-Token');
        if (csrf) {
            customSessionStorage.set('csrf', csrf);
        }

        const responseData = await response.json();

        return {
            status: response.status,
            data: responseData
        };
    }
}

export const http = new Http();