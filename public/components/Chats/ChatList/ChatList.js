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
     * Add chats to list
     * @param {Object} data - chats
     * @private
     */
    __addChatList(data) {
        const list = this.__getChatListContent();

        data.forEach((el) => {
            const oneChat = new OneChat(list);
            oneChat.render(el);
        });
    }

    /***
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', chatListTemplate());
            this.__addChatList(this.__context.data);
        } catch (err) {
            console.log(err.message);
        }
    }
}