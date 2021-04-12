import {BasePresenter} from './BasePresenter.js';
import {
    insertError,
    addSuccesses,
    createMessageError,
    hideBackendError,
    showBackendError,
    showError,
    hideError,
    validateError,
    showSuccessMessage
} from '../modules/validationStates.js';

import {router} from '../modules/router';
import {frontUrls} from '../modules/frontUrls';
import {user} from '../models/ProfileUserModel.js';
import {checkIsAuth} from '../modules/checkAuth';

/***
 * Profile settings presenter
 */
export class UserProfilePresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {UserProfileView} view - view
     */
    constructor(view) {
        super(view);
        this.__model = user;
        this.__view = view;
        this.__changeImg = false;
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

        checkIsAuth();

        this.__view.render(this.__makeContext());
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();
    }

    /***
     * Settings click event
     * @param {Event} ev - event
     * @param {string} type - type action
     * @private
     */
    __listenerSettingsClick(type, ev) {
        const {errorSettingsID, errorPasswordID} = this.__view.getErrorID();
        hideBackendError(errorPasswordID);
        hideBackendError(errorSettingsID);
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
     * Enable password change
     * @param target
     * @private
     */
    __enablePasswordChange(target) {
        this.__view.enablePasswordChange(target);
    }

    /***
     * Save new password
     * @private
     */
    __savePasswordClick() {
        const {oldPassword, passwordConfirm, newPassword} = this.__view.getPasswordsInfo();
        const {errorPasswordID} = this.__view.getErrorID();
        const isValidpwdConfirm = this.__validateConfirmPwd(passwordConfirm);
        const isValidNewPwd = this.__validatePassword(newPassword);
        if (isValidNewPwd && isValidpwdConfirm) {
            this.__model.fillUserData({
                password: oldPassword.value,
                password1: newPassword.value,
                password2: passwordConfirm.value
            });

            this.__model.newPassword()
                .then((data) => {
                    if (data.isUpdate === false) {
                        showBackendError(errorPasswordID, data.message);
                    } else {
                        this.__resetPasswordClick();
                        showSuccessMessage(errorPasswordID, 'Пароль успешно изменен');
                    }
                })
                .catch((error) => {
                    showBackendError(errorPasswordID, error.message);
                });
        } else {
            showBackendError(errorPasswordID, 'Проверьте, что все поля заполнены');
        }
    }

    /***
     * Reset password changes
     * @private
     */
    __resetPasswordClick() {
        const {errorPasswordID} = this.__view.getErrorID();
        hideBackendError(errorPasswordID);
        const {oldPassword, passwordConfirm, newPassword} = this.__view.getPasswordsInfo();
        passwordConfirm.value = '';
        newPassword.value = '';
        oldPassword.value = '';
        addSuccesses(newPassword, this.__view.getInputErrorID(newPassword));
        addSuccesses(oldPassword, this.__view.getInputErrorID(oldPassword));
        addSuccesses(passwordConfirm, this.__view.getInputErrorID(passwordConfirm));
        this.__view.removePasswordStyle();
    }

    /***
     * Open file system menu
     * @private
     */
    __upload() {
        if (this.__isOpen) {
            this.__view.openFileSystem();
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

            reader.onload = this.__view.avatarOnLoad.bind(this.__view);

            reader.readAsDataURL(input.files[firstFile]);
            this.__changeImg = true;
        }
    }

    /***
     * Settings edit click callback
     * @private
     */
    __openEdit() {
        if (this.__isOpen) {
            if (confirm('Вы уверены, что хотите выйти без сохранения?')) {
                const modelData = this.__model.getData();
                const data = {
                    name: modelData.name,
                    surname: modelData.surname,
                    sex: modelData.sex,
                    dateBirth: modelData.dateBirth,
                    telephone: modelData.telephone,
                    email: modelData.email,
                    imageSrc: modelData.linkImage
                };

                this.__view.resetSettingsChanges(data);
                this.__isOpen = false;
                this.__changeImg = false;
            }

        } else {
            this.__view.enableEditing();
            this.__isOpen = true;
            this.__changeImg = false;
        }
    }

    /***
     * Settings save changes click callback
     * @private
     */
    __openSaveChanges() {
        if (this.__validateSettings()) {
            this.disableEditing();
            this.__changeImg = false;
        }
    }

    /***
     * Check validation of settings
     * @returns {boolean}
     * @private
     */
    __validateSettings() {
        const {surname, name, birthday, phone, mail, gender, img} = this.__view.getSettingsInputs();
        const {errorSettingsID} = this.__view.getErrorID();

        const isValidSurname = this.__validateString(surname);
        const isValidName = this.__validateString(name);
        const isValidBirthday = this.__validateString(birthday);
        const isValidPhone = this.__validateTelephone(phone);
        const isValidMail = this.__validateEmail(mail);
        const sex = gender.options[gender.selectedIndex];

        if (isValidSurname && isValidName && isValidBirthday && isValidPhone && isValidMail) {
            this.__model.fillUserData({
                name: name.value,
                surname: surname.value,
                dateBirth: birthday.value,
                sex: sex.value,
                email: mail.value,
                telephone: phone.value,
                password: 'password',
                linkImages: img.src
            });
            this.__model.settings(this.__view.getForm(), this.__changeImg)
                .then(({isUpdate, message}) => {
                    if (isUpdate) {
                        hideBackendError(errorSettingsID);
                        router.redirect(frontUrls.userProfile);
                    } else {
                        showBackendError(errorSettingsID, message);
                    }
                })
                .catch((error) => {
                    showBackendError(errorSettingsID, error.message);
                });
        } else {
            showBackendError(errorSettingsID, 'Проверьте правильность введенных данных');
        }
        return false;
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
        const {passwordConfirm} = this.__view.getPasswordsInfo();
        if (target.value !== '') {
            const {error, message} = this.__model.validationPassword(target.value);
            if (!error) {
                addSuccesses(target, `${target.id}Error`);
                this.__validateConfirmPwd(passwordConfirm);
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
        const {newPassword} = this.__view.getPasswordsInfo();
        if (target.value !== '') {
            const {error, message} = this.__model.validationConfirmPassword(newPassword.value, target.value);
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