import {BasePresenter} from './BasePresenter.js';
import {addSuccesses, hideError, insertError, showError} from '../modules/validationStates.js';
import {eventHandlerWithDataType} from '../modules/eventHandler.js';
import {parseTelNumber, telMask} from '../modules/telMask.js';
import {router} from '../modules/router.js';
import {frontUrls} from '../modules/frontUrls.js';
import {RegUserData} from '../models/RegUserData.js';
import {RegistrationPanel} from '../components/RegistrationPanel/RegistrationPanel.js';
import {Navigation} from '../components/Navigation/Navigation';

export class RegistrationPresenter extends BasePresenter {
    constructor(view, registrationFields) {
        super(view);
        this.__model = new RegUserData();
        this.__view = view;
        this.__isPicAdd = false;
        this.__registrationFields = registrationFields;
    }

    async update() {
        await super.update();
    }

    async control() {
        await this.update();
        this.__view.insertSubview('reg-nav', new Navigation('Главная страница', {route: ['Регистрация профиля']}));
        this.__view.insertSubview('reg-panel', new RegistrationPanel());
        this.__view.render(this.__makeContext());
    }

    /***
     * Header click listener
     * @param {MouseEvent} ev - event
     * @param dataType
     * @param actions
     * @private
     */
    __listenerRegistrationPanel(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
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

    __openLanding() {
        this.closeAllComponents();
        this.__view.removingSubViews();

        router.redirect(frontUrls.main);
    }

    __getActions() {
        return {
            navigation: {
                backClick: {
                    open: this.__openLanding.bind(this)
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
     * Make view context
     * @returns {{productList: {data: *[], listeners: {productCardClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            navigation: {
                data: null,
                listeners: this.__createListeners().navigation
            },
            registrationPanel: {
                data: this.__registrationFields,
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
        this.__validateFields(this.__validatePhone.bind(this), ev);
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
            const {passwordConfirm} = this.__view.getAllFields();
            this.__validateConfirmPwd(passwordConfirm);
            return true;
        }

        insertError(target, this.__view.getErrorId(target), this.__view.addErrorForm(message));
        return false;
    }

    /***
     * @author Ivan Gorshkov
     *
     * action to validate input confirmpassword
     * @return {boolean}
     * @private
     * @this {RegistrationPanelController}
     * @param validFunc
     * @param ev
     */
    __validateFields(validFunc, ev) {
        if (validFunc(ev.target) === false) {
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
        const {password} = this.__view.getAllFields();
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
            this.__view.removeErrorAvatar();
            return true;
        }
        this.__view.addErrorAvatar();
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
        const {name, surname, mail, phone, password, passwordConfirm, date, sex} = this.__view.getAllFields();
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