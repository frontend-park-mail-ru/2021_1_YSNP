import infoTextTemplate from './InfoText.hbs';
import './InfoText.scss';

/***
 * Info text component
 */
export class InfoText {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', infoTextTemplate(this.__context));
        } catch (err) {
            console.log(err.message);
        }
    }
}
