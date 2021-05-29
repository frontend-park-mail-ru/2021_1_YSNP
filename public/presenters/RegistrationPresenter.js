import {BasePresenter} from './BasePresenter.js';

import {RegUserModel} from '../models/RegUserModel.js';

import {
    addSuccesses,
    hideError,
    insertError,
    showError,
    removeModifyClasses
} from '../modules/layout/validationStates.js';
import {eventHandlerWithDataType} from '../modules/handlers/eventHandler.js';
import {parseTelNumber, telMask} from '../modules/layout/mask.js';
import {noop} from '../modules/noop.js';
import {checkIsNotAuth} from '../modules/checkAuth.js';
import {BadRequestError, UnauthorizedError} from '../modules/http/httpError';

import {router} from '../modules/router.js';

import {frontUrls} from '../modules/urls/frontUrls.js';
import {sentryManager} from '../modules/sentry';

/***
 *  RegistrationPresenter class
 */
export class RegistrationPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {RegistrationView} view - view
     * @this {RegistrationPresenter}
     */
    constructor(view) {
        super(view);
        this.__model = new RegUserModel();
        this.__view = view;
        this.__isPicAdd = false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Update view data
     * @returns {Promise<{data: *, status: number}>}
     * @this {RegistrationPresenter}
     */
    async update() {
        return super.update()
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок

                console.log(err.message);
                if (!UnauthorizedError.isError(err)) {
                    sentryManager.captureException(err);
                }

                this.checkOfflineStatus(err);
            });
    }

    /***
     * @author Ivan Gorshkov
     *
     * Control view
     * @returns {Promise<void>}
     * @this {RegistrationPresenter}
     */
    async control() {
        await this.update();
        if (this.checkOffline()) {
            return;
        }

        if (!checkIsNotAuth()) {
            return;
        }

        this.__view.render(this.__makeContext());

        this.checkScrollOffset();
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();

        this.__view.removePage();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Header click listener
     * @param {MouseEvent} ev - event
     * @param {string} dataType
     * @param {Object} actions
     * @private
     * @this {RegistrationPresenter}
     */
    __listenerRegistrationPanel(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {RegistrationPresenter}
     * @return {Object}
     * @private
     */
    __createListeners() {
        return {
            navigation: {
                backClick: {
                    type: 'click',
                    listener: this.__listenerRegistrationPanel.bind(this, 'action', this.__getActions().navigation)
                }
            },
            registrationPanel: {
                registrationClick: {
                    type: 'click',
                    listener: this.__listenerRegistrationPanel.bind(this, 'action', this.__getActions().registrationPanel)
                },
                validateInput: {
                    type: 'input',
                    listener: this.__listenerRegistrationPanel.bind(this, 'action', this.__getActions().registrationPanel)
                },
                validateChange: {
                    type: 'change',
                    listener: this.__listenerRegistrationPanel.bind(this, 'action', this.__getActions().registrationPanel)
                },
                keydown: {
                    type: 'keydown',
                    listener: (ev) => {
                        ev.preventDefault();
                        return false;
                    }
                },
                focusInput: {
                    type: 'focus',
                    listener: this.__listenerRegistrationPanel.bind(this, 'move', this.__getActions().registrationPanel)

                },
                blurInput: {
                    type: 'blur',
                    listener: this.__listenerRegistrationPanel.bind(this, 'moveout', this.__getActions().registrationPanel)

                }
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * action for navigation to back
     * @this {RegistrationPresenter}
     * @private
     */
    __navBack() {
        this.closeAllComponents();
        this.__view.removingSubViews();
        router.navigateBack();
    }

    /***
     * @author Ivan Gorshkov
     *
     * Get registration actions
     * @this {RegistrationPresenter}
     * @returns {Object}
     * @private
     */
    __getActions() {
        return {
            navigation: {
                backClick: {
                    open: this.__navBack.bind(this)
                }
            },
            registrationPanel: {
                inputPhone: {
                    open: this.__validatePhoneListener.bind(this)
                },
                changePwd: {
                    open: this.__validateFields.bind(this, this.__validatePas.bind(this))
                },
                inputConfirmPwd: {
                    open: this.__validateFields.bind(this, this.__validateConfirmPwd.bind(this))
                },
                inputMail: {
                    open: this.__validateFields.bind(this, this.__validateMail.bind(this))
                },
                inputEmpty: {
                    open: this.__validateFields.bind(this, this.__validateEmpty.bind(this))
                },
                clickRegistration: {
                    open: this.__validateRegister.bind(this)
                },
                clickUpload: {
                    open: this.__upload.bind(this)
                },
                readURL: {
                    open: this.__read.bind(this)
                },
                showError: {
                    open: showError.bind(this)
                },
                hideError: {
                    open: hideError.bind(this)
                }
            }
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * Make view context
     * @returns {{navigation: {data: null, listeners: {backClick: {listener: *, type: string}}}, registrationPanel: {data: null, listeners: {focusInput: {listener: *, type: string}, validateChange: {listener: *, type: string}, validateInput: {listener: *, type: string}, blurInput: {listener: *, type: string}, keydown: {listener: function(*): boolean, type: string}, registrationClick: {listener: *, type: string}}}}}
     * @private
     * @this {RegistrationPresenter}
     */
    __makeContext() {
        return {
            navigation: {
                data: null,
                listeners: this.__createListeners().navigation
            },
            registrationPanel: {
                data: null,
                listeners: this.__createListeners().registrationPanel
            }
        };
    }

    /****
     * @author Ivan Gorshkov
     *
     * update profile picture action
     * @private
     * @param {Event} ev
     * @this {RegistrationPresenter}
     */
    __read(ev) {
        const firstIndex = 0;
        if (ev.target.files && ev.target.files[firstIndex]) {
            const reader = new FileReader();
            reader.onload = this.__view.avatarOnLoad.bind(this.__view);
            this.__isPicAdd = true;
            reader.readAsDataURL(ev.target.files[firstIndex]);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system menu action
     * @private
     * @this {RegistrationPresenter}
     */
    __upload() {
        this.__view.openFileSystem();
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input phone
     * @param{Event} ev
     * @return {boolean}
     * @private
     * @this {RegistrationPresenter}
     */
    __validatePhoneListener(ev) {
        telMask(ev);
        this.__validateFields(this.__validatePhone.bind(this), ev);
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for phone value
     * @param target
     * @return {boolean}
     * @this {RegistrationPresenter}
     * @private
     */
    __validatePhone(target) {
        const {error, message} = this.__model.validationTelephone(parseTelNumber(target.value));
        return this.__handlingErrors(error, target, message);
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for password value
     * @param target
     * @return {boolean}
     * @this {RegistrationPresenter}
     * @private
     */
    __validatePas(target) {
        const {error, message} = this.__model.validationPassword(target.value);
        return this.__handlingErrors(error, target, message, () => {
            const {passwordConfirm} = this.__view.getAllFields();
            this.__validateConfirmPwd(passwordConfirm);
        });
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input confirmpassword
     * @private
     * @this {RegistrationPresenter}
     * @param {Function} validFunc
     * @param {Event} ev
     */
    __validateFields(validFunc, ev) {
        if (!validFunc(ev.target)) {
            this.__view.hideError(this.__view.getErrorId(ev.target));
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for ConfirmPwd value
     * @param target
     * @return {boolean}
     * @this {RegistrationPresenter}
     * @private
     */
    __validateConfirmPwd(target) {
        const {password} = this.__view.getAllFields(),
            {error, message} = this.__model.validationConfirmPassword(password.value, target.value);
        return this.__handlingErrors(error, target, message);
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for email value
     * @param target
     * @return {boolean}
     * @this {RegistrationPresenter}
     * @private
     */
    __validateMail(target) {
        if (target.value.length === 0) {
            removeModifyClasses(target);
            return false;
        }
        const {error, message} = this.__model.validationEmail(target.value);
        return this.__handlingErrors(error, target, message);
    }

    /***
     * @author Ivan Gorshkov
     *
     * handlingErrors
     * @param {boolean} error
     * @param {HTMLElement} target
     * @param {string} message
     * @param {Function} supprotValidate
     * @return {boolean}
     * @this {RegistrationPresenter}
     * @private
     */
    __handlingErrors(error, target, message, supprotValidate = noop) {
        if (!error) {
            addSuccesses(target, this.__view.getErrorId(target));
            supprotValidate();
            return true;
        }
        insertError(target, this.__view.getErrorId(target), this.__view.addErrorForm(message));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for empty value
     * @param {HTMLElement} target
     * @return {boolean}
     * @this {RegistrationPresenter}
     * @private
     */
    __validateEmpty(target) {
        const {error, message} = this.__model.validationString(target.value);
        return this.__handlingErrors(error, target, message);
    }

    /***
     * @author Ivan Gorshkov
     *
     * Validate photo is selected
     * @returns {boolean}
     * @private
     */
    __validatePhoto() {
        if (!this.__isPicAdd) {
            return true;
        }
        const {error, message} = this.__model.validationImage(this.__view.getForm());
        if (this.__isPicAdd && !error) {
            this.__view.removeErrorAvatar();
            this.__view.errorText('');
            return true;
        }

        this.__view.addErrorAvatar();
        this.__view.errorText(message);

        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action witch validate all fields (registration button)
     * @private
     * @this {RegistrationPresenter}
     */
    __validateRegister() {
        const {name, surname, mail, phone, password, passwordConfirm, date, sex} = this.__view.getAllFields();
        const isValidpwdConfirm = this.__validateConfirmPwd(passwordConfirm);
        const isValidPhone = this.__validatePhone(phone);
        const isValidPwd = this.__validatePas(password);
        //  const isValidMail = this.__validateMail(mail);
        const isValidName = this.__validateEmpty(name);
        const isValidSurname = this.__validateEmpty(surname);
        //   const isValidDate = this.__validateEmpty(date);
        const isPhoto = this.__validatePhoto();

        if (isPhoto && isValidName && isValidPhone && isValidPwd && isValidpwdConfirm && isValidSurname) {
            this.__model.fillUserData({
                name: name.value,
                surname: surname.value,
                sex: sex.options[sex.selectedIndex].value,
                dateBirth: date.value,
                telephone: parseTelNumber(phone.value),
                email: mail.value,
                password1: password.value,
                password2: passwordConfirm.value
            });

            this.__model.registration(this.__view.getForm())
                .then(() => {
                    this.closeAllComponents();
                    this.__view.removingSubViews();
                    router.redirect(frontUrls.main);
                })
                .catch((err) => {
                    //TODO(Sergey) нормальная обработка ошибок

                    console.log(err.message);
                    if (!BadRequestError.isError(err)) {
                        sentryManager.captureException(err);
                    }

                    this.scrollUp();
                    this.__view.errorText(err.message);

                    this.checkOfflineStatus(err);
                    this.checkOffline();
                });
        }
    }
}