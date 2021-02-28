/***
 * Product card component with img, name, date, amount and like
 */
export class ProductCard {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} data - component data
     */
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
    }

    /***
     * Add like animation
     */
    like() {
        document
            .querySelector(`[data-card-id='${this.__data.id}']`)
            .querySelector('[data-action=\'likeClick\']')
            .classList.add('product-card__like_liked');
    }

    /***
     * Remove like animation
     */
    dislike() {
        document
            .querySelector(`[data-card-id='${this.__data.id}']`)
            .querySelector('[data-action=\'likeClick\']')
            .classList.remove('product-card__like_liked');
    }

    /***
     * Component HTML
     * @returns {string} - html layout
     * @private
     */
    __getTemplate() {
        return `
           <div class="product-card" data-card-id="${this.__data.id}">
                <div class="product-card-inner" data-action="cardClick">
                    <svg height="3vh" width="3vh" class="product-card__like" data-action="likeClick" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
                    
                    <img class="product-card__img" src="${this.__data.img}" alt="img">
                    
                    <div class="product-card-info">
                        <div class="product-card-info-inner">
                            <span class="product-card-info__name">${this.__data.name}</span>
                            <span class="product-card-info__date">${this.__data.date}</span>
                            <span class="product-card-info__amount">${this.__data.amount}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /***
     * Add component to parent
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}