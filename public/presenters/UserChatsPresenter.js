import {BasePresenter} from './BasePresenter';
import {checkIsAuth} from '../modules/checkAuth';

/***
 * User chats presenter
 */
export class UserChatsPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {UserChatsView} view
     */
    constructor(view) {
        super(view);
        this.__view = view;
    }

    /***
     * Update view data
     * @returns {Promise<{data: *, status: number}>}
     */
    async update() {
        return super.update()
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

        // checkIsAuth();

        this.__view.render(this.__makeContext());

        this.__view.selectChat(1);
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();
    }

    /***
     * Listener chat list click
     * @param {MouseEvent} ev
     * @private
     */
    __listenerChatListClick(ev) {
        console.log('list click', ev);

        this.__view.addNewChat({
            chatID: 1,
            img: '/img/profile.webp',
            name: 'Вы пытались позвонить Вы',
            date: '22.09.2000',
            message: 'Вы пытались позвонить Вы пытались позвонить'
        });
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

        this.__view.addNewMessage({
            user: false,
            text: 'Смартфон Apple ',
            date: '22.09.2000'
        });
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

    /***
     * Get actions
     * @returns {{}}
     * @private
     */
    __getActions() {
        return {};
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
                    data: [
                        {
                            chatID: 1,
                            img: '/img/search-background.webp',
                            name: 'Вы пытались позвонить Вы',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить Вы пытались позвонить'
                        },
                        {
                            chatID: 2,
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        },
                        {
                            chatID: 3,
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        },
                        {
                            chatID: 4,
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        },
                        {
                            chatID: 5,
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        },
                        {
                            chatID: 6,
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        },
                        {
                            chatID: 7,
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        }
                    ],
                    listeners: this.__createListeners().list
                },
                message: {
                    data: {
                        img: '/img/search-background.webp',
                        name: 'Евгений С. Евгений С. ЕвгенийЕвгенийЕвгенийЕвгенийЕвгений ',
                        product: 'Смартфон Apple Iphone 11 Смартфон Apple Iphone 11 Смартфон Apple Iphone 11 Смартфон Apple Iphone 11',
                        amount: 500001232132131230,
                        messages: [
                            {
                                user: false,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: false,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: false,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: true,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: true,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: false,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: false,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: true,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: false,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: true,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: false,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            },
                            {
                                user: false,
                                text: 'Смартфон Apple ',
                                date: '22.09.2000'
                            }
                        ]
                    },
                    listeners: this.__createListeners().message
                }
            },
            profileSettings: {
                data: this.__userModel.getData()
            }
        };
    }
}