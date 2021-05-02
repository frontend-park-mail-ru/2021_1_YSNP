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
     * Add new message
     * @param {Object} data - new message
     */
    addNewMessage(data) {
        this.__chats.addNewMessage(data);
    }

    /***
     * Add new chat
     * @param {Object} data - new chat
     */
    addNewChat(data) {
        this.__chats.addNewChat(data);
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
        this.__chats.render(this.__context.chats);
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