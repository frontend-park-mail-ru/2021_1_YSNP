/* eslint-disable */

import {noop} from './noop.js';

/***
 * Yandex map module
 */
export class YandexMap {
    /***
     * Class constructor
     */
    constructor() {
        this.__initPos = {
            latitude: 55.753808,
            longitude: 37.620017
        };
    }

    /***
     * Render map
     * @param config
     * @param callback
     */
    render(config, callback) {
        ymaps.ready(this.__init.bind(this, config, callback));
    }

    /***
     * Set user initial data and render position position
     * @param {{latitude: number, longitude: number}} pos - user position
     * @param {number} radius - user radius
     * @param {string} address - user address
     */
    setInitialData(pos, radius, address) {
        this.__pos = pos;
        this.__radius = radius;
        this.__text = address;

        ymaps.ready(this.addPointWithCircle.bind(this, this.__pos, this.__radius));
        ymaps.ready(this.setCenter.bind(this, this.__pos, 11));
    }

    /***
     * Get point position
     * @returns {{latitude: number, longitude: number}}
     */
    getPointPos() {
        return this.__pos;
    }

    /***
     * Get radius
     * @returns {number}
     */
    getRadius() {
        return this.__radius;
    }

    /***
     * Get position address
     * @returns {string}
     */
    getAddress() {
        return this.__text;
    }

    /***
     * Set map center
     * @param {{latitude: number, longitude: number}} pos - map center
     * @param {number} zoom - map zoom
     */
    setCenter(pos, zoom) {
        this.__myMap.setCenter(this.__convectPosObjectToArray(pos), zoom);
    }

    /***
     * Add point with circle
     * @param {{latitude: number, longitude: number}} pos - point center
     * @param {number} radius - circle radius
     */
    addPointWithCircle(pos, radius) {
        this.addPoint(pos);
        this.addCircle(pos, radius);
    }

    /***
     * Add point to map
     * @param {{latitude: number, longitude: number}} pos - point position
     */
    addPoint(pos) {
        this.__pos = pos;
        if (this.__pos !== undefined) {
            this.__deletePoint(this.__point);
            this.__point = this.__createPoint(pos);
        }
    }

    /***
     * Add circle to point on map
     * @param {{latitude: number, longitude: number}} pos - circle center
     * @param {number} radius - circle radius (m)
     * @param {number} measurementError - measurementError
     */
    addCircle(pos, radius, measurementError = 0) {
        this.__radius = radius;
        if (pos !== undefined) {
            this.__deleteCircle(this.__circle);
            pos.latitude += this.randomInRange(0.00001, measurementError);
            pos.longitude += this.randomInRange(0.00001, measurementError);
            this.__circle = this.__createCircle(pos, radius);
        }
    }

    randomInRange(min, max) {
        return Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
    }

