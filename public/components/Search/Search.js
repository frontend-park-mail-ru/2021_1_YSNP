/***
 * Search box on main page
 */
export class Search {
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
            .getElementById('search')
            .addEventListener(this.__listeners.searchClick.type, this.__listeners.searchClick.listener);
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('search')
            .removeEventListener(this.__listeners.searchClick.type, this.__listeners.searchClick.listener);
    }

    /***
     * Component HTML
     * @returns {string} - html layout
     * @private
     */
    __getTemplate() {
        return `
        <div class="search" id="search">
            <div class="search-background"></div>
                <div class="search-content">
                    <div class="search-title">
                        Более 800 миллионов объявлений по всей России
                    </div>
                    <div class="search-line">
                        <form>
                            <div class="search-line__settings" id="search-settings" data-action="searchSettingsClick">
                                <svg width="2vh" height="2vh" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.7">
                                    <path d="M6.74976 8.25475C7.48111 8.25467 8.19113 8.46887 8.76507 8.86273C9.33902 9.25659 9.74336 9.80711 9.91276 10.4253L19.2497 10.427C19.4398 10.4271 19.6227 10.4898 19.7615 10.6025C19.9004 10.7153 19.9848 10.8696 19.9978 11.0343C20.0107 11.199 19.9512 11.3619 19.8313 11.49C19.7114 11.6181 19.54 11.7018 19.3517 11.7243L19.2497 11.7304H9.91276C9.74369 12.3489 9.33949 12.8998 8.76552 13.2939C8.19154 13.6881 7.48134 13.9025 6.74976 13.9025C6.01818 13.9025 5.30798 13.6881 4.734 13.2939C4.16003 12.8998 3.75583 12.3489 3.58677 11.7304H0.74977C0.559747 11.7304 0.37683 11.6677 0.237979 11.5549C0.0991287 11.4422 0.0146974 11.2879 0.00174538 11.1232C-0.0112066 10.9584 0.0482865 10.7956 0.168204 10.6675C0.288121 10.5394 0.459521 10.4556 0.64777 10.4331L0.74977 10.427H3.58677C3.75577 9.80852 4.15995 9.25761 4.73393 8.86341C5.30791 8.46921 6.01814 8.25476 6.74976 8.25475ZM6.74976 9.55813C6.38687 9.55809 6.03294 9.65608 5.73697 9.83853C5.441 10.021 5.21762 10.2789 5.09776 10.5765L5.07676 10.6312L5.03776 10.7598C4.9804 10.994 4.98725 11.2366 5.05776 11.468L5.09776 11.581L5.12276 11.6409C5.25419 11.9295 5.48405 12.1761 5.78149 12.3478C6.07893 12.5196 6.42972 12.6081 6.78674 12.6016C7.14377 12.5951 7.48996 12.4938 7.77883 12.3113C8.06769 12.1289 8.28541 11.874 8.40276 11.581L8.44276 11.468L8.42476 11.5201C8.50479 11.2907 8.52124 11.048 8.47276 10.812L8.44276 10.6929L8.42276 10.6321L8.37576 10.5157C8.24609 10.233 8.02182 9.99069 7.73195 9.81998C7.44208 9.64927 7.09993 9.55806 6.74976 9.55813ZM13.2498 2.21962e-08C13.9814 1.3345e-05 14.6916 0.214461 15.2656 0.608663C15.8396 1.00287 16.2437 1.55377 16.4127 2.1723H19.2497C19.4398 2.17235 19.6227 2.23508 19.7615 2.3478C19.9004 2.46052 19.9848 2.61484 19.9978 2.77957C20.0107 2.9443 19.9512 3.10717 19.8313 3.23525C19.7114 3.36334 19.54 3.44709 19.3517 3.4696L19.2497 3.47568H16.4127C16.2437 4.09416 15.8395 4.64502 15.2655 5.03917C14.6915 5.43332 13.9813 5.64773 13.2498 5.64773C12.5182 5.64773 11.808 5.43332 11.234 5.03917C10.66 4.64502 10.2558 4.09416 10.0868 3.47568H0.74977C0.559747 3.47563 0.37683 3.41291 0.237979 3.30018C0.0991287 3.18746 0.0146974 3.03314 0.00174538 2.86841C-0.0112066 2.70368 0.0482865 2.54082 0.168204 2.41273C0.288121 2.28465 0.459521 2.20089 0.64777 2.17838L0.74977 2.1723L10.0868 2.17056C10.2562 1.55236 10.6605 1.00184 11.2344 0.607981C11.8084 0.214119 12.5184 -7.96113e-05 13.2498 2.21962e-08ZM13.2498 1.30338C12.8867 1.30341 12.5327 1.40152 12.2367 1.58414C11.9407 1.76676 11.7174 2.02483 11.5978 2.32262L11.5768 2.3765L11.5388 2.5051C11.4811 2.73918 11.4876 2.98177 11.5578 3.21327L11.5978 3.32623L11.6228 3.38618C11.7541 3.67473 11.9839 3.92147 12.2812 4.09326C12.5786 4.26505 12.9294 4.35368 13.2864 4.34725C13.6434 4.34082 13.9896 4.23963 14.2786 4.05728C14.5675 3.87492 14.7853 3.62013 14.9027 3.3271L14.9427 3.21327L14.9247 3.2654C15.0048 3.03594 15.0212 2.79328 14.9727 2.55723L14.9427 2.43819L14.9227 2.37737L14.8757 2.26093C14.7461 1.97829 14.5218 1.73594 14.2319 1.56524C13.9421 1.39453 13.5999 1.30331 13.2498 1.30338Z" fill="black"/>
                                    </g>
                                </svg>                             
                            </div>   
                            <input class="search-line__input" type="search" id="search-input" name="q" placeholder="Поиск">                                                  
                            <input class="search-line__button" type="submit" value="Найти" id="search-button" data-action="searchButtonClick">
                        </form>
                    </div>
                    <div class="search-categories">
                        ${this.__drawCategories()}
                    </div>
                </div>            
        </div>    
        `;
    }

    /***
     * Add category fields to template
     * @returns {string}
     * @private
     */
    __drawCategories() {
        let fields = '';
        this.__data.forEach((element) => {
            let boxItems = '';
            element.items.forEach((item) => {
                boxItems += `
                    <a href="#" class='search-category__item-inner' id="category-${item}" data-action="categoryClick">
                        ${item}
                    </a>
                `;
            });
            fields += `
                <div class="search-category-card">
                    <div class="search-category__title">
                        ${element.title}
                    </div>
                    <div class="search-category__item">
                        ${boxItems}
                    </div>                
                </div>
            `;

        });
        return fields;
    }

    /***
     * Add component to parent
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}