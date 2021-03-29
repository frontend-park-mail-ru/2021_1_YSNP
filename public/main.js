'use strict';

import './style.css';

import {router} from './modules/router.js';
import {frontUrls} from './modules/frontUrls.js';

import {FavoriteView} from './views/FavoriteView.js';
import {MainView} from './views/MainView.js';
import {MyAdsView} from './views/MyAdsView.js';
import {ProductCreateView} from './views/ProductCreateView.js';
import {ProductView} from './views/ProductView.js';
import {ProfileView} from './views/ProfileView.js';
import {RegistrationView} from './views/RegistrationView.js';
import {SearchView} from './views/SearchView.js';
import {PromotionView} from './views/PromotionView.js';

import {FavoritePresenter} from './presenters/FavoritePresenter.js';
import {MainPresenter} from './presenters/MainPresenter.js';
import {MyAdsPresenter} from './presenters/MyAdsPresenter.js';
import {ProductCreatePresenter} from './presenters/ProductCreatePresenter.js';
import {ProductPresenter} from './presenters/ProductPresenter.js';
import {ProfilePresenter} from './presenters/ProfilePresenter.js';
import {RegistrationPresenter} from './presenters/RegistrationPresenter.js';
import {SearchPresenter} from './presenters/SearchPresenter.js';
import {PromotionPresenter} from './presenters/PromotionPresenter.js';
import {baseCreateProduct, baseRegistration} from './modules/fields.js';

const app = document.getElementById('app');

const favoriteView = new FavoriteView(app);
const mainView = new MainView(app);
const myAdsView = new MyAdsView(app);
const productCreateView = new ProductCreateView(app, baseCreateProduct);
const productView = new ProductView(app);
const profileView = new ProfileView(app);
const registrationView = new RegistrationView(app, baseRegistration);
const searchView = new SearchView(app);
const promotionView = new PromotionView(app);

/***
 * Open user favorite page
 */
const doFavorite = () => {
    const favoritePresenter = new FavoritePresenter(favoriteView);
    favoritePresenter.control();
};

/***
 * Open main page
 */
const doMain = () => {
    const mainPresenter = new MainPresenter(mainView);
    mainPresenter.control();
};

/***
 * Open user ads page
 */
const doMyAds = () => {
    const myAdsPresenter = new MyAdsPresenter(myAdsView);
    myAdsPresenter.control();
};

/***
 * Open product create page
 */
const doProductCreate = () => {
    const productCreatePresenter = new ProductCreatePresenter(productCreateView);
    productCreatePresenter.control();
};

/***
 * Open product page
 * @param {number} id - page params
 */
const doProduct = (id) => {
    const productPresenter = new ProductPresenter(productView, id.parameters.id);
    productPresenter.control();
};

/***
 * Open user profile page
 */
const doProfile = () => {
    const profilePresenter = new ProfilePresenter(profileView);
    profilePresenter.control();
};

/***
 * Open registration page
 */
const doRegistration = () => {
    const registrationPresenter = new RegistrationPresenter(registrationView);
    registrationPresenter.control();
};

/***
 * Open search page
 */
const doSearch = () => {
    const searchPresenter = new SearchPresenter(searchView);
    searchPresenter.control();
};

const doPromotion = () => {
    const promotionPresenter = new PromotionView(promotionView);
    promotionPresenter.control();
};

router.add(frontUrls.favorite, doFavorite);
router.add(frontUrls.main, doMain);
router.add(frontUrls.myAds, doMyAds);
router.add(frontUrls.productCreate, doProductCreate);
router.add(frontUrls.product(), doProduct);
router.add(frontUrls.promotion, doPromotion);
router.add(frontUrls.profile, doProfile);
router.add(frontUrls.registration, doRegistration);
router.add(frontUrls.search, doSearch);

router.start();
