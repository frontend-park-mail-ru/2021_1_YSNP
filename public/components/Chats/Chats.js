import chatsTemplate from './Chats.hbs';
import './Chats.scss';

import {ChatList} from './ChatList/ChatList';
import {ChatMessage} from './ChatMessage/ChatMessage';
import {mobile} from '../../modules/mobile';

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

    addNewMessageList(data) {
        this.__chatMessage.addNewMessageList(data);
    }

    /***
     * Add new chat
     * @param {Object} data - new chat
     */
    addNewChat(data) {
        this.__chatList.addNewChat(data);
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

    getChatMessageInput() {
        return this.__chatMessage.getInput();
    }

    /***
     * Render chats list
     */
    renderChatsList() {
        this.__getChatsContent().insertAdjacentHTML('beforeend', this.__getChatsListTemplate());
        this.__chatList = new ChatList(this.__getChatsList());
        this.__chatList.render(this.__context.list);
    }

    /***
     * Render chats message
     */
    renderChatsMessage() {
        this.__getChatsContent().insertAdjacentHTML('beforeend', this.__getChatsMessageTemplate());
        this.__chatMessage = new ChatMessage(this.__getChatsMessage());
        this.__chatMessage.render(this.__context.message);
    }

    /***
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', chatsTemplate());

            this.renderChatsList();
            if (!mobile.isMobile()) {
                this.renderChatsMessage();
            }

        } catch (err) {
            console.log(err.message);
        }
    }
}