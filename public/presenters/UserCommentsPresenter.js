import {BasePresenter} from './BasePresenter.js';

import {EndlessScroll} from '../modules/handlers/endlessScroll.js';

import {sentryManager} from '../modules/sentry';
import {user} from '../models/ProfileUserModel.js';

/***
 * Comments presenter
 */
export class UserCommentsPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param view
     * @param id - user id
     */
    constructor(view, id) {
        super(view);
        this.__view = view;
        this.__endlessScroll = new EndlessScroll(this.__createListeners().scroll);
        this.__userID = id;
        this.__user = user;
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        return super.update()
            .then(() => this.__userModel.getUserMinInfo(this.__userID))
            .then((data) => {
                this.__userInfo = data;
            })
            .catch((err) => {
                sentryManager.captureException(err);
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
        if (this.checkOffline()) {
            return;
        }
        this.__view.render(this.__makeContext());
        this.__endlessScroll.start();

        this.checkScrollOffset();
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__endlessScroll.remove();

        this.__view.removePage();
    }


    /***
     * Listener on scroll end
     * @returns {Promise<void>}
     * @private
     */
    __scrollEnd() {
        this.__adListModel.updateNewData()
            .then(() => {
                // const newData = this.__adListModel.newData;
                // if (newData.length === 0) {
                //     this.__endlessScroll.remove();
                //     return;
                // }
                //
                // this.__view.addNewCards(newData);
            })
            .catch((err) => {
                if (err.message === 'isUpdate') {
                    return;
                }

                //TODO(Sergey) нормальная обработка ошибок

                sentryManager.captureException(err);
                console.log(err.message);

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /***
     * Get view listeners
     * @returns {{comments: {}, scroll: {scrollEnd: any}}}
     * @private
     */
    __createListeners() {
        return {
            comments: {

            },
            scroll: {
                scrollEnd: this.__scrollEnd.bind(this)
            }
        };
    }


    /***
     * Get presenter actions
     * @returns {{adList: {cardClick: {open: *}}}}
     * @private
     */
    __getActions() {
        return {

        };
    }

    renderData() {
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                commentID: i,
                userName: 'User Name',
                productName: 'Product name',
                date: '2 march 2020',
                productImg: './img',
                userImg: './img',
                text: 'New comment, such ag good text. Good product.',
                rate: 4
            });
        }
    }


    /***
     * Get view context
     * @returns {any}
     * @private
     */
    __makeContext() {
        return {
            comments: {
                data: 'заглушка',
                listeners: this.__createListeners().comments
            },
            profileSettings: {
                data: this.__userInfo,
                owner: this.__userInfo.id === this.__user.getData().id
            }
        };
    }
}