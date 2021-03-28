import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu';
import {Settings} from '../components/Settings/Settings';

/***
 * Profile view
 */
export class ProfileView extends BaseView {
    /***
     * Class constructor
     * @param {HTMLElement} app - parent element
     */
    constructor(app) {
        super(app);
    }

    /***
     * Make view context
     * @param context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            profileSettings: {
                data: context.profileSettings.data,
                listeners: context.profileSettings.listeners
            }
        };
    }

    /***
     * Render view
     */
    render(context) {
        super.render();
        this.__makeContext(context);

        const layout = new Layout(this.__app);
        layout.render({two: true});
        const leftParent = layout.leftParent;
        const rightParent = layout.rightParent;

        this.__profileMenu = new ProfileMenu(leftParent, {page: 'settings'});
        this.__profileMenu.render(this.__context.profileSettings);

        this.__settings = new Settings(rightParent);
        this.__settings.render(this.__context.profileSettings);
    }
}