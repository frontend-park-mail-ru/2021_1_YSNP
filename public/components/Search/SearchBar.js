
import './SearchBar.css';
import {ProductList} from '../ProductList/ProductList.js';
import {ProductListController} from '../ProductList/ProductListController.js';
export class SearchBar {

    constructor(parent) {
        this.__parent = parent;
    }

    template() {
        return `
<div class="ad-switch-search">
    <div class="ad-switch-inner-search">
        <span class="ad-switch-inner__title">Все Категории</span>
    </div>
</div>
<div class="search-block">
<div class="search-filter-container">
<h3>Фильтр</h3>

<div class="search-filter-elem">
<select id="{{this.id}}" class="reg-panel__textfield filter-bg" name="{{this.id}}">
            <option value="" disabled selected hidden>Все категории</option>
    <option>{{this}}</option>
    <option>{{this}}</option>
    <option>{{this}}</option>
    <option>{{this}}</option>        
</select>
</div>

<div class="search-filter-elem">
<div class="search-filter__amount">
    <input class="search-filter__from-input filter-bg" type="number" placeholder="Цена от, ₽"/>
    <input class="search-filter__to-input filter-bg"  type="number" placeholder="до"/>
</div>
</div>
<div class="search-filter-elem">
<select id="{{this.id}}" class="reg-panel__textfield filter-bg" name="{{this.id}}">
            <option value="" disabled selected hidden>Срок размещения</option>
    <option>{{this}}</option>
    <option>{{this}}</option>
    <option>{{this}}</option>
    <option>{{this}}</option>
</select>
</div>

<div class="search-filter-elem">
<input class="header-right__create-button reg__button remove-margin" data-action="clickRegistration" type="submit"
                       id="register" value="Применить"/>
</div>                  
</div>
<div class="search-items-container">
    <div class="search-items-inner" id="search-panel">
    <div class="search-bar">
        <input type="text" class="search-block__search-field" placeholder="Введите товар для поиска..."/>
        <input class="header-right__create-button small-btn" data-action="clickRegistration" type="submit"
                               id="register" value="Поиск"/>
    </div>
        <select id="{{this.id}}" class="search__sort" name="{{this.id}}" >
            <option value="" disabled selected hidden>Сортировать по</option>
            <option>{{this}}</option>
            <option>{{this}}</option>
            <option>{{this}}</option>
            <option>{{this}}</option>
        </select>
        <hr class="hr-srch"/>
    </div>
</div>
</div>
        `;
    }

    __removePageListeners() {

    }

    async render() {
        this.__parent.insertAdjacentHTML('beforeend', this.template());
        const productList = new ProductList(document.getElementById('search-panel'));
        this.__productListController = new ProductListController(this.__removePageListeners.bind(this), document.getElementById('search-panel'), productList);
        await this.__productListController.control();
    }
}
