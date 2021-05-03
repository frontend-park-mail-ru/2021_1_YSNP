import {BaseModel} from './BaseModel';

import {WebSocketService} from '../modules/http/webSocketService';
import {WebSocketConnectError} from '../modules/http/webSocketServiceError';

import {backUrls} from '../modules/urls/backUrls';
import {http} from '../modules/http/http';
import {
    BadRequestError,
    ForbiddenError, InternalServerError,
    NotFoundError,
    OfflineError,
    UnauthorizedError
} from '../modules/http/httpError';
import {httpStatus} from '../modules/http/httpStatus';

/***
 * Chat model
 */
class ChatModel extends BaseModel {
    /***
     * Class constructor
     */
    constructor() {
        super();

        this.__chatList = [];
        this.__chatMessage = {};

        this.__wss = new WebSocketService(backUrls.chatWs);
    }

    /***
     * Update user id
     * @param {number} userID
     */
    updateUserID(userID) {
        this.__userID = userID;
    }

    /***
     * Update callback list
     * @param {Object} callbackList
     */
    updateCallbackList(callbackList) {
        this.__callbackList = callbackList;
    }

    /***
     * Get local date
     * @param {string} date - date
     * @returns {string}
     * @private
     */
    __getDate(date) {
        const localDate = new Date(date);
        return localDate.toLocaleDateString('ru-RU', {
            timeZone: 'UTC',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
    }

    /***
     * Get local time
     * @param {string} time - time
     * @returns {string}
     * @private
     */
    __getTime(time) {
        const localTime = new Date(time);
        return localTime.toLocaleTimeString('ru-RU', {
            timeZone: 'UTC',
            minute: 'numeric',
            hour: 'numeric'
        });
    }

    /***
     * Get local amount
     * @param {number} amount - product amount
     * @returns {string}
     * @private
     */
    __getAmount(amount) {
        return `${amount.toLocaleString()} ₽`;
    }

    /***
     * Json create chat date
     * @param {number} productID
     * @param {number} partnerID
     * @returns {{productID, partnerID}}
     * @private
     */
    __jsonCreateChatData(productID, partnerID) {
        return {
            productID: productID,
            partnerID: partnerID
        };
    }

    /***
     * Create new chat
     * @param {number} productID
     * @param {number} partnerID
     * @returns {Promise<{data: *, status: number}>}
     */
    async createChat(productID, partnerID) {
        return http.post(backUrls.chatCreate, this.__jsonCreateChatData(productID, partnerID))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                return data;
            });
    }

    /***
     * Parse one chat
     * @param {Object} data
     * @param {boolean} isDown - render chat to chat list end
     * @returns {{newMessages: *, userImg: string, productAmount: *, lastMessageDate: string, chatID, productImg: string, lastMessage: *, userName: string, productName: *, isDown: boolean}}
     */
    parseOneChat(data, isDown = true) {
        return {
            chatID: data.id,
            userName: `${data.partner_surname} ${data.partner_name}`,
            // userImg: data.partner_avatar,
            userImg: '/img/search-background.webp',
            productName: data.product_name,
            // productImg: data.product_avatar_link,
            productImg: '/img/search-background.webp',
            productAmount: data.product_amount,
            lastMessageDate: this.__getDate(data.last_msg_time),
            lastMessage: data.last_msg_content,
            newMessages: data.new_messages,
            isDown: isDown
        };
    }

    /***
     * Parse chat list
     * @param {Object[]} data
     * @returns {Object[]}
     */
    parseChatList(data) {
        return data.reduce((accum, el) => {
            accum.push(this.parseOneChat(el));

            return accum;
        }, []);
    }

    /***
     * Parse one chat date
     * @param {Object} data
     * @returns {{newMessages: *, userImg: string, productAmount: *, lastMessageDate: string, chatID, productImg: string, lastMessage: *, userName: string, productName: *, isDown: boolean}}
     */
    parseOneChatData(data) {
        const oneChat = this.parseOneChat(data, false);
        this.__chatList.push(oneChat);

        return oneChat;
    }

    /***
     * Parse chat list data
     * @param {Object[]} data
     * @returns {Object[]}
     */
    parseChatListData(data) {
        this.__chatList = [];
        this.__chatList = this.parseChatList(data);

        return this.__chatList;
    }

