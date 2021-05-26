import selectUserTemplate from './SelectUser.hbs';
import './SelectUser.scss';

import {OneUser} from './OneUser/OneUser';

import {sentryManager} from '../../../modules/sentry';

/***
 * Select User component
 */
export class SelectUser {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Get select user element
     * @returns {HTMLElement}
     * @private
     */
    __getSelectUser() {
        return document.getElementById('select-user');
    }

    /***
     * Get select user content element
     * @returns {HTMLElement}
     * @private
     */
    __getSelectUserContent() {
        return document.getElementById('select-user-content');
    }

    /***
     * Get select user body element
     * @returns {HTMLElement}
     * @private
     */
    __getSelectUserBody() {
        return document.getElementById('select-user-body');
    }

    /***
     * Add component listeners
     */
    __addListeners() {
        window
            .addEventListener(this.__context.listeners.keyClick.type, this.__context.listeners.keyClick.listener);

        this.__getSelectUser()
            .addEventListener(this.__context.listeners.pageClick.type, this.__context.listeners.pageClick.listener);

        this.__getSelectUserContent()
            .addEventListener(this.__context.listeners.selectUserClick.type, this.__context.listeners.selectUserClick.listener);

        this.__getSelectUserBody()
            .addEventListener(this.__context.listeners.selectUserBodyClick.type, this.__context.listeners.selectUserBodyClick.listener);
    }

    /***
     * Remove component listeners
     */
    __removeListeners() {
        window
            .removeEventListener(this.__context.listeners.keyClick.type, this.__context.listeners.keyClick.listener);

        this.__getSelectUser()
            .addEventListener(this.__context.listeners.pageClick.type, this.__context.listeners.pageClick.listener);

        this.__getSelectUserContent()
            .removeEventListener(this.__context.listeners.selectUserClick.type, this.__context.listeners.selectUserClick.listener);

        this.__getSelectUserBody()
            .removeEventListener(this.__context.listeners.selectUserBodyClick.type, this.__context.listeners.selectUserBodyClick.listener);
    }

    /***
     * Add one user
     * @param {Object} data - user data
     * @private
     */
    __addOneUser(data) {
        const user = new OneUser(this.__getSelectUserBody());
        user.render(data);
    }

    /***
     * Add users
     * @private
     */
    __addUsers() {
        this.__context.data.forEach((el) => {
            this.__addOneUser(el);
        });
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__context = context;
            this.__parent.insertAdjacentHTML('beforeend', selectUserTemplate());
            this.__addListeners();

            this.__addUsers();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }

    /***
     * Remove component
     */
    remove() {
        try {
            this.__removeListeners();
            this.__getSelectUser().remove();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}
