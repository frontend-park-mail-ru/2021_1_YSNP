import {BasePresenter} from './BasePresenter.js';
import {EndlessScroll} from '../modules/handlers/endlessScroll.js';
import {PageUpHandler} from '../modules/handlers/pageUpHandler.js';

import {AchievementsModel} from '../models/AchievementsModel';
import {user} from '../models/ProfileUserModel';
import {UserModel} from '../models/UserModel';

/***
 * favorite presenter
 */
export class UserAchievementPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param view
     */
    constructor(view, id) {
        super(view);
        this.__view = view;
        this.__achievementsModel = new AchievementsModel();
        this.__endlessScroll = new EndlessScroll(this.__createListeners().scroll);
        this.__pageUp = new PageUpHandler();
        this.__userID = id;
        this.__userInfo = new UserModel();
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {

        return super.update()
            .then(() => this.__userInfo.getUser(this.__userID))
            .catch((err) => {
                console.log(err);
            })
            .then(() => this.__achievementsModel.update(this.__userID, user.getData().id))
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
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
        this.__pageUp.start();

        this.checkScrollOffset();
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__endlessScroll.remove();
        this.__pageUp.remove();

        this.__view.removePage();
    }

    /***
     * Listener on scroll end
     * @returns {Promise<void>}
     * @private
     */
    __scrollEnd() {
        this.__favoriteListModel.updateNewData()
            .then(() => {
                const newData = this.__favoriteListModel.newData;
                if (newData.length === 0) {
                    this.__endlessScroll.remove();
                    return;
                }

                this.__view.addNewCards(newData);
            })
            .catch((err) => {
                if (err.message === 'isUpdate') {
                    return;
                }

                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
            });
    }

    /***
     * Get view listeners
     * @returns {{favoriteList: {productCardClick: {listener: *, type: string}}, scroll: {scrollEnd: any}}}
     * @private
     */
    __createListeners() {
        return {
            scroll: {
                scrollEnd: this.__scrollEnd.bind(this)
            }
        };
    }

    /***
     * Get view context
     * @returns {{profileSettings: {data: {linkImage: (*|null), surname: (Object.surname|string|*), sex: (Object.sex|string|*), name: (Object.name|string|*), telephone: (Object.telephone|string|*), dateBirth: (Object.dateBirth|string|*), email: (Object.email|string|*)}}, favoriteList: {data: Object[], listeners: {productCardClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            achievementList: {
                data: this.__achievementsModel.getData(),
                listeners: null
            },
            profileSettings: {
                data: this.__userInfo.getData(),
                owner: this.__userInfo.getData().id === this.__userModel.getData().id
            }
        };
    }
}