import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {PageNotFound} from '../components/PageNotFound/PageNotFound.js';

/***
 * Not found page
 */
export class NotFoundView extends BaseView {
    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Страница не найдена';
    }

    /***
     * Render view
     * @param {Object} context
     */
    render(context) {
        super.render();

        const layout = new Layout(this.__app, true);
        layout.render();
        const parent = layout.parent;

        const pageNotFound = new PageNotFound(parent);
        pageNotFound.render(context.pageNotFound);
        super.renderFooter();
    }
}