export class WebSocketService {
    constructor(url) {
        this.__connectionUrl = url;
        this.__isOpen = false;

        this.__subcribedMessagesList = new Map();
        this.__listeners = this.__createListeners();
    }

    isOpen() {
        return this.__isOpen;
    }

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

    close() {
        this.__ws.close();
        this.__isOpen = false;
        this.__removeListeners();
    }

    send(type, data) {
        try {
            this.__ws.send(JSON.stringify({
                type: type,
                data: data
            }));
        } catch (err) {
            console.log(err.message);
        }
    }

    subscribeMessage(type, callback) {
        this.__subcribedMessagesList.set(type, callback);
    }

    subscribeError(callback) {
        this.__errorCallback = callback;
    }

    subscribeClose(callback) {
        this.__closeCallback = callback;
    }

    __onMessage(ev) {
        // console.log('message', ev);

        const response = JSON.parse(ev.data);
        this.__subcribedMessagesList.get(response.type)(response.data);
    }

    __onError(ev) {
        if (!this.__isOpen) {
            return;
        }

        // console.log('error', ev);
        this.__errorCallback();
    }

    __onClose(ev) {
        // console.log('close', ev);
        this.__closeCallback();
    }

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

    __addListeners() {
        this.__ws.addEventListener(this.__listeners.message.type, this.__listeners.message.listener);
        this.__ws.addEventListener(this.__listeners.error.type, this.__listeners.error.listener);
        this.__ws.addEventListener(this.__listeners.close.type, this.__listeners.close.listener);
    }

    __removeListeners() {
        this.__ws.removeEventListener(this.__listeners.message.type, this.__listeners.message.listener);
        this.__ws.removeEventListener(this.__listeners.error.type, this.__listeners.error.listener);
        this.__ws.removeEventListener(this.__listeners.close.type, this.__listeners.close.listener);
    }
}