    /***
     * Add search input to map
     * @param {number} id - input id
     */
    addSearch(id) {
        ymaps.ready(() => {
            const suggestView = new ymaps.SuggestView(id, {
                offset: [10, 10]
            });
            suggestView.events.add('select', (e) => {
                const myGeocoder = ymaps.geocode(e.originalEvent.item.value);
                myGeocoder.then(
                    (res) => {
                        this.__movePoint(this.__convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates()));
                        this.setCenter(this.__convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates(), 1));
                    }
                ).catch(
                    (err) => {
                        console.log(err.message);
                    });
            });
        });
    }

    /***
     * Init map
     * @private
     */
    __init(config, callback = noop) {
        this.callback = callback;
        document.getElementById(config.id).innerHTML = '';
        this.__myMap = new ymaps.Map(config.id, {
            center: [this.__initPos.latitude, this.__initPos.longitude],
            zoom: 10,
            openBalloonOnClick: false,
            controls: []
        });

        this.__myMap.balloon.close();

        this.__initZoomControl();

        this.__myMap.events.add('balloonopen', () => {
            this.__myMap.balloon.close();
        });

        if (config.searchControl) {
            this.__initSearch();
        }

        if (config.geolocationControl) {
            this.__initGeolocationControl();
        }

        if (config.userLocation) {
            this.__getUserLocation();
        }

        if (config.listeners) {
            this.__addListeners();
        }
    }

    /***
     * Init search on map
     * @private
     */
    __initSearch() {
        this.__searchControl = new ymaps.control.SearchControl({
            options: {
                provider: 'yandex#map',
                noPlacemark: true
            }
        });
        this.__myMap.controls.add(this.__searchControl);
    }

    /***
     * Init geolocation button on map
     * @private
     */
    __initGeolocationControl() {
        this.__geolocationControl = new ymaps.control.GeolocationControl({
            options: {
                layout: 'round#buttonLayout'
            }
        });
        this.__myMap.controls.add(this.__geolocationControl);
    }

    /***
     * Init zoom buttons on map
     * @private
     */
    __initZoomControl() {
        const zoomControl = new ymaps.control.ZoomControl({
            options: {
                layout: 'round#zoomLayout'
            }
        });
        this.__myMap.controls.add(zoomControl);
    }

    /***
     * Add listeners to map
     * @private
     */
    __addListeners() {
        this.__myMap.events.add('click', (e) => {
            const coords = e.get('coords');

            this.__movePoint(this.__convertPosArrayToObject(coords));
            this.__getAddress();
        });

        this.__myMap.geoObjects.events.add('click', (e) => {
            const coords = e.get('coords');

            this.__movePoint(this.__convertPosArrayToObject(coords));
            this.__getAddress();
        });

        if (this.__geolocationControl) {
            this.__geolocationControl.events.add('locationchange', (e) => {
                const coords = e.get('position');
                this.__movePoint(this.__convertPosArrayToObject(coords));
                this.__getAddress();
            });
        }

        if (this.__searchControl !== undefined) {
            this.__searchControl.events.add('resultselect', (e) => {
                const index = e.get('index');
                const coords = this.__searchControl.getResultsArray()[index].geometry.getCoordinates();
                this.__movePoint(this.__convertPosArrayToObject(coords));
                this.__text = this.__getUserPositionAddress(this.__searchControl.getResultsArray()[index].properties);
            }, this);

        }
    }

    /***
     * Get user location and set map to this location
     * @private
     */
    __getUserLocation() {
        ymaps.geolocation.get({
            mapStateAutoApply: true
        }).then((result) => {
            this.__myMap.geoObjects.add(result.geoObjects);
            const coords = result.geoObjects.get(0).geometry.getCoordinates();
            this.__movePoint(this.__convertPosArrayToObject(coords));
        });
    }

    /***
     * Convert position from Array to Object
     * @param {number[]} coords - latitude and longitude
     * @returns {{latitude: number, longitude: number}}
     * @private
     */
    __convertPosArrayToObject(coords) {
        return {
            latitude: coords[0],
            longitude: coords[1]
        };
    }

    /***
     * Convert position from Object to Array
     * @param {{latitude: number, longitude: number}} pos - position
     * @returns {number[]}
     * @private
     */
    __convectPosObjectToArray(pos) {
        return [pos.latitude, pos.longitude];
    }

    /***
     * Get address by position
     * @private
     */
    __getAddress() {
        ymaps.geocode([this.__pos.latitude, this.__pos.longitude])
            .then((res) => {
                this.__text = this.__getUserPositionAddress(res.geoObjects.get(0).properties);
                this.__city = res.geoObjects.get(0).properties.getAll().metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName;
                this.callback(this.__text);
            });
    }

    __getUserPositionAddress(properties) {
        const prop = properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country
        const country = this.__getCountry(prop);
        const city = this.__getCity(prop);

        return `${country}, ${city}`;
    }

    __getCountry(prop) {
        return prop.CountryName;
    }

    __getCity(prop) {
        return prop.AdministrativeArea.AdministrativeAreaName;
    }

    get city() {
        return this.__city;
    }

    /***
     * Move point to another position
     * @param {{latitude: number, longitude: number}} pos - point position
     * @private
     */
    __movePoint(pos) {
        this.addPoint(pos);
        this.addCircle(pos, this.__radius);
    }

    /***
     * Move point to another position
     * @param {{latitude: number, longitude: number}} pos - point position
     * @private
     */
    movePointByPos(pos) {
        ymaps.ready(() => {
            this.setCenter(pos, 12);
            this.addCircle(pos, 1000, 0.004);
        });
    }


    static async isAdressCorrect(adress) {
        const myGeocoder = ymaps.geocode(adress);
        return await myGeocoder.then((res) => res.geoObjects.get(0) !== undefined);
    }

    /***
     * Create point on map
     * @param {{latitude: number, longitude: number}} pos
     * @returns {ymaps.Placemark}
     * @private
     */
    __createPoint(pos) {
        const point = new ymaps.Placemark([pos.latitude, pos.longitude]);
        this.__myMap.geoObjects.add(point);

        return point;
    }

    /***
     * Delete point from map
     * @param {ymaps.Placemark} point - deleted point
     * @private
     */
    __deletePoint(point) {
        this.__myMap.geoObjects.remove(point);
    }

    /***
     * Create circle on map
     * @param {{latitude: number, longitude: number}} pos - circle center
     * @param {number} radius - circle radius
     * @returns {ymaps.Circle}
     * @private
     */
    __createCircle(pos, radius) {
        const circle = new ymaps.Circle([[pos.latitude, pos.longitude], radius]);
        this.__myMap.geoObjects.add(circle);

        return circle;
    }

    /***
     * Delete circle from map
     * @param {ymaps.Circle} circle - deleted circle
     * @private
     */
    __deleteCircle(circle) {
        this.__myMap.geoObjects.remove(circle);
    }
}