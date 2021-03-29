import adSwitchTemplate from './Switch.hbs';
import './Switch.css';

/***
 * Ad switch component
 */
export class Switch {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Select button
     * @param {string} name - button name
     */
    selectButton(name) {
        this.__parent
            .querySelector(`[name="${name}"]`)
            .classList
            .add('switch-buttons__button_selected');
    }

    /***
     * Unselect button
     * @param {string} name - button name
     */
    unSelectButton(name) {
        this.__parent
            .querySelector(`[name="${name}"]`)
            .classList
            .remove('switch-buttons__button_selected');
    }

    /***
     * Unselect all buttons
     */
    unSelectAllButtons() {
        this.__context.data.buttons.forEach((el) => {
            this.unSelectButton(el.name);
        });
    }

    /***
     * Add listeners
     */
    __addListeners() {
        if (this.__context.data.hasButtons) {
            document
                .getElementById('switch-buttons')
                .addEventListener(this.__context.listeners.buttonsClick.type, this.__context.listeners.buttonsClick.listener);
        }
    }

    // __listener(ev) {
    //     console.log(ev);
    // }
    //
    // __makeContext() {
    //     return {
    //         data: {
    //             title: 'Все объявления',
    //             hasButtons: true,
    //             buttons: [
    //                 {
    //                     name: 'button1',
    //                     title: 'Кнопка 1',
    //                     action: 'button1Click'
    //                 },
    //                 {
    //                     name: 'button2',
    //                     title: 'Кнопка 2',
    //                     action: 'button2Click'
    //                 }
    //             ]
    //         },
    //         listeners: {
    //             buttonsClick: {
    //                 type: 'click',
    //                 listener: this.__listener.bind(this)
    //             }
    //         }
    //     };
    // }

    /***
     * Add component to parent
     * @param {Object} context - component context
     */
    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', adSwitchTemplate(this.__context.data));
            this.__addListeners();
        } catch (err) {
            console.log(err.message);
        }
    }
}
