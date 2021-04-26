/***
 * Custom error class
 */
export class CustomError extends Error {
    /***
     * Class constructor
     * @param {string} name - error name
     * @param {string} message - error message
     */
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}