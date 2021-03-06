import chatMessageTemplate from './ChatMessage.hbs';
import './ChatMessage.scss';

import {OneUserMessage} from './OneUserMessage/OneUserMessage';
import {OneOwnerMessage} from './OneOwnerMessage/OneOwnerMessage';
import {EmptyChatMessage} from './EmptyChatMessage/EmptyChatMessage';

import {sentryManager} from '../../../modules/sentry';

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
     * Get chat message
     * @returns {HTMLElement}
     * @private
     */
    __getChatMessage() {
        return document.getElementById('chat-message');
    }

    /***
     * Get chat message body
     * @returns {HTMLElement}
     */
    getChatMessageBody() {
        return document.getElementById('chat-message-body');
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
     * Get chat message form parent
     * @returns {HTMLElement}
     * @private
     */
    __getChatMessageForm() {
        return document.getElementById('chat-message-form');
    }

    /***
     * Scroll to last message
     * @private
     */
    __scrollEnd() {
        this.getChatMessageBody().scrollTo(0, this.__getChatMessageContent().scrollHeight);
    }

    /***
     * Add message
     * @param {HTMLElement} parent - html element
     * @param {Object} msg - message
     * @private
     */
    __addMessage(parent, msg) {
        if (msg.isUser) {
            const oneChat = new OneUserMessage(parent);
            oneChat.render(msg);
        } else {
            const oneChat = new OneOwnerMessage(parent);
            oneChat.render(msg);
        }
    }

    /***
     * Add new message
     * @param {Object} data - new message
     */
    addNewMessage(data) {
        const list = this.__getChatMessageContent();

        this.__addMessage(list, data);
        this.__scrollEnd();
    }

    /***
     * Add chats to message
     * @param {Object} data - messages
     */
    addNewMessageList(data) {
        const list = this.__getChatMessageContent();

        data.messages.forEach((el) => {
            this.__addMessage(list, el);
        });

        if (data.isScrollDown) {
            this.__scrollEnd();
        }
    }

    /***
     * Get input
     * @returns {HTMLElement}
     */
    getInput() {
        return document.getElementById('chat-message-input');
    }

    /***
     * Add component listeners
     * @private
     */
    __addListeners() {
        // this.__getChatMessage().addEventListener(this.__context.listeners.messageClick.type, this.__context.listeners.messageClick.listener);

        this.__getChatMessageForm().addEventListener(this.__context.listeners.submitForm.type, this.__context.listeners.submitForm.listener);
    }

    /***
     * Remove component listeners
     * @private
     */
    __removeListeners() {
        // this.__getChatMessage().removeEventListener(this.__context.listeners.messageClick.type, this.__context.listeners.messageClick.listener);

        this.__getChatMessageForm().removeEventListener(this.__context.listeners.submitForm.type, this.__context.listeners.submitForm.listener);
    }

    /***
     * Render empty chat message
     * @private
     */
    __renderEmptyChatMessage() {
        const emptyChatMessage = new EmptyChatMessage(this.__parent);
        emptyChatMessage.render();
    }

    /***
     * Render chat message
     * @param {Object} context - component context
     * @private
     */
    __renderChatMessage(context) {
        this.__parent.insertAdjacentHTML('beforeend', chatMessageTemplate(context));
        this.__addListeners();
    }

    /***
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;

            if (isNaN(this.__context.chatID)) {
                this.__renderEmptyChatMessage();
                return;
            }

            this.__renderChatMessage(this.__context.data);
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}