import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout';
import {AdPromotion} from '../components/AdPromotion/AdPromotion';

/***
 * Profile view
 */
export class PromotionView extends BaseView {
    /***
     * Make view context
     * @param context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            promotion: {
                data: context.promotion.data,
                idProduct: context.promotion.idProduct,
                listeners: context.promotion.listeners
            }
        };
    }

    /***
     * Render view
     */
    render(context) {
        super.render();
        this.__makeContext(context);

        const layout = new Layout(this.__app);
        layout.render();
        const parent = layout.parent;

        this.__promotion = new AdPromotion(parent);
        this.__promotion.render(this.__context.promotion);
    }
}