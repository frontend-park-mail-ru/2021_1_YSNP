import {BasePresenter} from './BasePresenter.js';
import {addSuccesses, hideError, insertError, showError} from '../modules/validationStates.js';
import {eventHandlerWithDataType} from '../modules/eventHandler.js';
import {parseTelNumber, telMask} from '../modules/telMask.js';
import {router} from '../modules/router.js';
import {frontUrls} from '../modules/frontUrls.js';
import {RegUserData} from '../models/RegUserData.js';

export class RegistrationPresenter extends BasePresenter {
    constructor(view) {
        super(view);
        this.__model = new RegUserData();
        this.__view = view;
        this.__isPicAdd = false;
    }

    async update() {
        await super.update();
    }

    async control() {
        await this.update();

        this.__view.render(this.__makeContext());
    }

    /***
     * Header click listener
     * @param {MouseEvent} ev - event
     * @param dataType
     * @private
     */
    __listenerRegistrationPanel(dataType, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, this.__getActions().registrationPanel, true);
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch return Object of listeners
     * @this {RegistrationPanelController}
     * @return {Object}
     * @private
     */
    __createListeners() {
        return {
            registrationPanel: {
                registrationClick: {
                    type: 'click',
                    listener: this.__listenerRegistrationPanel.bind(this, 'action')
                },
                validateInput: {
                    type: 'input',
                    listener: this.__listenerRegistrationPanel.bind(this, 'action')
                },
                validateChange: {
                    type: 'change',
                    listener: this.__listenerRegistrationPanel.bind(this, 'action')
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
                    listener: this.__listenerRegistrationPanel.bind(this, 'move')

                },
                blurInput: {
                    type: 'blur',
                    listener: this.__listenerRegistrationPanel.bind(this, 'moveout')

                }
            }
        };
    }

