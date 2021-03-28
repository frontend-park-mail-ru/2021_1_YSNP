import {BasePresenter} from './BasePresenter.js';
import {addSuccesses, hideError, insertError, showError} from '../modules/validationStates.js';
import {amountMask} from '../modules/amountMask.js';
import {httpStatus} from '../modules/httpStatus.js';
import {router} from '../modules/router.js';
import {frontUrls} from '../modules/frontUrls.js';
import {ProductModel} from '../models/ProductModel.js';
import {eventHandlerWithDataType} from '../modules/eventHandler';

/***
 *  noop function
 */
const noop = () => {};

export class ProductCreatePresenter extends BasePresenter {

    constructor(view) {
        super(view);
        this.__view = view;
        this.__countPhoto = 0;
        this.__model = new ProductModel();
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter for picture count
     * @return {number}
     * @this {ProductCreateFormController}
     * @private
     */
    get __count() {
        return this.__countPhoto;
    }

    /***
     * @author Ivan Gorshkov
     *
     * setter for picture count
     * @this {ProductCreateFormController}
     * @private
     * @param {number} value - new value
     */
    set __count(value) {
        this.__countPhoto = value;
    }

    async update() {
        await super.update();
    }

    async control() {
        await this.update();
        if (!this.__userModel.isAuth) {
            router.redirect(frontUrls.registration);
            return;
        }
        this.__view.render(this.__makeContext());
    }


    /***
     * Header click listener
     * @param {MouseEvent} ev - event
     * @param dataType
     * @param actions
     * @private
     */
    __listenerCreateProduct(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
    }

    __createListeners() {
        return {
            navigation: {
                backClick: {
                    type: 'click',
                    listener: this.__listenerCreateProduct.bind(this, 'action', this.__getActions().navigation)
                }
            },
            productCreate: {
                submitClick: {
                    type: 'click',
                    listener: this.__listenerCreateProduct.bind(this, 'action', this.__getActions().productCreate)
                },
                validateInput: {
                    type: 'input',
                    listener: this.__listenerCreateProduct.bind(this, 'action', this.__getActions().productCreate)
                },
                validateChange: {
                    type: 'change',
                    listener: this.__listenerCreateProduct.bind(this, 'action', this.__getActions().productCreate)

                },
                showError: {
                    type: 'mouseover',
                    listener: this.__listenerCreateProduct.bind(this, 'move', this.__getActions().productCreate)

                },
                hideError: {
                    type: 'mouseout',
                    listener: this.__listenerCreateProduct.bind(this, 'moveout', this.__getActions().productCreate)

                },
                focusInput: {
                    type: 'focus',
                    listener: this.__listenerCreateProduct.bind(this, 'move', this.__getActions().productCreate)

                },
                blurInput: {
                    type: 'blur',
                    listener: this.__listenerCreateProduct.bind(this, 'moveout', this.__getActions().productCreate)
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
            productCreate: {
                submitClick: {
                    open: this.__listenerSubmitClick.bind(this)
                },
                delete: {
                    open: this.__deletePicture.bind(this)
                },
                textareaInputEmpty: {
                    open: this.__validateFields.bind(this, this.__validateTextArea.bind(this))
                },
                priceInput: {
                    open: this.__validateFields.bind(this, this.__validatePriceInput.bind(this))
                },
                clickUpload: {
                    open: this.__upload.bind(this)
                },
                readURL: {
                    open: this.__read.bind(this)
                },
                showCross: {
                    open: this.__showCross.bind(this)
                },
                hideCross: {
                    open: this.__hideCross.bind(this)
                },
                inputEmpty: {
                    open: this.__validateFields.bind(this, this.__validateEmptyInput.bind(this))
                },
                showError: {
                    open: showError.bind(this)
                },
                hideError: {
                    open: hideError.bind(this)
                }
            }
        };
    }

    __validateFields(validFunc, ev) {
        if (!validFunc(ev.target)) {
            this.__view.hideError(this.__view.getErrorId(ev.target));
        }
    }

    __listenerSubmitClick() {
        const {price, description, name, category} = this.__view.getAllFields();
        const isValidPrice = this.__validatePriceInput(price);
        const isValidDescription = this.__validateTextArea(description);
        const isValidname = this.__validateEmptyInput(name);
        const emptyPhotoField = 0;
        if (isValidname && isValidDescription && isValidPrice && this.__count !== emptyPhotoField) {
            this.__model.fillProductModel({
                name: name.value,
                description: description.value,
                amount: parseInt(price.value.toString().split(' ').join('')),
                category: category.options[category.selectedIndex].text
            });
            this.__view.changeDisableButton();
            this.__model.create(this.__view.getForm()).then(({status}) => {
                if (status === httpStatus.StatusOK) {
                    this.closeAllComponents();
                    this.__view.removingSubViews();
                    router.redirect(frontUrls.main);
                }
            });
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate name
     * @param{Object} target
     * @return {boolean}
     * @private
     * @this {ProductCreateFormController}
     */
    __validateEmptyInput(target) {
        const {error, message} = this.__model.validationName(target.value.toString());
        return this.__handlingErrors(error, target, message);
    }

    __handlingErrors(error, target, message, supprotValidate = noop) {
        if (!error) {
            addSuccesses(target, this.__view.getErrorId(target));
            supprotValidate();
            return true;
        }
        insertError(target, this.__view.getErrorId(target), this.__view.addErrorForm(message));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Action for deleting pictures
     * @return {Object}
     * @this {ProductCreateFormController}
     * @private
     */
    __deletePicture(ev) {
        this.__count = this.__view.deletePicture(ev.target, this.__count -= 1);
        document.event.stopImmediatePropagation();
    }

    /***
     * @author Ivan Gorshkov
     *
     * action for cross showing
     * @param{Event} ev - event for show cross
     * @private
     */
    __showCross(ev) {
        if (parseInt(ev.target.dataset.id) !== this.__count && (ev.target.tagName === 'IMG' || ev.target.tagName === 'DIV')) {
            this.__view.showCross(ev.target);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * action for cross hide
     * @param{Event} ev - event for hide cross
     * @private
     */
    __hideCross(ev) {
        if (parseInt(ev.target.dataset.id) !== this.__count && (ev.target.tagName === 'IMG' || ev.target.tagName === 'DIV')) {
            this.__view.hideCross(ev.target);
        }
    }

    /****
     * @author Ivan Gorshkov
     *
     * update profile picture action
     * @param input
     * @private
     */
    __read(ev) {
        const firstIndex = 0;
        if (ev.target.files && ev.target.files[firstIndex]) {
            const reader = new FileReader();
            reader.onload = this.__view.onReaderLoad.bind(this.__view, ev.target, this.__count, this.__incCount.bind(this));

            reader.readAsDataURL(ev.target.files[firstIndex]);
        }
    }

    __incCount() {
        this.__count += 1;
        console.log(this.__count);
    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system menu action
     * @private
     */
    __upload(ev) {
        const maxPics = 10;
        if (this.__count < maxPics) {
            this.__view.openFileSystem(ev.target);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate price
     * @param{Object} target
     * @return {boolean}
     * @private
     * @this {ProductCreateFormController}
     */
    __validatePriceInput(target) {
        const {error, message} = this.__model.validationAmount(target.value.replace(/[^0-9]/g, '').toString());
        target.value = amountMask(target.value);
        return this.__handlingErrors(error, target, message);
    }


    /***
     * @author Ivan Gorshkov
     *
     * action to validate textArea
     * @param{Object} target
     * @return {boolean}
     * @private
     * @this {ProductCreateFormController}
     */
    __validateTextArea(target) {
        const {error, message} = this.__model.validationDescription(target.value.toString());
        return this.__handlingErrors(error, target, message);
    }

    __makeContext() {
        return {
            navigation: {
                data: null,
                listeners: this.__createListeners().navigation
            },
            productCreate: {
                data: null,
                listeners: this.__createListeners().productCreate
            }
        };
    }
}