/***
 * WebSocket Service
 */
export class WebSocketService {
    /***
     * Class constructor
     * @param {string} url - webSocket connection url
     */
    constructor(url) {
        this.__connectionUrl = url;
        this.__isOpen = false;

        this.__subcribedMessagesList = new Map();
        this.__listeners = this.__createListeners();
    }

    /***
     * Is open webSocket
     * @returns {boolean}
     */
    isOpen() {
        return this.__isOpen;
    }

    /***
     * Connect websocket
     * @returns {Promise<void>}
     */
    async connect() {
        return new Promise((resolve, reject) => {
            this.__ws = new WebSocket(this.__connectionUrl);
            this.__addListeners();

            this.__ws.onopen = () => {
                if (!this.__isOpen) {
                    this.__isOpen = true;
                    resolve('webSocket open');
                }
            };

            this.__ws.onerror = (ev) => {
                if (!this.__isOpen) {
                    reject(ev);
                }
            };
        });
    }

    /***
     * Close webSocket
     */
    close() {
        this.__ws.close();
        this.__isOpen = false;
        this.__removeListeners();
    }

    /***
     * Add message webSocket callback
     * @param {string} type - message type
     * @param {Function} callback - message callback
     */
    subscribeMessage(type, callback) {
        this.__subcribedMessagesList.set(type, callback);
    }

    /***
     * Add error webSocket callback
     * @param {Function} callback
     */
    subscribeError(callback) {
        this.__errorCallback = callback;
    }

    /***
     * Add error message callback
     * @param {Function} callback
     */
    subscribeErrorMessage(callback) {
        this.__errorMessageCallback = callback;
    }

    /***
     * Add error send callback
     * @param {Function} callback
     */
    subscribeErrorSend(callback) {
        this.__errorSendCallback = callback;
    }

    /***
     * Add close callback
     * @param {Function} callback
     */
    subscribeClose(callback) {
        this.__closeCallback = callback;
    }

    /***
     * Send data to server
     * @param {string} type - message type
     * @param {Object} data - message data
     */
    send(type, data) {
        try {
            this.__ws.send(JSON.stringify({
                type: type,
                data: data
            }));
        } catch (err) {
            this.__errorSendCallback(type, data, err);
        }
    }

    /***
     * On message webSocket callback
     * @param {Event} ev
     * @private
     */
    __onMessage(ev) {
        let type = undefined, status = undefined, data = undefined;
        try {
            const response = JSON.parse(ev.data);
            type = response.type;
            status = response.status;
            data = response.data;
        } catch (err) {
            this.__errorMessageCallback(ev, err);
        }

        this.__subcribedMessagesList.get(type)(status, data);
    }

    /***
     * On error webSocket callback
     * @param {Event} ev
     * @private
     */
    __onError(ev) {
        if (!this.__isOpen) {
            return;
        }

        this.__errorCallback(ev);
    }

    /***
     * On close webSocket callback
     * @param {Event} ev
     * @private
     */
    __onClose(ev) {
        this.__closeCallback(ev);
    }

    /***
     * Create webSocket listeners
     * @returns {{message: {listener: *, type: string}, error: {listener: *, type: string}, close: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            message: {
                type: 'message',
                listener: this.__onMessage.bind(this)
            },
            error: {
                type: 'error',
                listener: this.__onError.bind(this)
            },
            close: {
                type: 'close',
                listener: this.__onClose.bind(this)
            }
        };
    }

    /***
     * Add webSocket listeners
     * @private
     */
    __addListeners() {
        this.__ws.addEventListener(this.__listeners.message.type, this.__listeners.message.listener);
        this.__ws.addEventListener(this.__listeners.error.type, this.__listeners.error.listener);
        this.__ws.addEventListener(this.__listeners.close.type, this.__listeners.close.listener);
    }

    /***
     * Remove webSocket listeners
     * @private
     */
    __removeListeners() {
        this.__ws.removeEventListener(this.__listeners.message.type, this.__listeners.message.listener);
        this.__ws.removeEventListener(this.__listeners.error.type, this.__listeners.error.listener);
        this.__ws.removeEventListener(this.__listeners.close.type, this.__listeners.close.listener);
    }
}