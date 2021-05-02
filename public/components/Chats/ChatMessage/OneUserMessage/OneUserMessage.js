import oneUserMessageTemplate from './OneUserMessage.hbs';
import './OneUserMessage.scss';

/***
 * One user message component
 */
export class OneUserMessage {
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

            if (context.isDown) {
                this.__parent.insertAdjacentHTML('beforeend', oneUserMessageTemplate(this.__context));
                return;
            }

            this.__parent.insertAdjacentHTML('afterbegin', oneUserMessageTemplate(this.__context));
        } catch (err) {
            console.log(err.message);
        }
    }
}