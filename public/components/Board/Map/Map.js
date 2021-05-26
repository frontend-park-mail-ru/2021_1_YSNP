import mapTemplate from './Map.hbs';
import './Map.scss';

import {YandexMap} from '../../../modules/layout/yandexMap';

import {sentryManager} from '../../../modules/sentry';

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
     *
     * Add component to parent
     * @this {Map}
     * @public
     */
    async render(context) {
        try {
            this.__parent.insertAdjacentHTML('beforeend', mapTemplate());

            this.__yaMap = new YandexMap();
            this.__yaMap.render({
                searchControl: false,
                geolocationControl: false,
                listeners: false,
                id: 'ya-map-product'
            });

            this.__yaMap.movePointByPos({
                latitude: context.__latitude,
                longitude: context.__longitude
            });
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}
