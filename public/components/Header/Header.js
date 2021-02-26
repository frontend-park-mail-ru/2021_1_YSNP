/***
 * Header component
 */
export class Header {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} data - element data
     * @param {Object} listeners - component listeners
     */
    constructor(parent, data, listeners = undefined) {
        this.__parent = parent;
        this.__listeners = listeners;
        this.__data = data;
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
     * @param val
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * Add component listeners
     */
    addListeners() {
        document
            .getElementById('header')
            .addEventListener(this.__listeners.headerClick.type, this.__listeners.headerClick.listener);

        if (this.__data.isAuth) {
            document
                .getElementById('app')
                .addEventListener(this.__listeners.pageClick.type, this.__listeners.pageClick.listener);
        }
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('header')
            .removeEventListener(this.__listeners.headerClick.type, this.__listeners.headerClick.listener);

        if (this.__data.isAuth) {
            document
                .getElementById('app')
                .removeEventListener(this.__listeners.pageClick.type, this.__listeners.pageClick.listener);
        }
    }

    /***
     * Component HTML
     * @returns {string} - html layout
     * @private
     */
    __getTemplate() {
        return `
           <div class="header" id="header">
                    <div class="header-inner">
                        <div class="header-left">
                            <a class="header-left__brand" data-action="brandClick" href="/">
                                 <svg width="10vh" height="10vh" viewBox="0 0 86 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="82.5" cy="29.5" r="3.5" fill="#D31E1E"/>
                                    <path opacity="0.5" d="M4.09375 33V5.68359H6.83594V23.5781L15.0625 14.0859H18.6484L11.8984 21.6445L19.4219 33H16.1172L10.1406 23.543L6.83594 27.2344V33H4.09375ZM23.1484 23.543C23.1484 25.9336 23.6992 27.832 24.8008 29.2383C25.9023 30.6445 27.2734 31.3477 28.9141 31.3477C30.5312 31.3477 31.8906 30.6445 32.9922 29.2383C34.1172 27.832 34.6797 25.9336 34.6797 23.543C34.6797 21.1055 34.1172 19.1953 32.9922 17.8125C31.8672 16.4297 30.5078 15.7383 28.9141 15.7383C27.2969 15.7383 25.9258 16.4297 24.8008 17.8125C23.6992 19.1953 23.1484 21.1055 23.1484 23.543ZM20.4062 23.543C20.4062 20.6602 21.1445 18.2578 22.6211 16.3359C24.1211 14.4141 26.2188 13.4531 28.9141 13.4531C31.5859 13.4531 33.6719 14.4141 35.1719 16.3359C36.6719 18.2578 37.4219 20.6602 37.4219 23.543C37.4219 24.7617 37.2578 25.9453 36.9297 27.0938C36.625 28.2422 36.1445 29.3203 35.4883 30.3281C34.8555 31.3125 33.9648 32.1094 32.8164 32.7188C31.6914 33.3281 30.3906 33.6328 28.9141 33.6328C27.4609 33.6328 26.1602 33.3398 25.0117 32.7539C23.8867 32.1445 22.9961 31.3477 22.3398 30.3633C21.707 29.3555 21.2266 28.2773 20.8984 27.1289C20.5703 25.9805 20.4062 24.7852 20.4062 23.543ZM39.25 14.0859H42.4141L46.3164 25.1602C46.9023 26.8008 47.4297 28.3945 47.8984 29.9414H48.0391C48.3906 28.793 48.9062 27.1992 49.5859 25.1602L53.3125 14.0859H56.4062L48.25 36.1641C47.5469 38.0391 46.7266 39.3516 45.7891 40.1016C44.875 40.875 43.75 41.2617 42.4141 41.2617H41.3594V39.0117H41.9922C42.8828 39.0117 43.6328 38.7539 44.2422 38.2383C44.875 37.7227 45.4375 36.7969 45.9297 35.4609L46.6328 33.2461L39.25 14.0859ZM60.3086 28.1484C60.3086 29.0391 60.6836 29.8008 61.4336 30.4336C62.1836 31.043 63.2148 31.3477 64.5273 31.3477C66.1914 31.3477 67.6094 30.8086 68.7812 29.7305C69.9766 28.6523 70.5742 27.2812 70.5742 25.6172V22.9805C69.543 23.2383 67.9023 23.543 65.6523 23.8945C63.8242 24.2227 62.4766 24.7266 61.6094 25.4062C60.7422 26.0859 60.3086 27 60.3086 28.1484ZM57.5664 28.3594C57.5664 24.8438 60.2852 22.6641 65.7227 21.8203C68.1602 21.4219 69.7773 21.0938 70.5742 20.8359V19.7461C70.5742 18.5742 70.1523 17.6016 69.3086 16.8281C68.4648 16.0547 67.2695 15.668 65.7227 15.668C64.5977 15.668 63.5078 15.9375 62.4531 16.4766C61.4219 16.9922 60.543 17.6953 59.8164 18.5859L58.0586 17.1094C58.9961 16.0312 60.1211 15.1523 61.4336 14.4727C62.7695 13.793 64.1758 13.4531 65.6523 13.4531C70.7148 13.4531 73.2461 15.9258 73.2461 20.8711V33H70.6445V29.9062C70.2695 30.9141 69.4961 31.793 68.3242 32.543C67.1523 33.2695 65.7695 33.6328 64.1758 33.6328C62.0898 33.6328 60.4609 33.1406 59.2891 32.1562C58.1406 31.1719 57.5664 29.9062 57.5664 28.3594Z" fill="black"/>
                                 </svg>
                            </a>

                            <button class="header-left-location" data-action="locationClick">
                                <svg height="1vh" width="1vh" class="header-left-location__icon" viewBox="-119 -21 682 682.66669"  xmlns="http://www.w3.org/2000/svg"><path d="m216.210938 0c-122.664063 0-222.460938 99.796875-222.460938 222.460938 0 154.175781 222.679688 417.539062 222.679688 417.539062s222.242187-270.945312 222.242187-417.539062c0-122.664063-99.792969-222.460938-222.460937-222.460938zm67.121093 287.597656c-18.507812 18.503906-42.8125 27.757813-67.121093 27.757813-24.304688 0-48.617188-9.253907-67.117188-27.757813-37.011719-37.007812-37.011719-97.226562 0-134.238281 17.921875-17.929687 41.761719-27.804687 67.117188-27.804687 25.355468 0 49.191406 9.878906 67.121093 27.804687 37.011719 37.011719 37.011719 97.230469 0 134.238281zm0 0"/></svg>
                                <span class="header-left-location__name">${this.__data.location}</span>
                            </button>
                        </div>
                        
                        <div class="header-right" id="header-right">
                            <button class="header-right__create-button" data-action="createProductClick">Разместить объявление</button>
                        </div>
                    </div>
            </div>
        `;
    }

    /***
     * Component HTML Auth
     * @returns {string} - html layout
     * @private
     */
    __getAuthTemplate() {
        return `
            <div class="header-dropdown">
                <img class="header-dropdown__button" data-action="dropdownClick" src="${this.__data.avatar}"/>
                <div class="header-dropdown-content header-dropdown-content_hidden" id="header-dropdown">
                    <div class="header-dropdown-content-inner">
                        <span class="header-dropdown-content__user">${this.__data.user}</span>
                        <div class="header-dropdown-content__separator"></div>
                        <a href="#" class="header-dropdown-content-item">
                            <svg height="2vh" width="2vh" class="header-dropdown-content__logo" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
                            <span>Мои объявления</span>
                        </a>
                         <a href="#" class="header-dropdown-content-item">
                            <svg height="2vh" width="2vh" class="header-dropdown-content__logo" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
                            <span>Избранное</span>
                        </a>
                         <a href="#" class="header-dropdown-content-item">
                            <svg height="2vh" width="2vh" class="header-dropdown-content__logo" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
                            <span>Профиль</span>
                        </a>
                        <div class="header-dropdown-content__separator"></div>
                         <a href="#" class="header-dropdown-content-item">
                            <svg height="2vh" width="2vh" class="header-dropdown-content__logo" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
                            <span>Выйти</span>
                        </a>
                    </div>
                </div>
            </div>          
        `;
    }

    /***
     * Component HTML NotAuth
     * @returns {string} - html layout
     * @private
     */
    __getNotAuthTemplate() {
        return `
            <svg height="4vh" width="4vh" class="header-right__account" data-action="accountClick" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469-68.382812 0-132.667969 26.628906-181.019531 74.980469-48.351563 48.351562-74.980469 112.636719-74.980469 181.019531 0 68.378906 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.636719 74.980469 181.019531 74.980469 68.378906 0 132.667969-26.628906 181.019531-74.980469 48.351563-48.351562 74.980469-112.640625 74.980469-181.019531 0-68.382812-26.628906-132.667969-74.980469-181.019531zm-308.679687 367.40625c10.707031-61.648438 64.128906-107.121094 127.660156-107.121094 63.535156 0 116.953125 45.472656 127.660156 107.121094-36.347656 24.972656-80.324218 39.613281-127.660156 39.613281s-91.3125-14.640625-127.660156-39.613281zm46.261718-218.519531c0-44.886719 36.515626-81.398438 81.398438-81.398438s81.398438 36.515625 81.398438 81.398438c0 44.882812-36.515626 81.398437-81.398438 81.398437s-81.398438-36.515625-81.398438-81.398437zm235.042969 197.710937c-8.074219-28.699219-24.109375-54.738281-46.585937-75.078125-13.789063-12.480469-29.484375-22.328125-46.359375-29.269531 30.5-19.894531 50.703125-54.3125 50.703125-93.363281 0-61.425782-49.976563-111.398438-111.402344-111.398438s-111.398438 49.972656-111.398438 111.398438c0 39.050781 20.203126 73.46875 50.699219 93.363281-16.871093 6.941406-32.570312 16.785156-46.359375 29.265625-22.472656 20.339844-38.511718 46.378906-46.585937 75.078125-44.472657-41.300781-72.355469-100.238281-72.355469-165.574219 0-124.617188 101.382812-226 226-226s226 101.382812 226 226c0 65.339844-27.882812 124.277344-72.355469 165.578125zm0 0"/></svg>
        `;
    }

    /***
     * Add component to parent
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);

        const accountTemplate = this.__data.isAuth ? this.__getAuthTemplate() : this.__getNotAuthTemplate();
        document.getElementById('header-right').insertAdjacentHTML('beforeend', accountTemplate);
    }
}
