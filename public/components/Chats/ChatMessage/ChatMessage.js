import chatMessageTemplate from './ChatMessage.hbs';
import './ChatMessage.scss';

import {OneUserMessage} from './OneUserMessage/OneUserMessage';
import {OneOwnerMessage} from './OneOwnerMessage/OneOwnerMessage';

/***
 * Chat message component
 */
export class ChatMessage {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Get chat message parent
     * @returns {HTMLElement}
     * @private
     */
    __getChatMessageContent() {
        return document.getElementById('chat-message-content');
    }

    /***
     * Add chats to message
     * @param {Object} data - messages
     * @private
     */
    __addChatMessage(data) {
        const list = this.__getChatMessageContent();

        data.forEach((el) => {
            if (el.user) {
                const oneChat = new OneOwnerMessage(list);
                oneChat.render(el);
            } else {
                const oneChat = new OneUserMessage(list);
                oneChat.render(el);
            }
        });
    }

    /***
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', chatMessageTemplate(this.__context.data));
            this.__addChatMessage(this.__context.data.messages);
        } catch (err) {
            console.log(err.message);
        }
    }
}