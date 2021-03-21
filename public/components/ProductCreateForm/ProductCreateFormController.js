'use strict';

import {ProductModel} from '../../models/ProductModel.js';
import {httpStatus} from '../../modules/httpStatus.js';
import {amountMask} from '../../modules/amountMask.js';
import {insertError, addSuccesses, createMessageError, hideError, showError} from '../../modules/validationStates.js';

import {router} from '../../modules/router.js';
import {pageUrls} from '../../modules/pageUrls.js';

/***
 * @author Max Torzhkov, Ivan Gorshkov
 * ProduCreateForm controller
 * @class ProductCreateFormController
 */
export class ProductCreateFormController {

    /***
     * @author Max Torzhkov, Ivan Gorshkov
     * Class constructor
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {ProductCreateForm}productCreateForm - form
     * @constructor
     * @this {ProductCreateFormController}
     * @public
     */
    constructor(pageRemoveListeners, parent, productCreateForm) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__productCreateForm = productCreateForm;
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

    /***
     * @author Max Torzhkov
     *
     * Add listeners
     * @this {ProductCreateFormController}
     * @public
     */
    control() {
        this.__productCreateForm.listeners = this.__createListeners();
        this.__productCreateForm.addListeners();
    }

    /***
     * @author Max Torzhkov
     * Remove Controller listeners
     * @this {ProductCreateFormController}
     * @public
     */
    removeControllerListeners() {
        this.__productCreateForm.removeListeners();
    }

    /***
     * @author Max Torzhkov, Ivan Gorshkov
     * listener for submit
     * @returns {{cost, name, photo, location, category, subcategory, info}}
     * @private
     */
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

                    router.redirect(pageUrls.main);
                }
            });
        }
    }

    /***
     * @author Max Torzhkov, Ivan Gorshkov
     * Get form listeners
     * @returns {Object}
     * @private
     */
    __createListeners() {
        return {
            submitClick: {
                type: 'click',
                listener: this.__listenersClicks.bind(this)
            },
            validateInput: {
                type: 'input',
                listener: this.__listenersClicks.bind(this)
            },
            validateChange: {
                type: 'change',
                listener: this.__listenersClicks.bind(this)

            },
            showError: {
                type: 'mouseover',
                listener: this.__listenerForErrorsAndCross.bind(this, 'move')

            },
            hideError: {
                type: 'mouseout',
                listener: this.__listenerForErrorsAndCross.bind(this, 'moveout')

            },
            focusInput: {
                type: 'focus',
                listener: this.__listenerForErrorsAndCross.bind(this, 'move')

            },
            blurInput: {
                type: 'blur',
                listener: this.__listenerForErrorsAndCross.bind(this, 'moveout')

            }
        };
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

    /***
     * @author Ivan Gorshkov
     *
     * Object with all actions
     * @return {Object}
     * @this {ProductCreateFormController}
     * @private
     */
    __getActions() {
        return {
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
        };
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
        if (!error) {
            addSuccesses(target, `${target.id}Error`);
            return true;
        }

        insertError(target, `${target.id}Error`, createMessageError(`
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
    __deletePicture(target) {
        document.getElementById(`_profile-pic${target.dataset.id}`).remove();
        document.getElementById(`file-upload${target.dataset.id}`).remove();
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
    __read(input) {
        const firstIndex = 0;
        if (input.files && input.files[firstIndex]) {
            const reader = new FileReader();
            reader.onload = this.__onReaderLoad.bind(this, input);
            reader.readAsDataURL(input.files[firstIndex]);
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
    __upload(target) {
        const maxPics = 10;
        if (this.__count < maxPics) {
            const elem = document.getElementById(`file-upload${target.dataset.id}`);
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
    __validatePriceInput(target) {
        const {error, message} = this.__model.validationAmount(target.value.replace(/[^0-9]/g, '').toString());
        target.value = amountMask(target.value);
        if (error) {
            insertError(target, `${target.id}Error`, createMessageError(`
                <ul class="list-errors">
                    <li>${message}</li>
                </ul>
            `));
            return false;
        }
        addSuccesses(target, `${target.id}Error`);
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
    __validateTextArea(target) {

        const {error, message} = this.__model.validationDescription(target.value.toString());

        if (!error) {
            addSuccesses(target, `${target.id}Error`);
            return true;
        }
        insertError(target, `${target.id}Error`, createMessageError(`
        <ul class="list-errors">
            <li>${message}</li>
        </ul>
        `));
        return false;
    }
}