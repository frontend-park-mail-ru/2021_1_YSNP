'use strict';

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
        return this.__data.date;
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
     * main template of component
     * @return {string}
     * @private
     * @this {InfoCard}
     */
    __getTemplate() {
        return `     
            <div class="info-card">
                <p class="info-card__price">${this.__getPrice} ₽</p>
                <div class="info-card-profile">
                    <div class="info-card__image"></div>
                    <div class="info-card-container">
                        <p class="info-card__name">${this.__getName}</p>
                        <span class="info-card-rating">
                              <span class="info-card-rating__text">${this.__getRating}</span>
                              ${this.__getStarts}
                        </span>
                    </div>
                </div>
                <div class="info-card-btn" id="info-card-btns">
                    <input class="info-card-btn__massage" type="button" value="Написать сообщение" data-action="massageClick"/>
                    <input class="info-card-btn__number" type="button" value="Показать номер" data-action="numberCLick"/>
                </div>
                <p class="info-card__time">${this.__getDate}</p>
                <div class="info-card-statistic">
                    <div class="info-card-statistic-views">
                        <svg width="3vh" height="3vh" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5" clip-path="url(#clip0)"><path d="M12.5 5.34785C7.72348 5.34785 3.39189 8.1159 0.195612 12.612C-0.0652041 12.9803 -0.0652041 13.4949 0.195612 13.8633C3.39189 18.3647 7.72348 21.1328 12.5 21.1328C17.2765 21.1328 21.6081 18.3647 24.8044 13.8687C25.0652 13.5003 25.0652 12.9857 24.8044 12.6174C21.6081 8.1159 17.2765 5.34785 12.5 5.34785ZM12.8426 18.7981C9.67193 19.0093 7.05354 16.2413 7.25299 12.8774C7.41664 10.1039 9.53897 7.85589 12.1574 7.68255C15.3281 7.47129 17.9465 10.2393 17.747 13.6032C17.5782 16.3713 15.4559 18.6193 12.8426 18.7981ZM12.6841 16.2305C10.976 16.3442 9.56454 14.8546 9.67705 13.0453C9.76399 11.5502 10.9095 10.3423 12.321 10.2448C14.0291 10.131 15.4406 11.6207 15.3281 13.4299C15.236 14.9304 14.0905 16.1384 12.6841 16.2305Z" fill="black"/></g><defs><clipPath id="clip0"><rect width="25" height="26.4806" fill="white"/></clipPath></defs></svg>
                        <span class="info-card-statistic-views__text">${this.__getViews}</span>
                    </div>
                     <div class="info-card-statistic-likes">            
                        <svg width="3vh" height="3vh" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M14.6875 1.41889C13.6022 1.41889 12.6072 1.78317 11.7302 2.50162C10.8894 3.19041 10.3296 4.0677 10 4.70564C9.67043 4.06766 9.11063 3.19041 8.2698 2.50162C7.39277 1.78317 6.39777 1.41889 5.3125 1.41889C2.28391 1.41889 0 4.04283 0 7.52243C0 11.2816 2.84934 13.8536 7.16285 17.7472C7.89535 18.4084 8.72563 19.1579 9.58859 19.9572C9.70234 20.0628 9.84844 20.1208 10 20.1208C10.1516 20.1208 10.2977 20.0628 10.4114 19.9573C11.2745 19.1578 12.1047 18.4084 12.8376 17.7468C17.1507 13.8536 20 11.2816 20 7.52243C20 4.04283 17.7161 1.41889 14.6875 1.41889Z" fill="black"/></g></svg>
                        <span class="info-card-statistic-likes__text">${this.__getLikes}</span>
                    </div>
                </div>
            </div>
        `;
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
     * Add component to parent
     * @this {InfoCard}
     * @public
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}