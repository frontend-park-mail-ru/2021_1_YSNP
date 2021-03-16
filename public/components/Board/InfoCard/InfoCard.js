import './InfoCard.css';
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
        const num = this.__data.amount;
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
        return this.__data.ownerName;
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
        const tmpStars = 4.1;
        // return this.__data.ownerStars;
        return tmpStars;
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
        return this.__data.views;
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
        return this.__data.likes;
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
        const date = new Date(this.__data.date);
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
        // const count = this.__data.ownerStars;
        // TODO(Ivan) верни закоментированный код
        const count = 4.1;
        const roundedCount = Math.round(count);
        let stars = '';

        // eslint-disable-next-line no-magic-numbers
        Array(roundedCount).fill(1).forEach(() => {
            stars += '<svg width="3vh" height="3vh" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0.895218L12.7861 7.42562L19.5106 8.21429L14.508 13.039L15.8779 20.0568L10 16.5082L4.12215 20.0568L5.49199 13.039L0.489435 8.21429L7.2139 7.42562L10 0.895218Z" fill="#F3DD14"/></svg>';
        });
        return stars;
    }


    /***
     * @author Ivan Gorshkov
     *
     * get InfoCard listeners
     * @this {InfoCard}
     * @private
     * @readonly
     * @return  {Object} array of listeners
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Set new listeners
     * @this {InfoCard}
     * @param  {Object} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add listeners from component
     * @public
     * @this {InfoCard}
     */
    addListeners() {
        document
            .getElementById('info-card-btns')
            .addEventListener(this.listeners.board.type, this.listeners.board.listener);
    }

    /***
     * @author Ivan Gorshkov
     *
     * Remove listeners from component
     * @public
     * @this {InfoCard}
     */
    removeListeners() {
        document
            .getElementById('info-card-btns')
            .removeEventListener(this.listeners.board.type, this.listeners.board.listener);
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
            starts:
            this.__getStarts,
            date: this.__getDate,
            views: this.__getViews,
            likes: this.__getLikes
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