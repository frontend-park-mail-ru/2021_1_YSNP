import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {PageNotFound} from '../components/PageNotFound/PageNotFound.js';

/***
 * Not found page
 */
export class NotFoundView extends BaseView {
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
    }
}