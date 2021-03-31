import './Map.css';
import mapTemplate from './Map.hbs';
import {YandexMap} from '../../../modules/yandexMap';

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
   async render(context) {
        this.__parent.insertAdjacentHTML('beforeend', mapTemplate());
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.__yaMap = new YandexMap();
        this.__yaMap.render({
            searchControl: false,
            geolocationControl: true,
            listeners: false,
            id: 'ya-map-product'
        });
        this.__yaMap.movePointByName('Москва, Профсоюзная улица, 132к2, Коньково');
    }
}
