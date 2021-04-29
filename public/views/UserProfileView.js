import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu';
import {Settings} from '../components/Settings/Settings';

import {isMobile} from '../main';

/***
 * Profile view
 */
export class UserProfileView extends BaseView {
    /***
     * Make view context
     * @param context
     * @private
     * @this {UserProfileView}
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
     * Enable password change
     * @param target
     * @this {UserProfileView}
     */
    enablePasswordChange(target) {
        this.__settings.enablePasswordChange(target);
    }

    /***
     * Get passwords elements
     * @this {UserProfileView}
     * @returns {{passwordConfirm: HTMLElement, oldPassword: HTMLElement, newPassword: HTMLElement}}
     */
    getPasswordsInfo() {
        return this.__settings.getPasswordInfo();
    }

    /***
     * Returns id errors
     * @this {UserProfileView}
     * @returns {{errorSettingsID: string, errorPasswordID: string}}
     */
    getErrorID() {
        return this.__settings.getErrorID();
    }

    /***
     * Returns input id errors
     * @param target
     * @this {UserProfileView}
     * @returns {string}
     */
    getInputErrorID(target) {
        return this.__settings.getInputErrorId(target);
    }

    /***
     * Remove password input style
     * @this {UserProfileView}
     */
    removePasswordStyle() {
        this.__settings.removePasswordStyles();
    }

    /***
     * Open file system
     * @this {UserProfileView}
     */
    openFileSystem() {
        this.__settings.openFileSystem();
    }

    /***
     * Callback when photo loaded
     * @param {Event} ev - event
     * @this {UserProfileView}
     */
    avatarOnLoad(ev) {
        this.__settings.avatarOnLoad.call(this, ev);
    }

    /***
     * Set default user data
     * @param {Object} data - user data
     * @this {UserProfileView}
     */
    resetSettingsChanges(data) {
        this.__settings.resetSettingsChanges(data);
    }

    /***
     * Open form settings for editing
     * @this {UserProfileView}
     */
    enableEditing() {
        this.__settings.enableEditing();
    }

    /***
     * Close form settings for editing
     * @this {UserProfileView}
     */
    disableEditing() {
        this.__settings.disableEditing();
    }

    /***
     * Get all settings fields
     * @returns {{birthday: HTMLElement, mail: HTMLElement, phone: HTMLElement, surname: HTMLElement, name: HTMLElement}}
     * @this {UserProfileView}
     */
    getSettingsInputs() {
        return this.__settings.getSettingsFields();
    }

    /***
     * Get settings form
     * @returns {HTMLElement}
     * @this {UserProfileView}
     */
    getForm() {
        return this.__settings.getForm();
    }

    /***
     * Remove component listeners
     * @this {UserProfileView}
     */
    removeListeners() {
        this.__settings.removeListeners();
    }

    /***
     * Set view title
     * @private
     */
    __setTitle() {
        document.title = 'Настройки';
    }

    /***
     * Render view
     * @this {UserProfileView}
     */
    render(context) {
        super.render();
        this.__setTitle();
        this.__makeContext(context);

        if (isMobile()) {
            const layout = new Layout(this.__app, true);
            layout.render();
            const parent = layout.parent;

            this.__settings = new Settings(parent);
            this.__settings.render(this.__context.profileSettings);
        } else {
            const layout = new Layout(this.__app, true);
            layout.render({layoutCount: 'two'});

            const leftParent = layout.leftParent;
            const rightParent = layout.rightParent;

            const profileMenu = new ProfileMenu(leftParent, {page: 'settings'});
            profileMenu.render(this.__context.profileSettings);

            this.__settings = new Settings(rightParent);
            this.__settings.render(this.__context.profileSettings);
        }

        super.renderFooter();
    }
}