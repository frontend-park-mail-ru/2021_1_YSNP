import {PasswordUserModel} from './PasswordUserModel.js';

import {http} from '../modules/http.js';
import {backUrls} from '../modules/backUrls.js';
import {httpStatus} from '../modules/httpStatus.js';

import {ForbiddenError, BadRequestError, OfflineError, InternalServerError} from '../modules/customError.js';

/***
 * Auth user model
 */
export class AuthUserModel extends PasswordUserModel {
    /***
     * Validate user data
     * @param {Object} data - user data
     * @returns {{message: string, error: boolean}}
     */
    validateData(data) {
        const telephoneValidate = this.validationTelephone(data.telephone);
        const passwordValidate = this.validationPassword(data.telephone);

        if (!telephoneValidate.error || !passwordValidate.error) {
            this.fillUserData(data);

            return {
                message: '',
                error: false
            };
        }

        return {
            message: 'Неправильный номер или пароль',
            error: true
        };
    }

    /***
     * Fill user model data
     * @param {Object} data - user data
     */
    fillUserData(data) {
        super.fillUserData(data);
    }

    /***
     * Get auth user model Json
     * @returns {{password: string, telephone}}
     * @private
     */
    __jsonData() {
        return {
            telephone: this.__telephone,
            password: this.__password1
        };
    }

    /***
     * Post auth user data to backend
     * @returns {Promise<{data: *, status: number}>}
     */
    async auth() {
        return http.post(backUrls.login, this.__jsonData())
            .then(({status}) => {
                if (status === httpStatus.StatusBadRequest) {
                    throw new BadRequestError('Неправильный номер или пароль');
                    // throw new BadRequestError(data.message);
                }

                if (status === httpStatus.StatusForbidden) {
                    throw new ForbiddenError();
                    // throw new ForbiddenError(data.message);
                }

                if (status === httpStatus.StatusOffline) {
                    throw new OfflineError();
                    // throw new OfflineError(data.message);
                }

                if (status === httpStatus.StatusInternalServerError) {
                    throw new InternalServerError();
                    // throw new InternalServerError(data.message);
                }
            });
    }
}
