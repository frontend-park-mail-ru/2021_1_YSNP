import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {Board} from '../components/Board/Board.js';

/***
 * class ProductView extends BaseView
 */
export class ProductView extends BaseView {

    /***
     * @author Ivan Gorshkov
     *
     * Class constructor
     * @param {HTMLElement} app - parent element
     * @this {ProductView}
     */
    constructor(app) {
        super(app);
        this.layout = new Layout(this.__app);
    }

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
     * get HTMLElement of layout
     * @return {HTMLElement}
     * @this {ProductView}
     */
    getLayoutParent() {
        return this.layout.parent;
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
     * @author Ivan Gorshkov
     *
     * render with context
     * @param{Object} context
     * @this {ProductView}
     */
    render(context) {
        super.render();
        this.layout.render();
        this.__makeContext(context);
        this.__navSubView = new Navigation(this.getLayoutParent(), 'Главная страница', {route: [this.__context.product.data.category, this.__context.product.data.name]});
        this.__navSubView.render(this.__context);
        this.__boardSubView = new Board(this.getLayoutParent());
        this.__boardSubView.render(this.__context);
    }
}