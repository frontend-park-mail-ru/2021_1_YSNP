import {YandexMap} from '../../modules/yandexMap.js';

/***
 * Map controller
 */
export class MapController {
    /***
     *
     * @param {HTMLElement} parent - element callback will work with
     * @param {Map} map - map
     */
    constructor(parent, map) {
        this.__parent = parent;
        this.__map = map;
        this.__isShown = false;
        this.__yaMap = new YandexMap();
        this.__yaMap.render({
            searchControl: true,
            geolocationControl: true,
            listeners: true
        });
    }

    /***
     * Add listeners
     */
    control() {
        this.__map.listeners = this.__createListeners();
        this.__map.addListeners();
        this.__isShown = true;
    }

    /***
     *  Remove listeners
     */
    removeControllerListeners() {
        if (this.__isShown) {
            this.__map.removeListeners();
        }
    }

    /***
     * YandexMap popup click event
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerMapClick(ev) {
        ev.stopPropagation();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    if (el.dataset.action === 'groupClick') {
                        actions[el.dataset.action].open(ev.target);
                    } else {
                        actions[el.dataset.action].open();
                    }
                }
            });
    }

    /***
     * YandexMap outside popup click event
     * @param {Event} ev - event
     * @private
     */
    __listenerPageClick(ev) {
        ev.preventDefault();

        this.__closeMap();
    }

    /***
     * YandexMap key esc pressed
     * @param {KeyboardEvent} ev - event
     * @private
     */
    __listenerKeyClick(ev) {
        if (ev.key === 'Escape') {
            this.__closeMap();
        }
    }

    /***
     * Get auth listeners
     * @returns {{mapClick: {listener: *, type: string}, pageClick: {listener: *, type: string}, keyClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            mapClick: {
                type: 'click',
                listener: this.__listenerMapClick.bind(this)
            },
            pageClick: {
                type: 'click',
                listener: this.__listenerPageClick.bind(this)
            },
            keyClick: {
                type: 'keydown',
                listener: this.__listenerKeyClick.bind(this)
            }
        };
    }

    /***
     * Close auth
     * @private
     */
    __closeMap() {
        this.__map.removeListeners();
        this.__map.remove();
        this.__isShown = false;
    }

    __groupClick(el) {
        if (el instanceof HTMLInputElement) {
            this.__yaMap.addCircle(this.__yaMap.getPointPos(), el.value * 1000);
        }
    }

    __create() {
        console.log(this.__yaMap.getPointPos());
        console.log(this.__yaMap.getAddress());
    }

    /***
     * Get auth actions
     * @returns {{closeClick: {open: *}}}
     * @private
     */
    __getActions() {
        return {
            closeClick: {
                open: this.__closeMap.bind(this)
            },
            groupClick: {
                open: this.__groupClick.bind(this)
            },
            createClick: {
                open: this.__create.bind(this)
            }
        };
    }
}