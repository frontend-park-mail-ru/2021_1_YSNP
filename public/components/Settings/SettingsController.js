/***
 * Settings controller
 */
export class SettingsController {
    /***
     * Class constructor
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {Settings} settings - settings
     */
    constructor(pageRemoveListeners, parent, settings) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__settings = settings;
    }

    /***
     * Add listeners
     */
    control() {
        this.__settings.listeners = this.__createListeners();
        this.__settings.addListeners();
    }

    /***
     * Remove Controller listeners
     */
    removeControllerListeners() {
        this.__settings.removeListeners();
    }

    /***
     * Settings click event
     * @param {Event} ev - event
     * @private
     */
    __listenerSettingsClick(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open();
                }
            });
    }

    /***
     * Get settings listeners
     * @returns {{pageClick: {listener: *, type: string}, settingsClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            settingsClick: {
                type: 'click',
                listener: this.__listenerSettingsClick.bind(this)
            }
        };
    }

    /***
     * Get settings actions
     * @returns {{}}
     * @private
     */
    __getActions() {
        return {
            editClick: {
                open: this.__openEdit.bind(this)
            },
            saveChangesClick: {
                open: this.__openSaveChanges.bind(this)
            },
            uploadFileClick: {
                open: this.__openChooseFile.bind(this)
            }
        };
    }

    /***
     * Open choose image
     * @private
     */
    __openChooseFile() {
        // this.__pageRemoveListeners();

        console.log('Click edit page');
    }

    /***
     * Settings edit click callback
     * @private
     */
    __openEdit() {
        // this.__pageRemoveListeners();
        document
            .getElementById('settings-button-save')
            .style.visibility = 'visible';

        document
            .getElementById('settings-input-surname')
            .removeAttribute('readonly');
        document
            .getElementById('settings-input-name')
            .removeAttribute('readonly');
        document
            .getElementById('settings-input-patronymic')
            .removeAttribute('readonly');
        document
            .getElementById('settings-input-gender')
            .removeAttribute('disabled');
        document
            .getElementById('settings-input-birthday')
            .removeAttribute('readonly');
        document
            .getElementById('settings-input-telephone')
            .removeAttribute('readonly');
        document
            .getElementById('settings-input-location')
            .removeAttribute('readonly');
        document
            .getElementById('settings-input-email')
            .removeAttribute('readonly');
        document
            .getElementById('settings-file-upload')
            .style.visibility = 'visible';
        document
            .getElementById('settings-photo-label')
            .style.visibility = 'visible';
        console.log('Click edit page');
    }

    /***
     * Settings save changes click callback
     * @private
     */
    __openSaveChanges() {
        // this.__pageRemoveListeners();
        document
            .getElementById('settings-button-save')
            .style.visibility = 'hidden';

        document
            .getElementById('settings-input-surname')
            .setAttribute('readonly', 'true');
        document
            .getElementById('settings-input-name')
            .setAttribute('readonly', 'true');
        document
            .getElementById('settings-input-patronymic')
            .setAttribute('readonly', 'true');
        document
            .getElementById('settings-input-gender')
            .setAttribute('disabled', 'true');
        document
            .getElementById('settings-input-birthday')
            .setAttribute('readonly', 'true');
        document
            .getElementById('settings-input-telephone')
            .setAttribute('readonly', 'true');
        document
            .getElementById('settings-input-location')
            .setAttribute('readonly', 'true');
        document
            .getElementById('settings-input-email')
            .setAttribute('readonly', 'true');
        document
            .getElementById('settings-file-upload')
            .style.visibility = 'hidden';
        document
            .getElementById('settings-photo-label')
            .style.visibility = 'hidden';
        console.log('Click save changes');
    }
}