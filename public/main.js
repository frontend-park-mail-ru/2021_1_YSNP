'use strict';

import './style.css';

import {router} from './modules/router.js';
import {frontUrls} from './modules/frontUrls.js';

const app = document.getElementById('app');

import {FavoriteView} from './views/FavoriteView.js';
import {MainView} from './views/MainView.js';
import {MyAdsView} from './views/MyAdsView.js';
import {ProductCreateView} from './views/ProductCreateView.js';
import {ProductView} from './views/ProductView.js';
import {ProfileView} from './views/ProfileView.js';
import {RegistrationView} from './views/RegistrationView.js';
import {SearchView} from './views/SearchView.js';

const favoriteView = new FavoriteView(app);
const mainView = new MainView(app);
const myAdsView = new MyAdsView(app);
const productCreateView = new ProductCreateView(app);
const productView = new ProductView(app);
const profileView = new ProfileView(app);
const registrationView = new RegistrationView(app);
const searchView = new SearchView(app);

import {ProductListModel} from './models/ProductListModel.js';

const productListModel = new ProductListModel();

import {FavoritePresenter} from './presenters/FavoritePresenter.js';
import {MainPresenter} from './presenters/MainPresenter.js';
import {MyAdsPresenter} from './presenters/MyAdsPresenter.js';
import {ProductCreatePresenter} from './presenters/ProductCreatePresenter.js';
import {ProductPresenter} from './presenters/ProductPresenter.js';
import {ProfilePresenter} from './presenters/ProfilePresenter.js';
import {RegistrationPresenter} from './presenters/RegistrationPresenter.js';
import {SearchPresenter} from './presenters/SearchPresenter.js';

const favoritePresenter = new FavoritePresenter(favoriteView);
const mainPresenter = new MainPresenter(mainView, productListModel);
const myAdsPresenter = new MyAdsPresenter(myAdsView);
const productCreatePresenter = new ProductCreatePresenter(productCreateView);
const productPresenter = new ProductPresenter(productView);
const profilePresenter = new ProfilePresenter(profileView);
const registrationPresenter = new RegistrationPresenter(registrationView);
const searchPresenter = new SearchPresenter(searchView);


const doFavorite = () => {
    favoritePresenter.control();
};

const doMain = () => {
    mainPresenter.control();
};

const doMyAds = () => {
    myAdsPresenter.control();
};

const doProductCreate = () => {
    productCreatePresenter.control();
};

const doProduct = () => {
    productPresenter.control();
};

const doProfile = () => {
    profilePresenter.control();
};

const doRegistration = () => {
    registrationPresenter.control();
};

const doSearch = () => {
    searchPresenter.control();
};

// router.add(pageUrls.favorite, doFavorite);
router.add(frontUrls.main, doMain);
// router.add(pageUrls.myAds, doMyAds);
// router.add(pageUrls.productCreate, doProductCreate);
router.add(frontUrls.product(), doProduct);
router.add(frontUrls.profile, doProfile);
// router.add(pageUrls.registration, doRegistration);
// router.add(pageUrls.search, doSearch);

router.start();
