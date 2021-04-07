'use strict';

import './style.css';

import {router} from './modules/router.js';
import {frontUrls} from './modules/frontUrls.js';

import {UserFavoriteView} from './views/UserFavoriteView.js';
import {MainView} from './views/MainView.js';
import {UserAdView} from './views/UserAdView.js';
import {ProductCreateView} from './views/ProductCreateView.js';
import {ProductView} from './views/ProductView.js';
import {UserProfileView} from './views/UserProfileView.js';
import {RegistrationView} from './views/RegistrationView.js';
import {SearchView} from './views/SearchView.js';
import {PromotionView} from './views/PromotionView.js';
import {NotFoundView} from './views/NotFoundView.js';
import {DonutView} from './views/DonutView.js';

import {UserFavoritePresenter} from './presenters/UserFavoritePresenter.js';
import {MainPresenter} from './presenters/MainPresenter.js';
import {UserAdPresenter} from './presenters/UserAdPresenter.js';
import {ProductCreatePresenter} from './presenters/ProductCreatePresenter.js';
import {ProductPresenter} from './presenters/ProductPresenter.js';
import {UserProfilePresenter} from './presenters/UserProfilePresenter.js';
import {RegistrationPresenter} from './presenters/RegistrationPresenter.js';
import {SearchPresenter} from './presenters/SearchPresenter.js';
import {PromotionPresenter} from './presenters/PromotionPresenter.js';
import {NotFoundPresenter} from './presenters/NotFoundPresenter.js';
import {DonutPresenter} from './presenters/DonutPresenter.js';
import {baseCreateProduct, baseRegistration} from './modules/fields.js';

const app = document.getElementById('app');

const favoriteView = new UserFavoriteView(app);
const mainView = new MainView(app);
const adView = new UserAdView(app);
const productCreateView = new ProductCreateView(app, baseCreateProduct);
const productView = new ProductView(app);
const profileView = new UserProfileView(app);
const registrationView = new RegistrationView(app, baseRegistration);
const searchView = new SearchView(app);
const promotionView = new PromotionView(app);
const notFoundView = new NotFoundView(app);
const donutView = new DonutView(app);

/***
 * Open main page
 */
const doMain = () => {
    const mainPresenter = new MainPresenter(mainView);
    mainPresenter.control();

    return mainPresenter.removePageListeners.bind(mainPresenter);
};

/***
 * Open registration page
 */
const doRegistration = () => {
    const registrationPresenter = new RegistrationPresenter(registrationView);
    registrationPresenter.control();

    // return registrationPresenter.removePageListeners.bind(registrationPresenter);
};

/***
 * Open product create page
 */
const doProductCreate = () => {
    const productCreatePresenter = new ProductCreatePresenter(productCreateView);
    productCreatePresenter.control();

    // return productCreatePresenter.removePageListeners.bind(productCreatePresenter);
};

/***
 * Open product page
 * @param {number} id - page params
 */
const doProduct = (id) => {
    const productPresenter = new ProductPresenter(productView, id.parameters.id);
    productPresenter.control();

    // return productPresenter.removePageListeners.bind(productPresenter);
};

/***
 * Open promotion page
 */
const doPromotion = () => {
    const promotionPresenter = new PromotionPresenter(promotionView);
    promotionPresenter.control();

    // return promotionPresenter.removePageListeners.bind(promotionPresenter);
};

/***
 * Open user profile page
 */
const doProfile = () => {
    const profilePresenter = new UserProfilePresenter(profileView);
    profilePresenter.control();

    // return profilePresenter.removePageListeners.bind(profilePresenter);
};

/***
 * Open user ads page
 */
const doAd = () => {
    const adPresenter = new UserAdPresenter(adView);
    adPresenter.control();

    return adPresenter.removePageListeners.bind(adPresenter);
};

/***
 * Open user favorite page
 */
const doFavorite = () => {
    const favoritePresenter = new UserFavoritePresenter(favoriteView);
    favoritePresenter.control();

    return favoritePresenter.removePageListeners.bind(favoritePresenter);
};

/***
 * Open search page
 */
const doSearch = () => {
    const searchPresenter = new SearchPresenter(searchView);
    searchPresenter.control();

    // return searchPresenter.removePageListeners.bind(searchPresenter);
};

/***
 * Open not found page
 */
const doNotFound = () => {
    const notFoundPresenter = new NotFoundPresenter(notFoundView);
    notFoundPresenter.control();
};

/***
 * Open donut page
 */
const doDonut = () => {
    const donutPresenter = new DonutPresenter(donutView);
    donutPresenter.control();
};

router.add(frontUrls.main, doMain);
router.add(frontUrls.registration, doRegistration);
router.add(frontUrls.productCreate, doProductCreate);
router.add(frontUrls.product(), doProduct);
router.add(frontUrls.promotion, doPromotion);
router.add(frontUrls.userProfile, doProfile);
router.add(frontUrls.userAd, doAd);
router.add(frontUrls.userFavorite, doFavorite);
router.add(frontUrls.search, doSearch);
router.add(frontUrls.donut, doDonut);

router.addNotFound(doNotFound);

router.start();
