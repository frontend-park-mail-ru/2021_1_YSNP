import './SearchBox.css';
import searchBoxTemplate from './SearchBox.hbs';


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

    get listeners() {
        return this.__listeners;
    }

    set listeners(val) {
        this.__listeners = val;
    }


    /***
     * add new listeners
     * @private
     */
    __addListeners() {
        document
            .getElementById('search-button')
            .addEventListener(this.listeners.searchClick.type, this.listeners.searchClick.listener);
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