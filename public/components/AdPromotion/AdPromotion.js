import './AdPromotion.css';
import './Tariff/Tariff.css';
import adPromotionTemplate from './AdPromotion.hbs';

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
     */
    addListeners() {
        document
            .getElementById('promotion')
            .addEventListener(this.__context.listeners.promotionClick.type, this.__context.listeners.promotionClick.listener);
    }

    /***
     * Add component to parent
     */
    render(context) {
        this.__context = context;
        const tariffs = this.__context.data;
        tariffs.id = this.__context.idProduct;
        console.log(tariffs.id);
        this.__parent.insertAdjacentHTML('beforeend', adPromotionTemplate(tariffs));
        this.addListeners();
    }
}