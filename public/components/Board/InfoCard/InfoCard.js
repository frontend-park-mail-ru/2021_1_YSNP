import infoCardTemplate from './InfoCard.hbs';
import './InfoCard.scss';

import {sentryManager} from '../../../modules/sentry';

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
    constructor(parent, data, owner) {
        this.__parent = parent;
        this.__data = data;
        this.__owener = owner;
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
        return this.__data.__ownerStars.toFixed(1);
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
     * @return {{date: string, owner, price: string, name: string, rating: number, avatar: string, close: string, views: number, productName: string, likes: number}}
     * @private
     */
    __context() {
        return {
            price: this.__getPrice,
            name: this.__getName,
            rating: this.__getRating,
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
     * Get star element
     * @param id
     * @returns {HTMLElement}
     * @private
     */
    __getStarElement(id) {
        return document.getElementById(`star-${id}`);
    }

    /***
     * Make stars active
     * @param {number} count - star count
     * @private
     */
    __makeStarsActive(count) {
        for (let i = 1; i <= count; i++) {
            this.__getStarElement(i).classList.add('star-active');
        }
    }

    /***
     * Render stars in comment
     * @private
     */
    __renderStars(ctx) {
        const rate = Math.round(ctx);
        switch (rate) {
            case 0:
                break;
            case 1:
                this.__makeStarsActive(1);
                break;
            case 2:
                this.__makeStarsActive(2);
                break;
            case 3:
                this.__makeStarsActive(3);
                break;
            case 4:
                this.__makeStarsActive(4);
                break;
            case 5:
                this.__makeStarsActive(5);
                break;
            default:
                break;
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {InfoCard}
     * @public
     */
    render() {
        try {
            this.__parent.insertAdjacentHTML('beforeend', infoCardTemplate(this.__context()));
            this.__renderStars(this.__data.__ownerStars);
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}