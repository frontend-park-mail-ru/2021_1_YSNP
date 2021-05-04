import {BasePresenter} from './BasePresenter.js';
import {MainListModel} from '../models/MainListModel.js';

import {router} from '../modules/router';
import {frontUrls} from '../modules/urls/frontUrls';

import {eventProductListHandler, eventHandlerWithDataType} from '../modules/handlers/eventHandler.js';

import {EndlessScroll} from '../modules/handlers/endlessScroll.js';
import {PageUpHandler} from '../modules/handlers/pageUpHandler.js';

import {customSessionStorage} from '../modules/customSessionStorage.js';
import {CreateButtonHandler} from '../modules/handlers/createButtonHandler';

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
        this.__createButton = new CreateButtonHandler(this.openCreateProduct.bind(this));
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
                this.checkOfflineStatus(err);
            });
    }

    /***
     * Control view
     * @returns {Promise<void>}
     */
    async control() {
        await this.update();
        this.scrollUp();
        if (this.checkOffline()) {
            return;
        }

        this.__view.render(this.__makeContext());
        this.__endlessScroll.start();
        this.__pageUp.start();
        this.__createButton.start();
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__endlessScroll.remove();
        this.__pageUp.remove();
        this.__createButton.remove();
    }

    /***
     * Product List click event
     * @param {MouseEvent} ev - event
     */
    __listenerMainListClick(ev) {
        ev.stopPropagation();
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
                const newData = this.__mainListModel.newData;
                if (newData.length === 0) {
                    this.__endlessScroll.remove();
                    return;
                }

                this.__view.addNewCards(newData);
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * Header click listener
     * @param {MouseEvent} ev - event
     * @param {string} dataType
     * @param {Object} actions
     * @private
     * @this {MainPresenter}
     */
    __listenerSearchClick(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
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
            search: {
                searchClick: {
                    type: 'click',
                    listener: this.__listenerSearchClick.bind(this, 'action', this.__getActions().search)
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
        const numberId = parseInt(id, 10);

        if (!this.__userModel.isAuth) {
            super.openAuth();
            return;
        }

        this.__mainListModel.voteProduct(numberId)
            .then(({status}) => {
                if (status === 'dislike') {
                    this.__view.dislikeProduct(numberId);
                    return;
                }

                this.__view.likeProduct(numberId);
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);

                this.checkOfflineStatus(err);
                this.checkOffline();
            });
    }

    /***
     * Open card callback
     * @param {string} id - product card id
     * @private
     */
    __openCard(id) {
        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.product(numberId), '', {title: 'Koya'});
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
            },
            search: {
                searchButtonClick: {
                    open: this.__searchButton.bind(this)
                },
                categoryClick: {
                    open: this.__categoryClick.bind(this)
                }
            }
        };
    }

    /***
     * click to subcategory
     * @param{Event} ev
     * @private
     */
    __categoryClick(ev) {
        customSessionStorage.set('category', ev.target.innerText);

        router.redirect(frontUrls.search, '', {title: 'Koya'});
    }

    /***
     * Click to search button
     * @private
     */
    __searchButton() {
        customSessionStorage.set('category', '');
        const val = this.__view.getTextFromSearch();
        if (val !== '') {
            router.redirect(frontUrls.searchWithText(val), '', {title: 'Koya'});
            return;
        }

        router.redirect(frontUrls.search, '', {title: 'Koya'});
    }

    /***
     * Make view context
     * @returns {{mainList: {data: Object[], listeners: {productCardClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            search: {
                data: null,
                listeners: this.__createListeners().search
            },
            mainList: {
                data: this.__mainListModel.getData(),
                listeners: this.__createListeners().mainList
            }
        };
    }
}