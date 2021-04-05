import {BasePresenter} from './BasePresenter.js';
import {MainListModel} from '../models/MainListModel.js';

import {router} from '../modules/router';
import {frontUrls} from '../modules/frontUrls';

import {eventProductListHandler} from '../modules/eventHandler.js';

import {EndlessScroll} from '../modules/endlessScroll.js';
import {PageUpHandler} from '../modules/pageUpHandler.js';

/***
 * Main presenter
 */
export class MainPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {MainView} view - view
     */
    constructor(view) {
        super(view);
        this.__view = view;
        this.__mainListModel = new MainListModel();
        this.__endlessScroll = new EndlessScroll(this.__createListeners().scroll);
        this.__pageUp = new PageUpHandler();
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        return super.update()
            .then(() => this.__mainListModel.update())
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

        this.__view.removeProductListListeners();

        this.__endlessScroll.remove();
        this.__pageUp.remove();
    }

    /***
     * Product List click event
     * @param {MouseEvent} ev - event
     */
    __listenerMainListClick(ev) {
        eventProductListHandler(ev, this.__getActions().mainList);
    }

    /***
     * Listener on scroll end
     * @returns {Promise<void>}
     * @private
     */
    __scrollEnd() {
        this.__mainListModel.updateNewData()
            .then(() => {
                this.__view.addNewCards(this.__mainListModel.newData);
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
            });
    }

    /***
     * Get view listeners
     * @returns {{scroll: {scrollEnd: any}, mainList: {productCardClick: {listener: *, type: string}}}}
     * @private
     */
    __createListeners() {
        return {
            mainList: {
                productCardClick: {
                    type: 'click',
                    listener: this.__listenerMainListClick.bind(this)
                }
            },
            scroll: {
                scrollEnd: this.__scrollEnd.bind(this)
            }
        };
    }

    /***
     * Like card callback
     * @param {string} id - product card id
     * @private
     */
    __likeCard(id) {
        // TODO(Sergey) release __likeCard

        const numberId = parseInt(id, 10);
        this.__view.likeProduct(numberId);
    }

    /***
     * Open card callback
     * @param {string} id - product card id
     * @private
     */
    __openCard(id) {
        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.product(numberId));
    }

    /***
     * Get product list actions
     * @returns {{mainList: {likeClick: {open: *}, cardClick: {open: *}}}}
     * @private
     */
    __getActions() {
        return {
            mainList: {
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
     * Make view context
     * @returns {{mainList: {data: Object[], listeners: {productCardClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            mainList: {
                data: this.__mainListModel.getData(),
                listeners: this.__createListeners().mainList
            }
        };
    }
}