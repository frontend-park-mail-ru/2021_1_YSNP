import {BaseView} from './BaseView.js';
import {Layout} from '../components/Layout/Layout';
import {ProfileMenu} from '../components/ProfileMenu/ProfileMenu';
import {Settings} from '../components/Settings/Settings';

/***
 * Profile view
 */
export class ProfileView extends BaseView {
    /***
     * Make view context
     * @param context
     * @private
     * @this {ProfileView}
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
     * @this {ProfileView}
     */
    enablePasswordChange(target) {
        this.__settings.enablePasswordChange(target);
    }

    /***
     * Get passwords elements
     * @this {ProfileView}
     * @returns {{passwordConfirm: HTMLElement, oldPassword: HTMLElement, newPassword: HTMLElement}}
     */
    getPasswordsInfo() {
        return this.__settings.getPasswordInfo();
    }

    /***
     * Returns id errors
     * @this {ProfileView}
     * @returns {{errorSettingsID: string, errorPasswordID: string}}
     */
    getErrorID() {
        return this.__settings.getErrorID();
    }

    /***
     * Returns input id errors
     * @param target
     * @this {ProfileView}
     * @returns {string}
     */
    getInputErrorID(target) {
        return this.__settings.getInputErrorId(target);
    }

    /***
     * Remove password input style
     * @this {ProfileView}
     */
    removePasswordStyle() {
        this.__settings.removePasswordStyles();
    }

    /***
     * Open file system
     * @this {ProfileView}
     */
    openFileSystem() {
        this.__settings.openFileSystem();
    }

    /***
     * Callback when photo loaded
     * @param {Event} ev - event
     * @this {ProfileView}
     */
    avatarOnLoad(ev) {
        this.__settings.avatarOnLoad.call(this, ev);
    }

    /***
     * Set default user data
     * @param {Object} data - user data
     * @this {ProfileView}
     */
    resetSettingsChanges(data) {
        this.__settings.resetSettingsChanges(data);
    }

    /***
     * Open form settings for editing
     * @this {ProfileView}
     */
    enableEditing() {
        this.__settings.enableEditing();
    }

    /***
     * Close form settings for editing
     * @this {ProfileView}
     */
    disableEditing() {
        this.__settings.disableEditing();
    }

    /***
     * Get all settings fields
     * @returns {{birthday: HTMLElement, mail: HTMLElement, phone: HTMLElement, surname: HTMLElement, name: HTMLElement}}
     * @this {ProfileView}
     */
    getSettingsInputs() {
        return this.__settings.getSettingsFields();
    }

    /***
     * Get settings form
     * @returns {HTMLElement}
     * @this {ProfileView}
     */
    getForm() {
        return this.__settings.getForm();
    }

    /***
     * Remove component listeners
     * @this {ProfileView}
     */
    removeListeners() {
        this.__settings.removeListeners();
    }

    /***
     * Render view
     * @this {ProfileView}
     */
    render(context) {
        super.render();
        this.__makeContext(context);

        const layout = new Layout(this.__app, true);
        layout.render({
            layoutCount: 'two'
        });
        const leftParent = layout.leftParent;
        const rightParent = layout.rightParent;

        const profileMenu = new ProfileMenu(leftParent, {page: 'settings'});
        profileMenu.render(this.__context.profileSettings);

        this.__settings = new Settings(rightParent);
        this.__settings.render(this.__context.profileSettings);
    }
}