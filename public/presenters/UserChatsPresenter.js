import {BasePresenter} from './BasePresenter';
import {checkIsAuth} from '../modules/checkAuth';

import {ChatModel} from '../models/ChatModel';
import {router} from '../modules/router';
import {frontUrls} from '../modules/urls/frontUrls';
import {eventChatListHandler} from '../modules/handlers/eventHandler';
import {NotFoundError} from '../modules/http/httpError';

/***
 * User chats presenter
 */
export class UserChatsPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {UserChatsView} view
     * @param {number} chatID
     */
    constructor(view, chatID = undefined) {
        super(view);
        this.__view = view;
        this.__chatID = parseInt(chatID, 10);
        this.__notFoundChat = false;

        this.__chatModel = new ChatModel(this.__userModel.getData().id, this.__createCallbacks());
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        return super.update()
            .then(() => this.__chatModel.chatList())
            .catch((err) => {
                //TODO(Serge) нормальная обработка ошибок
                console.log(err.message);
                this.checkOfflineStatus(err);
            });
    }

    /***
     * Control view
     * @returns {Promise<void>}
     */
    async control() {
        await this.update();
        if (!this.isRenderView()) {
            return;
        }

        checkIsAuth();

        await this.__checkChatView();

        if (this.__notFoundChat) {
            this.__chatID = undefined;
            router.replaceState(frontUrls.userChats);
        }

        this.__view.render(this.__makeContext());
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__chatModel.close();
    }

    async __checkChatView() {
        if (!this.__chatID) {
            return Promise.resolve();
        }

        return this.__chatModel.connect()
            .then(() => this.__chatModel.chatMessage(this.__chatID))
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);

                this.checkOfflineStatus(err);
                this.checkOffline();

                if (err instanceof NotFoundError) {
                    this.__notFoundChat = true;
                }
            });
    }

    __chatMessageNewMessageCallback(chatID, data) {
        console.log('presenter add new message', data);

        if (chatID === this.__chatModel.getChatMessageData().chatID) {
            this.__chatMessageNewMessage(data);
            this.__chatListUpdateLastDate(chatID, data);
            return;
        }

        if (this.__chatModel.getChatListOneChatData(chatID)) {
            this.__chatListUpdateUnreadMessages(chatID);
            return;
        }

        this.__chatListAddNewChat(chatID);
    }

    __chatMessageNewMessage(data) {
        console.log('presenter new message', data);

        this.__view.addNewMessage(data);
    }

    __chatListUpdateLastDate(chatID, data) {
        console.log('presenter last date', chatID, data);

        this.__chatModel.updateChatListLastDate(chatID, data);
        this.__view.updateChatLastDate(chatID, data);
    }

    __chatListUpdateUnreadMessages(chatID) {
        console.log('presenter unread messages', chatID);

        const count = this.__chatModel.updateChatListUnreadMessages(chatID);
        this.__view.updateChatUnreadMessages(chatID, {count: count});
    }

    __chatListAddNewChat(chatID) {
        console.log('presenter new chat', chatID);

        this.__chatModel.chatListNewChat(chatID)
            .then((data) => {
                this.__view.addNewChat(data);
            }).catch((err) => {
            //TODO(Sergey) нормальная обработка ошибок
            console.log(err.message);

            this.checkOfflineStatus(err);
            this.checkOffline();
        });
    }

    __chatMessageNewMessageListCallback(data) {
        console.log('presenter add new message list', data);

        this.__view.addNewMessageList(data);
    }

    __createCallbacks() {
        return {
            chatMessageNewMessage: this.__chatMessageNewMessageCallback.bind(this),
            chatMessageNewMessageList: this.__chatMessageNewMessageListCallback.bind(this)
        };
    }

    /***
     * Listener chat list click
     * @param {MouseEvent} ev
     * @private
     */
    __listenerChatListClick(ev) {
        eventChatListHandler(ev, this.__getActions().chats.list);
    }

    /***
     * Listener chat message click
     * @param {MouseEvent} ev
     * @private
     */
    __listenerChatMessageClick(ev) {
        console.log('message click', ev);
    }

    /***
     * Listener chat message submit
     * @param {MouseEvent} ev
     * @private
     */
    __listenerChatMessageSubmit(ev) {
        ev.preventDefault();

        console.log('message submit', ev);

        const input = this.__view.getChatMessageInput();
        this.__chatModel.createMessage(input.value);
        input.value = '';
    }

    /***
     * Create listeners
     * @returns {{}}
     * @private
     */
    __createListeners() {
        return {
            list: {
                listClick: {
                    type: 'click',
                    listener: this.__listenerChatListClick.bind(this)
                }
            },
            message: {
                messageClick: {
                    type: 'click',
                    listener: this.__listenerChatMessageClick.bind(this)
                },
                submitForm: {
                    type: 'submit',
                    listener: this.__listenerChatMessageSubmit.bind(this)
                }
            }
        };
    }

    async __chatClick(id) {
        const numberId = parseInt(id, 10);
        if (!numberId || this.__chatID === numberId) {
            return;
        }

        if (!isNaN(this.__chatID)) {
            this.__view.unselectChat(this.__chatID);
        }

        this.__chatID = numberId;
        router.replaceState(frontUrls.userChat(this.__chatID));

        await this.__checkChatView();
        this.__view.rerenderChatMessage(this.__makeContext().chats.message);
        this.__view.selectChat(this.__chatID);
    }

    /***
     * Get actions
     * @returns {{}}
     * @private
     */
    __getActions() {
        return {
            chats: {
                list: {
                    chatClick: {
                        open: this.__chatClick.bind(this)
                    }
                }
            }
        };
    }

    /***
     * Make view context
     * @returns {{profileSettings: {data: {isAuth: boolean, address, linkImage, surname, sex, latitude, name, telephone, dateBirth, radius, email, longitude}}, chats: {list: {data: [], listeners: *, selectNumber: number}, message: {data: {}, listeners}}}}
     * @private
     */
    __makeContext() {
        return {
            chats: {
                list: {
                    selectNumber: this.__chatID,
                    data: this.__chatModel.getChatListData(),
                    listeners: this.__createListeners().list
                },
                message: {
                    data: this.__chatModel.getChatMessageData(),
                    listeners: this.__createListeners().message
                }
            },
            profileSettings: {
                data: this.__userModel.getData()
            }
        };
    }
}