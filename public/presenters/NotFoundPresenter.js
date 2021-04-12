import {BasePresenter} from './BasePresenter.js';

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
        this.__view.render(this.__makeContext());
    }

    /***
     * Remove page listeners
     */
    removePageListeners() {
        super.removePageListeners();
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