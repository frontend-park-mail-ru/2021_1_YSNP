import {BasePresenter} from './BasePresenter.js';
import {
    insertError,
    addSuccesses,
    createMessageError,
    hideBackendError,
    showBackendError,
    showError,
    hideError,
    validateError
} from '../modules/validationStates.js';
import {router} from '../modules/router';
import {frontUrls} from '../modules/frontUrls';
import {user} from '../models/ProfileUserModel.js';

/***
 * Profile settings presenter
 */
export class ProfilePresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {ProfileView} view - view
     */
    constructor(view) {
        super(view);
        this.__model = user;
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        await super.update();
    }

    /***
     * Control view
     * @returns {Promise<void>}
     */
    async control() {
        await this.update();
        // super.control();
        if (!this.__userModel.isAuth) {
            router.redirect(frontUrls.registration);
            return;
        }
        this.__view.render(this.__makeContext());
    }

    /***
     * Settings click event
     * @param {Event} ev - event
     * @param {string} type - type action
     * @private
     */
    __listenerSettingsClick(type, ev) {
        hideBackendError('settings-password-error');
        hideBackendError('settings-error');
        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {

                if (el.dataset !== undefined && type in el.dataset) {
                    if (el.dataset.action === 'saveChangesClick') {
                        ev.preventDefault();
                    }
                    if ((type === 'move') || (type === 'moveout')) {
                        actions[el.dataset[type]].open(ev);
                    } else {
                        actions[el.dataset[type]].open(ev.target);
                    }

                }
            });
    }

    /***
     * Get profile listeners
     * @returns {{focusInput: {listener: *, type: string}, validateChange: {listener: *, type: string}, validateInput: {listener: *, type: string}, blurInput: {listener: *, type: string}, settingsClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            settingsClick: {
                type: 'click',
                listener: this.__listenerSettingsClick.bind(this, 'action')
            },
            validateInput: {
                type: 'input',
                listener: this.__listenerSettingsClick.bind(this, 'action')
            },
            validateChange: {
                type: 'change',
                listener: this.__listenerSettingsClick.bind(this, 'action')

            },
            focusInput: {
                type: 'focus',
                listener: this.__listenerSettingsClick.bind(this, 'move')

            },
            blurInput: {
                type: 'blur',
                listener: this.__listenerSettingsClick.bind(this, 'moveout')

            }
        };
    }

    /***
     * Get profile actions
     * @returns {{checkPasswd: {open: *}, savePasswordClick: {open: *}, saveChangesClick: {open: *}, editClick: {open: *}, inputPhone: {open: any}, changePwd: {open: any}, inputConfirmPwd: {open: any}, resetPasswordClick: {open: *}, hideError: {open: *}, showError: {open: *}, inputEmpty: {open: any}, inputMail: {open: any}, readURL: {open: *}, clickUpload: {open: *}}}
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
     * Enable changing password buttons
     * @private
     */
    __enablePasswordChange(target) {
        if (target.value !== '') {
            document
                .getElementById('settings-save-pass')
                .style.visibility = 'visible';
            document
                .getElementById('settings-reset-pass')
                .style.visibility = 'visible';
        } else {
            document
                .getElementById('settings-save-pass')
                .style.visibility = 'hidden';
            document
                .getElementById('settings-reset-pass')
                .style.visibility = 'hidden';
        }
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
                .then((data) => {
                    if (data.isUpdate === false) {
                        showBackendError('settings-password-error', data.message);
                    } else {
                        this.__resetPasswordClick();
                        const err = document.getElementById('settings-password-error');
                        err.textContent = 'Пароль успешно изменен';
                        err.classList.add('settings-password-error_success');
                        err.classList.remove('backend-error_hidden');
                    }
                })
                .catch((error) => {
                    showBackendError('settings-password-error', error.message);
                });
        } else {
            showBackendError('settings-password-error', 'Проверьте, что все поля заполнены');
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
        hideBackendError('settings-password-error');
        const passwordConfirm = document.getElementById('settings-confirm-pass');
        const password = document.getElementById('settings-new-pass');
        const oldPass = document.getElementById('settings-old-pass');
        passwordConfirm.value = '';
        password.value = '';
        oldPass.value = '';
        addSuccesses(password, 'settings-new-passError');
        addSuccesses(oldPass, 'settings-old-passError');
        addSuccesses(passwordConfirm, 'settings-confirm-passError');

        password.classList.remove('reg-panel__input-susses');
        passwordConfirm.classList.remove('reg-panel__input-susses');
        oldPass.classList.remove('reg-panel__input-susses');
    }

    /***
     * Open file system menu
     * @private
     */
    __upload() {
        if (this.__isOpen) {
            console.log('click upload');
            const elem = document.getElementById('file-upload');
            elem.click();
        }
    }

    /***
     * Update profile picture
     * @param input
     * @private
     */
    __read(input) {
        const firstFile = 0;
        if (input.files && input.files[firstFile]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const elem = document.getElementById('settings-profile-pic');
                elem.src = e.target.result;
            };

            reader.readAsDataURL(input.files[firstFile]);
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
                const elem = document.getElementById('settings-profile-pic');
                elem.src = this.__model.getFirstImage();
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
     * Draw popup
     * @param message
     * @returns {string}
     * @private
     */
    __drawPopup(message) {
        return `
        <div class="popup">
            <div class="popup-inner">
                <div class="popup-message">${message}</div>
                <div class="popup-buttons">
                    <button id="popup-save" class="settings-title__save_button" data-action="savePasswordClick">Остаться</button>
                    <button id="popup-cancel" class="settings-title__reset_button" data-action="resetPasswordClick">Отменить</button>
                </div>
            </div>
        </div>
        `;
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
        const birthday = document.getElementById('settings-birthday');
        const phone = document.getElementById('settings-telephone');
        const mail = document.getElementById('settings-email');

        const isValidSurname = this.__validateString(surname);
        const isValidName = this.__validateString(name);
        const isValidBirthday = this.__validateString(birthday);
        const isValidPhone = this.__validateTelephone(phone);
        const isValidMail = this.__validateEmail(mail);


        const sexEl = document.getElementById('settings-gender');
        const sex = sexEl.options[sexEl.selectedIndex].value;
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
            this.__model.settings(document.getElementById('settings-form'))
                .then(({isUpdate, message}) => {
                    if (isUpdate) {
                        hideBackendError('settings-error');
                        router.redirect(frontUrls.profile);
                    } else {
                        showBackendError('settings-error', message);
                    }
                })
                .catch((error) => {
                    showBackendError('settings-error', error.message);
                });
        } else {
            showBackendError('settings-error', 'Проверьте правильность введенных данных');
        }
        return false;
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
            .getElementById('settings-gender')
            .removeAttribute('disabled');
        document
            .getElementById('settings-birthday')
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
        const {error, message} = this.__model.validationTelephone(target.value);
        return validateError(error, target, message);
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
                addSuccesses(target, `${target.id}Error`);
                const element = document.getElementById('settings-confirm-pass');
                this.__validateConfirmPwd(element);
                return true;
            }

            insertError(target, `${target.id}Error`, createMessageError(`
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
            return validateError(error, target, message);
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
        const {error, message} = this.__model.validationEmail(target.value);
        return validateError(error, target, message);
    }

    /***
     * Validate string fields
     * @param target
     * @returns {boolean}
     * @private
     */
    __validateString(target) {
        let error = true;
        if (target.value !== '') {
            error = false;
        }
        return validateError(error, target, 'Поле не должно быть пустым');
    }

    /***
     * Make view context
     * @returns {{profileSettings: {data: {linkImage: (*|null), surname: (Object.surname|string|*), sex: (Object.sex|string|*), name: (Object.name|string|*), telephone: (Object.telephone|string|*), dateBirth: (Object.dateBirth|string|*), email: (Object.email|string|*)}, listeners: {focusInput: {listener: *, type: string}, validateChange: {listener: *, type: string}, validateInput: {listener: *, type: string}, blurInput: {listener: *, type: string}, settingsClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            profileSettings: {
                data: this.__model.getData(),
                listeners: this.__createListeners()
            }
        };
    }
}