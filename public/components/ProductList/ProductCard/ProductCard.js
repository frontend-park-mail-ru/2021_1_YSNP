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
        document
            .querySelector(`[data-card-id='${this.__context.id}']`)
            .querySelector('[data-action=\'likeClick\']')
            .classList.add('product-card__like_liked');
    }

    /***
     * Remove like animation
     */
    dislike() {
        document
            .querySelector(`[data-card-id='${this.__context.id}']`)
            .querySelector('[data-action=\'likeClick\']')
            .classList.remove('product-card__like_liked');
    }

    /***
     * Add component to parent
     */
    render(context) {
        this.__context = context;
        this.__parent.insertAdjacentHTML('beforeend', productCardTemplate(this.__context));
    }
}