    /***
     * Update chat list last date
     * @param {number} chatID - id chat
     * @param {Object} data - last data
     */
    updateChatListLastDate(chatID, data) {
        const oneChat = this.getChatListOneChatData(chatID);
        oneChat.lastMessage = data.text;
        oneChat.lastMessageDate = data.date;
    }

    /***
     * Update chat list unread messages
     * @param {number} chatID - id chat
     * @returns {number}
     */
    updateChatListUnreadMessages(chatID) {
        const oneChat = this.getChatListOneChatData(chatID);
        oneChat.newMessages++;

        return oneChat.newMessages;
    }

    /***
     * Get chat list date
     * @returns {Object[]}
     */
    getChatListData() {
        return this.__chatList;
    }

    /***
     * Get one chat
     * @param chatID
     * @returns {Object}
     */
    getChatListOneChatData(chatID) {
        return this.__chatList.find((el) => el.chatID === chatID);
    }

    /***
     * Chat list
     * @returns {Promise<{data: *, status: number}>}
     */
    async chatList() {
        return http.get(backUrls.chatList)
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.parseChatListData(data);
            });
    }

    /***
     * Chat list new chat
     * @param {number} chatID
     * @returns {Promise<{newMessages: *, userImg: string, productAmount: *, lastMessageDate: string, chatID, productImg: string, lastMessage: *, userName: string, productName: *, isDown: boolean}>}
     */
    async chatListNewChat(chatID) {
        return http.get(backUrls.chat(chatID))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                return this.parseOneChatData(data);
            });
    }

    /***
     * Parse chat message
     * @param {Object} data - new message
     * @returns {{productAmount: string, chatID, productID: number, productImg: string, partnerID, userName: string, productName: *}}
     */
    parseChatMessage(data) {
        return {
            chatID: data.id,
            userName: `${data.partner_surname} ${data.partner_name}`,
            productID: 826,
            productName: data.product_name,
            // productImg: data.product_avatar_link,
            productImg: '/img/search-background.webp',
            productAmount: this.__getAmount(data.product_amount),
            partnerID: data.partner_id
        };
    }

    /***
     * Parse chat message data
     * @param {Object} data
     * @returns {Object}
     */
    parseChatMessageData(data) {
        this.__chatMessage = {};
        this.__chatMessage = this.parseChatMessage(data);
        Object.assign(this.__chatMessage, {messages: []});

        return this.__chatMessage;
    }

    /***
     * Get chat message data
     * @returns {Object}
     */
    getChatMessageData() {
        return this.__chatMessage;
    }

    /***
     * Chat message
     * @param {number} chatID
     * @returns {Promise<{data: *, status: number}>}
     */
    async chatMessage(chatID) {
        return http.get(backUrls.chat(chatID))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.parseChatMessageData(data);
                this.getLastMessages();
            });
    }

    /***
     * Open webSocket connection
     * @returns {Promise<void>}
     */
    async connect() {
        if (this.__wss.isOpen()) {
            return Promise.resolve();
        }

        return this.__wss.connect()
            .then(() => {
                this.__subscribeEvents();
            })
            .catch((err) => {
                throw new WebSocketConnectError(err);
            });
    }

    /***
     * Close webSocket connection
     */
    close() {
        if (this.__wss.isOpen()) {
            this.__wss.close();
        }
    }

    /***
     * Create new message
     * @param {string} content - message text
     */
    createMessage(content) {
        this.__wss.send('CreateMessageReq', {
            request_data: {
                chat_id: this.__chatMessage.chatID,
                content: content
            },
            type_data: {
                partner_id: this.__chatMessage.partnerID
            }
        });
    }

    /***
     * Get last messages
     * @param {number} count - message count
     */
    getLastMessages(count = 30) {
        this.__wss.send('GetLastNMessagesReq', {
            request_data: {
                chat_id: this.__chatMessage.chatID,
                count: count
            }
        });
    }

    /***
     * Get messages before
     * @param {number} lastMessageId - last message id
     * @param {number} count = message count
     */
    getMessagesBefore(lastMessageId, count = 30) {
        this.__wss.send('GetNMessagesBeforeReq', {
            request_data: {
                chat_id: this.__chatMessage.chatID,
                count: count,
                message_id: lastMessageId
            }
        });
    }

    /***
     * Parse one message
     * @param {Object} data - message
     * @param {boolean} isDown - render message to chat message list end
     * @returns {{date: string, text, time: string, isUser: boolean, isDown: boolean}}
     */
    parseOneMessage(data, isDown = false) {
        return {
            isUser: data.user_id === this.__userID,
            isDown: isDown,
            text: data.content,
            time: this.__getTime(data.time),
            date: this.__getDate(data.time)
        };
    }

    /***
     * Parse message list
     * @param {Object[]} data - message list
     * @returns {Object[]}
     */
    parseMessageList(data) {
        return data.reduce((accum, el) => {
            accum.push(this.parseOneMessage(el));

            return accum;
        }, []);
    }

    /***
     * Parse new message
     * @param {Object} data - new message
     * @returns {{date: string, text, time: string, isUser: boolean, isDown: boolean}}
     */
    parseNewMessage(data) {
        return this.parseOneMessage(data, true);
    }

    /***
     * Parse new message list
     * @param {Object[]} data
     * @returns {Object[]}
     */
    parseNewMessageList(data) {
        const messageList = this.parseMessageList(data);
        this.__chatMessage.messages.push(messageList);

        return messageList;
    }

    /***
     * Add new message to message list
     * @param {Object} data - new message
     */
    addNewMessage(data) {
        this.__chatMessage.messages.push(data);
    }

    /***
     * Last message list callback
     * @param {number} status
     * @param {Object[]} data
     * @private
     */
    __callbackLastMessageList(status, data) {
        console.log('new message list', status, data);

        this.__callbackList.chatMessageNewMessageList(this.parseNewMessageList(data));
    }

    /***
     * Page message list callback
     * @param {number} status
     * @param {Object[]} data
     * @private
     */
    __callbackPageMessageList(status, data) {
        console.log('new page list message', status, data);

        this.__callbackList.chatMessageNewMessageList(this.parseNewMessageList(data));
    }

    /***
     * New message callback
     * @param {number} status
     * @param {Object} data
     * @private
     */
    __callbackNewMessage(status, data) {
        console.log('new message', status, data);

        this.__callbackList.chatMessageNewMessage(data.chat_id, this.parseNewMessage(data));
    }

    /***
     * Error callback
     * @param {Event} ev
     * @private
     */
    __callbackError(ev) {
        console.log('error', ev);
    }

    /***
     * Error message callback
     * @param {Event} ev
     * @param {Error} err
     * @private
     */
    __callbackErrorMessage(ev, err) {
        console.log('error message', ev, err);
    }

    /***
     * Error send callback
     * @param {string} type
     * @param {Object} data
     * @param {Error} err
     * @private
     */
    ___callbackErrorSend(type, data, err) {
        console.log('error send', type, data, err);
    }

    /***
     * Close callback
     * @param {Event} ev
     * @private
     */
    __callbackClose(ev) {
        console.log('close', ev);
    }

    /***
     * Create callback list
     * @returns {{errorSend: *, errorMessage: *, message: [{callback: *, type: string}, {callback: *, type: string}, {callback: *, type: string}], error: *, close: *}}
     * @private
     */
    __createCallbacks() {
        return {
            message: [
                {
                    type: 'GetLastNMessagesReq',
                    callback: this.__callbackLastMessageList.bind(this)
                },
                {
                    type: 'GetNMessagesBeforeReq',
                    callback: this.__callbackPageMessageList.bind(this)
                },
                {
                    type: 'CreateMessageReq',
                    callback: this.__callbackNewMessage.bind(this)
                }
            ],
            error: this.__callbackError.bind(this),
            errorMessage: this.__callbackErrorMessage.bind(this),
            errorSend: this.___callbackErrorSend.bind(this),
            close: this.__callbackClose.bind(this)
        };
    }

    /***
     * Subscribe webSocket events
     * @private
     */
    __subscribeEvents() {
        const callbacks = this.__createCallbacks();

        callbacks.message.forEach((el) => {
            this.__wss.subscribeMessage(el.type, el.callback);
        });

        this.__wss.subscribeError(callbacks.error);
        this.__wss.subscribeErrorMessage(callbacks.errorMessage);
        this.__wss.subscribeErrorSend(callbacks.errorSend);
        this.__wss.subscribeClose(callbacks.close);
    }
}

export const chat = new ChatModel();