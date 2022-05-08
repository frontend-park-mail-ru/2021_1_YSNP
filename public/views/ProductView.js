import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {Navigation} from '../components/Navigation/Navigation.js';
import {Board} from '../components/Board/Board.js';
import {ProductTable} from '../components/ProductTable/ProductTable';
import {CloseProduct} from '../components/CloseProduct/CloseProduct';
import {SelectUser} from '../components/ReviewProduct/SelectUser/SelectUser';
import {ReviewUser} from '../components/ReviewProduct/ReviewUser/ReviewUser';

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
                listeners: context.product.listeners,
                owner: context.product.owner
            }
            // trendsList: {
            //     title: 'Похожие товары',
            //     text: 'Пока нет похожих товаров',
            //     id: 'trends',
            //     data: context.recList.data,
            //     listeners: context.recList.listeners
            // }
        };
    }

    /***
     * Render close product component
     * @param {Object} context
     */
    renderCloseProduct(context) {
        this.__closeProduct = new CloseProduct(this.__app);
        this.__closeProduct.render(context);
    }

    /***
     * Remove close product component
     */
    removeCloseProduct() {
        this.__closeProduct.remove();
        this.__closeProduct = undefined;
    }

    /***
     * Render select user component
     * @param {Object} context
     */
    renderSelectUser(context) {
        this.__selectUser = new SelectUser(this.__app);
        this.__selectUser.render(context);
    }

    /***
     * Remove select user component
     */
    removeSelectUser() {
        this.__selectUser.remove();
        this.__selectUser = undefined;
    }

    /***
     * Render review user component
     * @param context
     */
    renderReviewUser(context) {
        this.__reviewUser = new ReviewUser(this.__app);
        this.__reviewUser.render(context);
    }

    /***
     * Set review user error
     * @param {string} msg - message
     */
    reviewUserError(msg) {
        this.__reviewUser.setReviewError(msg);
    }

    /***
     * Get review user text
     * @returns {string}
     */
    reviewUserText() {
        return this.__reviewUser.getReviewText();
    }

    /***
     * Get review user star
     * @returns {number}
     */
    reviewUserStar() {
        return this.__reviewUser.getReviewStar();
    }

    /***
     * Remove review user component
     */
    removeReviewUser() {
        this.__reviewUser.remove();
        this.__reviewUser = undefined;
    }

    /***
     * Like product
     * @param {number} id - product id
     */
    likeProduct(id) {
        this.__trendsList.like(id);
    }

    /***
     * Dislike product
     * @param {number} id - product id
     */
    dislikeProduct(id) {
        this.__trendsList.dislike(id);
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
     *
     * get tel
     * @return {string}
     */
    getTelNumber() {
        return this.__boardSubView.getTelNumber();
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

        // this.__trendsList = new ProductTable(parent);
        // this.__trendsList.render(this.__context.trendsList);
        super.renderFooter();
    }
}