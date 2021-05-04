import {CustomError} from '../customError.js';

/***
 * Bad request error class
 */
export class WebSocketConnectError extends CustomError {
    /***
     * Class constructor
     * @param {string} message - error message
     */
    constructor(message = WebSocketConnectError.defaultMessage) {
        super('WebSocketConnectError', message);
    }

    /***
     * Get default error message
     * @returns {string}
     */
    static get defaultMessage() {
        return 'не удалось подключиться';
    }
}