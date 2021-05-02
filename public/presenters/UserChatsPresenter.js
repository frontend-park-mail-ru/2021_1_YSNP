import {BasePresenter} from './BasePresenter';
import {checkIsAuth} from '../modules/checkAuth';

import {ChatModel} from '../models/ChatModel';
import {router} from '../modules/router';
import {frontUrls} from '../modules/urls/frontUrls';
import {eventChatListHandler} from '../modules/handlers/eventHandler';

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

        this.__chatModel = new ChatModel();
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

        this.__checkChatView();
        this.__view.render(this.__makeContext());
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();
    }

    __checkChatView() {
        if (!this.__chatID) {
            return;
        }

        this.__chatModel.connect(this.__createCallbacks())
            .then(() => this.__chatModel.chatMessage(this.__chatID, this.__userModel.getData().id))
            .catch((err) => {
                console.log(err.message);
            });
    }

    __newMessageCallback(data) {
        console.log('presenter add new message', data);

        this.__view.addNewMessage(data);
    }

    __newMessageListCallback(data) {
        console.log('presenter add new message list', data);

        this.__view.addNewMessageList(data);
    }

    __createCallbacks() {
        return {
            newMessage: this.__newMessageCallback.bind(this),
            newMessageList: this.__newMessageListCallback.bind(this)
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

    __chatClick(id) {
        if (!id) {
            return;
        }

        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.userChat(numberId));
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
     * @returns {{profileSettings: {data: {isAuth: boolean, address, linkImage, surname, sex, latitude, name, telephone, dateBirth, radius, email, longitude}}, chats: {list: {data: [{date: string, img: string, name: string, message: string}, {date: string, img: string, name: string, message: string}, {date: string, img: string, name: string, message: string}, {date: string, img: string, name: string, message: string}, {date: string, img: string, name: string, message: string}, null, null]}, message: {data: {img: string, product: string, amount: number, name: string, messages: [{date: string, text: string, user: boolean}, {date: string, text: string, user: boolean}, {date: string, text: string, user: boolean}]}}}}}
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