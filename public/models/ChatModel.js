import {BaseModel} from './BaseModel';

import {WebSocketService} from '../modules/http/webSocketService';
import {WebSocketConnectError} from '../modules/http/webSocketServiceError';

import {backUrls} from '../modules/urls/backUrls';
import {http} from '../modules/http/http';

export class ChatModel extends BaseModel {
    constructor(callbackList) {
        super();

        this.__chatList = [];
        this.__chatMessage = {};

        this.__callbackList = callbackList;
        this.__wss = new WebSocketService(backUrls.chatWs);
    }

    __getDate(date) {
        const localDate = new Date(date);
        return localDate.toLocaleDateString('ru-RU', {
            timeZone: 'UTC',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
    }

    __getTime(date) {
        const localTime = new Date(date);
        return localTime.toLocaleTimeString('ru-RU', {
            timeZone: 'UTC',
            minute: 'numeric',
            hour: 'numeric'
        });
    }

    __getAmount(amount) {
        return `${amount.toLocaleString()} ₽`;
    }

    __jsonCreateChatData(productID, partnerID) {
        return {
            productID: productID,
            partnerID: partnerID
        };
    }

    async createChat(productID, partnerID) {
        return http.post(backUrls.chatCreate, this.__jsonCreateChatData(productID, partnerID))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                return data;
            });
    }

    parseOneChat(data) {
        return {
            chatID: data.id,
            userName: data.partner_name + data.partner_surname,
            userImg: data.partner_avatar,
            productImg: data.product_avatar_link,
            productName: data.product_name,
            productAmount: data.product_amount,
            lastMessageDate: this.__getDate(data.last_msg_time),
            lastMessage: data.last_msg_content,
            newMessages: 0
        };
    }

    parseChatList(data) {
        return data.reduce((accum, el) => {
            accum.push(this.parseOneChat(el));

            return accum;
        }, []);
    }

    parseChatListData(data) {
        this.__chatList = this.parseChatList(data);
    }

    getChatListData() {
        return this.__chatList;
    }

    async chatList() {
        return http.get(backUrls.chatList)
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.parseChatListData(data);
            });
    }

    parseChatMessage(data) {
        return {
            chatID: data.id,
            userName: data.partner_name + data.partner_surname,
            userImg: data.partner_avatar,
            productName: data.product_name,
            productImg: data.product_avatar_link,
            productAmount: this.__getAmount(data.product_amount)
        };
    }

    parseChatMessageData(data) {
        this.__chatMessage = this.parseChatMessage(data);
        Object.assign(this.__chatMessage, {messages: []});
    }

    getChatMessageData() {
        return this.__chatMessage;
    }

    async chatMessage(chatID, userID) {
        this.__userID = userID;

        return http.get(backUrls.chat(chatID))
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.parseChatMessageData(data);
                this.getLastMessages();
            });
    }

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

    close() {
        this.__wss.close();
    }

    createMessage(content) {
        this.__wss.send('CreateMessageReq', {
            chat_id: this.__chatMessage.chatID,
            content: content
        });
    }

    getLastMessages(count = 30) {
        this.__wss.send('GetLastNMessagesReq', {
            chat_id: this.__chatMessage.chatID,
            count: count
        });
    }

    getMessagesBefore(lastMessageId, count = 30) {
        this.__wss.send('GetNMessagesBeforeReq', {
            chat_id: this.__chatMessage.chatID,
            count: count,
            message_id: lastMessageId
        });
    }

    parseOneMessage(data, isDown = false) {
        return {
            isUser: data.user_id === this.__userID,
            isDown: isDown,
            text: data.content,
            date: this.__getTime(data.time)
        };
    }

    parseMessageList(data) {
        return data.reduce((accum, el) => {
            accum.push(this.parseOneMessage(el));

            return accum;
        }, []);
    }

    parseNewMessage(data) {
        const message = this.parseOneMessage(data, true);
        this.__chatMessage.messages.push(message);

        return message;
    }

    parseNewMessageList(data) {
        const messageList = this.parseMessageList(data);
        this.__chatMessage.messages.push(messageList);

        return messageList;
    }

    __callbackLastMessageList(data) {
        // console.log('new message list', data);
        this.__callbackList.newMessageList(this.parseNewMessageList(data));
    }

    __callbackPageMessageList(data) {
        // console.log('new message page', data);
        this.__callbackList.newMessageList(this.parseNewMessageList(data));
    }

    __callbackNewMessage(data) {
        // console.log('new message', data);
        this.__callbackList.newMessage(this.parseNewMessage(data));
    }

    __callbackError() {
        console.log('error');
    }

    __callbackClose() {
        console.log('close');
    }

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
            close: this.__callbackClose.bind(this)
        };
    }

    __subscribeEvents() {
        const callbacks = this.__createCallbacks();

        callbacks.message.forEach((el) => {
            this.__wss.subscribeMessage(el.type, el.callback);
        });

        this.__wss.subscribeError(callbacks.error);
        this.__wss.subscribeClose(callbacks.close);
    }
}