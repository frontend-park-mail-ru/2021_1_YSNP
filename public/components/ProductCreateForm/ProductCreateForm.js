import './ProductCreateForm.scss';
import productCreateFormTemplate from './ProductCreateForm.hbs';
import productPhotoTemplate from './ProductPhoto.hbs';
import productFileTemplate from './ProductFile.hbs';
import {createMessageError} from '../../modules/layout/validationStates.js';
import {Field} from '../RegistrationPanel/Fields/Field';
import {YandexMap} from '../../modules/layout/yandexMap';

/***
 * @author Max Torzhkov
 * ProductCreateForm class for product creation
 * @class ProductCreateForm
 */
export class ProductCreateForm {

    /***
     * @author Max Torzhkov, Ivan Gorshkov
     *
     * init of class ProductCreateForm
     * @param {HTMLElement} parent - parent element
     * @param {Object} data
     * @constructor
     * @this {ProductCreateForm}
     * @public
     */
    constructor(parent) {
        this.__parent = parent;
        this.__listeners = {};
    }


    /***
     * @author Max Trozhkov
     *
     * get Navigation listeners
     * @this {ProductCreateForm}
     * @private
     * @readonly
     * @return  {Object} array of listeners
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Max Torzhkov
     *
     * Set new listeners
     * @this {ProductCreateForm}
     * @param  {Object} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * @author Max Torzhkov, Ivan Gorshkov
     *
     * Add component to parent
     * @this {ProductCreateForm}
     * @public
     */
    addListeners() {
        document
            .getElementById('submitProduct')
            .addEventListener(this.listeners.submitClick.type, this.listeners.submitClick.listener);
        document
            .getElementById('ProductForm')
            .addEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('productPhoto')
            .addEventListener(this.listeners.submitClick.type, this.listeners.submitClick.listener);
        document
            .getElementById('productPhoto')
            .addEventListener(this.listeners.showError.type, this.listeners.showError.listener);
        document
            .getElementById('productPhoto')
            .addEventListener(this.listeners.hideError.type, this.listeners.hideError.listener);
        document
            .getElementById('files')
            .addEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('ProductForm')
            .addEventListener(this.listeners.focusInput.type, this.listeners.focusInput.listener, true);
        document
            .getElementById('ProductForm')
            .addEventListener(this.listeners.blurInput.type, this.listeners.blurInput.listener, true);
    }

    /***
     * @author Max Torzhkov, Ivan Gorshkov
     *
     * Remove component from parent
     * @this {ProductCreateForm}
     * @public
     */
    removeListeners() {
        document
            .getElementById('submitProduct')
            .removeEventListener(this.listeners.submitClick.type, this.listeners.submitClick.listener);
        document
            .getElementById('ProductForm')
            .removeEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('productPhoto')
            .removeEventListener(this.listeners.submitClick.type, this.listeners.submitClick.listener);
        document
            .getElementById('productPhoto')
            .removeEventListener(this.listeners.showError.type, this.listeners.showError.listener);
        document
            .getElementById('productPhoto')
            .removeEventListener(this.listeners.hideError.type, this.listeners.hideError.listener);
        document
            .getElementById('files')
            .removeEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('ProductForm')
            .removeEventListener(this.listeners.focusInput.type, this.listeners.focusInput.listener, true);
        document
            .getElementById('ProductForm')
            .removeEventListener(this.listeners.blurInput.type, this.listeners.blurInput.listener, true);
    }

    /***
     * @author Ivan Gorshkov
     *
     * delete selected picture
     * @param {HTMLElement} target
     * @param {Function} handler
     * @return {Function}
     * @this {ProductCreateForm}
     */
    deletePicture(target, handler) {
        document.getElementById(`_profile-pic${target.dataset.id}`).remove();
        document.getElementById(`file-upload${target.dataset.id}`).remove();
        if (target.id.length === 9) {
            return handler + 1;
        }
        const crosses = document.getElementsByClassName('cross');
        const pictures = document.getElementsByClassName('product__pic');
        const pictureFrames = document.getElementsByClassName('form-row');
        const filesInput = document.getElementsByClassName('file-upload');
        const labelPhoto = document.getElementsByClassName('form-row__photolabel');
        let tmpHandler = handler;
        for (let i = 0, j = 0; i <= tmpHandler; i++) {
            if (pictures[i].id.length === 15) {
                tmpHandler++;
                continue;
            }

            crosses[i].id = `delete${j}`;
            crosses[i].dataset.id = j.toString();
            pictures[i].id = `product__pic${j}`;
            pictures[i].dataset.id = j.toString();
            pictureFrames[i].id = `_profile-pic${j}`;
            filesInput[i].dataset.id = j.toString();
            filesInput[i].id = `file-upload${j}`;
            labelPhoto[i].dataset.id = j.toString();
            j++;
        }
        return handler;
    }

