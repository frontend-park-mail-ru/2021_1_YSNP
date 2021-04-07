import {BaseView} from './BaseView.js';

export class SearchView extends BaseView {
    constructor(app) {
        super(app);
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Поиск';
    }

    render(context) {
        super.render();
        this.__setTitle();
    }
}