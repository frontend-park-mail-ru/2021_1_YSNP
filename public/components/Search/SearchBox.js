import './SearchBox.css';
import searchBoxTemplate from './SearchBox.hbs';

/***
 * class for SearchBox component (Main page)
 */
export class SearchBox {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} data - element data
     * @param {Object} listeners - component listeners
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     *
     * list of category and subcategory
     * @return {Object}
     * @private
     */
    __getSearchCategories() {
        return [
            {
                title: 'Транспорт',
                items: [
                    'Автомобили',
                    'Мотоциклы и мототехника',
                    'Грузовики и спецтехника',
                    'Водный транспорт',
                    'Запчасти и аксессуары'
                ]
            },
            {
                title: 'Недвижмость',
                items: [
                    'Квартиры',
                    'Комнаты',
                    'Дома, дачи, коттеджи',
                    'Гаражи и машиноместа',
                    'Земельные участки',
                    'Коммерческая недвижимость',
                    'Недвижимость за рубежом'
                ]
            },
            {
                title: 'Хобби и отдых',
                items: [
                    'Билеты и путешествия',
                    'Велосипеды',
                    'Книги и журналы',
                    'Коллекционирование',
                    'Музыкальные инструменты',
                    'Охота и рыбалка',
                    'Спорт и отдых'
                ]
            },
            {
                title: 'Работа',
                items: [
                    'Вакансии',
                    'Резюме',
                    'Готовый бизнес',
                    'Оборудование для бизнеса'
                ]
            },
            {
                title: 'Для дома и дачи',
                items: [
                    'Бытовая техника',
                    'Мебель и интерьер',
                    'Посуда и товары для кухни',
                    'Продукты питания',
                    'Ремонт и строительство',
                    'Растения'
                ]
            },
            {
                title: 'Бытовая электрика',
                items: [
                    'Аудио и видео',
                    'Игры, приставки и программы',
                    'Настольные компьютеры',
                    'Ноутбуки',
                    'Оргтехника и расходники',
                    'Планшеты и электронные книги',
                    'Телефоны',
                    'Товары для компьютера',
                    'Фототехника'
                ]
            },
            {
                title: 'Личные вещи',
                items: [
                    'Одежда, обувь, аксессуары',
                    'Детская одежда и обувь',
                    'Товары для детей и игрушки',
                    'Часы и украшения',
                    'Красота и здоровье'
                ]
            },
            {
                title: 'Животные',
                items: [
                    'Собаки',
                    'Кошки',
                    'Птицы',
                    'Аквариум',
                    'Другие животные',
                    'Товары для животных'
                ]
            }
        ];
    }

    /***
     * getter for listeners
     * @return {Object}
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * setter for listeners
     * @return {Object}
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     *
     * @return {string}
     */
    getTextFromSearch() {
        return document.getElementById('search-input').value;
    }

    /***
     * add new listeners
     * @private
     */
    __addListeners() {
        document
            .getElementById('search-button')
            .addEventListener(this.listeners.searchClick.type, this.listeners.searchClick.listener);
        document
            .getElementById('search-categories')
            .addEventListener(this.listeners.searchClick.type, this.listeners.searchClick.listener);
    }


    /***
     *
     * @param{HTMLElement} element
     */
    getCategory(element) {
        return element.dataset['category'];
    }

    /***
     * remove listeners
     */
    removeListeners() {
        document
            .getElementById('search-button')
            .removeEventListener(this.listeners.searchClick.type, this.listeners.searchClick.listener);
    }

    /***
     * Add component to parent
     */
    render(ctx) {
        this.listeners = ctx.listeners;
        this.__parent.insertAdjacentHTML('beforeend', searchBoxTemplate(this.__getSearchCategories()));
        this.__addListeners();
    }
}