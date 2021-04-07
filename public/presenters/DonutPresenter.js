import {BasePresenter} from './BasePresenter.js';

/***
 * Donut
 */
export class DonutPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {DonutView} view - view
     */
    constructor(view) {
        super(view);
        this.__view = view;
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
        this.__view.render();
    }
}