    /***
     * @author Ivan Gorshkov
     *
     * callback after photo has been loaded
     * @param {HTMLElement} input
     * @param {number} count
     * @param {Function} incFunc
     * @param {Event} e
     * @this {ProductCreateForm}
     */
    onReaderLoad(input, e, count, incFunc) {
        const elem = document.getElementById(`product__pic${input.dataset.id}`);
        elem.src = e.target.result;
        elem.classList.add('product__pic_fullsize');
        if (parseInt(input.dataset.id) === count) {
            const idPhoto = document.getElementById('productPhoto');
            const incCount = count + 1;
            incFunc();
            idPhoto.insertAdjacentHTML('beforeend', productPhotoTemplate(incCount));
            const idfile = document.getElementById('files');
            idfile.insertAdjacentHTML('beforeend', productFileTemplate(incCount));
        }
    }

    insertPhoto(url, count) {
        const idPhoto = document.getElementById('productPhoto');
        idPhoto.insertAdjacentHTML('afterbegin', productPhotoTemplate(count + 100));
        const elem = document.getElementById(`product__pic${count + 100}`);
        elem.src = url;
        elem.classList.add('product__pic_fullsize');
        const idfile = document.getElementById('files');
        idfile.insertAdjacentHTML('beforeend', productFileTemplate(count + 100));
    }

    /***
     * @author Ivan Gorshkov
     *
     * hide error
     * @param {string} target
     * @this {ProductCreateForm}
     */
    hideError(target) {
        document.getElementById(target).classList.remove('error-hidden');
    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system
     * @param {HTMLElement} target
     * @this {ProductCreateForm}
     */
    openFileSystem(target) {
        const elem = document.getElementById(`file-upload${target.dataset.id}`);
        elem.click();
    }

    /***
     * @author Ivan Gorshkov
     *
     * get id from target
     * @param {HTMLElement} target
     * @return {string}
     * @this {ProductCreateForm}
     */
    getErrorId(target) {
        return `${target.id}Error`;
    }

    /***
     * @author Ivan Gorshkov
     *
     * show cross when move in
     * @param {HTMLElement} target
     * @this {ProductCreateForm}
     */
    showCross(target) {
        document.getElementById(`delete${target.dataset.id}`).classList.remove('error-hidden');
    }

    /***
     * @author Ivan Gorshkov
     *
     * hide cross when move out
     * @param {HTMLElement} target
     * @this {ProductCreateForm}
     */
    hideCross(target) {
        document.getElementById(`delete${target.dataset.id}`).classList.add('error-hidden');
    }

    /***
     * @author Ivan Gorshkov
     *
     * add Error to Field
     * @param {[string]} message
     * @return {string}
     * @this {ProductCreateForm}
     */
    addErrorForm(message) {
        const errorList = message.reduce((prev, cur) => `${prev}<li>${cur}</li>`, '');
        return createMessageError(`
                  <ul class="list-errors">
                         ${errorList}
                     </ul>
        `);
    }

    /***
     * @author Ivan Gorshkov
     *
     * get HTMLElement of form in view
     * @return {HTMLElement}
     * @this {ProductCreateForm}
     */
    getForm() {
        return document.getElementById('createProductForm');
    }

    /***
     * @author Ivan Gorshkov
     *
     * get all fields
     * @return {Object}
     * @this {ProductCreateForm}
     */
    getAllFields() {
        return {
            price: document.getElementById('priceInput'),
            description: document.getElementById('textareaInput'),
            name: document.getElementById('nameInput'),
            category: document.getElementById('categorySelect'),
            address: document.getElementById('addressInput')
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * change title of button and disable
     * @param {string} title
     * @this {ProductCreateForm}
     */
    changeDisableButton(title) {
        const button = document.getElementById('submitProduct');
        button.value = title;
        button.disabled = true;
    }

    /***
     * make enable btn
     * @param{string} title
     */
    changeEnableButton(title) {
        const button = document.getElementById('submitProduct');
        button.value = title;
        button.disabled = false;
    }

    /***
     *
     * get city from map
     * @return {string}
     */
    getAddress() {
        return this.__yaMap.city;
    }

    /***
     * get class of cross element
     */
    getCrossClass() {
        return 'cross';
    }

    /***
     * get position from map
     * @return {{latitude: number, longitude: number}}
     */
    getPos() {
        return this.__yaMap.getPointPos();
    }

    /***
     * show global error
     * @param message
     */
    errorText(message) {
        document
            .getElementById('create-error')
            .textContent = message;
    }


    setLocation(pos) {
        this.__yaMap.addPoint({
            latitude: pos.latitude,
            longitude: pos.longitude
        });

        this.__yaMap.setCenter({
            latitude: pos.latitude,
            longitude: pos.longitude
        }, 11);
    }

    /***
     * @author Max Torzhkov
     * Add component to parent
     * @this {ProductCreateForm}
     */
    async render(ctx) {
        this.listeners = ctx.listeners;
        this.__parent.insertAdjacentHTML('beforeend', productCreateFormTemplate(ctx));

        for (const fields in ctx.fields) {
            const field = new Field(document.getElementById('ProductForm'), ctx.fields[fields]);
            field.render();
        }

        this.__yaMap = new YandexMap();
        this.__yaMap.render({
            searchControl: false,
            geolocationControl: true,
            listeners: true,
            id: 'ya-map-create-product'
        }, (address) => {
            document.getElementById('addressInput').value = address;
        });
        this.__yaMap.addSearch('addressInput');
        this.addListeners();
    }
}