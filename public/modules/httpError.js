import {CustomError} from './customError.js';


/***
 * Bad request error class
 */
export class BadRequestError extends CustomError {
    /***
     * Class constructor
     * @param {string} message - error message
     */
    constructor(message = BadRequestError.defaultMessage) {
        super('BadRequestError', message);
    }

    /***
     * Get default error message
     * @returns {string}
     */
    static get defaultMessage() {
        return 'Неправильные данные';
    }
}

/***
 * Unauthorized error class
 */
export class UnauthorizedError extends CustomError {
    /***
     * Class constructor
     * @param {string} message - error message
     */
    constructor(message = UnauthorizedError.defaultMessage) {
        super('UnauthorizedError', message);
    }

    /***
     * Get default error message
     * @returns {string}
     */
    static get defaultMessage() {
        return 'Пользователь не авторизован';
    }
}

/***
 * Forbidden error class
 */
export class ForbiddenError extends CustomError {
    /***
     * Class constructor
     * @param {string} message - error message
     */
    constructor(message = ForbiddenError.defaultMessage) {
        super('ForbiddenError', message);
    }

    /***
     * Get default error message
     * @returns {string}
     */
    static get defaultMessage() {
        return 'Доступ запрещен';
    }
}

/***
 * Not found error class
 */
export class NotFoundError extends CustomError {
    /***
     * Class constructor
     * @param {string} message - error message
     */
    constructor(message = NotFoundError.defaultMessage) {
        super('NotFoundError', message);
    }

    /***
     * Get default error message
     * @returns {string}
     */
    static get defaultMessage() {
        return 'Ничего не найдено';
    }
}

/***
 * PageOffline error class
 */
export class OfflineError extends CustomError {
    /***
     * Class constructor
     * @param {string} message - error message
     */
    constructor(message = OfflineError.defaultMessage) {
        super('OfflineError', message);
    }

    /***
     * Get default error message
     * @returns {string}
     */
    static get defaultMessage() {
        return 'Нет интернета';
    }
}

/***
 * Internal server error class
 */
export class InternalServerError extends CustomError {
    /***
     * Class constructor
     * @param {string} message - error message
     */
    constructor(message = InternalServerError.defaultMessage) {
        super('InternalServerError', message);
    }

    /***
     * Get default error message
     * @returns {string}
     */
    static get defaultMessage() {
        return 'Ошибка сервера';
    }
}
