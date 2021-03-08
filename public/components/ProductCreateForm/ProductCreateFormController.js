'use strict';

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
     * @param {Event} ev - event
     * @returns {{cost, name, photo, location, category, subcategory, info}}
     * @private
     */
    __listenerSubmitClick() {
        const price = document.getElementById('priceInput');
        const description = document.getElementById('textareaInput');
        const isValidPrice = this.__validatePriceInput(price);
        const isValidDescription = this.__validateTextArea(description);
        if (isValidDescription && isValidPrice && this.__count !== 0) {
            //TODO Add New Product
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
                listener: this.__listenersMouseIn.bind(this)

            },
            hideError: {
                type: 'mouseout',
                listener: this.__listenersMouseOut.bind(this)

            }
        };
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
                    ev.stopPropagation();
                    actions[el.dataset.action].open(ev.target);
                }
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * listener for MouseIn Event
     * @private
     * @this {ProductCreateFormController}
     * @param{Event} ev - event
     */
    __listenersMouseIn(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'move' in el.dataset) {
                    actions[el.dataset.move].open(ev.target);
                }
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     *  listener for MouseOut Event
     * @private
     * @this {ProductCreateFormController}
     * @param{Event} ev - event
     */
    __listenersMouseOut(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'moveout' in el.dataset) {
                    actions[el.dataset.moveout].open(ev.target);
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
            mouseIn: {
                open: this.__mouseInInput.bind(this)
            },
            mouseOut: {
                open: this.__mouseOutInput.bind(this)
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
            }
        };
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
        this.__count -= 1;
        for (let i = 0; i <= this.__count; i++) {
            crosses[i].id = `delete${i}`;
            crosses[i].dataset.id = i.toString();
            pictures[i].id = `product__pic${i}`;
            pictures[i].dataset.id = i.toString();
            pictureFrames[i].id = `_profile-pic${i}`;
            filesInput[i].dataset.id = i.toString();
            filesInput[i].id = `file-upload${i}`;
        }
        document.event.stopImmediatePropagation();
    }

    /***
     * @author Ivan Gorshkov
     *
     * action for cross showing
     * @param{Object} target - photo frame
     * @private
     */
    __showCross(target) {
        if (parseInt(target.dataset.id) !== this.__count && (target.tagName === 'IMG' || target.tagName === 'DIV')) {
                document.getElementById(`delete${target.dataset.id}`).classList.remove('error-hidden');
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * action for cross hide
     * @param{Object} target - input element
     * @private
     */
    __hideCross(target) {
        if (parseInt(target.dataset.id) !== this.__count && (target.tagName === 'IMG' || target.tagName === 'DIV')) {
                document.getElementById(`delete${target.dataset.id}`).classList.add('error-hidden');
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * action with mouse out event
     * @param{Object} target - input element
     * @private
     */
    __mouseOutInput(target) {
        if (target.nextSibling.className === '') {
            target.nextElementSibling.classList.add('error-hidden');
        }

    }

    /****
     * @author Ivan Gorshkov
     *
     * action with mouse in event
     * @param{Object} target - input element
     * @private
     */
    __mouseInInput(target) {
        if (target.nextSibling.className === 'error-hidden') {
            target.nextElementSibling.classList.remove('error-hidden');
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * add to DOM error massage
     * @param{Object} target
     * @param{string} idError
     * @param{string} textError
     * @private
     */
    __insertError(target, idError, textError) {
        target.classList.add('reg-panel__input-error');
        if (document.getElementById(idError) === null) {
            const el = document.createElement('div');
            el.id = idError;
            el.innerHTML = textError;
            el.className = 'error-hidden';
            target.parentNode.insertBefore(el, target.nextSibling);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * change to success
     * @param{Object} target
     * @param{string} idError
     * @private
     */
    __addSuccesses(target, idError) {
        target.classList.remove('reg-panel__input-error');
        if (document.getElementById(idError)) {
            target.parentNode.removeChild(target.nextSibling);
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
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = this.__onReaderLoad.bind(this, input);

            reader.readAsDataURL(input.files[0]);
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
            idPhto.insertAdjacentHTML('beforeend', `
                <div class="form-row" id="_profile-pic${this.__count + 1}">    
                  <label class="form-row__photolabel" data-action="clickUpload" data-move="showCross" data-moveout="hideCross"> 
                     <img class="product__pic" id="product__pic${this.__count + 1}" data-id="${this.__count + 1}" src="../../img/photo.svg" alt="">
                     <div class="cross error-hidden" id="delete${this.__count + 1}" data-id='${this.__count + 1}' data-action="delete" ></div>
                   </label>
                </div>
                `);
            const idfile = document.getElementById('files');
            idfile.insertAdjacentHTML('beforeend', `
                <input name="[photos]" id="file-upload${this.__count + 1}" data-id="${this.__count + 1}" data-action="readURL" class="file-upload" type="file" accept="image/*"/>
            `);
            this.__count += 1;
        }

    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system menu action
     * @private
     */
    __upload(target) {
        if (this.__count < 10) {
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
        if (target.value.length === 0) {
            this.__insertError(target, `${target.id}Error`, this.__createMessageError(`
        <ul class="list-errors">
            <li>Поле с ценой не должно быть путсым</li>
        </ul>
    `));
            return false;
        } 
        this.__addSuccesses(target, `${target.id}Error`);
        

        if (target.value.length > 15) {
            target.value = target.value.slice(0, -1);
        }

        const tmpString = target.value.replace(/[^0-9]/g, '').toString();
        const newStr = tmpString.split('').reverse().reduce((previousValue, currentValue, currentIndex) => {
            if (currentIndex % 3 === 0 && currentIndex !== 0) {
                return `${previousValue} ${currentValue}`;
            }
            return previousValue + currentValue.toString();
        }, '');

        target.value = newStr.split('').reverse().join('');
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
        if (target.value.length >= 10) {
            this.__addSuccesses(target, `${target.id}Error`);
            return true;
        }
        this.__insertError(target, `${target.id}Error`, this.__createMessageError(`
        <ul class="list-errors">
            <li>Слишком короткое описание (минимум 10 знаков)</li>
        </ul>
    `));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * create box massage with errors
     * @param{string} errText
     * @return {string}
     * @private
     * @this {ProductCreateFormController}
     */
    __createMessageError(errText) {
        return `
        <div class="message-container">
            <div class="message__arrow">
                <div class="message-outer"></div>
                <div class="message-inner"></div>
            </div>
            <div class="message-body">
                ${errText}
            </div>
        </div>
    `;
    }
}
