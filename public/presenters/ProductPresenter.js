import {BasePresenter} from './BasePresenter.js';

export class ProductPresenter extends BasePresenter {
    constructor(view) {
        super(view);
    }

    async update() {
        await super.update();
    }

    async control() {
        await this.update();
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