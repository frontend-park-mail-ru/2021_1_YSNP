import {BasePresenter} from './BasePresenter';

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

        this.__view.render(this.__makeContext());
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();
    }

    /***
     * Create listeners
     * @returns {{}}
     * @private
     */
    __createListeners() {
        return {};
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
                            img: '/img/search-background.webp',
                            name: 'Вы пытались позвонить Вы',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить Вы пытались позвонить'
                        },
                        {
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        },
                        {
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        },
                        {
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        },
                        {
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        },
                        {
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        },
                        {
                            img: '/img/search-background.webp',
                            name: 'Евгений С.',
                            date: '22.09.2000',
                            message: 'Вы пытались позвонить'
                        }
                    ]
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
                            }
                        ]
                    }
                }
            },
            profileSettings: {
                data: this.__userModel.getData()
            }
        };
    }
}