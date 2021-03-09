/***
 *
 */
export class Settings {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} data - element data
     * @param {Object} listeners - component listeners
     */
    constructor(parent, data, listeners = {}) {
        this.__parent = parent;
        this.__data = data;
        this.__listeners = listeners;
    }

    /***
     * Get listeners
     * @returns {Object}
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * Set listeners
     * @param {Object} val - listener to set
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * Add component listeners
     */
    addListeners() {
        document
            .getElementById('settings-file-upload')
            .addEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('settings-components')
            .addEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('settings-password')
            .addEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('settings-avatar')
            .addEventListener(this.listeners.settingsClick.type, this.listeners.settingsClick.listener);
        document
            .getElementById('settings')
            .addEventListener(this.__listeners.settingsClick.type, this.__listeners.settingsClick.listener);
        document
            .getElementById('settings')
            .addEventListener(this.listeners.showError.type, this.listeners.showError.listener);
        document
            .getElementById('settings')
            .addEventListener(this.listeners.hideError.type, this.listeners.hideError.listener);

    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('settings-file-upload')
            .removeEventListener(this.listeners.validateChange.type, this.listeners.validateChange.listener);
        document
            .getElementById('settings-components')
            .removeEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('settings-password')
            .removeEventListener(this.listeners.validateInput.type, this.listeners.validateInput.listener);
        document
            .getElementById('settings-avatar')
            .removeEventListener(this.listeners.settingsClick.type, this.listeners.settingsClick.listener);
        document
            .getElementById('settings')
            .removeEventListener(this.__listeners.settingsClick.type, this.__listeners.settingsClick.listener);
        document
            .getElementById('settings')
            .removeEventListener(this.listeners.showError.type, this.listeners.showError.listener);
        document
            .getElementById('settings')
            .removeEventListener(this.listeners.hideError.type, this.listeners.hideError.listener);
    }

    /***
     * Component HTML
     * @returns {string} - html layout
     * @private
     */
    __getTemplate() {
        return `
        <div class="settings" id="settings">
            <form class="settings-inner">
                <div class="settings-title">
                    <span>Личные данные</span>
                    <span class="settings-title__edit" id="settings-edit" data-action="editClick">
                        <svg width="2vh" height="2vh" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.3" d="M5.52719 16.7477L14.5274 7.74753L10.2525 3.4726L1.25226 12.4728C1.12836 12.5969 1.04034 12.7522 0.997548 12.9222L0 18L5.07684 17.0025C5.2473 16.9598 5.40322 16.8717 5.52719 16.7477ZM17.4329 4.84205C17.796 4.47881 18 3.98622 18 3.4726C18 2.95898 17.796 2.46639 17.4329 2.10315L15.8968 0.567123C15.5336 0.203995 15.041 0 14.5274 0C14.0138 0 13.5212 0.203995 13.1579 0.567123L11.6219 2.10315L15.8968 6.37808L17.4329 4.84205Z" fill="black"/>
                        </svg>
                    </span>
                    <button id="settings-button-save" class="settings-title__save_button" data-action="saveChangesClick">Сохранить изменения</button>
                </div>
                <div class="settings__separator"></div>
                <div class="settings-components">
                    <div class="settings-left-components">
                        <span class="settings-components__title">Фамилия</span>
                        <span class="settings-components__title">Имя</span>
                        <span class="settings-components__title">Отчество</span>
                        <span class="settings-components__title">Пол</span>
                        <span class="settings-components__title">Дата рождения</span>
                        <span class="settings-components__title">Телефон</span>
                        <span class="settings-components__title">Город</span>
                        <span class="settings-components__title">E-mail</span>
                    </div>
                    <div class="settings-right-components" id="settings-components">
                        <div class="settings-input-inner">
                            <input id="settings-surname" data-action="inputEmpty" required class="settings-components__input" type="text" value="${this.__data.surname}" data-move="mouseIn" data-moveout="mouseOut" readonly>
                        </div>
                        <div class="settings-input-inner">
                            <input id="settings-name" data-action="inputEmpty" required class="settings-components__input" type="text" value="${this.__data.name}" data-move="mouseIn" data-moveout="mouseOut" readonly>
                        </div>
                        <div class="settings-input-inner">
                            <input id="settings-patronymic" data-action="inputEmpty" class="settings-components__input" type="text" value="${this.__data.patronymic}" data-move="mouseIn" data-moveout="mouseOut" readonly>                             
                        </div> 
                        <div class="settings-input-inner">
                            <select id="settings-gender" class="settings-components__input" disabled>
                                <option value=”woman”>Женский</option>
                                <option value=”man”>Мужской</option>
                            </select>                               
                        </div>
                        <div class="settings-input-inner">
                            <input id="settings-birthday" data-action="inputEmpty" class="settings-components__input" type="date" min="1900-01-01" max="2021-01-01" value="${this.__data.birthday}" data-move="mouseIn" data-moveout="mouseOut" readonly>                             
                        </div>
                        <div class="settings-input-inner">
                            <input id="settings-telephone" data-action="inputPhone" class="settings-components__input" type="tel" value="${this.__data.telephone}" data-move="mouseIn" data-moveout="mouseOut" readonly>                             
                        </div>
                        <div class="settings-input-inner">
                            <input id="settings-location" data-action="inputEmpty" class="settings-components__input" type="text" value="${this.__data.location}" data-move="mouseIn" data-moveout="mouseOut" readonly>                             
                        </div>
                        <div class="settings-input-inner">
                            <input id="settings-email" data-action="inputMail" required class="settings-components__input" type="email" value="${this.__data.email}" data-move="mouseIn" data-moveout="mouseOut" readonly>     
                        </div>
                        
                    </div>
                </div>
  

                <div class="settings__separator"></div>
                <div class="settings-photo-inner">
                    <span class="settings-components__title">Фото</span>                
                    <div class="settings-input-inner">
                        <input id="settings-file-upload" data-action="readURL" class="file-upload" type="file" accept="image/*"/>
                        <div class="settings-avatar">
                             <div class="settings-avatar-inner" id="settings-avatar" data-action="clickUpload">
                                 <img class="settings-avatar__pic" id="settings-profile-pic" src="${this.__data.avatar}" alt="img">                            
                                 <div class="settings-avatar-upload">
                                       <i class="settings-avatar-upload__button" id="settings-upload-button">
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="1" d="M21.3333 10.6667H19.5556C18.5778 10.6667 17.7778 9.86667 17.7778 8.88889V0H3.55556C1.6 0 0 1.6 0 3.55556V28.4444C0 30.4 1.6 32 3.55556 32H28.4444C30.4 32 32 30.4 32 28.4444V14.2222H23.1111C22.1333 14.2222 21.3333 13.4222 21.3333 12.4444V10.6667ZM24.8889 24.8889H7.11111C6.94603 24.8889 6.78422 24.8429 6.64379 24.7561C6.50337 24.6693 6.38989 24.5452 6.31606 24.3975C6.24224 24.2499 6.21099 24.0846 6.22581 23.9202C6.24064 23.7558 6.30095 23.5987 6.4 23.4667L9.95556 18.72C10.3111 18.24 11.0222 18.24 11.3778 18.72L14.6667 23.1111L19.2889 16.9422C19.6444 16.4622 20.3556 16.4622 20.7111 16.9422L25.6 23.4667C25.699 23.5987 25.7594 23.7558 25.7742 23.9202C25.789 24.0846 25.7578 24.2499 25.6839 24.3975C25.6101 24.5452 25.4966 24.6693 25.3562 24.7561C25.2158 24.8429 25.054 24.8889 24.8889 24.8889Z" fill="gray"/>
                                                <path opacity="1" d="M28.3333 3.66667V1.83333C28.3333 0.825 27.5083 0 26.5 0C25.4917 0 24.6667 0.825 24.6667 1.83333V3.66667H22.8333C21.825 3.66667 21 4.49167 21 5.5C21 6.50833 21.825 7.33333 22.8333 7.33333H24.6667V9.16667C24.6667 10.175 25.4917 11 26.5 11C27.5083 11 28.3333 10.175 28.3333 9.16667V7.33333H30.1667C31.175 7.33333 32 6.50833 32 5.5C32 4.49167 31.175 3.66667 30.1667 3.66667H28.3333Z" fill="gray"/>
                                            </svg>
                                       </i>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
                
<!--            <div class="settings-add-account">-->
<!--                <span class="settings-components__title">Привязать аккаунт</span>-->
<!--                <a class="settings-add-account__icon">-->
<!--                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                        <circle cx="15" cy="15" r="15" fill="#3B5999"/>-->
<!--                    <path d="M17.3438 15V11.25C17.3438 10.215 18.1838 10.3125 19.2188 10.3125H21.0938V5.62498H17.3438C14.2362 5.62498 11.7188 8.14248 11.7188 11.25V15H7.96875V19.6875H11.7188V30H17.3438V19.6875H20.1562L22.0312 15H17.3438Z" fill="white"/>-->
<!--                    </svg>-->
<!--                </a>-->
<!--                <a class="settings-add-account__icon">-->
<!--                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                        <path d="M15 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 15 0C6.72 0 0 6.72 0 15C0 23.28 6.72 30 15 30ZM20.3538 13.9287H22.5012V11.7825H24.6488V13.93H26.7775V16.0775H24.6488V18.225H22.5012V16.0775H20.3538V13.9287ZM15.745 9.4525L13.7125 11.425C11.1125 8.88375 6.05375 10.735 6.05375 14.9937C6.05375 20.77 14.2525 21.165 14.9637 16.4937H10.7238V13.9175H17.795C18.5975 18.1125 15.8888 22.5 10.7238 22.5V22.5012C6.5625 22.5012 3.2225 19.1437 3.2225 15C3.22375 8.3275 11.1388 5.17375 15.745 9.4525Z" fill="#F44336"/>-->
<!--                    </svg>-->
<!--                </a>-->
<!--                <a class="settings-add-account__icon">-->
<!--                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                        <circle cx="15" cy="15" r="15" fill="#FDC300"/>-->
<!--                        <path d="M21.2543 8.46352C19.6675 7.0009 17.6936 6.26958 15.3364 6.26958C12.8585 6.26958 10.7462 7.1003 9.00311 8.76527C7.26003 10.4302 6.38672 12.4999 6.38672 14.9779C6.38672 17.3528 7.21743 19.3941 8.8753 21.1053C10.5403 22.8164 12.7768 23.6719 15.592 23.6719C17.2889 23.6719 18.9539 23.324 20.5869 22.6247C21.1194 22.3975 21.3786 21.7869 21.162 21.2508C20.9384 20.697 20.3065 20.4414 19.7562 20.6757C18.3362 21.2863 16.9446 21.5916 15.5884 21.5916C13.43 21.5916 11.7579 20.9349 10.5722 19.6178C9.39006 18.3043 8.7972 16.76 8.7972 14.9885C8.7972 13.0644 9.43266 11.4598 10.7 10.1711C11.9638 8.88597 13.5223 8.23986 15.3683 8.23986C17.0688 8.23986 18.5066 8.76882 19.6781 9.82674C20.8496 10.8847 21.4354 12.2159 21.4354 13.8205C21.4354 14.9175 21.1656 15.8334 20.6295 16.5612C20.0935 17.2925 19.5361 17.6546 18.9574 17.6546C18.645 17.6546 18.4888 17.4878 18.4888 17.1505C18.4888 16.8771 18.5101 16.5576 18.5492 16.1884L19.2095 10.7888H16.9375L16.7919 11.3178C16.2133 10.8456 15.5778 10.6077 14.8891 10.6077C13.7957 10.6077 12.8585 11.0444 12.081 11.9142C11.3 12.7839 10.913 13.9057 10.913 15.2761C10.913 16.6144 11.2574 17.6972 11.9496 18.5173C12.6419 19.3409 13.4726 19.7491 14.4453 19.7491C15.3151 19.7491 16.0571 19.3835 16.6748 18.6557C17.1398 19.3551 17.825 19.703 18.7302 19.703C20.0615 19.703 21.2117 19.1243 22.1809 17.9635C23.1501 16.8061 23.6364 15.4074 23.6364 13.7708C23.6364 11.6976 22.8448 9.92614 21.2543 8.46352ZM16.0216 16.6322C15.6204 17.1718 15.1411 17.4452 14.5838 17.4452C14.2039 17.4452 13.8986 17.2463 13.6679 16.8487C13.4336 16.4511 13.3164 15.9577 13.3164 15.3648C13.3164 14.6335 13.4797 14.0442 13.8063 13.5969C14.1329 13.1496 14.5376 12.9224 15.0204 12.9224C15.4393 12.9224 15.8121 13.0892 16.1387 13.4265C16.4653 13.7637 16.6286 14.2111 16.6286 14.772C16.6251 15.4713 16.4227 16.089 16.0216 16.6322Z" fill="white"/>-->
<!--                    </svg>-->
<!--                </a>-->
<!--                <a class="settings-add-account__icon">-->
<!--                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                        <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="#4D76A1"/>-->
<!--                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4334 21.5788H15.6107C15.6107 21.5788 15.9664 21.5398 16.1479 21.344C16.3151 21.1643 16.3097 20.8269 16.3097 20.8269C16.3097 20.8269 16.2867 19.2472 17.0199 19.0146C17.7426 18.7854 18.6707 20.5413 19.6545 21.2165C20.3984 21.7275 20.9636 21.6154 20.9636 21.6154L23.5939 21.5788C23.5939 21.5788 24.9699 21.494 24.3175 20.4122C24.264 20.3237 23.9375 19.6119 22.3618 18.1493C20.7125 16.6185 20.9334 16.8661 22.9201 14.2182C24.13 12.6055 24.6137 11.621 24.4627 11.1994C24.3185 10.7977 23.4287 10.9039 23.4287 10.9039L20.4671 10.9223C20.4671 10.9223 20.2475 10.8924 20.0847 10.9897C19.9256 11.0852 19.8232 11.3076 19.8232 11.3076C19.8232 11.3076 19.3545 12.5555 18.7293 13.6168C17.4105 15.8562 16.8833 15.9744 16.6677 15.8353C16.1664 15.5112 16.2915 14.5334 16.2915 13.8387C16.2915 11.6686 16.6207 10.7638 15.6506 10.5295C15.3287 10.4517 15.0917 10.4004 14.2685 10.3921C13.2117 10.3811 12.3173 10.3953 11.8109 10.6435C11.474 10.8084 11.2141 11.1761 11.3724 11.1972C11.5681 11.2234 12.0114 11.3167 12.2465 11.6368C12.5499 12.0496 12.5393 12.9769 12.5393 12.9769C12.5393 12.9769 12.7136 15.5316 12.132 15.849C11.7328 16.0666 11.1852 15.6222 10.0095 13.5906C9.40705 12.5499 8.95223 11.3996 8.95223 11.3996C8.95223 11.3996 8.86452 11.1846 8.7081 11.0697C8.51825 10.9304 8.253 10.886 8.253 10.886L5.43873 10.9044C5.43873 10.9044 5.01626 10.9162 4.86117 11.0999C4.7232 11.2633 4.85021 11.6012 4.85021 11.6012C4.85021 11.6012 7.0535 16.7559 9.54824 19.3536C11.8358 21.7352 14.4334 21.5788 14.4334 21.5788Z" fill="white"/>-->
<!--                    </svg>-->
<!--                </a>-->
<!--            </div>-->
               
            </form>
            
            <div class="settings-change-password">
                <div class="settings-change-password-inner">
                    <div class="settings-title">
                        <span>Поменять пароль</span>
                        <button id="settings-save-pass" class="settings-title__save_button" data-action="savePasswordClick">Сохранить пароль</button>
                        <button id="settings-reset-pass" class="settings-title__reset_button" data-action="resetPasswordClick">Отменить изменения</button>
                    </div>
                    <div class="settings__separator"></div>
                    <div class="settings-passwords-inner">
                        <div class="settings-left-components">
                            <span class="settings-components__title">Старый пароль</span>
                            <span class="settings-components__title">Новый пароль</span>
                            <span class="settings-components__title">Подвердите пароль</span>
                        </div>
                        <div class="settings-right-components">
                            <div class="settings-input-inner" id="settings-password">
                                <input id="settings-old-pass" data-action="checkPasswd" required class="settings-components__input" type="password" data-move="mouseIn" data-moveout="mouseOut">
                            </div>
                            <div class="settings-input-inner">
                                <input id="settings-new-pass" data-action="changePwd" required class="settings-components__input" type="password" data-move="mouseIn" data-moveout="mouseOut" readonly>
                            </div>
                            <div class="settings-input-inner">
                                <input id="settings-confirm-pass" data-action="inputConfirmPwd" required class="settings-components__input" type="password" data-move="mouseIn" data-moveout="mouseOut" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<!--            <div class="settings-main-settings">-->
<!--                <div class="settings-title">Общие настройки</div>-->
<!--                <div class="settings__separator"></div>-->
<!--                <a href="#" class="settings-main-settings__item">-->
<!--                    <span>Черный список</span>-->
<!--                </a>  -->
<!--                <a href="#" class="settings-main-settings__item">-->
<!--                    <span>Банковские карты</span>-->
<!--                </a>  -->
<!--            </div>   -->
        </div>    
        `;
    }

    /***
     * Add component to parent
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}