import {BasePresenter} from './BasePresenter.js';

import {UnauthorizedError} from '../modules/http/httpError';

import {sentryManager} from '../modules/sentry';

/***
 * Not found presenter
 */
export class NotFoundPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {NotFoundView} view - view
     * @param {number} errCode - view error code
     */
    constructor(view, errCode = 404) {
        super(view);
        this.__view = view;
        this.__errCode = errCode;
    }

    /***
     * Update page date
     * @returns {Promise<{data: *, status: number}>}
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
     * Control view
     * @returns {Promise<void>}
     */
    async control() {
        await this.update();
        if (this.checkOffline()) {
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
     * Get page description
     * @returns {{code: number, description: string}}
     * @private
     */
    __getPageDescription() {
        switch (this.__errCode) {
            case 404: {
                return {
                    code: this.__errCode,
                    description: 'Страница не найдена'
                };
            }


        }

        return {
            code: this.__errCode,
            description: 'Ошибка'
        };
    }

    /***
     * Make context
     * @returns {{pageNotFound: {code: number, description: string}}}
     * @private
     */
    __makeContext() {
        return {
            pageNotFound: this.__getPageDescription()
        };
    }
}