import {BasePresenter} from './BasePresenter.js';

import {checkIsAuth} from '../modules/checkAuth.js';
import {UnauthorizedError} from '../modules/http/httpError';

import {router} from '../modules/router';

import {frontUrls} from '../modules/urls/frontUrls';
import {sentryManager} from '../modules/sentry';

/***
 * Profile settings presenter
 */
export class PromotionPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {PromotionView} view - view
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

        this.checkScrollOffset();
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__view.removePage();
    }

    /***
     * AdPromotion click event
     * @param {Event} ev - mouse event
     * @private
     */
    __listenerPromotionClick(ev) {
        this.__view.removeError();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    if (el.dataset.action !== 'setClick') {
                        ev.preventDefault();
                        actions[el.dataset.action].open();
                    } else {
                        actions[el.dataset.action].open(ev);
                    }
                }
            });
    }

    /***
     * Get ad promotion listeners
     * @returns {{promotionClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            promotionClick: {
                type: 'click',
                listener: this.__listenerPromotionClick.bind(this)
            }
        };
    }

    /***
     * Get ad promotion actions
     * @returns {{advancedClick: {open}, setClick: {open}, baseClick: {open}, nothingClick: {open}, improvedClick: {open}}}
     * @private
     */
    __getActions() {
        return {
            baseClick: {
                open: this.__setBase.bind(this)
            },
            improvedClick: {
                open: this.__setImproved.bind(this)
            },
            advancedClick: {
                open: this.__setAdvanced.bind(this)
            },
            nothingClick: {
                open: this.__setNothing.bind(this)
            },
            setClick: {
                open: this.__publishAd.bind(this)
            }
        };
    }

    /***
     * Set base tariff click callback
     * @private
     */
    __setBase() {
        this.__view.setBase();
    }

    /***
     * Set improved tariff click callback
     * @private
     */
    __setImproved() {
        this.__view.setImproved();
    }

    /***
     * Set advanced tariff click callback
     * @private
     */
    __setAdvanced() {
        this.__view.setAdvanced();
    }

    /***
     * Set nothing tariff click callback
     * @private
     */
    __setNothing() {
        this.__view.setNothing();
    }

    /***
     * Click publish ad callback
     * @param {Event} ev - event
     * @private
     */
    __publishAd(ev) {
        const s = this.__view.getSelected();
        if (s.status === 'nothing') {
            this.__view.removeListeners();
            ev.preventDefault();
            const numberId = router.getState().id;
            router.redirect(frontUrls.product(numberId), '', {title: 'Koya'});
        } else if (s.status === 'send') {
            this.__view.removeListeners();
        } else {
            ev.preventDefault();
        }
    }

    /***
     * Make view context
     * @returns {{promotion: {listeners: {promotionClick: {listener: *, type: string}}, idProduct}}}
     * @private
     */
    __makeContext() {
        let id = '';
        try {
            id = router.getState().id;
        } catch (e) {
            router.redirect(frontUrls.productCreate);
        }
        return {
            promotion: {
                idProduct: id,
                listeners: this.__createListeners()
            }
        };
    }
}