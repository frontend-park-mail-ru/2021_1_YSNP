'use strict';

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
    constructor(parent, data) {
        this.__parent = parent;
        this.__listeners = {};
        this.__data = data;
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
            .getElementById('register')
            .addEventListener(this.__listeners.submitClick.type, this.__listeners.submitClick.listener);
        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.showError.type, this.listeners.showError.listener);
        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.hideError.type, this.listeners.hideError.listener);
        document
            .getElementById('registrationForm')
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
            .getElementById('register')
            .removeEventListener(this.__listeners.submitClick.type, this.__listeners.submitClick.listener);
        document
            .getElementById('registrationForm')
            .removeEventListener(this.listeners.showError.type, this.listeners.showError.listener);
        document
            .getElementById('registrationForm')
            .removeEventListener(this.listeners.hideError.type, this.listeners.hideError.listener);
        document
            .getElementById('registrationForm')
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
    }

    /***
     * @author Ivan Gorshkov
     *
     * draw a field
     * @return {string}
     * @private
     * @this {ProductCreateForm}
     */
    __drawField(element) {
        let text = '';
        if (element.inputType === 'select') {
            text = `<select id="${element.id}" class="reg-panel__textfield"  name="${element.id}" >`;
                element.options.forEach(((value) => {
                    text += `<option>${value}</option>`;
                }));
            text += '</select>';

        }

        if (element.inputType === 'text') {
            text = `<input min="0" class="reg-panel__textfield" data-action="${element.dataAction}"
                          data-move="mouseIn" data-moveout="mouseOut" id="${element.id}" type="${element.inputType}"
                          placeholder="${element.placeholder}" name="${element.id}"/>`;
        }

        if (element.inputType === 'textarea') {
            text = `<textarea class="form-row__textarea" data-action="${element.dataAction}"
                          data-move="mouseIn" data-moveout="mouseOut" id="${element.id}"
                          placeholder="${element.placeholder}" name="${element.id}" maxlength="5000"/></textarea>`;
        }


        return text;
    }

    /***
     * @author Ivan Gorshkov
     *
     * draw a form fields
     * @return {string}
     * @private
     * @this {ProductCreateForm}
     */
    __drawForm() {
        let fields = '';
        for (const prop in this.__data) {
            const element = this.__data[prop];
            fields += `
<div class="product-des form-spacing">
    <div class="product-des-topic">
        <p class="product-des-topic__title">${element.title}</p>
    </div>
    <div class="form-inner">
        ${this.__drawField(element)}
    </div>
</div>
`;
        }
        return fields;
    }

    /***
     * @author Max Torzhkov, Ivan Gorshkov
     * 
     * main template of component
     * @return {string}
     * @private
     * @this {ProductCreateForm}
     */
    __getTemplate() {
        return `   
<div class="board">
    <div class="board-title">
        <p class="reg-panel-title__product-name">Создание объявления</p>
    </div>
    <form method="post" action="/" name="test" enctype="multipart/form-data">
        <div id="files">
            <input id="file-upload0" name="[photos]" data-id="0" data-action="readURL" class="file-upload" type="file" accept="image/*"/>
        </div>
        <div id="registrationForm">
            ${this.__drawForm()}
        </div>
        <div class="product-des form-spacing">
            <div class="product-des-topic ">
                <p class="product-des-topic__title">Фото</p>
            </div>
            <div class="form-inner">
                <div class="photo-container" id="productPhoto">
                    <div class="form-row" id="_profile-pic0">    
                        <label class="form-row__photolabel" data-action="clickUpload" data-move="showCross" data-moveout="hideCross"> 
                            <img class="product__pic" data-id='0' id="product__pic0" src="../../img/photo.svg" alt="">
                            <div class="cross error-hidden" id="delete0" data-id='0' data-action="delete" ></div>
                        </label>  
                    </div>
                </div>
            </div>
        </div>
        <div class="product-des">
            <div class="product-des-topic"></div>
            <div class="form-inner" id="submitBtn">
                <input class="header-right__create-button reg__button" data-action="submitClick" type="submit" id="register" value="Продолжить"/>
            </div>
        </div>
    </form>
    
</div>
         
        `;
    }

    /***
     * @author Max Torzhkov
     * Add component to parent
     * @this {ProductCreateForm}
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}

