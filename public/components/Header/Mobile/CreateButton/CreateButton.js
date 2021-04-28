import createButtonTemplate from './CreateButton.hbs';
import './CreateButton.scss';

/***
 * Create button component
 */
export class CreateButton {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    __getCreateButton() {
        return document.getElementById('create-button');
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        this.__getCreateButton()
            .addEventListener(this.__context.listeners.headerClick.type, this.__context.listeners.headerClick.listener);
    }

    /***
     * Remove component listeners
     */
    __removeListeners() {
        this.__getCreateButton()
            .removeEventListener(this.__context.listeners.headerClick.type, this.__context.listeners.headerClick.listener);
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', createButtonTemplate());
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
            this.__getCreateButton().remove();
        } catch (err) {
            console.log(err.message);
        }
    }
}
