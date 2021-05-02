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

            this.__parent.insertAdjacentHTML('afterbegin', oneChatTemplate(this.__context));
        } catch (err) {
            console.log(err.message);
        }
    }
}