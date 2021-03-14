'use strict';

/***
 * @author Ivan Gorshkov
 * RegistrationPanel class for contain product
 * @class RegistrationPanel
 */
export class RegistrationPanel {

    /***
     * @author Ivan Gorshkov
     * init of class RegistrationPanel
     * @param {HTMLElement} parent - parent element
     * @param {Object} data - JSON Object
     * @constructor
     * @this {RegistrationPanel}
     * @public
     */
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
    }

    /***
     * Form text error
     * @param {string} val - error text
     */
    errorText(val) {
        document
            .getElementById('auth-error')
            .textContent = val;
    }

    /***
     * @author Ivan Gorshkov
     * add input fields to template
     * @return {string}
     * @private
     * @this {RegistrationPanel}
     */
    __drawForm() {
        let fields = '';
        for (const prop in this.__data) {
            const element = this.__data[prop];
            let inputElement = '';
            if (element.inputType === 'tel') {
                inputElement = ` 
                    <input class="auth-content-form__input auth-content-form__country reg-panel__coutry-code" readOnly required value="+7">
                    <input class="auth-content-form__input auth-content-form__tel reg-panel__tel" data-action="${element.dataAction}" data-move="showError" data-moveout="hideError"  id="${element.id}" type="${element.inputType}" placeholder="${element.placeholder}" name="${element.id}" required>
                `;
            } else {
                inputElement = ` 
                    <input ${element.params} class="reg-panel__textfield" data-action="${element.dataAction}" data-move="showError" data-moveout="hideError"  id="${element.id}" type="${element.inputType}" placeholder="${element.placeholder}" name="${element.id}"/>
                `;
            }

            fields += `<div class="product-des form-spacing">
                <div class="product-des-topic">
                    <p class="product-des-topic__title">${element.title}</p>
                </div>
                <div class="form-inner">
                    ${inputElement}
                </div>
                 
            </div>`;
        }

        fields += `
        <div class="product-des form-spacing">
                <div class="product-des-topic">
                    <p class="product-des-topic__title">Пол</p>
                </div>
                <div class="form-inner">
                    <select id="sex" class="settings-components__input reg__gender">
                        <option value="female">Женский</option>
                        <option value="male">Мужской</option>
                    </select>
                </div>
            </div>
        `;
        return fields;
    }

/***
     * @author Ivan Gorshkov
     * main template of component
     * @return {string}
     * @private
     * @this {RegistrationPanel}
     */
    __getTemplate() {
        return `           
           <div class="board">
               <div class="board-title">
                   <p class="reg-panel-title__product-name">Регистрация</p>
                   
                 <div class="auth-content-inner__error reg-error" id="auth-error">
                    <span></span>
                </div>
               </div>
               
               <form id="registration-from" enctype="multipart/form-data">
               <input id="file-upload" name="file-upload" data-action="readURL" class="file-upload" type="file" accept="image/*"/>
               <div id="registrationForm">
                    ${this.__drawForm()}
                    </div>
                <div class="product-des form-spacing">
                    <div class="product-des-topic">
                        <p class="product-des-topic__title">Фото</p>
                    </div>
                <div class="form-inner">
                  
                   <div class="reg-picture" id="avatar" data-action="clickUpload">
                     <div class="circle" >
                       <img class="profile-pic" id="profile-pic" src="../../img/profile.png" alt="">
                     </div>
                     <div class="p-image">
                       <i class="upload-button">
                       <svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="1" d="M21.3333 10.6667H19.5556C18.5778 10.6667 17.7778 9.86667 17.7778 8.88889V0H3.55556C1.6 0 0 1.6 0 3.55556V28.4444C0 30.4 1.6 32 3.55556 32H28.4444C30.4 32 32 30.4 32 28.4444V14.2222H23.1111C22.1333 14.2222 21.3333 13.4222 21.3333 12.4444V10.6667ZM24.8889 24.8889H7.11111C6.94603 24.8889 6.78422 24.8429 6.64379 24.7561C6.50337 24.6693 6.38989 24.5452 6.31606 24.3975C6.24224 24.2499 6.21099 24.0846 6.22581 23.9202C6.24064 23.7558 6.30095 23.5987 6.4 23.4667L9.95556 18.72C10.3111 18.24 11.0222 18.24 11.3778 18.72L14.6667 23.1111L19.2889 16.9422C19.6444 16.4622 20.3556 16.4622 20.7111 16.9422L25.6 23.4667C25.699 23.5987 25.7594 23.7558 25.7742 23.9202C25.789 24.0846 25.7578 24.2499 25.6839 24.3975C25.6101 24.5452 25.4966 24.6693 25.3562 24.7561C25.2158 24.8429 25.054 24.8889 24.8889 24.8889Z" fill="gray"/>
                            <path opacity="1" d="M28.3333 3.66667V1.83333C28.3333 0.825 27.5083 0 26.5 0C25.4917 0 24.6667 0.825 24.6667 1.83333V3.66667H22.8333C21.825 3.66667 21 4.49167 21 5.5C21 6.50833 21.825 7.33333 22.8333 7.33333H24.6667V9.16667C24.6667 10.175 25.4917 11 26.5 11C27.5083 11 28.3333 10.175 28.3333 9.16667V7.33333H30.1667C31.175 7.33333 32 6.50833 32 5.5C32 4.49167 31.175 3.66667 30.1667 3.66667H28.3333Z" fill="gray"/>
                            </svg>
                       </i>
                     </div>
                </div>
               </div>
              </div>
            <div class="product-des">
                <div class="product-des-topic">
                
                </div>
                <div class="form-inner" id="submitBtn">
                  <input class="header-right__create-button reg__button" data-action="clickRegistration" type="submit" id="register" value="Зарегистрироваться"/>
                </div>
            </div>
            
               </form>
           </div>
        `;
    }


    /***
     * @author Ivan Gorshkov
     *
     * get Navigation listeners
     * @this {RegistrationPanel}
     * @private
     * @readonly
     * @return  {{validateChange: {listener: *, type: string}, hideError: {listener: *, type: string}, validateInput: {listener: *, type: string}, showError: {listener: *, type: string}, registrationClick: {listener: *, type: string}}} array of listeners
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Set new listeners
     * @this {RegistrationPanel}
     * @param  {{validateChange: {listener: *, type: string}, hideError: {listener: *, type: string}, validateInput: {listener: *, type: string}, showError: {listener: *, type: string}, registrationClick: {listener: *, type: string}}} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * @author Ivan Gorshkov
     *
     * add listeners
     * @this {RegistrationPanel}
     * @public
     */
    addListeners() {
        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('file-upload')
            .addEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('submitBtn')
            .addEventListener(this.listeners.registrationClick.type, this.listeners.registrationClick.listener);
        document
            .getElementById('avatar')
            .addEventListener(this.listeners.registrationClick.type, this.listeners.registrationClick.listener);
        document
            .getElementById('date')
            .addEventListener(this.listeners.keydown.type, this.listeners.keydown.listener, true);
        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.focusInput.type, this.listeners.focusInput.listener, true);
        document
            .getElementById('registrationForm')
            .addEventListener(this.listeners.blurInput.type, this.listeners.blurInput.listener, true);

    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {RegistrationPanel}
     * @public
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
        document.getElementById('date').max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];

    }
}
