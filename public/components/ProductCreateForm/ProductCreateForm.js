'use strict';

/***
 * @author Max Torzhkov
 * ProductCreateForm class for product creation
 * @class ProductCreateForm
 */
export class ProductCreateForm {

    /***
     * @author Max Torzhkov
     * init of class ProductCreateForm
     * @param {HTMLElement} parent - parent element
     * @constructor
     * @this {ProductCreateForm}
     * @public
     */
    constructor(parent) {
        this.__parent = parent;
        this.__listeners = {};
        //this.__data = data;
    }


    /***
     * @author Max Trozhkov
     * get Navigation listeners
     * @this {ProductCreateForm}
     * @private
     * @readonly
     * @return  {Object[]} array of listeners
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Max Torzhkov
     * Set new listeners
     * @this {ProductCreateForm}
     * @param  {Object[]} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * @author Max Torzhkov
     * Add component to parent
     * @this {ProductCreateForm}
     * @public
     */
    addListeners() {
        document
            .getElementById('product-create-form')
            .addEventListener(this.__listeners.submitClick.type, this.__listeners.submitClick.listener);
    }

    /***
     * @author Max Torzhkov
     * Remove component from parent
     * @this {ProductCreateForm}
     * @public
     */
    removeListeners() {
        document
            .getElementById('product-create-form')
            .removeEventListener(this.__listeners.submitClick.type, this.__listeners.submitClick.listener);
    }


    /***
     * @author Max Torzhkov
     * main template of component
     * @return {string}
     * @private
     * @this {ProductCreateForm}
     */
    __getTemplate() {
        return `
                <div class="product-create">
                        <div class="product-create-inner">
                        <h2 class="product-create-inner__title">Создание объявления</h2>
                        <form id="product-create-form" class="inner-form">
<!--                            <div class="form-row">-->
<!--                                <label class="form-row__label" for="productCategory">Категория</label>-->
<!--                                <select id="productCategory" class="form-row__input" name="productCategory" required></select>-->
<!--                            </div>-->
<!--                            <div class="form-row">-->
<!--                                    <label class="form-row__label" for="productSubcategory">Подкатегория</label>-->
<!--                                    <select id="productSubcategory" class="form-row__input" name="productSubcategory" required></select>-->
<!--                            </div>-->
                            <div class="form-row">
                                    <label class="form-row__label" for="productName">Название</label>
                                    <input id="productName" class="form-row__input" name="productName" required>
                            </div>
                            <div class="form-row">
                                    <label class="form-row__label" for="productCost">Цена</label>
                                    <input id="productCost" class="form-row__input" name="productCost" pattern="(0\\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\\.([0-9]{1,2}))?)" required>
                            </div>
                            <div class="form-row">    
                                    <label class="form-row__label" for="productInfo">Описание</label>
                                    <textarea id="productInfo" class="form-row__textarea" maxlength="5000" name="productInfo" required></textarea>
                            </div>
                            <div class="form-row">    
                                    <label class="form-row__label" for="productPhoto">Фото</label>
                                    <label class="form-row__photolabel" >
                                        <input id="productPhoto" name="productPhoto" class="form-row__photoinput" type="file" accept="image/gif,image/png,image/jpeg,image/pjpeg" multiple="" data-marker="add/input" value="" required>
                                    </label>
                            </div>
<!--                            <div class="form-row">-->
<!--                                    <label class="form-row__label" for="productLocation">Местоположение</label>-->
<!--                                    <input id="productLocation" class="form-row__input" name="productLocation">-->
<!--                            </div>-->
                            <div class="inner-button">
                                <input type="submit" class="inner-button__button" id="create" value="Продолжить">
                            </div>
                            </form>
                        </div>
                </div>
        `;
    }

    /***
     * @author Max Torzhkov
     * Add component to parent
     * @this {ProductCreateForm}
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}