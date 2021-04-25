import {httpStatus} from '../modules/httpStatus';
import {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    OfflineError,
    InternalServerError
} from '../modules/httpError';

/***
 * Base model
 */
export class BaseModel {
    /***
     * Class constructor
     * @param {number} status - http status
     * @param {{message: string} | {message: string, badRequest: string} | {message: string, notFound: string} | {message: string,  badRequest: string, notFound: string}} data - http data
     */
    checkError(status, data = {
        message: 'ошибка сети',
        badRequest: BadRequestError.defaultMessage,
        notFound: NotFoundError.defaultMessage
    }) {
        if (status === httpStatus.StatusBadRequest) {
            throw new BadRequestError(data.badRequest);
            // throw new BadRequestError(data.message);
        }

        if (status === httpStatus.StatusUnauthorized) {
            throw new UnauthorizedError();
            // throw new UnauthorizedError(data.message);
        }

        if (status === httpStatus.StatusForbidden) {
            throw new ForbiddenError();
            // throw new ForbiddenError(data.message);
        }

        if (status === httpStatus.StatusNotFound) {
            throw new NotFoundError(data.notFound);
            // throw new NotFoundError(data.message);
        }

        if (status === httpStatus.StatusOffline) {
            throw new OfflineError();
            // throw new OfflineError(data.message);
        }

        if (status === httpStatus.StatusInternalServerError) {
            throw new InternalServerError();
            // throw new InternalServerError(data.message);
        }
    }
}