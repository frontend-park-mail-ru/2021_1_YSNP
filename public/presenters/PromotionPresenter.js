import {BasePresenter} from './BasePresenter.js';
import {router} from '../modules/router';
import {frontUrls} from '../modules/frontUrls';
import tariffTemplate from '../components/AdPromotion/Tariff/Tariff.hbs';

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
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        await super.update();
    }

    /***
     * Control view
     * @returns {Promise<void>}
     */
    async control() {
        await this.update();
        if (!this.__userModel.isAuth) {
            router.redirect(frontUrls.registration);
            return;
        }
        this.__view.render(this.__makeContext());
    }

    /***
     * AdPromotion click event
     * @param {Event} ev - mouse event
     * @private
     */
    __listenerPromotionClick(ev) {
        document.getElementById('promotion-error').classList.remove('promotion-error_visible');

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
        // this.__pageRemoveListeners();
        console.log('Click base tariff');
        this.__setChecked('block-base-tariff', 'base-tariff');
    }

    /***
     * Set improved tariff click callback
     * @private
     */
    __setImproved() {
        // this.__pageRemoveListeners();
        console.log('Click improved tariff');
        this.__setChecked('block-improved-tariff', 'improved-tariff');
    }

    /***
     * Set advanced tariff click callback
     * @private
     */
    __setAdvanced() {
        // this.__pageRemoveListeners();
        console.log('Click advanced tariff');
        this.__setChecked('block-advanced-tariff', 'advanced-tariff');
    }

    /***
     * Set nothing tariff click callback
     * @private
     */
    __setNothing() {
        // this.__pageRemoveListeners();
        console.log('Click nothing tariff');
        this.__resetChecked();
        document
            .getElementById('no-tariff')
            .setAttribute('checked', 'true');
    }

    /***
     * Click publish ad callback
     * @param {Event} ev - event
     * @private
     */
    __publishAd(ev) {
        // this.__pageRemoveListeners();
        console.log('Click publish');
        const baseCheck = document.getElementById('base-tariff').textContent;
        const improvedCheck = document.getElementById('improved-tariff').textContent;
        const advancedCheck = document.getElementById('advanced-tariff').textContent;
        const noTariff = document.getElementById('no-tariff').hasAttribute('checked');

        if (baseCheck === 'Выбрано') {
            console.log('Set base');
            const price = document.getElementById('base-price').value;
            this.__sendForm('Базовый', parseInt(price));
        } else if (improvedCheck === 'Выбрано') {
            console.log('Set improved');
            const price = document.getElementById('improved-price').value;
            this.__sendForm('Улучшенный', parseInt(price));
        } else if (advancedCheck === 'Выбрано') {
            console.log('Set advanced');
            const price = document.getElementById('advanced-price').value;
            this.__sendForm('Продвинутый', parseInt(price));
        } else if (noTariff) {
            ev.preventDefault();
            router.redirect(frontUrls.main);
        } else {
            this.__showError('promotion-error', 'Выберите какой-нибудь тариф');
        }

    }

    /***
     * Set pay form fields
     * @param {string} type - type of tariff
     * @param {int} sum - price of tariff
     * @private
     */
    __sendForm(type, sum) {
        document.getElementById('promotion-title').value = `KOYA: покупка продвижения объявления по тарифу ${type}`;
        document.getElementById('promotion-type').value = `KOYA: покупка продвижения объявления по тарифу ${type}`;
        document.getElementById('promotion-sum').value = sum;
        document.getElementById('promotion-label').value += `, ${type}`;
        document.getElementById('promotion-description').value = `KOYA: Покупка продвижения объявления по тарифу ${type}`;
        console.log('wtf');
    }

    /***
     * Show error
     * @param errorId
     * @param message
     * @private
     */
    __showError(errorId, message) {
        document.getElementById(errorId).textContent = message;
        document.getElementById(errorId).classList.add('promotion-error_visible');
    }

    /***
     * Reset checked blocks
     * @private
     */
    __resetChecked() {
        document
            .getElementById('base-tariff')
            .classList.remove('tariffs__button_checked');
        document
            .getElementById('improved-tariff')
            .classList.remove('tariffs__button_checked');
        document
            .getElementById('advanced-tariff')
            .classList.remove('tariffs__button_checked');
        document
            .getElementById('no-tariff')
            .removeAttribute('checked');
        document
            .getElementById('base-tariff')
            .textContent = 'Выбрать';
        document
            .getElementById('improved-tariff')
            .textContent = 'Выбрать';
        document
            .getElementById('advanced-tariff')
            .textContent = 'Выбрать';

        document
            .getElementById('block-advanced-tariff')
            .classList.remove('tariffs-block_checked');
        document
            .getElementById('block-improved-tariff')
            .classList.remove('tariffs-block_checked');
        document
            .getElementById('block-base-tariff')
            .classList.remove('tariffs-block_checked');
    }

    /***
     * Set block selected
     * @param {string} blockId - id of block to set selected
     * @param {string} buttonId - id of button in block
     * @private
     */
    __setChecked(blockId, buttonId) {
        this.__resetChecked();
        document
            .getElementById(blockId)
            .classList.add('tariffs-block_checked');
        document
            .getElementById(buttonId)
            .classList.add('tariffs__button_checked');
        document
            .getElementById(buttonId)
            .textContent = 'Выбрано';
    }

    /***
     * Returns tariff templates
     * @returns {{tariffs: [tariffTemplate, tariffTemplate, tariffTemplate]}}
     */
    fillTariffData() {
        const tariff1 = {
            name: 'Базовый',
            price: '2',
            description: [
                'Объявление показывается в ленте в 10 раз чаще'
            ],
            idBlock: 'block-base-tariff',
            idButton: 'base-tariff',
            action: 'baseClick',
            idPrice: 'base-price'
        };
        const tariff2 = {
            name: 'Улучшенный',
            price: '199',
            description: [
                'Объявление показывается в ленте в 10 раз чаще',
                'Объявление выделяется красным цветом'
            ],
            idBlock: 'block-improved-tariff',
            idButton: 'improved-tariff',
            action: 'improvedClick',
            idPrice: 'improved-price'
        };
        const tariff3 = {
            name: 'Продвинутый',
            price: '399',
            description: [
                'Объявление показывается в ленте в 10 раз чаще',
                'Объявление выделяется красным цветом',
                'Публикация в приложении “Вконтакте”'
            ],
            idBlock: 'block-advanced-tariff',
            idButton: 'advanced-tariff',
            action: 'advancedClick',
            idPrice: 'advanced-price'
        };
        return {
            tariffs: [
                tariffTemplate(tariff1),
                tariffTemplate(tariff2),
                tariffTemplate(tariff3)
            ]
        };
    }

    /***
     * Make view context
     * @returns {{promotion: {data: {tariffs: tariffTemplate[]}, listeners: {promotionClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            promotion: {
                data: this.fillTariffData(),
                idProduct: router.getState().id,
                listeners: this.__createListeners()
            }
        };
    }
}