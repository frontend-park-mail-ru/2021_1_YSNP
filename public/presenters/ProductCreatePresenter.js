import {BasePresenter} from './BasePresenter.js';
import {addSuccesses, createMessageError, hideError, insertError, showError} from '../modules/validationStates.js';
import {amountMask} from '../modules/amountMask.js';
import {httpStatus} from '../modules/httpStatus.js';
import {router} from '../modules/router.js';
import {frontUrls} from '../modules/frontUrls.js';
import {ProductModel} from '../models/ProductModel.js';
import {eventHandlerWithDataType} from '../modules/eventHandler';

export class ProductCreatePresenter extends BasePresenter {

    constructor(view) {
        super(view);
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


    /***
     * @author Ivan Gorshkov
     *
     *  listener for Focus/Blur and cross Event
     * @private
     * @this {ProductCreateFormController}
     * @param {string} dataType - type action
     * @param{Event} ev - event
     */
    __listenerForErrorsAndCross(dataType, ev) {
        ev.preventDefault();
        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && dataType in el.dataset) {
                    actions[el.dataset[dataType]].open(ev);
                }
            });
    }


    /***
     * @author Ivan Gorshkov
     *
     * main listener
     * @private
     * @this {ProductCreateFormController}
     * @param{Event} ev - event
     */
    __listenersClicks(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    if (!actions[el.dataset.action].open(ev.target)) {
                        document.getElementById(`${ev.target.id}Error`).classList.remove('error-hidden');
                    }
                }
            });
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
                    open: this.__validateTextArea.bind(this)
                },
                priceInput: {
                    open: this.__validatePriceInput.bind(this)
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
                    open: this.__validateEmptyInput.bind(this)
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

    __listenerSubmitClick() {
        const price = document.getElementById('priceInput');
        const description = document.getElementById('textareaInput');
        const name = document.getElementById('nameInput');
        const isValidPrice = this.__validatePriceInput(price);
        const isValidDescription = this.__validateTextArea(description);
        const isValidname = this.__validateEmptyInput(name);
        const category = document.getElementById('categorySelect');
        const emptyPhotoField = 0;
        if (isValidname && isValidDescription && isValidPrice && this.__count !== emptyPhotoField) {
            this.__model.fillProductModel({
                name: name.value,
                description: description.value,
                amount: parseInt(price.value.toString().split(' ').join('')),
                category: category.options[category.selectedIndex].text
            });

            this.__model.log();
            const button = document.getElementById('submitProduct');
            button.value = 'Загрузка...';
            button.disabled = true;
            this.__model.create(document.getElementById('createProductForm')).then(({status}) => {
                if (status === httpStatus.StatusOK) {
                    this.__pageRemoveListeners();

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
    __validateEmptyInput(ev) {
        const {error, message} = this.__model.validationName(ev.target.value.toString());
        if (!error) {
            addSuccesses(ev.target, `${ev.target.id}Error`);
            return true;
        }

        insertError(ev.target, `${ev.target.id}Error`, createMessageError(`
        <ul class="list-errors">
            <li>${message}</li>
        </ul>
    `));
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
        document.getElementById(`_profile-pic${ev.target.dataset.id}`).remove();
        document.getElementById(`file-upload${ev.target.dataset.id}`).remove();
        const crosses = document.getElementsByClassName('cross');
        const pictures = document.getElementsByClassName('product__pic');
        const pictureFrames = document.getElementsByClassName('form-row');
        const filesInput = document.getElementsByClassName('file-upload');
        const labelPhoto = document.getElementsByClassName('form-row__photolabel');
        this.__count -= 1;
        for (let i = 0; i <= this.__count; i++) {
            crosses[i].id = `delete${i}`;
            crosses[i].dataset.id = i.toString();
            pictures[i].id = `product__pic${i}`;
            pictures[i].dataset.id = i.toString();
            pictureFrames[i].id = `_profile-pic${i}`;
            filesInput[i].dataset.id = i.toString();
            filesInput[i].id = `file-upload${i}`;
            labelPhoto[i].dataset.id = i.toString();
        }
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
            document.getElementById(`delete${ev.target.dataset.id}`).classList.remove('error-hidden');
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
            document.getElementById(`delete${ev.target.dataset.id}`).classList.add('error-hidden');
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
            reader.onload = this.__onReaderLoad.bind(this, ev.target);
            reader.readAsDataURL(ev.target.files[firstIndex]);
        }

    }

    /***
     * @author Ivan Gorshkov
     *
     * function when picture loaded
     * @param{Object} input - file input
     * @param{Event} e - event from file input
     * @private
     */
    __onReaderLoad(input, e) {
        const elem = document.getElementById(`product__pic${input.dataset.id}`);
        elem.src = e.target.result;
        elem.classList.add('product__pic_fullsize');
        if (parseInt(input.dataset.id) === this.__count) {
            const idPhto = document.getElementById('productPhoto');
            this.__count += 1;
            idPhto.insertAdjacentHTML('beforeend', `
                <div class="form-row" id="_profile-pic${this.__count}">    
                  <label class="form-row__photolabel" data-action="clickUpload" data-move="showCross" data-moveout="hideCross" data-id="${this.__count}"> 
                     <img class="product__pic" id="product__pic${this.__count}" data-id="${this.__count}" src="../../img/svg/photo.svg" alt="">
                     <div class="cross error-hidden" id="delete${this.__count}" data-id='${this.__count}' data-action="delete" ></div>
                   </label>
                </div>
                `);
            const idfile = document.getElementById('files');
            idfile.insertAdjacentHTML('beforeend', `
                <input name="photos" id="file-upload${this.__count}" data-id="${this.__count}" data-action="readURL" class="file-upload" type="file" accept="image/*"/>
            `);

        }

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
            const elem = document.getElementById(`file-upload${ev.target.dataset.id}`);
            elem.click();
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
    __validatePriceInput(ev) {
        const {error, message} = this.__model.validationAmount(ev.target.value.replace(/[^0-9]/g, '').toString());
        ev.target.value = amountMask(ev.target.value);
        if (error) {
            insertError(ev.target, `${ev.target.id}Error`, createMessageError(`
                <ul class="list-errors">
                    <li>${message}</li>
                </ul>
            `));
            return false;
        }
        addSuccesses(ev.target, `${ev.target.id}Error`);
        return true;
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
    __validateTextArea(ev) {

        const {error, message} = this.__model.validationDescription(ev.target.value.toString());

        if (!error) {
            addSuccesses(ev.target, `${ev.target.id}Error`);
            return true;
        }
        insertError(ev.target, `${ev.target.id}Error`, createMessageError(`
        <ul class="list-errors">
            <li>${message}</li>
        </ul>
        `));
        return false;
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