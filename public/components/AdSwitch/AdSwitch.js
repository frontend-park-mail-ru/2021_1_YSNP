import './AdSwitch.css';

/***
 * Ad switch component
 */
export class AdSwitch {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Component HTML
     * @returns {string}
     * @private
     */
    __getTemplate() {
        return `
           <div class="ad-switch">
                <div class="ad-switch-inner">
                    <span class="ad-switch-inner__title">Все объявления</span>
                </div>
           </div>
        `;
    }

    /***
     * Add component to parent
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
