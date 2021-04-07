import productCardTemplate from './ProductCard.hbs';
import './ProductCard.css';

/***
 * Product card component with img, name, date, amount and like
 */
export class ProductCard {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Add like animation
     */
    like() {
        this.__parent
            .querySelector(`[data-card-id='${this.__context.id}']`)
            .querySelector('[data-action=\'likeClick\']')
            .classList.add('product-card__like_liked');
    }

    /***
     * Remove like animation
     */
    dislike() {
        this.__parent
            .querySelector(`[data-card-id='${this.__context.id}']`)
            .querySelector('[data-action=\'likeClick\']')
            .classList
            .remove('product-card__like_liked');
    }

    /***
     * Set card border vip
     * @private
     */
    __setCardBorderVip() {
        this.__parent
            .querySelector(`[data-card-id='${this.__context.id}']`)
            .classList
            .add('product-card_vip');
    }

    /***
     * Set card amount vip
     * @private
     */
    __setCardAmountVip() {
        this.__parent
            .querySelector(`[data-card-id='${this.__context.id}']`)
            .querySelector('[class="product-card-info__amount"]')
            .classList
            .add('product-card-info__amount_vip');
    }

    /***
     * Set card label vip
     * @private
     */
    __setCardLabelVip() {
        this.__parent
            .querySelector(`[data-card-id='${this.__context.id}']`)
            .querySelector('[class="product-card__label"]')
            .classList
            .add('product-card__label_vip');
    }


    /***
     * Set premium
     */
    __setVip() {
        this.__setCardBorderVip();
    }

    /***
     * Set premium
     */
    __setPremium() {
        this.__setCardBorderVip();
        this.__setCardAmountVip();
    }

    /***
     * Set deluxe status
     */
    __setDeluxe() {
        this.__setCardBorderVip();
        this.__setCardAmountVip();
        this.__setCardLabelVip();
    }

    /***
     * Select card status
     * @private
     */
    __setStatus() {
        switch (this.__context.tariff) {
            case 1: {
                this.__setVip();
                break;
            }

            case 2: {
                this.__setPremium();
                break;
            }

            case 3: {
                this.__setDeluxe();
                break;
            }
        }
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', productCardTemplate(this.__context));
            this.__setStatus();
        } catch (err) {
            console.log(err.message);
        }
    }
}
