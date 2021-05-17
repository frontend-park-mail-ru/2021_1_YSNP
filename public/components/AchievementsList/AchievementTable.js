import achievementTableTemplate from '../ProductTable/ProductTable.hbs';
import '../ProductTable/ProductTable.scss';

import {Achievement} from './Achievement/Achievement.js';
import {EmptyMessage} from '../ProductTable/EmptyMessage/EmptyMessage';

/***
 * AchievementTable - table of components Achievement
 */
export class AchievementTable {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Render empty message
     * @param {HTMLElement} parent
     * @private
     */
    __addEmptyMessage(parent) {
        const emptyMessage = new EmptyMessage(parent);
        emptyMessage.render(this.__context);
    }

    /***
     * Add cards to table
     * @param {Object[]} data - cards
     * @private
     */
    __addAchievement(data) {
        const table = this.__getParent();
        if (data.length === 0) {
            this.__addEmptyMessage(table);
            return;
        }

       data.forEach((el) => {
            const productCard = new Achievement(table);
            productCard.render(el);
        });

    }

    /***
     * Get parent
     * @returns {Element}
     * @private
     */
    __getParent() {
        return this.__parent.querySelector(`[id="product-table-body${this.__context.id}"]`);
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', achievementTableTemplate(this.__context));
            this.__addAchievement(this.__context.data);
        } catch (err) {
            console.log(err.message);
        }
    }
}