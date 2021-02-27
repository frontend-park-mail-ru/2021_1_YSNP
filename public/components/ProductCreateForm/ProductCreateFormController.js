'use strict';

/***
 * @author Max Torzhkov
 * ProduCreateForm controller
 * @class ProductCreateFormController
 */
export class ProductCreateFormController {

    /***
     * @author Max Torzhkov
     * Class constructor
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {ProductCreateForm}productCreateForm - form
     * @constructor
     * @this {ProductCreateFormController}
     * @public
     */
    constructor(pageRemoveListeners, parent, productCreateForm) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__productCreateForm = productCreateForm;
    }

    /***
     * @author Max Torzhkov
     * Add listeners
     * @this {ProductCreateForm}
     * @public
     */
    control() {
        this.__productCreateForm.listeners = this.__createListeners();
        this.__productCreateForm.addListeners();
    }

    /***
     * @author Max Torzhkov
     * Remove Controller listeners
     * @this {ProductCreateForm}
     * @public
     */
    removeControllerListeners() {
        this.__productCreateForm.removeListeners();
    }

    /***
     * @author Max Torzhkov
     * listener for submit
     * @param {Event} ev - event
     * @returns {{cost, name, photo, location, category, subcategory, info}}
     * @public
     */
    __listenerSubmitClick(ev) {
        ev.preventDefault();
        console.log('dfskj');
        // const productCategory = document.getElementById('productCategory');
        // const productSubcategory = document.getElementById('productSubcategory');
        const productName = document.getElementById('productName');
        const productCost = document.getElementById('productCost');
        const productInfo = document.getElementById('productInfo');
        const productPhoto = document.getElementById('productPhoto');
        // const productLocation = document.getElementById('productLocation');
        console.log(
            {
                // category: productCategory.value,
                // subcategory: productSubcategory.value,
                name: productName.value,
                cost: productCost.value,
                info: productInfo.value,
                photo: productPhoto.value
                // location: productLocation.value
            }
        );
        return {
            // category: productCategory.value,
            // subcategory: productSubcategory.value,
            name: productName.value,
            cost: productCost.value,
            info: productInfo.value,
            photo: productPhoto.value
            // location: productLocation.value
        };
    }

    /***
     * @author Max Torzhkov
     * Get form listeners
     * @returns {{submitClick: {listener: any, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            submitClick: {
                type: 'submit',
                listener: this.__listenerSubmitClick.bind(this)
            }
        };
    }

}