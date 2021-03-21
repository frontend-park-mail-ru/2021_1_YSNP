import './Map.css';

/***
 * @author Ivan Gorshkov
 * YandexMap class for seller location
 * @class Map
 */
export class Map {

    /***
     * @author Ivan Gorshkov
     * init of class YandexMap
     * @param {HTMLElement} parent - parent element
     * @constructor
     * @this {Map}
     * @public
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * @author Ivan Gorshkov
     * main template of component
     * @return {string}
     * @private
     * @this {Map}
     */
    __getTemplate() {
        return `  
            <div class="product-map" id="ya-map">
                <span>
                    Какие-то проблемы с картой
                </span>
            </div>
        `;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Map}
     * @public
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
