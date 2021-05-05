import offlineTemplate from './PageOffline.hbs';
import './PageOffline.scss';

/***
 * Page offline component
 */
export class PageOffline {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Add component to parent
     */
    render() {
        try {
            this.__parent.insertAdjacentHTML('beforeend', offlineTemplate());
        } catch (err) {
            console.log(err.message);
        }
    }
}