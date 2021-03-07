import {Header} from '../components/Header/Header.js';
import {HeaderController} from '../components/Header/HeaderController.js';

import {ProductList} from '../components/ProductList/ProductList.js';
import {ProductListController} from '../components/ProductList/ProductListController.js';

import {Search} from '../components/Search/Search.js';
import {SearchController} from '../components/Search/SearchController.js';

/***
 * First (main) page
 */
export class Landing {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Test header data
     * @returns {{isAuth: boolean, location: string, avatar: string, user: string}}
     * @private
     */
    __getHeaderData() {
        return {
            isAuth: false,
            user: 'Алехин Сергей',
            avatar: '/img/test-avatar.jpg',
            location: 'Москва'
        };
    }

    /***
     * Test product list data
     * @returns {({date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string})[]}
     * @private
     */
    __getProductListData() {
        return [
            {
                id: '1',
                img: '/img/test-productCart.jpg',
                name: 'Land Rover новый',
                date: '9 февраля 12:07',
                amount: '2 000 &#8381'
            },
            {
                id: '2',
                img: '/img/test-productCart.jpg',
                name: 'Игровой пк',
                date: '9 февраля 12:07',
                amount: '422 000 &#8381'
            },
            {
                id: '3',
                img: '/img/test-productCart.jpg',
                name: 'Дом прикольный',
                date: '9 февраля 12:07',
                amount: '760 000 &#8381'
            },
            {
                id: '4',
                img: '/img/test-productCart.jpg',
                name: 'Apple iphone x',
                date: '9 февраля 12:07',
                amount: '43 000 &#8381'
            },
            {
                id: '5',
                img: '/img/test-productCart.jpg',
                name: 'Honda Shadow Classic 400',
                date: '9 февраля 12:07',
                amount: '434 000 &#8381'
            }
        ];
    }

    /***
     * Get categories items
     * @returns {({title: string, items: [string, string, string, string, string]}|{title: string, items: string[]}|{title: string, items: string[]}|{title: string, items: [string, string, string, string]}|{title: string, items: string[]})[]}
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
     * Remove page listeners
     * @private
     */
    __removePageListeners() {
        this.__headerController.removeControllerListeners();
        this.__productListController.removeControllerListeners();
    }

    /***
     * Add component to parent
     */
    render() {
        this.__parent.innerHTML = '';

        const header = new Header(this.__parent, this.__getHeaderData());
        header.render();
        this.__headerController = new HeaderController(this.__removePageListeners.bind(this), this.__parent, header);
        this.__headerController.control();

        const search = new Search(this.__parent, this.__getSearchCategories());
        search.render();
        this.__searchController = new SearchController(this.__removePageListeners.bind(this), this.__parent, search);
        this.__searchController.control();

        const productList = new ProductList(this.__parent, this.__getProductListData());
        productList.render();
        this.__productListController = new ProductListController(this.__removePageListeners.bind(this), this.__parent, productList);
        this.__productListController.control();
    }
}