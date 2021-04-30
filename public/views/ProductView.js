import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {Board} from '../components/Board/Board.js';
import {router} from '../modules/router';
import {mobile} from '../modules/mobile';

/***
 * class ProductView extends BaseView
 */
export class ProductView extends BaseView {
    /***
     * @author Ivan Gorshkov
     *
     * make new context from context presenter and view
     * @param{Object} context - context from Presenter
     * @private
     */
    __makeContext(context) {
        this.__context = {
            navigation: {
                data: context.navigation.data,
                listeners: context.navigation.listeners
            },
            product: {
                data: context.product.data,
                listeners: context.product.listeners
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * remove listeners from components
     * @this {ProductView}
     */
    removingSubViews() {
        this.__boardSubView.removeListeners();
    }

    /***
     * @author Ivan Gorshkov
     *
     * function for rotate Forward Slider
     * @this {ProductView}
     */
    rotateForward() {
        this.__boardSubView.rotateForward();
    }

    /***
     * @author Ivan Gorshkov
     *
     * function for rotate Backward Slider
     * @this {ProductView}
     */
    rotateBackward() {
        this.__boardSubView.rotateBackward();
    }

    /***
     * @author Ivan Gorshkov
     *
     * function for add new pic to img tag
     * @param{HTMLElement} target
     * @this {ProductView}
     */
    selectPicture(target) {
        this.__boardSubView.selectImage(target);
    }


    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = `${this.__context.product.data.__name}`;
    }

    /***
     * Show user number
     * @param tel
     */
    showNumber(tel) {
        this.__boardSubView.showNumber(tel);
    }

    /***
     * @author Ivan Gorshkov
     *
     * render with context
     * @param{Object} context
     * @this {ProductView}
     */
    render(context) {
        this.__makeContext(context);
        super.render();

        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        if (!mobile.isMobile()) {
            this.__navSubView = new Navigation(parent, router.getPreviousTitle(), {route: [this.__context.product.data.__category, this.__context.product.data.__name]});
            this.__navSubView.render(this.__context);
        }

        this.__boardSubView = new Board(parent);
        this.__boardSubView.render(this.__context);

        super.renderFooter();
    }
}