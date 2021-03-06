/***
 * Http status (name-status code)
 */
class HttpStatus {
    /***
     * Class constructor
     */
    constructor() {
        this.__statuses = {
            OK: 200,
            BadRequest: 400,
            Unauthorized: 401,
            Forbidden: 403,
            NotFound: 404,
            Offline: 420,
            InternalServerError: 500
        };
    }

    /***
     * Get status OK
     * @returns {number}
     * @constructor
     */
    get StatusOK() {
        return this.__statuses.OK;
    }

    /***
     * Get status Bad Request
     * @returns {number}
     * @constructor
     */
    get StatusBadRequest() {
        return this.__statuses.BadRequest;
    }

    /***
     * Get status Unauthorized
     * @returns {number}
     * @constructor
     */
    get StatusUnauthorized() {
        return this.__statuses.Unauthorized;
    }

    /***
     * Get status Forbidden
     * @returns {number}
     * @constructor
     */
    get StatusForbidden() {
        return this.__statuses.Forbidden;
    }

    /***
     * Get status Not Found
     * @returns {number}
     * @constructor
     */
    get StatusNotFound() {
        return this.__statuses.NotFound;
    }

    /***
     * Get status PageOffline
     * @returns {number}
     * @constructor
     */
    get StatusOffline() {
        return this.__statuses.Offline;
    }

    /***
     * Get status Internal Server Error
     * @returns {number}
     * @constructor
     */
    get StatusInternalServerError() {
        return this.__statuses.InternalServerError;
    }
}

export const httpStatus = new HttpStatus();