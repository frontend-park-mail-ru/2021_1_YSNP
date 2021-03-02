/***
 * Http work
 */
class Http {
    /***
     *
     * @param {string} method - http method
     * @param {string} url - http url
     * @param {Object} data - http data
     * @param {Function} callback - response function
     * @private
     */
    __ajax(method, url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }

            callback(xhr.status, xhr.responseText);
        });


        if (data) {
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
            xhr.send(JSON.stringify(data));
            return;
        }

        console.log(xhr);

        xhr.send();
    }

    /***
     * Get http request
     * @param {String} url - http url
     * @param {Function} callback - response function
     */
    get(url, callback) {
        this.__ajax('GET', url, null, callback);
    }

    /***
     * Post http request
     * @param {string} url - http url
     * @param {Object} data - http data
     * @param {Function} callback - response function
     */
    post(url, data, callback) {
        this.__ajax('POST', url, data, callback);
    }
}

export const http = new Http();