    __getActions() {
        return {
            registrationPanel: {
                inputPhone: {
                    open: this.__validatePhoneListener.bind(this)
                },
                changePwd: {
                    open: this.__validatePasListener.bind(this)
                },
                inputConfirmPwd: {
                    open: this.__validateConfirmPwdListener.bind(this)
                },
                inputMail: {
                    open: this.__validateMailListener.bind(this)
                },
                inputEmpty: {
                    open: this.__validateEmptyListener.bind(this)
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
     * TMP DATA
     *
     * @return {{date: {dataAction: string, inputType: string, placeholder: null, id: string, title: string}, password: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}, mail: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}, phone: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}, passwordConfirm: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}, surname: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}, name: {dataAction: string, inputType: string, placeholder: string, id: string, title: string}}}
     * @private
     */
    __RegistrationForm() {
        return {
            name: {
                title: 'Имя*',
                placeholder: 'Имя',
                inputType: 'text',
                id: 'name',
                dataAction: 'inputEmpty',
                params: ''
            },
            surname: {
                title: 'Фамилия*',
                placeholder: 'Фамилия',
                inputType: 'text',
                id: 'surname',
                dataAction: 'inputEmpty',
                params: ''
            },
            phone: {
                title: 'Телефон*',
                placeholder: 'Телефон',
                inputType: 'tel',
                id: 'phone',
                dataAction: 'inputPhone',
                params: ''
            },
            mail: {
                title: 'Почта*',
                placeholder: 'Почта',
                inputType: 'email',
                id: 'mail',
                dataAction: 'inputMail',
                params: ''
            },
            password: {
                title: 'Пароль*',
                placeholder: 'Пароль',
                inputType: 'password',
                id: 'password',
                dataAction: 'changePwd',
                params: ''
            },
            passwordConfirm: {
                title: 'Повторите пароль*',
                placeholder: 'Пароль',
                inputType: 'password',
                id: 'passwordConfirm',
                dataAction: 'inputConfirmPwd',
                params: ''
            },
            date: {
                title: 'Дата рождения*',
                placeholder: 'дд-мм-гггг',
                inputType: 'date',
                id: 'date',
                dataAction: 'inputEmpty',
                params: 'min="1890-01-01"'
            }
        };
    }

    /***
     * Make view context
     * @returns {{productList: {data: *[], listeners: {productCardClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            registrationPanel: {
                data: this.__RegistrationForm(),
                listeners: this.__createListeners().registrationPanel
            }
        };
    }

    /****
     * @author Ivan Gorshkov
     *
     * update profile picture action
     * @private
     * @param ev
     */
    __read(ev) {
        const firstIndex = 0;
        if (ev.target.files && ev.target.files[firstIndex]) {
            const reader = new FileReader();
            reader.onload = this.__view.avatarOnLoad.bind(this);
            this.__isPicAdd = true;
            reader.readAsDataURL(ev.target.files[firstIndex]);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * open file system menu action
     * @private
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
     * @this {RegistrationPanelController}
     */
    __validatePhoneListener(ev) {
        telMask(ev);

        if (this.__validatePhone(ev.target) === false) {
            this.__view.hideError(this.__view.getErrorId(ev.target));
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for phone value
     * @param target
     * @return {boolean}
     * @this {RegistrationPanelController}
     * @private
     */
    __validatePhone(target) {
        const {error, message} = this.__model.validationTelephone(parseTelNumber(target.value));
        if (!error) {
            addSuccesses(target, this.__view.getErrorId(target));
            return true;
        }
        insertError(target, this.__view.getErrorId(target), this.__view.addErrorForm(message));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input password
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     * @param ev
     */
    __validatePasListener(ev) {
        if (this.__validatePas(ev.target) === false) {
            this.__view.hideError(this.__view.getErrorId(ev.target));
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for password value
     * @param target
     * @return {boolean}
     * @this {RegistrationPanelController}
     * @private
     */
    __validatePas(target) {
        const {error, message} = this.__model.validationPassword(target.value);
        if (!error) {
            addSuccesses(target, this.__view.getErrorId(target));
            const {confirmPassword} = this._view.getPasswords();
            this.__validateConfirmPwd(confirmPassword);
            return true;
        }

        insertError(target, this.__view.getErrorId(target), this.__view.addErrorForm(message.reduce((prev, cur) => `${prev}<li>${cur}</li>`, '')));

        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input confirmpassword
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     * @param ev
     */
    __validateConfirmPwdListener(ev) {
        if (this.__validateConfirmPwd(ev.target) === false) {
            this.__view.hideError(this.__view.getErrorId(ev.target));
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for ConfirmPwd value
     * @param target
     * @return {boolean}
     * @this {RegistrationPanelController}
     * @private
     */
    __validateConfirmPwd(target) {
        const {password} = this._view.getPasswords();
        const {error, message} = this.__model.validationConfirmPassword(password.value, target.value);
        if (!error) {
            addSuccesses(target, this.__view.getErrorId(target));
            return true;
        }
        insertError(target, this.__view.getErrorId(target), this.__view.addErrorForm(message));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input mail
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     * @param ev
     */
    __validateMailListener(ev) {
        if (this.__validateMail(ev.target) === false) {
            this.__view.hideError(this.__view.getErrorId(ev.target));
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for email value
     * @param target
     * @return {boolean}
     * @this {RegistrationPanelController}
     * @private
     */
    __validateMail(target) {
        const {error, message} = this.__model.validationEmail(target.value);
        if (!error) {
            addSuccesses(target, this.__view.getErrorId(target));
            return true;
        }
        insertError(target, this.__view.getErrorId(target), this.__view.addErrorForm(message));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input fields witch can not be empty
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     * @param ev
     */
    __validateEmptyListener(ev) {
        if (this.__validateEmpty(ev.target) === false) {
            this.__view.hideError(this.__view.getErrorId(ev.target));
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * function witch validate target for empty value
     * @param target
     * @return {boolean}
     * @this {RegistrationPanelController}
     * @private
     */
    __validateEmpty(target) {
        const {error, message} = this.__model.validationString(target.value);
        if (!error) {
            addSuccesses(target, this.__view.getErrorId(target));
            return true;
        }
        insertError(target, this.__view.getErrorId(target), this.__view.addErrorForm(message));
        return false;
    }

    /***
     * Validate photo is selected
     * @returns {boolean}
     * @private
     */
    __validatePhoto() {
        if (this.__isPicAdd === true) {
            document.getElementById('circle-avatar').classList.remove('reg-panel__input-error');
            document.getElementById('circle-avatar').classList.add('reg-panel__input-susses');
            return true;
        }
        document.getElementById('circle-avatar').classList.add('reg-panel__input-error');
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action witch validate all fields (registration button)
     * @private
     * @this {RegistrationPanelController}
     */
    __validateRegister() {
        const {name, surname, mail, phone, password, passwordConfirm, date, sex} = this.view.getAllFields();
        const isValidpwdConfirm = this.__validateConfirmPwd(passwordConfirm);
        const isValidPhone = this.__validatePhone(phone);
        const isValidPwd = this.__validatePas(password);
        const isValidMail = this.__validateMail(mail);
        const isValidName = this.__validateEmpty(name);
        const isValidSurname = this.__validateEmpty(surname);
        const isValidDate = this.__validateEmpty(date);
        const isPhoto = this.__validatePhoto();

        if (isPhoto && isValidDate && isValidMail && isValidName && isValidPhone && isValidPwd && isValidpwdConfirm && isValidSurname) {
            this.__model.fillUserData({
                name: name.value,
                surname: surname.value,
                sex: sex.options[sex.selectedIndex].value,
                dateBirth: date.value,
                telephone: parseTelNumber(phone.value),
                email: mail.value,
                password: password.value
            });

            this.__model.registration(this.__view.getForm())
                .then(() => {
                    router.redirect(frontUrls.main);
                }).catch((data) => {
                this.__view.errorText(data);
            });
        }
    }
}