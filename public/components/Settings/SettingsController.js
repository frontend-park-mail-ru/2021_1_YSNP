import {SettingsUserData} from '../../models/SettingsUserData.js';
import {Profile} from '../../pages/Profile.js';

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
        this.__model = new SettingsUserData();
    }

    /***
     * Add listeners
     */
    async control() {
        await this.__model.update();
        this.__settings.data = this.__model.getData();

        this.__model.log();

        this.__settings.render();
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

        document.getElementById('settings-password-error').classList.remove('settings-password-error_success');
        document.getElementById('settings-password-error').classList.add('settings-password-error_hidden');

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
                open: this.__validateTelephone.bind(this)
            },
            inputMail: {
                open: this.__validateEmail.bind(this)
            },
            inputEmpty: {
                open: this.__validateString.bind(this)
            },
            mouseIn: {
                open: this.mouseInInput.bind(this)
            },
            mouseOut: {
                open: this.mouseOutInput.bind(this)
            },
            checkPasswd: {
                open: this.__enablePasswordChange.bind(this)
            },
            clickUpload: {
                open: this.__upload.bind(this)
            },
            readURL: {
                open: this.__read.bind(this)
            },
            changePwd: {
                open: this.__validatePassword.bind(this)
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
     * Enable changing password buttons
     * @private
     */
    __enablePasswordChange() {
        document
            .getElementById('settings-save-pass')
            .style.visibility = 'visible';
        document
            .getElementById('settings-reset-pass')
            .style.visibility = 'visible';
    }

    /***
     * Save new password
     * @private
     */
    __savePasswordClick() {
        const oldPassword = document.getElementById('settings-old-pass').value;
        const passwordConfirm = document.getElementById('settings-confirm-pass');
        const newPassword = document.getElementById('settings-new-pass');
        const isValidpwdConfirm = this.__validateConfirmPwd(passwordConfirm);
        const isValidNewPwd = this.__validatePassword(newPassword);
        if (isValidNewPwd && isValidpwdConfirm) {
            this.__model.fillNewPassword({
                oldPass: oldPassword,
                newPass: newPassword.value
            });

            this.__model.log();
            this.__model.newPassword()
                .then(() => {
                    this.__resetPasswordClick();
                    const err = document.getElementById('settings-password-error');
                    err.textContent = 'Пароль успешно изменен';
                    err.classList.add('settings-password-error_success');
                    err.classList.remove('settings-password-error_hidden');
                })
                .catch((error) => {
                    console.log(error.message);
                    const err = document.getElementById('settings-password-error');
                    err.textContent = error.message;
                    err.classList.add('settings-password-error_visible');
                    err.classList.remove('settings-password-error_hidden');
                });
        }
    }

    /***
     * Reset password changes
     * @private
     */
    __resetPasswordClick() {
        console.log('reset pass');
        document
            .getElementById('settings-save-pass')
            .style.visibility = 'hidden';
        document
            .getElementById('settings-reset-pass')
            .style.visibility = 'hidden';
        document.getElementById('settings-password-error').classList.remove('settings-password-error_visible');
        document.getElementById('settings-password-error').classList.remove('settings-password-error_success');
        document.getElementById('settings-password-error').classList.add('settings-password-error_hidden');
        const passwordConfirm = document.getElementById('settings-confirm-pass');
        const password = document.getElementById('settings-new-pass');
        const oldPass = document.getElementById('settings-old-pass');

        password.value = '';
        password.classList.remove('settings-components__input-success');
        password.classList.remove('settings-components__input-error');
        if (document.getElementById('settings-new-passError')) {
            password.parentNode.removeChild(password.nextSibling);
        }

        oldPass.value = '';
        oldPass.classList.remove('settings-components__input-success');
        oldPass.classList.remove('settings-components__input-error');
        if (document.getElementById('settings-old-passError')) {
            password.parentNode.removeChild(password.nextSibling);
        }

        passwordConfirm.value = '';
        passwordConfirm.classList.remove('settings-components__input-success');
        passwordConfirm.classList.remove('settings-components__input-error');
        if (document.getElementById('settings-confirm-passError')) {
            passwordConfirm.parentNode.removeChild(passwordConfirm.nextSibling);
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
                document
                    .getElementById('settings-name')
                    .value = this.__model.name;
                document
                    .getElementById('settings-surname')
                    .value = this.__model.surname;
                // document
                //     .getElementById('settings-patronymic')
                //     .value = this.__model.patronymic;
                document
                    .getElementById('settings-gender')
                    .value = this.__model.sex;
                document
                    .getElementById('settings-birthday')
                    .value = this.__model.dateBirth;
                document
                    .getElementById('settings-telephone')
                    .value = this.__model.telephone;
                document
                    .getElementById('settings-email')
                    .value = this.__model.email;
                // document
                //     .getElementById('settings-location')
                //     .value = this.__model.location;
                const elem = document.getElementById('settings-profile-pic');
                elem.src = this.__model.linkImage;
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
        // const patronymic = document.getElementById('settings-patronymic').value;
        const birthday = document.getElementById('settings-birthday');
        const phone = document.getElementById('settings-telephone');
        // const location = document.getElementById('settings-location').value;
        const mail = document.getElementById('settings-email');

        const isValidSurname = this.__validateString(surname);
        const isValidName = this.__validateString(name);
        // const isValidPatronymic = this.__model.validationString(patronymic);
        const isValidBirthday = this.__validateString(birthday);
        const isValidPhone = this.__validateTelephone(phone);
        // const isValidLocation = this.__model.validationString(location);
        const isValidMail = this.__validateEmail(mail);


        const sexEl = document.getElementById('settings-gender');
        const sex = sexEl.selectedIndex;
        const img = document.getElementById('settings-profile-pic').src;

        if (isValidSurname && isValidName && isValidBirthday && isValidPhone && isValidMail) {
            this.__model.fillUserData({
                name: name.value,
                surname: surname.value,
                dateBirth: birthday.value,
                sex: sex,
                email: mail.value,
                telephone: phone.value,
                password: 'password',
                linkImages: img
            });
            this.__model.log();
            this.__model.settings()
                .then(({isUpdate}) => {
                    console.log(isUpdate);
                    const profile = new Profile(this.__parent);
                    profile.render();
                })
                .catch((err) => {
                    console.log('Update settings error', err.message);
                });
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
        // document
        //     .getElementById('settings-patronymic')
        //     .removeAttribute('readonly');
        document
            .getElementById('settings-gender')
            .removeAttribute('disabled');
        document
            .getElementById('settings-birthday')
            .removeAttribute('readonly');
        document
            .getElementById('settings-telephone')
            .removeAttribute('readonly');
        // document
        //     .getElementById('settings-location')
        //     .removeAttribute('readonly');
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
        // document
        //     .getElementById('settings-patronymic')
        //     .setAttribute('readonly', 'true');
        // if (document.getElementById('settings-patronymicError')) {
        //     const target = document.getElementById('settings-patronymic');
        //     target.parentNode.removeChild(target.nextSibling);
        // }
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
        // document
        //     .getElementById('settings-location')
        //     .setAttribute('readonly', 'true');
        // if (document.getElementById('settings-locationError')) {
        //     const target = document.getElementById('settings-location');
        //     target.parentNode.removeChild(target.nextSibling);
        // }
        document
            .getElementById('settings-email')
            .setAttribute('readonly', 'true');
        if (document.getElementById('settings-emailError')) {
            const target = document.getElementById('settings-email');
            target.parentNode.removeChild(target.nextSibling);
        }
    }

    /***
     * Validate phone
     * @param target
     * @returns {boolean}
     * @private
     */
    __validateTelephone(target) {
        const { error, message } = this.__model.validationTelephone(target.value);
        if (!error) {
            this.__addSuccesses(target, 'phoneError');
            return true;
        }
        this.__insertError(target, 'phoneError', this.__createMessageError(`
                  <ul class="list-errors">
                    <li>${message}</li>
                  </ul>
    `));
        return false;
    }


    /***
     * Validate password
     * @param target
     * @returns {boolean}
     * @private
     */
    __validatePassword(target) {
        if (target.value !== '') {
            const {error, message} = this.__model.validationPassword(target.value);
            if (!error) {
                this.__addSuccesses(target, `${target.id}Error`);
                const element = document.getElementById('settings-confirm-pass');
                this.__validateConfirmPwd(element);
                return true;
            }

            this.__insertError(target, `${target.id}Error`, this.__createMessageError(`
                        <ul class="list-errors">
                        ${message.reduce((prev, cur) => `${prev}<li>${cur}</li>`, '')}
                        </ul>
            `));
        }
        return false;
    }

    /***
     * Validate confirmation password
     * @param target
     * @returns {boolean}
     * @private
     */
    __validateConfirmPwd(target) {
        const element = document.getElementById('settings-new-pass');
        if (target.value !== '') {
            const {error, message} = this.__model.validationConfirmPassword(element.value, target.value);
            if (!error) {
                this.__addSuccesses(target, `${target.id}Error`);
                return true;
            }

            this.__insertError(target, `${target.id}Error`, this.__createMessageError(`
                 <ul class="list-errors">
                     <li>${message}</li>
                 </ul>
            `));
        }
        return false;
    }

    /***
     * Validate email field
     * @param target
     * @returns {boolean}
     * @private
     */
    __validateEmail(target) {
        const { error, message } = this.__model.validationEmail(target.value);
        if (!error) {
            this.__addSuccesses(target, 'MailError');
            return true;
        }
        this.__insertError(target, 'MailError', this.__createMessageError(`
                  <ul class="list-errors">
                     <li>${message}</li>
                 </ul>
    `));
        return false;
    }

    /***
     * Validate string fields
     * @param target
     * @returns {boolean}
     * @private
     */
    __validateString(target) {
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
}