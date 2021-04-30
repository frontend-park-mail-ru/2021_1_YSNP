import emptyMessageTemplate from './EmptyMessage.hbs';
import './EmptyMessage.scss';

/***
 * Empty message component
 */
export class EmptyMessage {
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
            this.__parent.insertAdjacentHTML('beforeend', emptyMessageTemplate(this.__context));
        } catch (err) {
            console.log(err.message);
        }
    }
}
