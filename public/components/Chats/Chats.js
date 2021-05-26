import chatsTemplate from './Chats.hbs';
import './Chats.scss';

import {ChatList} from './ChatList/ChatList';
import {ChatMessage} from './ChatMessage/ChatMessage';
import {EmptyChat} from './EmptyChat/EmptyChat';

import {sentryManager} from '../../modules/sentry';

/***
 * Chats component
 */
export class Chats {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Get chats
     * @returns {HTMLElement}
     * @private
     */
    __getChats() {
        return document.getElementById('chats');
    }

    /***
     * Get chats content
     * @returns {HTMLElement}
     * @private
     */
    __getChatsContent() {
        return document.getElementById('chats-content');
    }

    /***
     * Get chats list parent
     * @returns {HTMLElement}
     * @private
     */
    __getChatsList() {
        return document.getElementById('chats-content-list');
    }

    /***
     * Get chats list template
     * @returns {string}
     * @private
     */
    __getChatsListTemplate() {
        return '<div class="chats-list" id="chats-content-list"></div>';
    }

    /***
     * Get chats message parent
     * @returns {HTMLElement}
     * @private
     */
    __getChatsMessage() {
        return document.getElementById('chats-content-message');
    }

    /***
     * Get chats message template
     * @returns {string}
     * @private
     */
    __getChatsMessageTemplate() {
        return '<div class="chats-message" id="chats-content-message"></div>';
    }

    /***
     * Add new message
     * @param {Object} data - new message
     */
    addNewMessage(data) {
        this.__chatMessage.addNewMessage(data);
    }

    /***
     * Add chat message new message list
     * @param {Object} data - new message list
     */
    addNewMessageList(data) {
        this.__chatMessage.addNewMessageList(data);
    }

    /***
     * Rerender chat message
     * @param {Object} context - chat message context
     */
    rerenderChatMessage(context) {
        this.__getChatsMessage().remove();
        this.renderChatsMessage(context);
    }

    /***
     * Add new chat
     * @param {Object} data - new chat
     */
    addNewChat(data) {
        this.__chatList.addNewChat(data);
    }

    /***
     * Update chat list last date
     * @param {number} chatID - id chat
     * @param {Object} data - last message and last date
     */
    updateChatListLastDate(chatID, data) {
        this.__chatList.updateLastData(chatID, data);
    }

    /***
     * Update chat list unread messages
     * @param {number} chatID - id chat
     * @param {Object} data - count unread messages
     */
    updateChatListUnreadMessages(chatID, data) {
        this.__chatList.updateUnreadMessages(chatID, data);
    }

    /***
     * Delete chat list unread messages
     * @param {number} chatID - id chat
     */
    deleteChatListUnreadMessages(chatID) {
        this.__chatList.deleteUnreadMessages(chatID);
    }

    /***
     * Select chat
     * @param {number} chatID
     */
    selectChat(chatID) {
        this.__chatList.selectChat(chatID);
    }

    /***
     * Unselect chat
     * @param {number} chatID
     */
    unselectChat(chatID) {
        this.__chatList.unselectChat(chatID);
    }

    /***
     * Get chat message input
     * @returns {HTMLElement}
     */
    getChatMessageInput() {
        return this.__chatMessage.getInput();
    }

    /***
     * Get chat message body
     * @returns {HTMLElement}
     */
    getChatMessageBody() {
        return this.__chatMessage.getChatMessageBody();
    }

    /***
     * Render empty chat component
     */
    renderEmptyChat() {
        const emptyChat = new EmptyChat(this.__getChatsContent());
        emptyChat.render();
    }

    /***
     * Render chats list
     */
    renderChatsList(context) {
        this.__getChatsContent().insertAdjacentHTML('beforeend', this.__getChatsListTemplate());
        this.__chatList = new ChatList(this.__getChatsList());
        this.__chatList.render(context);
    }

    /***
     * Render chats message
     */
    renderChatsMessage(context) {
        this.__getChatsContent().insertAdjacentHTML('beforeend', this.__getChatsMessageTemplate());
        this.__chatMessage = new ChatMessage(this.__getChatsMessage());
        this.__chatMessage.render(context);
    }

    /***
     * Add component to parent
     * @param {Object} context - component context
     * @param {boolean} renderChatList - render chat list component
     * @param {boolean} renderChatMessage - render chat message component
     */
    render(context, renderChatList = true, renderChatMessage = true) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', chatsTemplate());

            if (Object.keys(this.__context.list.data).length === 0) {
                this.renderEmptyChat();
                return;
            }

            if (renderChatList) {
                this.renderChatsList(this.__context.list);
            }

            if (renderChatMessage) {
                this.renderChatsMessage(this.__context.message);
            }
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}