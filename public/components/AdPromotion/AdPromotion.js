import './AdPromotion.css';
import './Tariff/Tariff.css';
import adPromotionTemplate from './AdPromotion.hbs';
import tariffTemplate from './Tariff/Tariff.hbs';

/***
 * Promotion component
 */
export class AdPromotion {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Add component listeners
     * @private
     */
    __addListeners() {
        document
            .getElementById('promotion')
            .addEventListener(this.__context.listeners.promotionClick.type, this.__context.listeners.promotionClick.listener);
    }

    /***
     * Add component listeners
     */
    removeListeners() {
        document
            .getElementById('promotion')
            .removeEventListener(this.__context.listeners.promotionClick.type, this.__context.listeners.promotionClick.listener);
    }

    /***
     * Set base tariff style
     */
    setBase() {
        this.__setChecked('block-base-tariff', 'base-tariff');
    }

    /***
     * Set improved tariff style
     */
    setImproved() {
        this.__setChecked('block-improved-tariff', 'improved-tariff');
    }

    /***
     * Set advanced tariff style
     */
    setAdvanced() {
        this.__setChecked('block-advanced-tariff', 'advanced-tariff');
    }

    /***
     * Set nothing tariff click callback
     */
    setNothing() {
        this.__resetChecked();
        document
            .getElementById('no-tariff')
            .setAttribute('checked', 'true');
    }

    /***
     * Return status of sending selected
     * @returns {{status: string}}
     */
    getSelected() {
        const baseCheck = document.getElementById('base-tariff').textContent;
        const improvedCheck = document.getElementById('improved-tariff').textContent;
        const advancedCheck = document.getElementById('advanced-tariff').textContent;
        const noTariff = document.getElementById('no-tariff').hasAttribute('checked');

        if (baseCheck === 'Выбрано') {
            const price = document.getElementById('base-price').value;
            this.__sendForm('Базовый', parseInt(price));
            return {status: 'send'};
        } else if (improvedCheck === 'Выбрано') {
            const price = document.getElementById('improved-price').value;
            this.__sendForm('Улучшенный', parseInt(price));
            return {status: 'send'};
        } else if (advancedCheck === 'Выбрано') {
            const price = document.getElementById('advanced-price').value;
            this.__sendForm('Продвинутый', parseInt(price));
            return {status: 'send'};
        } else if (noTariff) {
            return {status: 'nothing'};
        }
        this.__showError('promotion-error', 'Выберите какой-нибудь тариф');
        return {status: 'error'};
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
     * Remove error message
     */
    removeError() {
        document.getElementById('promotion-error').classList.remove('promotion-error_visible');
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
    }

    /***
     * Returns tariff templates
     * @returns {{tariffs: [tariffTemplate, tariffTemplate, tariffTemplate]}}
     * @private
     */
    __fillTariffData() {
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
     * Add component to parent
     */
    render(context) {
        this.__context = context;
        const tariffs = this.__fillTariffData();
        tariffs.id = this.__context.idProduct;
        console.log(tariffs.id);
        this.__parent.insertAdjacentHTML('beforeend', adPromotionTemplate(tariffs));
        this.__addListeners();
    }
}