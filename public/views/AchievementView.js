import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout.js';
import {AchievementTable} from '../components/AchievementsList/AchievementTable';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu.js';
import {mobile} from '../modules/mobile';

/***
 * Favorite view
 */
export class AchievementView extends BaseView {

    /***
     * Get view context
     * @param {Object} context - presenter context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            achievementList: {
                title: 'Достижения',
                text: 'Достижений пока нет',
                id: 'achieve',
                data: context.achievementList.data,
                listeners: context.achievementList.listeners
            },
            profileSettings: {
                data: context.profileSettings.data
            }
        };
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Достижения';
    }

    /***
     * Render mobile components
     * @private
     */
    __renderMobile() {
        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        this.__achievementList = new AchievementTable(parent);
        this.__achievementList.render(this.__context.achievementList);
    }

    /***
     * Render desktop components
     * @private
     */
    __renderDesktop() {
        const layout = new Layout(this.__app, true);
        layout.render({layoutCount: 'two'});

        const left = layout.leftParent;
        const right = layout.rightParent;

        const profileMenu = new ProfileMenu(left, {page: 'achievements'});
        profileMenu.render(this.__context.profileSettings);

        this.__achievementList = new AchievementTable(right);
        this.__achievementList.render(this.__context.achievementList);
    }


    /***
     * Render view
     * @param {Object} context - view context
     */
    render(context) {
        this.__makeContext(context);
        super.render();

        if (mobile.isMobile()) {
            this.__renderMobile();
        } else {
            this.__renderDesktop();
        }

        super.renderFooter();
    }
}