import chatListTemplate from './ChatList.hbs';
import './ChatList.scss';

import {OneChat} from './OneChat/OneChat';

/***
 * Chat list component
 */
export class ChatList {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
        this.__chatList = new Map();
    }

    /***
     * Get chat list
     * @returns {HTMLElement}
     * @private
     */
    __getChatList() {
        return document.getElementById('chat-list');
    }

    /***
     * Get chat list parent
     * @returns {HTMLElement}
     * @private
     */
    __getChatListContent() {
        return document.getElementById('chat-list-content');
    }

    /***
     * Add chat to list
     * @param {HTMLElement} parent - html element
     * @param {Object} chat - chat
     * @private
     */
    __addChat(parent, chat) {
        const oneChat = new OneChat(parent);
        oneChat.render(chat);
        this.__chatList.set(chat.chatID, oneChat);
    }

    /***
     * Add chats to list
     * @param {Object} data - chats
     * @private
     */
    __addChatList(data) {
        const list = this.__getChatListContent();

        data.forEach((el) => {
            this.__addChat(list, el);
        });
    }

    /***
     * Add new chat
     * @param {Object} data - new chat
     */
    addNewChat(data) {
        const list = this.__getChatListContent();
        this.__addChat(list, data);
    }

    updateLastData(chatID, data) {
        this.__chatList.get(chatID).updateChatDate(data.date);
        this.__chatList.get(chatID).updateChatMessage(data.text);
    }

    updateUnreadMessages(chatID, data) {
        this.__chatList.get(chatID).updateUnreadMessages(data.count);
    }

    /***
     * Select chat
     * @param {number} chatID
     */
    selectChat(chatID) {
        this.__chatList.get(chatID).selectChat();
    }

    /***
     * Unselect chat
     * @param {number} chatID
     */
    unselectChat(chatID) {
        this.__chatList.get(chatID).unselectChat();
    }

    /***
     * Add component listeners
     * @private
     */
    __addListeners() {
        this.__getChatList().addEventListener(this.__context.listeners.listClick.type, this.__context.listeners.listClick.listener);
    }

    /***
     * Remove component listeners
     * @private
     */
    __removeListeners() {
        this.__getChatList().removeEventListener(this.__context.listeners.listClick.type, this.__context.listeners.listClick.listener);
    }

    /***
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', chatListTemplate());
            this.__addListeners();

            this.__addChatList(this.__context.data);

            if (this.__context.selectNumber) {
                this.selectChat(this.__context.selectNumber);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}