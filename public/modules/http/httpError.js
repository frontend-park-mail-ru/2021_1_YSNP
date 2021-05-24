import {CustomError} from '../customError.js';

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

    /***
     * Check is BadRequestError
     * @param {CustomError} err
     * @returns {boolean}
     */
    static isError(err) {
        return err instanceof BadRequestError;
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

    /***
     * Check is UnauthorizedError
     * @param {CustomError} err
     * @returns {boolean}
     */
    static isError(err) {
        return err instanceof UnauthorizedError;
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

    /***
     * Check is ForbiddenError
     * @param {CustomError} err
     * @returns {boolean}
     */
    static isError(err) {
        return err instanceof ForbiddenError;
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

    /***
     * Check is NotFoundError
     * @param {CustomError} err
     * @returns {boolean}
     */
    static isError(err) {
        return err instanceof NotFoundError;
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

    /***
     * Check is OfflineError
     * @param {CustomError} err
     * @returns {boolean}
     */
    static isError(err) {
        return err instanceof OfflineError;
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

    /***
     * Check is InternalServerError
     * @param {CustomError} err
     * @returns {boolean}
     */
    static isError(err) {
        return err instanceof InternalServerError;
    }
}
