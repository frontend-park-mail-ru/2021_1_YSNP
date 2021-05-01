import chatsTemplate from './Chats.hbs';
import './Chats.scss';

import {ChatList} from './ChatList/ChatList';
import {ChatMessage} from './ChatMessage/ChatMessage';

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
     * Get chats list parent
     * @returns {HTMLElement}
     * @private
     */
    __getChatsList() {
        return document.getElementById('chats-content-list');
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
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', chatsTemplate());

            this.__chatList = new ChatList(this.__getChatsList());
            this.__chatList.render(this.__context.list);

            this.__chatMessage = new ChatMessage(this.__getChatsMessage());
            this.__chatMessage.render(this.__context.message);

        } catch (err) {
            console.log(err.message);
        }
    }
}