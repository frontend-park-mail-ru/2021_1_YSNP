import {BasePresenter} from './BasePresenter.js';
import {addSuccesses, hideError, insertError, showError} from '../modules/validationStates.js';
import {amountMask} from '../modules/amountMask.js';
import {httpStatus} from '../modules/httpStatus.js';
import {router} from '../modules/router.js';
import {frontUrls} from '../modules/frontUrls.js';
import {ProductModel} from '../models/ProductModel.js';
import {eventHandlerWithDataType} from '../modules/eventHandler';
import {noop} from '../models/Noop.js';
import {checkAuth} from '../modules/checkAuth.js';

/***
 *  ProductCreatePresenter class, extends from BasePresenter
 */
export class ProductCreatePresenter extends BasePresenter {

    /***
     * Class constructor
     * @param {ProductCreateView} view - view
     */
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
     * @this {ProductCreatePresenter}
     * @private
     */
    get __count() {
        return this.__countPhoto;
    }

    /***
     * @author Ivan Gorshkov
     *
     * setter for picture count
     * @this {ProductCreatePresenter}
     * @private
     * @param {number} value - new value
     */
    set __count(value) {
        this.__countPhoto = value;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Update view data
     * @returns {Promise<void>}
     * @this {ProductCreatePresenter}
     */
    async update() {
        await super.update();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Control view
     * @returns {Promise<void>}
     * @this {ProductCreatePresenter}
     */
    async control() {
        await this.update();
        checkAuth();
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
     * @this {ProductCreatePresenter}
     */
    __listenerCreateProduct(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {ProductCreatePresenter}
     * @return {Object}
     * @private
     */
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

    /***
     * @author Ivan Gorshkov
     *
     * action for navigation to back
     * @this {ProductCreatePresenter}
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
     * Get productCreate actions
     * @this {ProductCreatePresenter}
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
                },
                tapMap: {
                    open: this.__validateFields.bind(this, this.__validateAddressInput.bind(this))
                }
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input confirmpassword
     * @private
     * @this {ProductCreatePresenter}
     * @param {Function} validFunc
     * @param {Event} ev
     */
    async __validateFields(validFunc, ev) {
        if (!await validFunc(ev.target)) {
            this.__view.hideError(this.__view.getErrorId(ev.target));
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * validate name
     * @param{HTMLElement} target
     * @return {boolean}
     * @private
     * this {ProductCreatePresenter}
     */
    async __validateAddressInput(target) {
        return await this.__model.validationPos(target.value.toString()).then(({
                                                                                   error,
                                                                                   message
                                                                               }) => this.__handlingErrors(error, target, message));
    }

    /***
     * @author Ivan Gorshkov
     *
     * action when submit form
     * @private
     * @this {ProductCreatePresenter}
     */
    async __listenerSubmitClick() {
        const {price, description, name, category, address} = this.__view.getAllFields();
        const isValidPrice = this.__validatePriceInput(price);
        const isValidDescription = this.__validateTextArea(description);
        const isValidName = this.__validateEmptyInput(name);
        const isValidAddress = await this.__validateAddressInput(address);
        const emptyPhotoField = 0;
        console.log(isValidAddress);
        if (isValidName && isValidDescription && isValidPrice && isValidAddress && this.__count !== emptyPhotoField) {
            this.__model.fillProductModel({
                name: name.value,
                description: description.value,
                amount: parseInt(price.value.toString().split(' ').join('')),
                category: category.options[category.selectedIndex].text,
                latitude: this.__view.getPos().latitude,
                longitude: this.__view.getPos().longitude,
                address: this.__view.getAddress()
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
     * validate name
     * @param{HTMLElement} target
     * @return {boolean}
     * @private
     * this {ProductCreatePresenter}
     */
    __validateEmptyInput(target) {
        const {error, message} = this.__model.validationName(target.value.toString());
        return this.__handlingErrors(error, target, message);
    }

    /***
     * @author Ivan Gorshkov
     *
     * handlingErrors
     * @param {boolean} error
     * @param {HTMLElement} target
     * @param {[string]} message
     * @param {Function} supprotValidate
     * @return {boolean}
     * @this {ProductCreatePresenter}
     * @private
     */
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
     * this {ProductCreatePresenter}
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
     * this {ProductCreatePresenter}
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
     * this {ProductCreatePresenter}
     */
    __hideCross(ev) {
        if (parseInt(ev.target.dataset.id) !== this.__count && (ev.target.tagName === 'IMG' || ev.target.tagName === 'DIV')) {
            this.__view.hideCross(ev.target);
        }
    }

    /****
     * @author Ivan Gorshkov
     *
     * update picture from fileSystem
     * @param {Event} ev
     * @private
     * this {ProductCreatePresenter}
     */
    __read(ev) {
        const firstIndex = 0;
        if (ev.target.files && ev.target.files[firstIndex]) {
            const reader = new FileReader();
            reader.onload = this.__view.onReaderLoad.bind(this.__view, ev.target, this.__count, this.__incCount.bind(this));

            reader.readAsDataURL(ev.target.files[firstIndex]);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * inc number of pictures
     * @private
     * this {ProductCreatePresenter}
     */
    __incCount() {
        this.__count += 1;
    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system menu action
     * @private
     * this {ProductCreatePresenter}
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
     * validate price
     * @param{Object} target
     * @return {boolean}
     * @private
     * @this {ProductCreatePresenter}
     */
    __validatePriceInput(target) {
        const {error, message} = this.__model.validationAmount(target.value.replace(/[^0-9]/g, '').toString());
        target.value = amountMask(target.value);
        return this.__handlingErrors(error, target, message);
    }


    /***
     * @author Ivan Gorshkov
     *
     *  validate textArea
     * @param{Object} target
     * @return {boolean}
     * @private
     * @this {ProductCreatePresenter}
     */
    __validateTextArea(target) {
        const {error, message} = this.__model.validationDescription(target.value.toString());
        return this.__handlingErrors(error, target, message);
    }

    /***
     * @author Ivan Gorshkov
     *
     * Make view context
     * @returns {{productList: {data: *[], listeners: {productCardClick: {listener: *, type: string}}}}}
     * @private
     * @this {ProductCreatePresenter}
     */
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

