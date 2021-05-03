import {BaseView} from './BaseView';
import {Layout} from '../components/Layout/Layout';

import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu';
import {Chats} from '../components/Chats/Chats';

import {mobile} from '../modules/mobile';

/***
 * User chats view
 */
export class UserChatsView extends BaseView {
    /***
     * Make view context
     * @param {Object} context - view context
     * @private
     */
    __makeContext(context) {
        this.__context = context;
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Сообщения';
    }

    /***
     * Add chat message new message
     * @param {Object} data - new message
     */
    addNewMessage(data) {
        this.__chats.addNewMessage(data);
    }

    /***
     * Add chat message new message list
     * @param {Object} data - new message list
     */
    addNewMessageList(data) {
        this.__chats.addNewMessageList(data);
    }

    /***
     * Get chat message input
     * @returns {HTMLElement}
     */
    getChatMessageInput() {
        return this.__chats.getChatMessageInput();
    }

    /***
     * Get chat message body
     * @returns {HTMLElement}
     */
    getChatMessageBody() {
        return this.__chats.getChatMessageBody();
    }

    /***
     * Rerender chat message component
     * @param {Object} context - new chat message
     */
    rerenderChatMessage(context) {
        this.__chats.rerenderChatMessage(context);
    }

    /***
     * Add new chat
     * @param {Object} data - new chat
     */
    addNewChat(data) {
        this.__chats.addNewChat(data);
    }

    /***
     * Update chat list last date
     * @param {number} chatID
     * @param {Object} data - last date and last message
     */
    updateChatLastDate(chatID, data) {
        this.__chats.updateChatListLastDate(chatID, data);
    }

    /***
     * Update chat list unread messages
     * @param {number} chatID - id chat
     * @param {Object} data - count unread messages
     */
    updateChatUnreadMessages(chatID, data) {
        this.__chats.updateChatListUnreadMessages(chatID, data);
    }

    /***
     * Delete chat list unread messages
     * @param {number} chatID - id chat
     */
    deleteChatUnreadMessages(chatID) {
        this.__chats.deleteChatListUnreadMessages(chatID);
    }

    /***
     * Select chat
     * @param {number} chatID
     */
    selectChat(chatID) {
        this.__chats.selectChat(chatID);
    }

    /***
     * Unselect chat
     * @param {number} chatID
     */
    unselectChat(chatID) {
        this.__chats.unselectChat(chatID);
    }

    /***
     * Render mobile components
     * @private
     */
    __renderMobile() {
        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        this.__chats = new Chats(parent);
        if (!isNaN(this.__context.chats.chatID)) {
            this.__chats.render(this.__context.chats, false, true);
            return;
        }

        this.__chats.render(this.__context.chats, true, false);
    }

    /***
     * Render desktop components
     * @private
     */
    __renderDesktop() {
        const layout = new Layout(this.__app, true);
        layout.render({layoutCount: 'two'});

        const left = layout.leftParent;
        const right = layout.rightParent;

        const profileMenu = new ProfileMenu(left, {page: 'favorites'});
        profileMenu.render(this.__context.profileSettings);

        this.__chats = new Chats(right);
        this.__chats.render(this.__context.chats);
    }

    /***
     * Render view
     * @param {Object} context - view context
     */
    async render(context) {
        this.__makeContext(context);
        super.render();

        if (mobile.isMobile()) {
            this.__renderMobile();
        } else {
            this.__renderDesktop();
        }

        super.renderFooter();
    }
}