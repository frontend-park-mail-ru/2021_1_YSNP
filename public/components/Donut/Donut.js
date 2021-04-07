import './donut-donut.js';
import donutTemplate from './Donut.hbs';
import './Donut.css';

/***
 * You find donut
 */
export class Donut {
    /***
     * Class constructor
     * @param parent
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Render component
     */
    render() {
        try {
            this.__parent.insertAdjacentHTML('beforeend', donutTemplate());
        } catch (err) {
            console.log(err.message);
        }
    }
}