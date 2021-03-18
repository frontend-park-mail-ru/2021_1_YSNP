import './Map.css';
import mapTemplate from './Map.hbs';
/***
 * @author Ivan Gorshkov
 * Map class for seller location
 * @class Map
 */
export class Map {

    /***
     * @author Ivan Gorshkov
     * init of class Map
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
    render() {
        this.__parent.insertAdjacentHTML('beforeend', mapTemplate());
    }
}
