import {BasePresenter} from './BasePresenter.js';
import {FavoriteListModel} from '../models/FavoriteListModel.js';

import {EndlessScroll} from '../modules/endlessScroll.js';
import {PageUpHandler} from '../modules/pageUpHandler.js';

import {router} from '../modules/router';
import {frontUrls} from '../modules/frontUrls';

import {eventProductListHandler} from '../modules/eventHandler.js';

/***
 * favorite presenter
 */
export class UserFavoritePresenter extends BasePresenter {
    /***
     * Class constructor
     * @param view
     */
    constructor(view) {
        super(view);
        this.__view = view;
        this.__favoriteListModel = new FavoriteListModel();
        this.__endlessScroll = new EndlessScroll(this.__createListeners().scroll);
        this.__pageUp = new PageUpHandler();
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        return super.update()
            .then(() => this.__favoriteListModel.update())
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
            });
    }

    /***
     * Control view
     * @returns {Promise<void>}
     */
    async control() {
        await this.update();

        this.__view.render(this.__makeContext());
        this.__endlessScroll.start();
        this.__pageUp.start();
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__endlessScroll.remove();
        this.__pageUp.remove();
    }

    /***
     * Product List click event
     * @param {MouseEvent} ev
     * @private
     */
    __listenerFavoriteListClick(ev) {
        eventProductListHandler(ev, this.__getActions().favoriteList);
    }

    /***
     * Listener on scroll end
     * @returns {Promise<void>}
     * @private
     */
    __scrollEnd() {
        this.__favoriteListModel.updateNewData()
            .then(() => {
                const newData = this.__mainListModel.newData;
                if (newData.length === 0) {
                    this.__endlessScroll.remove();
                }

                this.__view.addNewCards(newData);
            })
            .catch((err) => {
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
            favoriteList: {
                productCardClick: {
                    type: 'click',
                    listener: this.__listenerFavoriteListClick.bind(this)
                }
            },
            scroll: {
                scrollEnd: this.__scrollEnd.bind(this)
            }
        };
    }

    /***
     *  Like card callback
     * @param {string} id - card id
     * @private
     */
    __likeCard(id) {
        const numberId = parseInt(id, 10);
        this.__favoriteListModel.voteProduct(numberId)
            .then(() => {
                router.redirect(frontUrls.userFavorite);
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
            });
    }

    /***
     * Open card callback
     * @param {string} id - card id
     * @private
     */
    __openCard(id) {
        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.product(numberId), '', {title: 'Избранное'});
    }

    /***
     * Get presenter actions
     * @returns {{favoriteList: {likeClick: {open: *}, cardClick: {open: *}}}}
     * @private
     */
    __getActions() {
        return {
            favoriteList: {
                cardClick: {
                    open: this.__openCard.bind(this)
                },
                likeClick: {
                    open: this.__likeCard.bind(this)
                }
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
            favoriteList: {
                data: this.__favoriteListModel.getData(),
                listeners: this.__createListeners().favoriteList
            },
            profileSettings: {
                data: this.__userModel.getData()
            }
        };
    }
}