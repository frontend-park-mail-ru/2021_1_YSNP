import './ProfileMenu.scss';
import profileMenuTemplate from './ProfileMenu.hbs';

import {sentryManager} from '../../modules/sentry';

/***
 * Profile menu
 */
export class ProfileMenu {
    /***
     * Class constructor
     * @param {Element} parent - element where the component will be inserted
     * @param {Object} page - name of opened page
     */
    constructor(parent, page) {
        this.__parent = parent;
        this.__page = page;
    }

    /***
     * Make context
     * @param {Object} context - context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            linkImage: context.data.linkImage,
            surname: context.data.surname,
            name: context.data.name,
            owner: context.owner,
            id: context.data.id,
            rating: context.data.rating.toFixed(1)
        };
    }

    /***
     * Get star element
     * @param id
     * @returns {HTMLElement}
     * @private
     */
    __getStarElement(id) {
        return document.getElementById(`star-${id}`);
    }

    /***
     * Make stars active
     * @param {number} count - star count
     * @private
     */
    __makeStarsActive(count) {
        for (let i = 1; i <= count; i++) {
            this.__getStarElement(i).classList.add('star-active');
        }
    }

    /***
     * Render stars in comment
     * @private
     */
    __renderStars(ctx) {
        const rate = Math.round(ctx.rating);
        switch (rate) {
            case 0:
                break;
            case 1:
                this.__makeStarsActive(1);
                break;
            case 2:
                this.__makeStarsActive(2);
                break;
            case 3:
                this.__makeStarsActive(3);
                break;
            case 4:
                this.__makeStarsActive(4);
                break;
            case 5:
                this.__makeStarsActive(5);
                break;
            default:
                break;
        }
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__makeContext(context);
            this.__parent.insertAdjacentHTML('beforeend', profileMenuTemplate(this.__context));
            document.getElementById(`profile-menu-${this.__page.page}`).classList.add('profile-menu-buttons-item_selected');
            this.__renderStars(this.__context);
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}