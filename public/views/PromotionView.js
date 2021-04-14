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
                idProduct: context.promotion.idProduct,
                listeners: context.promotion.listeners
            }
        };
    }

    /***
     * Set base tariff
     */
    setBase() {
        this.__promotion.setBase();
    }

    /***
     * Set improved tariff
     */
    setImproved() {
        this.__promotion.setImproved();
    }

    /***
     * Set advanced tariff
     */
    setAdvanced() {
        this.__promotion.setAdvanced();
    }

    /***
     * Set nothing
     */
    setNothing() {
        this.__promotion.setNothing();
    }

    /***
     * Return status of sending selected item
     * @returns {{status: string}|{status: string}|{status: string}|{status: string}|{status: string}}
     */
    getSelected() {
        return this.__promotion.getSelected();
    }

    /***
     * Remove promotion listeners
     */
    removeListeners() {
        this.__promotion.removeListeners();
    }

    /***
     * Remove error message
     */
    removeError() {
        this.__promotion.removeError();
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Продвижение товара';
    }

    /***
     * Render view
     */
    render(context) {
        super.render();
        this.__setTitle();
        this.__makeContext(context);

        const layout = new Layout(this.__app, true);
        layout.render();
        const parent = layout.parent;

        this.__promotion = new AdPromotion(parent);
        this.__promotion.render(this.__context.promotion);

        super.renderFooter();
    }
}