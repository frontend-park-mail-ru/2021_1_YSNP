/***
 * Settings controller
 */
export class SettingsController {
    /***
     * Class constructor
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {Settings} settings - settings
     */
    constructor(pageRemoveListeners, parent, settings) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__settings = settings;
        this.__isOpen = false;
    }

    /***
     * Add listeners
     */
    control() {
        this.__settings.listeners = this.__createListeners();
        this.__settings.addListeners();
    }

    /***
     * Remove Controller listeners
     */
    removeControllerListeners() {
        this.__settings.removeListeners();
    }

    /***
     * Settings click event
     * @param {Event} ev - event
     * @private
     */
    __listenerSettingsClick(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open(ev.target);
                }
            });
    }

    /***
     * Mouse in event
     * @param {Event} ev - mouse in event
     * @private
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
     * Mouse out
     * @param {Event} ev - mouse out event
     * @private
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
     * Get settings listeners
     * @returns {{validateChange: {listener: *, type: string}, hideError: {listener: *, type: string}, validateInput: {listener: *, type: string}, showError: {listener: *, type: string}, settingsClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            settingsClick: {
                type: 'click',
                listener: this.__listenerSettingsClick.bind(this)
            },
            validateInput: {
                type: 'input',
                listener: this.__listenerSettingsClick.bind(this)
            },
            validateChange: {
                type: 'change',
                listener: this.__listenerSettingsClick.bind(this)

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
     * Get settings actions
     * @returns {{checkPasswd: {open: *}, savePasswordClick: {open: *}, saveChangesClick: {open: *}, editClick: {open: *}, inputPhone: {open: any}, changePwd: {open: any}, inputConfirmPwd: {open: any}, inputEmpty: {open: any}, mouseOut: {open: *}, inputMail: {open: any}, readURL: {open: *}, mouseIn: {open: *}, clickUpload: {open: *}}}
     * @private
     */
    __getActions() {
        return {
            editClick: {
                open: this.__openEdit.bind(this)
            },
            saveChangesClick: {
                open: this.__openSaveChanges.bind(this)
            },
            inputPhone: {
                open: this.__validatePhone.bind(this)
            },
            inputMail: {
                open: this.__validateMail.bind(this)
            },
            inputEmpty: {
                open: this.__validateEmpty.bind(this)
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
            checkPasswd: {
                open: this.__checkPassword.bind(this)
            },
            changePwd: {
                open: this.__validatePas.bind(this)
            },
            inputConfirmPwd: {
                open: this.__validateConfirmPwd.bind(this)
            },
            savePasswordClick: {
                open: this.__savePasswordClick.bind(this)
            },
            resetPasswordClick: {
                open: this.__resetPasswordClick.bind(this)
            }
        };
    }

    /***
     * Save new password
     * @private
     */
    __savePasswordClick() {
        const passwordConfirm = document.getElementById('settings-confirm-pass');
        const password = document.getElementById('settings-new-pass');
        const isValidpwdConfirm = this.__validateConfirmPwd(passwordConfirm);
        const isValidPwd = this.__validatePas(password);
        if (isValidPwd && isValidpwdConfirm) {
            //TODO set new password
            this.__resetPasswordClick();
        }
    }

    /***
     * Reset password changes
     * @private
     */
    __resetPasswordClick() {
        console.log('reset pass');
        const passwordConfirm = document.getElementById('settings-confirm-pass');
        const password = document.getElementById('settings-new-pass');
        document
            .getElementById('settings-save-pass')
            .style.visibility = 'hidden';
        document
            .getElementById('settings-reset-pass')
            .style.visibility = 'hidden';

        password.value = '';
        password.setAttribute('readonly', 'true');
        password.classList.remove('settings-components__input-success');
        password.classList.remove('settings-components__input-error');
        if (document.getElementById('settings-new-passError')) {
            password.parentNode.removeChild(password.nextSibling);
        }

        passwordConfirm.value = '';
        passwordConfirm.setAttribute('readonly', 'true');
        passwordConfirm.classList.remove('settings-components__input-success');
        passwordConfirm.classList.remove('settings-components__input-error');
        if (document.getElementById('settings-confirm-passError')) {
            passwordConfirm.parentNode.removeChild(passwordConfirm.nextSibling);
        }

        document
            .getElementById('settings-old-pass')
            .removeAttribute('readonly');
    }

    /***
     * Check validation of password confirmation
     * @param target
     * @returns {boolean}
     * @private
     */
    __validateConfirmPwd(target) {
        if (document.getElementById('settings-save-pass').style.visibility === 'visible') {
            const element = document.getElementById('settings-new-pass');
            if (element.value === target.value && target.value !== '') {
                this.__addSuccesses(target, 'settings-confirm-passError');
                return true;
            }

            this.__insertError(target, 'settings-confirm-passError', this.__createMessageError(`
                 <ul class="list-errors">
                     <li>Пароли не совпадают</li>
                 </ul>
             `));
            return false;
        }
        return false;
    }

    /***
     * Check validation of new password
     * @param target
     * @returns {boolean}
     * @private
     */
    __validatePas(target) {
        if (document.getElementById('settings-save-pass').style.visibility === 'visible') {

            if (this.__isValidPwd(target.value)) {
                this.__addSuccesses(target, 'settings-new-passError');
                const element = document.getElementById('settings-confirm-pass');
                this.__validateConfirmPwd(element);
                return true;
            }

            this.__insertError(target, 'settings-new-passError', this.__createMessageError(`
                            <ul class="list-errors">
                              <li>От шести или более символов</li>
                              <li>Содержит хотя бы одну цифру</li>
                              <li>Хотя бы один символ нижнего регистра</li>
                              <li>Хотя бы один символ верхнего регистра</li>
                              <li>Только латинские символы</li>
                            </ul>
        `));
            return false;
        }
        return false;
    }

    /***
     * Password mask validation
     * @param inputtxt
     * @returns {boolean}
     * @private
     */
    __isValidPwd(inputtxt) {
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return re.test(inputtxt);
    }

    /***
     * Check old password correct
     * @private
     */
    __checkPassword() {
        const password = document.getElementById('settings-old-pass');
        //TODO check password
        console.log(document.getElementById('settings-save-pass').style);
        if (password.value === '1234') {
            document
                .getElementById('settings-save-pass')
                .style.visibility = 'visible';
            document
                .getElementById('settings-reset-pass')
                .style.visibility = 'visible';
            document
                .getElementById('settings-new-pass')
                .removeAttribute('readonly');
            document
                .getElementById('settings-confirm-pass')
                .removeAttribute('readonly');
            password.value = '';
            password.setAttribute('readonly', 'true');
            password.classList.remove('settings-components__input-success');
            password.classList.remove('settings-components__input-error');
            if (document.getElementById('settings-old-passError')) {
                password.parentNode.removeChild(password.nextSibling);
            }
        } else if (password.value !== '') {
            console.log('check pass error');
            this.__insertError(password, `${password.id}Error`, this.__createMessageError(`
                  <ul class="list-errors">
                    <li>Неверный пароль</li>
                  </ul>
                  `));
        }
    }

    /***
     * Open file system menu
     * @private
     */
    __upload() {
        if (this.__isOpen) {
            console.log('click upload');
            const elem = document.getElementById('settings-file-upload');
            elem.click();
        }
    }

    /***
     * Update profile picture
     * @param input
     * @private
     */
    __read(input) {
        console.log(input.files);
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const elem = document.getElementById('settings-profile-pic');
                elem.src = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    /***
     * Show error message if mouse in input
     * @param target
     */
    mouseInInput(target) {
        if (target.nextSibling.className === 'error-hidden') {
            target.nextElementSibling.classList.remove('error-hidden');
        }

    }

    /***
     * Hide error message if mouse out input
     * @param target
     */
    mouseOutInput(target) {
        if (target.nextSibling.className === '') {
            target.nextElementSibling.classList.add('error-hidden');
        }

    }

    /***
     * Settings edit click callback
     * @private
     */
    __openEdit() {
        // this.__pageRemoveListeners();
        if (this.__isOpen) {
            if (confirm('Вы уверены, что хотите выйти без сохранения?')) {
                //TODO вернуть значения инпутов на дефолтные

                this.__disableEditing();
                this.__isOpen = false;
            }
        } else {
            this.__enableEditing();
            this.__isOpen = true;
        }

        console.log('Click edit page');
    }

    /***
     * Settings save changes click callback
     * @private
     */
    __openSaveChanges() {
        // this.__pageRemoveListeners();

        if (this.__validateSettings()) {
            this.__disableEditing();
        }
        console.log('Click save changes');
    }

    /***
     * Check validation of settings
     * @returns {boolean}
     * @private
     */
    __validateSettings() {
        const surname = document.getElementById('settings-surname');
        const name = document.getElementById('settings-name');
        const patronymic = document.getElementById('settings-patronymic');
        const birthday = document.getElementById('settings-birthday');
        const phone = document.getElementById('settings-telephone');
        const location = document.getElementById('settings-location');
        const mail = document.getElementById('settings-email');

        const isValidSurname = this.__validateEmpty(surname);
        const isValidName = this.__validateEmpty(name);
        const isValidPatronymic = this.__validateEmpty(patronymic);
        const isValidBirthday = this.__validateEmpty(birthday);
        const isValidPhone = this.__validatePhone(phone);
        const isValidLocation = this.__validateEmpty(location);
        const isValidMail = this.__validateMail(mail);
        if (isValidSurname && isValidName && isValidPatronymic && isValidBirthday && isValidPhone && isValidLocation && isValidMail) {
            //TODO Отправка формы
            return true;
        }
        return false;

    }

    /***
     * Change error-input to success-input
     * @param target
     * @param idError
     * @private
     */
    __addSuccesses(target, idError) {
        target.classList.remove('settings-components__input-error');
        target.classList.add('settings-components__input-success');
        if (document.getElementById(idError)) {
            target.parentNode.removeChild(target.nextSibling);
        }
    }

    /***
     * Add error messages for incorrect input
     * @param target
     * @param idError
     * @param textError
     * @private
     */
    __insertError(target, idError, textError) {
        target.classList.add('settings-components__input-error');
        if (document.getElementById(idError) === null) {
            const el = document.createElement('div');
            el.id = idError;
            el.innerHTML = textError;
            el.className = 'error-hidden';
            target.parentNode.insertBefore(el, target.nextSibling);
        }
    }

    /***
     * Create box with error's messages
     * @param errText
     * @returns {string}
     * @private
     */
    __createMessageError(errText) {
        return `
            <div class="settings-message-container">
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

    /***
     * Check validation of text input
     * @param target
     * @returns {boolean}
     * @private
     */
    __validateEmpty(target) {
        if (document.getElementById('settings-button-save').style.visibility === 'visible') {

            if (target.value !== '') {
                this.__addSuccesses(target, `${target.id}Error`);
                return true;
            }
            this.__insertError(target, `${target.id}Error`, this.__createMessageError(`
                      <ul class="list-errors">
                             <li>Поле не должно быть пустым</li>
                         </ul>
        `));
            return false;
        }
        return false;
    }

    /***
     * Check validation of phone input
     * @param target
     * @returns {boolean}
     * @private
     */
    __validatePhone(target) {
        if (document.getElementById('settings-button-save').style.visibility === 'visible') {

            if (this.__isValidPhone(target.value)) {
                this.__addSuccesses(target, 'phoneError');
                return true;
            }
            this.__insertError(target, 'phoneError', this.__createMessageError(`
                      <ul class="list-errors">
                        <li>Неверный формат телефона</li>
                      </ul>
        `));
            return false;
        }
        return false;
    }

    /***
     * Is phone number valid
     * @param phoneNumber
     * @returns {boolean}
     * @private
     */
    __isValidPhone(phoneNumber) {
        const validTel = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        return validTel.test(phoneNumber);
    }

    /***
     * Check validation of e-mail input
     * @param target
     * @returns {boolean}
     * @private
     */
    __validateMail(target) {
        if (document.getElementById('settings-button-save').style.visibility === 'visible') {

            if (this.__isValidEmail(target.value)) {
                this.__addSuccesses(target, 'MailError');
                return true;
            }
            this.__insertError(target, 'MailError', this.__createMessageError(`
                      <ul class="list-errors">
                         <li>Неправильный формат e-mail</li>
                     </ul>
        `));
            return false;
        }
        return false;
    }

    /***
     * Is e-mail valid
     * @param email
     * @returns {boolean}
     * @private
     */
    __isValidEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    /***
     * Open form settings for editing
     * @private
     */
    __enableEditing() {
        document
            .getElementById('settings-button-save')
            .style.visibility = 'visible';
        document
            .getElementById('settings-upload-button')
            .style.visibility = 'visible';
        document
            .getElementById('settings-surname')
            .removeAttribute('readonly');
        document
            .getElementById('settings-name')
            .removeAttribute('readonly');
        document
            .getElementById('settings-patronymic')
            .removeAttribute('readonly');
        document
            .getElementById('settings-gender')
            .removeAttribute('disabled');
        document
            .getElementById('settings-birthday')
            .removeAttribute('readonly');
        document
            .getElementById('settings-telephone')
            .removeAttribute('readonly');
        document
            .getElementById('settings-location')
            .removeAttribute('readonly');
        document
            .getElementById('settings-email')
            .removeAttribute('readonly');

    }

    /***
     * Close form settings for editing
     * @private
     */
    __disableEditing() {
        document
            .getElementById('settings-button-save')
            .style.visibility = 'hidden';
        document
            .getElementById('settings-upload-button')
            .style.visibility = 'hidden';
        document
            .getElementById('settings-surname')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-surnameError')) {
            const target = document.getElementById('settings-surname');
            target.parentNode.removeChild(target.nextSibling);
        }
        document
            .getElementById('settings-name')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-nameError')) {
            const target = document.getElementById('settings-name');
            target.parentNode.removeChild(target.nextSibling);
        }
        document
            .getElementById('settings-patronymic')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-patronymicError')) {
            const target = document.getElementById('settings-patronymic');
            target.parentNode.removeChild(target.nextSibling);
        }
        document
            .getElementById('settings-gender')
            .setAttribute('disabled', 'true');
        document
            .getElementById('settings-birthday')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-birthdayError')) {
            const target = document.getElementById('settings-birthday');
            target.parentNode.removeChild(target.nextSibling);
        }
        document
            .getElementById('settings-telephone')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-telephoneError')) {
            const target = document.getElementById('settings-telephone');
            target.parentNode.removeChild(target.nextSibling);
        }
        document
            .getElementById('settings-location')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-locationError')) {
            const target = document.getElementById('settings-location');
            target.parentNode.removeChild(target.nextSibling);
        }
        document
            .getElementById('settings-email')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-emailError')) {
            const target = document.getElementById('settings-email');
            target.parentNode.removeChild(target.nextSibling);
        }
    }
}