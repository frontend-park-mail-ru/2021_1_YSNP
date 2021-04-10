import {BasePresenter} from './BasePresenter.js';
import {router} from '../modules/router.js';
import {eventHandlerWithDataType} from '../modules/eventHandler.js';
import {ProductModel} from '../models/ProductModel.js';

/***
 *  ProductPresenter class, extends from BasePresenter
 */
export class ProductPresenter extends BasePresenter {

    /***
     * Class constructor
     * @param {ProductView} view - view
     * @param {number} id - id of product
     * @this {ProductPresenter}
     */
    constructor(view, id) {
        super(view);
        this.__view = view;
        this.__id = id;
        this.__model = new ProductModel({id: this.__id});
    }

    /***
     * @author Ivan Gorshkov
     *
     * Update view data
     * @returns {Promise<{}>}
     * @this {ProductPresenter}
     */
    async update() {
        return super.update()
            .then(() => this.__model.update())
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * Control view
     * @returns {Promise<void>}
     * @this {ProductPresenter}
     */
    async control() {
        await this.update();
        console.log(this.__makeContext());
        this.__view.render(this.__makeContext());
    }

    /***
     * @author Ivan Gorshkov
     *
     * Header click listener
     * @param {MouseEvent} ev - event
     * @param {string} dataType
     * @param {Object} actions
     * @private
     * @this {ProductPresenter}
     */
    __listenerProduct(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {ProductPresenter}
     * @return {Object}
     * @private
     */
    __createListeners() {
        return {
            navigation: {
                backClick: {
                    type: 'click',
                    listener: this.__listenerProduct.bind(this, 'action', this.__getActions().navigation)
                }
            },
            product: {
                product: {
                    type: 'click',
                    listener: this.__listenerProduct.bind(this, 'action', this.__getActions().product)
                }
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * action for navigation to back
     * @this {ProductPresenter}
     * @private
     */
    __navBack() {
        this.closeAllComponents();
        this.__view.removingSubViews();
        router.navigateBack();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Get product actions
     * @this {ProductPresenter}
     * @returns {Object}
     * @private
     */
    __getActions() {
        return {
            navigation: {
                backClick: {
                    open: this.__navBack.bind(this)
                }
            },
            product: {
                nextClick: {
                    open: this.__listenerToNext.bind(this)
                },
                backClick: {
                    open: this.__listenerToBack.bind(this)
                },
                selectClick: {
                    open: this.__listenerSelectImage.bind(this)
                },
                numberClick: {
                    open: this.__listenerShowNumber.bind(this)
                },
                massageClick: {
                    open: this.__listenerWriteMassage.bind(this)
                }
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to tern next pic in slider
     * @this {ProductPresenter}
     * @private
     */
    __listenerToNext() {
        this.__view.rotateForward();
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to tern back pic in slider
     * @this {ProductPresenter}
     * @private
     */
    __listenerToBack() {
        this.__view.rotateBackward();
    }

    /***
     * @author Ivan Gorshkov
     *
     * listener for select photo
     * @private
     * @this {ProductPresenter}
     * @param {MouseEvent} ev - event
     */
    __listenerSelectImage(ev) {
        this.__view.selectPicture(ev.target);
    }

    /***
     * @author Ivan Gorshkov
     * listener for show number
     * @this {ProductPresenter}
     * @private
     */
    __listenerShowNumber() {
        // TODO(Ivan) release __listenerShowNumber
        if (this.__userModel.isAuth) {
            console.log('number');
        } else {
            this.__openAuth();
        }
    }

    /***
     * @author Ivan Gorshkov
     * listener for write massage
     * @this {ProductPresenter}
     * @private
     */
    __listenerWriteMassage() {
        // TODO(Ivan) release __listenerWriteMassage
        if (this.__userModel.isAuth) {
            console.log('massage');
        } else {
            this.__openAuth();
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * Make view context
     * @returns {Object}
     * @private
     * @this {ProductPresenter}
     */
    __makeContext() {
        return {
            navigation: {
                data: null,
                listeners: this.__createListeners().navigation
            },
            product: {
                data: this.__model,
                listeners: this.__createListeners().product
            }
        };
    }
}