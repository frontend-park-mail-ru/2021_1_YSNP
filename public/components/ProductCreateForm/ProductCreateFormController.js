'use strict';

/***
 * @author Max Torzhkov
 * ProduCreateForm controller
 * @class ProductCreateFormController
 */
export class ProductCreateFormController {

    /***
     * @author Max Torzhkov
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

    get count() {
        return this.__countPhoto;
    }

    set count(value) {
         this.__countPhoto = value;
    }

    /***
     * @author Max Torzhkov
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
     * @author Max Torzhkov
     * listener for submit
     * @param {Event} ev - event
     * @returns {{cost, name, photo, location, category, subcategory, info}}
     * @public
     */
    __listenerSubmitClick(ev) {
    }

    /***
     * @author Max Torzhkov
     * Get form listeners
     * @returns {{submitClick: {listener: any, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            submitClick: {
                type: 'click',
                listener: this.__listenersRegistrarion.bind(this)
            },
            validateInput: {
                type: 'input',
                listener: this.__listenersRegistrarion.bind(this)
            },
            validateChange: {
                type: 'change',
                listener: this.__listenersRegistrarion.bind(this)

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
     * @this {RegistrationPanelController}
     * @param{Event} ev - event
     */
    __listenersRegistrarion(ev) {
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
     *  listener for MouseIn Event
     * @private
     * @this {RegistrationPanelController}
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
     * @this {RegistrationPanelController}
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

    __getActions() {
        return {
            delete: {
                open: this.delete.bind(this)
             },
            textareaInputEmpty: {
                open: this._validatePhone.bind(this)
            },
            mouseIn: {
                open: this.mouseInInput.bind(this)
            },
            mouseOut: {
                open: this.mouseOutInput.bind(this)
            },
            clickUpload: {
                open: this.__upload.bind(this)
            },
            readURL: {
                open: this.__read.bind(this)
            },
            showCross: {
                open: this.showCross.bind(this)
            },
            hideCross: {
                open: this.hideCross.bind(this)
            }
        };
    }

    delete(target) {
        document.getElementById(`_profile-pic${target.dataset.id}`).remove();
        document.getElementById(`file-upload${target.dataset.id}`).remove();
    }

    /****
     * @author Ivan Gorshkov
     *
     * action with mouse out event
     * @param{Object} target - input element
     * @private
     */
    showCross(target) {
        if (target.src !== 'http://localhost:3000/img/photo.svg') {
                document.getElementById(`delete${target.dataset.id}`).classList.remove('error-hidden');

        }
    }

    /****
     * @author Ivan Gorshkov
     *
     * action with mouse in event
     * @param{Object} target - input element
     * @private
     */
    hideCross(target) {
        if (target.src !== 'http://localhost:3000/img/photo.svg') {
                document.getElementById(`delete${target.dataset.id}`).classList.add('error-hidden');
        }
    }

    /****
     * @author Ivan Gorshkov
     *
     * action with mouse out event
     * @param{Object} target - input element
     * @private
     */
    mouseOutInput(target) {
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
    mouseInInput(target) {
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
     * add success massage
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
        const self = this;
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const elem = document.getElementById(`profile-pic${input.dataset.id}`);
                elem.src = e.target.result;
                elem.classList.add('product-pic_fullsize');
                if (input.dataset.id == self.count) {
                const idPhto = document.getElementById('productPhoto');
                idPhto.insertAdjacentHTML('beforeend', `
                
                       <div class="form-row" id="_profile-pic${self.count + 1}">    
                          <label class="form-row__photolabel" data-action="clickUpload" 
                          data-move="showCross" data-moveout="hideCross"> 
                             <img class="product-pic" id="profile-pic${self.count + 1}" data-id="${self.count + 1}" src="../../img/photo.svg">
                             <div class="cross error-hidden" id="delete${self.count + 1}" data-id='${self.count + 1}' data-action="delete" ></div>
                           </label>
                       </div>
                `);
                const idfile = document.getElementById('files');
                idfile.insertAdjacentHTML('beforeend', `
                
                <input name="[photos]" id="file-upload${self.count + 1}" data-id="${self.count + 1}" data-action="readURL" class="file-upload" type="file" accept="image/*"/>

`);
                    self.count += 1;
                }
            };

            reader.readAsDataURL(input.files[0]);
        }

    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system menu action
     * @private
     */
    __upload(target) {
        if (this.count <= 10) {
            const elem = document.getElementById(`file-upload${target.dataset.id}`);
            elem.click();
        }

    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input phone
     * @param{Object} target
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     */
    _validatePhone(target) {
        if (target.value.length > 10) {
            this.__addSuccesses(target, `${target.id}Error`);
            return true;
        }
        this.__insertError(target, `${target.id}Error`, this.__createMessageError(`
                  <ul class="list-errors">
                    <li>Слишком короткое описание</li>
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
     * @this {RegistrationPanelController}
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

