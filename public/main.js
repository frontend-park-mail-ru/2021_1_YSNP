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

import {FavoritePresenter} from './presenters/FavoritePresenter.js';
import {MainPresenter} from './presenters/MainPresenter.js';
import {MyAdsPresenter} from './presenters/MyAdsPresenter.js';
import {ProductCreatePresenter} from './presenters/ProductCreatePresenter.js';
import {ProductPresenter} from './presenters/ProductPresenter.js';
import {ProfilePresenter} from './presenters/ProfilePresenter.js';
import {RegistrationPresenter} from './presenters/RegistrationPresenter.js';
import {SearchPresenter} from './presenters/SearchPresenter.js';

const app = document.getElementById('app');

const favoriteView = new FavoriteView(app);
const mainView = new MainView(app);
const myAdsView = new MyAdsView(app);
const productCreateView = new ProductCreateView(app);
const productView = new ProductView(app);
const profileView = new ProfileView(app);
const registrationView = new RegistrationView(app);
const searchView = new SearchView(app);

const favoritePresenter = new FavoritePresenter(favoriteView);
const mainPresenter = new MainPresenter(mainView);
const myAdsPresenter = new MyAdsPresenter(myAdsView);
const productCreatePresenter = new ProductCreatePresenter(productCreateView);
const productPresenter = new ProductPresenter(productView);
const profilePresenter = new ProfilePresenter(profileView);
const registrationPresenter = new RegistrationPresenter(registrationView);
const searchPresenter = new SearchPresenter(searchView);


/***
 * Open user favorite page
 */
const doFavorite = () => {
    favoritePresenter.control();
};

/***
 * Open main page
 */
const doMain = () => {
    mainPresenter.control();
};

/***
 * Open user ads page
 */
const doMyAds = () => {
    myAdsPresenter.control();
};

/***
 * Open product create page
 */
const doProductCreate = () => {
    productCreatePresenter.control();
};

/***
 * Open product page
 * @param {number} reg - page params
 */
const doProduct = (reg) => {
    productPresenter.control(reg.parameters.id);
};

/***
 * Open user profile page
 */
const doProfile = () => {
    profilePresenter.control();
};

/***
 * Open registration page
 */
const doRegistration = () => {
    registrationPresenter.control();
};

/***
 * Open search page
 */
const doSearch = () => {
    searchPresenter.control();
};

router.add(frontUrls.favorite, doFavorite);
router.add(frontUrls.main, doMain);
router.add(frontUrls.myAds, doMyAds);
router.add(frontUrls.productCreate, doProductCreate);
router.add(frontUrls.product(), doProduct);
router.add(frontUrls.profile, doProfile);
router.add(frontUrls.registration, doRegistration);
router.add(frontUrls.search, doSearch);

router.start();
