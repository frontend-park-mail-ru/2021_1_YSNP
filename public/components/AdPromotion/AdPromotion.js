import adPromotionTemplate from './AdPromotion.hbs';
import './AdPromotion.scss';

import tariffTemplate from './Tariff/Tariff.hbs';
import './Tariff/Tariff.scss';

import {sentryManager} from '../../modules/sentry';

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
        const {base, baseBlock} = this.__getTariffDOM();
        this.__setChecked(baseBlock, base);
    }

    /***
     * Set improved tariff style
     */
    setImproved() {
        const {improved, improvedBlock} = this.__getTariffDOM();
        this.__setChecked(improvedBlock, improved);
    }

    /***
     * Set advanced tariff style
     */
    setAdvanced() {
        const {advanced, advancedBlock} = this.__getTariffDOM();
        this.__setChecked(advancedBlock, advanced);
    }

    /***
     * Set nothing tariff click callback
     */
    setNothing() {
        this.__resetChecked();
        const {noTariff} = this.__getTariffDOM();
        noTariff.setAttribute('checked', 'true');
    }

    /***
     * Return status of sending selected
     * @returns {{status: string}}
     */
    getSelected() {
        const {base, improved, advanced, noTariff} = this.__getTariffDOM();
        const baseCheck = base.textContent;
        const improvedCheck = improved.textContent;
        const advancedCheck = advanced.textContent;
        const noTariffCheck = noTariff.hasAttribute('checked');

        if (baseCheck === 'Выбрано') {
            const {basePrice} = this.__getTariffDOM();
            this.__sendForm('Базовый', parseInt(basePrice.value));
            return {status: 'send'};
        }
        if (improvedCheck === 'Выбрано') {
            const {improvedPrice} = this.__getTariffDOM();
            this.__sendForm('Улучшенный', parseInt(improvedPrice.value));
            return {status: 'send'};
        }
        if (advancedCheck === 'Выбрано') {
            const {advancedPrice} = this.__getTariffDOM();
            this.__sendForm('Продвинутый', parseInt(advancedPrice.value));
            return {status: 'send'};
        }
        if (noTariffCheck) {
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
        document.getElementById(errorId).classList.add('error-visible');
        document.getElementById(errorId).classList.remove('error-hidden');
    }

    /***
     * Remove error message
     */
    removeError() {
        document.getElementById('promotion-error').classList.remove('error-visible');
        document.getElementById('promotion-error').classList.add('error-hidden');
    }

    /***
     * Set block selected
     * @param {HTMLElement} block - id of block to set selected
     * @param {HTMLElement} button - id of button in block
     * @private
     */
    __setChecked(block, button) {
        this.__resetChecked();
        block.classList.add('tariffs-block_checked');
        button.classList.add('tariffs-block__button_checked');
        button.textContent = 'Выбрано';
    }

    /***
     * Reset checked blocks
     * @private
     */
    __resetChecked() {
        const {base, improved, advanced, noTariff, baseBlock, improvedBlock, advancedBlock} = this.__getTariffDOM();
        base.classList.remove('tariffs-block__button_checked');
        improved.classList.remove('tariffs-block__button_checked');
        advanced.classList.remove('tariffs-block__button_checked');
        noTariff.removeAttribute('checked');

        base.textContent = 'Выбрать';
        improved.textContent = 'Выбрать';
        advanced.textContent = 'Выбрать';

        advancedBlock.classList.remove('tariffs-block_checked');
        improvedBlock.classList.remove('tariffs-block_checked');
        baseBlock.classList.remove('tariffs-block_checked');
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
        let tariff = 0;
        switch (type) {
            case 'Базовый':
                tariff = 1;
                break;
            case 'Улучшенный':
                tariff = 2;
                break;
            case 'Продвинутый':
                tariff = 3;
                break;
        }
        document.getElementById('promotion-label').value += `,${tariff}`;
        document.getElementById('promotion-description').value = `KOYA: Покупка продвижения объявления по тарифу ${type}`;
    }

    /***
     * Returns HTML elements of tariffs
     * @returns {{improved: HTMLElement, baseBlock: HTMLElement, advanced: HTMLElement, improvedBlock: HTMLElement, advancedBlock: HTMLElement, noTariff: HTMLElement, base: HTMLElement}}
     * @private
     */
    __getTariffDOM() {
        return {
            base: document.getElementById('base-tariff'),
            improved: document.getElementById('improved-tariff'),
            advanced: document.getElementById('advanced-tariff'),
            noTariff: document.getElementById('no-tariff'),
            baseBlock: document.getElementById('block-base-tariff'),
            improvedBlock: document.getElementById('block-improved-tariff'),
            advancedBlock: document.getElementById('block-advanced-tariff'),
            basePrice: document.getElementById('base-price'),
            improvedPrice: document.getElementById('improved-price'),
            advancedPrice: document.getElementById('advanced-price')
        };
    }

    /***
     * Returns tariff templates
     * @returns {tariffTemplate[]}
     * @private
     */
    __fillTariffData() {
        const tariff1 = {
            name: 'Базовый',
            price: '2',
            description: [
                'Объявление выделяется красной рамочкой'
            ],
            idBlock: 'block-base-tariff',
            idButton: 'base-tariff',
            action: 'baseClick',
            idPrice: 'base-price'
        };
        const tariff2 = {
            name: 'Улучшенный',
            price: '5',
            description: [
                'Объявление выделяется красной рамочкой',
                'Цена подсвечивается красным цветом'
            ],
            idBlock: 'block-improved-tariff',
            idButton: 'improved-tariff',
            action: 'improvedClick',
            idPrice: 'improved-price'
        };
        const tariff3 = {
            name: 'Продвинутый',
            price: '7',
            description: [
                'Объявление выделяется красной рамочкой',
                'Цена подсвечивается красным цветом',
                'Объявление помечается уникальным значком VIP'
            ],
            idBlock: 'block-advanced-tariff',
            idButton: 'advanced-tariff',
            action: 'advancedClick',
            idPrice: 'advanced-price'
        };
        return [
            tariffTemplate(tariff1),
            tariffTemplate(tariff2),
            tariffTemplate(tariff3)
        ];
    }

    /***
     * Make promotion context
     * @param context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            data: {
                id: context.idProduct,
                tariffs: this.__fillTariffData()
            },
            listeners: context.listeners
        };
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__makeContext(context);
            this.__parent.insertAdjacentHTML('beforeend', adPromotionTemplate(this.__context.data));
            this.__addListeners();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}