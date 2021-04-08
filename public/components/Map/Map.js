import mapTemplate from './Map.hbs';
import './Map.scss';

/***
 * YandexMap component
 */
export class Map {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        document
            .getElementById('map-content')
            .addEventListener(this.__context.listeners.mapClick.type, this.__context.listeners.mapClick.listener);

        window
            .addEventListener(this.__context.listeners.keyClick.type, this.__context.listeners.keyClick.listener);
    }

    /***
     * Remove component listeners
     */
    __removeListeners() {
        document
            .getElementById('map-content')
            .removeEventListener(this.__context.listeners.mapClick.type, this.__context.listeners.mapClick.listener);

        window
            .removeEventListener(this.__context.listeners.keyClick.type, this.__context.listeners.keyClick.listener);
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
                    text: '1 км',
                    value: 1
                },
                {
                    id: 'groupRadio2',
                    text: '5 км',
                    value: 5
                },
                {
                    id: 'groupRadio3',
                    text: '10 км',
                    value: 10
                },
                {
                    id: 'groupRadio4',
                    text: '25 км',
                    value: 25
                },
                {
                    id: 'groupRadio5',
                    text: '50 км',
                    value: 50
                },
                {
                    id: 'groupRadio6',
                    text: 'более 50 км',
                    value: 0
                }
            ]
        };
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', mapTemplate(this.__getRadius()));
            this.__addListeners();
        } catch (err) {
            console.log(err.message);
        }
    }

    /***
     * Remove component
     */
    remove() {
        try {
            this.__removeListeners();
            document.getElementById('map-popup').remove();
        } catch (err) {
            console.log(err.message);
        }
    }
}