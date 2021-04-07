import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {Donut} from '../components/Donut/Donut.js';

/***
 * Donut
 */
export class DonutView extends BaseView {
    /***
     * Render view
     */
    render() {
        super.render();

        const layout = new Layout(this.__app, true);
        layout.render();
        const parent = layout.parent;

        const donut = new Donut(parent);
        donut.render();
    }
}