import {BasePresenter} from './BasePresenter.js';
import {router} from '../modules/router.js';
import {eventHandlerWithDataType} from '../modules/eventHandler.js';
import {ProductModel} from '../models/ProductModel.js';

export class ProductPresenter extends BasePresenter {
    constructor(view, id) {
        super(view);
        this.__id = id;
        this.__model = new ProductModel({id: this.__id});
        this.__view = view;
    }

    async update() {
        await super.update();
        await this.__model.update();
    }

    async control() {
        await this.update();
        this.__view.render(this.__makeContext());
    }

    __listenerProduct(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
    }

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

    __navBack() {
        this.closeAllComponents();
        this.__view.removingSubViews();
        router.navigateBack();
    }

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

    __listenerToNext() {
        this.__view.rotateForward();
    }


    __listenerToBack() {
        this.__view.rotateBackward();
    }

    /***
     * @author Ivan Gorshkov
     *
     * listener for select photo
     * @private
     * @this {BoardController}
     * @param {MouseEvent} ev - event
     */
    __listenerSelectImage(ev) {
        ev.preventDefault();
        const elem = document.getElementById('pic');
        elem.src = ev.target.src;
        const carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img');
        for (let i = 0; i < images.length; ++i) {
            images[i].style.opacity = '0.3';
        }
        ev.target.style.opacity = '1.0';
    }


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
     * @this {BoardController}
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