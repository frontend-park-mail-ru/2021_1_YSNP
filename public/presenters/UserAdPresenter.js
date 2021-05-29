import {BasePresenter} from './BasePresenter.js';

import {AdListModel} from '../models/AdListModel.js';

import {eventProductListHandler} from '../modules/handlers/eventHandler.js';
import {EndlessScroll} from '../modules/handlers/endlessScroll.js';
import {PageUpHandler} from '../modules/handlers/pageUpHandler.js';
import {checkIsAuth} from '../modules/checkAuth';
import {NotFoundError, UnauthorizedError} from '../modules/http/httpError';

import {router} from '../modules/router';

import {frontUrls} from '../modules/urls/frontUrls';
import {sentryManager} from '../modules/sentry';

/***
 * favorite presenter
 */
export class UserAdPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param view
     */
    constructor(view) {
        super(view);
        this.__view = view;
        this.__adListModel = new AdListModel();
        this.__endlessScroll = new EndlessScroll(this.__createListeners().scroll);
        this.__pageUp = new PageUpHandler();
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        return super.update()
            .then(() => this.__adListModel.update())
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                if (!UnauthorizedError.isError(err)) {
                    sentryManager.captureException(err);
                }

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

        if (!checkIsAuth()) {
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
     * Product List click event
     * @param {MouseEvent} ev
     * @private
     */
    __listenerAdListClick(ev) {
        eventProductListHandler(ev, this.__getActions().adList);
    }

    /***
     * Listener on scroll end
     * @returns {Promise<void>}
     * @private
     */
    __scrollEnd() {
        this.__adListModel.updateNewData()
            .then(() => {
                const newData = this.__adListModel.newData;
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
                if (!NotFoundError.isError(err)) {
                    sentryManager.captureException(err);
                }

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /***
     * Get view listeners
     * @returns {{scroll: {scrollEnd: any}, adList: {productCardClick: {listener: *, type: string}}}}
     * @private
     */
    __createListeners() {
        return {
            adList: {
                productCardClick: {
                    type: 'click',
                    listener: this.__listenerAdListClick.bind(this)
                }
            },
            scroll: {
                scrollEnd: this.__scrollEnd.bind(this)
            }
        };
    }

    /***
     * Open card callback
     * @param {string} id - card id
     * @private
     */
    __openCard(id) {
        this.saveScrollOffset();
        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.product(numberId), '', {title: 'Мои объявления'});
    }

    /***
     * Get presenter actions
     * @returns {{adList: {cardClick: {open: *}}}}
     * @private
     */
    __getActions() {
        return {
            adList: {
                cardClick: {
                    open: this.__openCard.bind(this)
                }
            }
        };
    }

    /***
     * Get view context
     * @returns {any}
     * @private
     */
    __makeContext() {
        return {
            adList: {
                data: this.__adListModel.getData(),
                listeners: this.__createListeners().adList
            },
            profileSettings: {
                data: this.__userModel.getData(),
                owner: true
            }
        };
    }
}