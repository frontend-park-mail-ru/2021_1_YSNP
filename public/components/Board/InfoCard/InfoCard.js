import './InfoCard.scss';
import infoCardTemplate from './InfoCard.hbs';

/***
 * @author Ivan Gorshkov
 * InfoCard class for card of seller with product price
 * @class InfoCard
 */
export class InfoCard {

    /***
     * @author Ivan Gorshkov
     *
     * init of class InfoCard
     * @param {HTMLElement} parent - parent element
     * @param {Object} data - JSON Object
     * @constructor
     * @this {InfoCard}
     * @public
     */
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
        this.__owener = data.owner;
    }

    /***
     *
     * show text in number field
     * @param{string} tel
     */
    showNumber(tel) {
        document.querySelector('.info-card-btn__number').value = tel;
    }

    /***
     *
     * get tel
     * @return {string}
     */
    getTelNumber() {
        return document.querySelector('.info-card-btn__number').value;
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter product price
     * @return {string}
     * @private
     * @readonly
     */
    get __getPrice() {
        const num = this.__data.__amount;
        return num.toLocaleString();
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter name of seller
     * @return {string}
     * @private
     * @readonly
     */
    get __getName() {
        return this.__data.__ownerName;
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter for a rating number
     * @return {number}
     * @private
     * @readonly
     */
    get __getRating() {
        return this.__data.__ownerStars;
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter for number of views
     * @return {number}
     * @private
     * @readonly
     */
    get __getViews() {
        return this.__data.__views;
    }

    /***
     * Return product name
     * @returns {string}
     * @private
     */
    get __getProductName() {
        return this.__data.__name;
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter for number of likes
     * @return {number}
     * @private
     * @readonly
     */
    get __getLikes() {
        return this.__data.__likes;
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter for a date
     * @return {string}
     * @private
     * @readonly
     */
    get __getDate() {
        const date = new Date(this.__data.__date);
        return date.toLocaleDateString('ru-RU', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'});
    }

    /***
     * @author Ivan Gorshkov
     *
     * return html with stars
     * @return {string}
     * @private
     * @readonly
     * @this {InfoCard}
     */
    get __getStarts() {
        const count = this.__data.__ownerStars;
        const roundedCount = Math.round(count);
        let stars = '';

        // eslint-disable-next-line no-magic-numbers
        Array(roundedCount).fill(1).forEach(() => {
            stars += '<svg width="1.8vh" height="1.8vh" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0.895218L12.7861 7.42562L19.5106 8.21429L14.508 13.039L15.8779 20.0568L10 16.5082L4.12215 20.0568L5.49199 13.039L0.489435 8.21429L7.2139 7.42562L10 0.895218Z" fill="#F3DD14"/></svg>';
        });

        return stars;
    }

    /***
     * Get seller avatar
     * @returns {string}
     * @private
     */
    get __getAvatar() {
        return this.__data.__ownerLinkImages;
    }

    /***
     * Get seller avatar
     * @returns {string}
     * @private
     */
    get __getClose() {
        return this.__data.__close;
    }

    /***
     * @author Ivan Gorshkov
     *
     * context for template
     * @return {{date: string, price: string, name: string, rating: number, starts: string, views: number, likes: number}}
     * @private
     */
    __context() {
        return {
            price: this.__getPrice,
            name: this.__getName,
            rating: this.__getRating,
            starts: this.__getStarts,
            date: this.__getDate,
            views: this.__getViews,
            likes: this.__getLikes,
            avatar: this.__getAvatar,
            owner: this.__owener,
            close: this.__getClose,
            productName: this.__getProductName
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {InfoCard}
     * @public
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', infoCardTemplate(this.__context()));
    }
}