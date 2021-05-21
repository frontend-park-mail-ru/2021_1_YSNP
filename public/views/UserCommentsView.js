import {BaseView} from './BaseView.js';

import {Layout} from '../components/Layout/Layout.js';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu.js';

import {mobile} from '../modules/mobile';
import {CommentsBlock} from '../components/CommentsBlock/CommentsBlock';

/***
 * Comments view
 */
export class UserCommentsView extends BaseView {

    /***
     * Make context
     * @param context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            comments: {
                title: 'Отзывы',
                data: context.comments.data,
                listeners: context.comments.listeners
            },
            profileSettings: {
                data: context.profileSettings.data,
                owner: context.profileSettings.owner
            }
        };
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Отзывы';
    }

    /***
     * Returns comments block
     * @returns {{sellerBlock: HTMLElement, buyerBlock: HTMLElement}}
     */
    getCommentsBlock() {
        return this.__comments.getCommentsElements();
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        this.__comments.removeListeners();
    }

    /***
     * Render mobile components
     * @private
     */
    __renderMobile() {
        const layout = new Layout(this.__app, true);
        layout.render();

        const parent = layout.parent;

        this.__comments = new CommentsBlock(parent);
        this.__comments.render(this.__context.comments);
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

        const profileMenu = new ProfileMenu(left, {page: 'comments'});
        profileMenu.render(this.__context.profileSettings);

        this.__comments = new CommentsBlock(right);
        this.__comments.render(this.__context.comments);
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