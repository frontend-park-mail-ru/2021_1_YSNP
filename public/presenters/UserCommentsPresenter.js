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
        this.__endlessScrollSeller = new EndlessScroll(this.__createListeners().scrollSeller);
        this.__endlessScrollBuyer = new EndlessScroll(this.__createListeners().scrollBuyer);
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
        const {buyerBlock, sellerBlock} = this.__view.getCommentsBlock();
        this.__endlessScrollSeller.startElement(sellerBlock);
        this.__endlessScrollBuyer.startElement(buyerBlock);


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
        console.log('SOMTHEING');
    }

    /***
     * Get view listeners
     * @returns {{scrollBuyer: {scrollEnd: any}, comments: {listener: *, type: string}, scrollSeller: {scrollEnd: any}}}
     * @private
     */
    __createListeners() {
        return {
            comments: {
                type: 'click',
                listener: this.__listenerCommentsClick.bind(this, 'action')
            },
            scrollSeller: {
                scrollEnd: this.__scrollEnd.bind(this)
            },
            scrollBuyer: {
                scrollEnd: this.__scrollEnd.bind(this)
            }
        };
    }

    /***
     * Settings click event
     * @param {Event} ev - event
     * @param {string} type - type action
     * @private
     */
    __listenerCommentsClick(type, ev) {
        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {

                if (el.dataset !== undefined && type in el.dataset) {
                     actions[el.dataset[type]].open(ev);
                }
            });
    }


    /***
     * Get presenter actions
     * @returns {{sortSellerByDate: {open: *}, sortSellerByRate: {open: *}, sortBuyerByDate: {open: *}, sortBuyerByRate: {open: *}}}
     * @private
     */
    __getActions() {
        return {
            sortSellerByDate: {
                open: this.__sortSellerByDate.bind(this)
            },
            sortSellerByRate: {
                open: this.__sortSellerByRate.bind(this)
            },
            sortBuyerByDate: {
                open: this.__sortBuyerByDate.bind(this)
            },
            sortBuyerByRate: {
                open: this.__sortBuyerByRate.bind(this)
            }
        };
    }

    /***
     * Sort comments for seller by date
     * @private
     */
    __sortSellerByDate() {
        //TODO request to sort
        console.log('Sort by date SELLERS');
    }

    /***
     * Sort comments for seller by rate
     * @private
     */
    __sortSellerByRate() {
        //TODO request to sort
        console.log('Sort by rate SELLERS');
    }

    /***
     * Sort comments for seller by date
     * @private
     */
    __sortBuyerByDate() {
        //TODO request to sort
        console.log('Sort by date BUYERS');
    }

    /***
     * Sort comments for seller by rate
     * @private
     */
    __sortBuyerByRate() {
        //TODO request to sort
        console.log('Sort by rate BUYERS');
    }

    randomDate() {
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        let date1 = '01-01-2000';
        let date2 = new Date().toLocaleDateString();
        date1 = new Date(date1).getTime();
        date2 = new Date(date2).getTime();
        if (date1 > date2) {
            return new Date(getRandomArbitrary(date2, date1)).toLocaleDateString();
        }
        return new Date(getRandomArbitrary(date1, date2)).toLocaleDateString();


    }

    renderData() {
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                commentID: i,
                userName: 'User Name',
                productName: 'Product name',
                date: this.randomDate(),
                userImg: '../../img/svg/checked.svg',
                productImg: '../../img/profile.webp',
                text: 'New comment, such ag good text. Good product. New comment, such ag good text. Good product.New comment, such ag good text. Good product.New comment, such ag good text. Good product.New comment, such ag good text. Good product.New comment, such ag good text. Good product.',
                rate: (Math.random() * 5).toFixed(1),
                belongs: Math.round(Math.random() * 2)
            });
        }
        return data;
    }


    /***
     * Get view context
     * @returns {any}
     * @private
     */
    __makeContext() {
        return {
            comments: {
                data: this.renderData(),
                listeners: this.__createListeners().comments
            },
            profileSettings: {
                data: this.__userInfo,
                owner: this.__userInfo.id === this.__user.getData().id
            }
        };
    }
}