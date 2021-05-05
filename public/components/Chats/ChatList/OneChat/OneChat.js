import oneChatTemplate from './OneChat.hbs';
import './OneChat.scss';

/***
 * One chat component
 */
export class OneChat {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
        this.__isUnread = false;
    }

    /***
     * Get one chat
     * @returns {HTMLElement}
     * @private
     */
    __getOneChat() {
        return document.getElementById(`one-chat-${this.__context.chatID}`);
    }

    /***
     * Get one chat last date
     * @returns {HTMLElement}
     * @private
     */
    __getOneChatDate() {
        return document.getElementById(`one-chat-${this.__context.chatID}-date`);
    }

    /***
     * Get one chat last message
     * @returns {HTMLElement}
     * @private
     */
    __getOneChatMessage() {
        return document.getElementById(`one-chat-${this.__context.chatID}-message`);
    }

    /***
     * Get chat unread
     * @returns {HTMLElement}
     * @private
     */
    __getOneChatUnread() {
        return document.getElementById(`one-chat-${this.__context.chatID}-unread`);
    }

    /***
     * Get chat unread count
     * @returns {HTMLElement}
     * @private
     */
    __getOneChatUnreadCount() {
        return document.getElementById(`one-chat-${this.__context.chatID}-unread-count`);
    }

    /***
     * Update one chat last date
     * @param {string} date - last date
     */
    updateChatDate(date) {
        this.__getOneChatDate().innerText = date;
    }

    /***
     * Update one chat last message
     * @param {string} message - last message
     */
    updateChatMessage(message) {
        this.__getOneChatMessage().innerText = message;
    }

    /***
     * Activate chat unread
     * @private
     */
    __activateChatUnread() {
        this.__isUnread = true;
        this.__getOneChatMessage().classList.add('one-chat-info-message__last_active');
        this.__getOneChatUnread().classList.add('one-chat-info-message-unread_active');
    }

    /***
     * Deactivate chat unread
     */
    deactivateChatUnread() {
        this.__isUnread = false;
        this.__getOneChatMessage().classList.remove('one-chat-info-message__last_active');
        this.__getOneChatUnread().classList.remove('one-chat-info-message-unread_active');
    }

    /***
     * Update unread messages
     * @param {number} count - unread messages count
     */
    updateUnreadMessages(count) {
        if (!this.__isUnread) {
            this.__activateChatUnread();
        }

        this.__getOneChatUnreadCount().innerText = count.toString();
    }

    /***
     * Select chat
     */
    selectChat() {
        this.__getOneChat().classList.add('one-chat_open');
    }

    /***
     * Unselect chat
     */
    unselectChat() {
        this.__getOneChat().classList.remove('one-chat_open');
    }

    /***
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;

            if (this.__context.isDown) {
                this.__parent.insertAdjacentHTML('beforeend', oneChatTemplate(this.__context));
            } else {
                this.__parent.insertAdjacentHTML('afterbegin', oneChatTemplate(this.__context));
            }

            if (this.__context.newMessages !== 0) {
                this.__activateChatUnread();
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}