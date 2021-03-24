import {BasePresenter} from './BasePresenter.js';

export class ProductCreatePresenter extends BasePresenter {
    constructor(view) {
        super(view);
    }

    async update() {
        await super.update();
    }

    async control() {
        await this.update();
        super.control();

        this.__view.render();
    }

    __createListeners() {
        return {};
    }

    __getActions() {
        return {};
    }

    __makeContext() {
        return {};
    }
}