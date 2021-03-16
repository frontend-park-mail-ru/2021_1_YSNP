import mapTemplate from './Map.hbs';
import './Map.css';

/***
 * Map component
 */
export class Map {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} listeners - component listeners
     */
    constructor(parent, listeners = {}) {
        this.__parent = parent;
        this.__listeners = listeners;
    }

    /***
     * Get listeners
     * @returns {Object}
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * Set listeners
     * @param {Object} val - component listeners
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * Add component listeners
     */
    addListeners() {
        document
            .getElementById('map-content')
            .addEventListener(this.__listeners.mapClick.type, this.__listeners.mapClick.listener);

        document
            .getElementById('app')
            .addEventListener(this.__listeners.pageClick.type, this.__listeners.pageClick.listener);

        window
            .addEventListener(this.__listeners.keyClick.type, this.__listeners.keyClick.listener);
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('map-content')
            .removeEventListener(this.__listeners.mapClick.type, this.__listeners.mapClick.listener);

        document
            .getElementById('app')
            .removeEventListener(this.__listeners.pageClick.type, this.__listeners.pageClick.listener);

        window
            .removeEventListener(this.__listeners.keyClick.type, this.__listeners.keyClick.listener);
    }

    /***
     * Get map radius
     * @returns {{radius: ({id: string, text: string}|{id: string, text: string}|{id: string, text: string}|{id: string, text: string}|{id: string, text: string})[]}}
     * @private
     */
    __getRadius() {
        return {
            radius: [
                {
                    id: 'groupRadio1',
                    text: '1 км'
                },
                {
                    id: 'groupRadio2',
                    text: '5 км'
                },
                {
                    id: 'groupRadio3',
                    text: '10 км'
                },
                {
                    id: 'groupRadio4',
                    text: '25 км'
                },
                {
                    id: 'groupRadio5',
                    text: '50 км'
                },
                {
                    id: 'groupRadio6',
                    text: 'более 50 км'
                }
            ]
        };
    }

    /***
     * Add component to parent
     */
    render() {
        this.__parent.insertAdjacentHTML('beforeend', mapTemplate(this.__getRadius()));
    }

    /***
     * Remove component
     */
    remove() {
        document.getElementById('map-popup').remove();
    }
}