'use strict';

import './scss/style.scss';
import './scss/main.scss';

import {router} from './modules/router.js';
import {frontUrls} from './modules/urls/frontUrls.js';

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
import {ProductEditView} from './views/ProductEditView.js';
import {UserChatsView} from './views/UserChatsView.js';
import {AchievementView} from './views/AchievementView.js';
import {SellerProfileView} from './views/SellerProfileView.js';

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
import {baseCreateProduct, baseRegistration} from './modules/layout/fields.js';
import {ProductEditPresenter} from './presenters/ProductEditPresenter.js';
import {UserChatsPresenter} from './presenters/UserChatsPresenter.js';
import {AchievementPresenter} from './presenters/AchievementPresenter.js';
import {SellerProfilePresenter} from './presenters/SellerProfilePresenter.js';

import {sentryManager} from './modules/sentry.js';

/***
 * Register service worker
 *  */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {scope: '/'})
        .then(() => {
            console.log('Service Worker registered.');
        }).catch((error) => {
       // sentryManager.captureException(error);
        console.log(`Error while register service worker:${error}`);
    });
}

const app = document.getElementById('app');

const chatsView = new UserChatsView(app);
const favoriteView = new UserFavoriteView(app);
const achievementView = new AchievementView(app);
const mainView = new MainView(app);
const adView = new UserAdView(app);
const productCreateView = new ProductCreateView(app, baseCreateProduct);
const productView = new ProductView(app);
const profileView = new UserProfileView(app);
const registrationView = new RegistrationView(app, baseRegistration);
const searchView = new SearchView(app);
const promotionView = new PromotionView(app);
const notFoundView = new NotFoundView(app);
const productEditView = new ProductEditView(app, baseCreateProduct);
const userLandingView = new SellerProfileView(app);

/***
 * Open main page
 * @returns {Function}
 */
const doMain = () => {
    const mainPresenter = new MainPresenter(mainView);
    mainPresenter.control();

    return mainPresenter.removePageListeners.bind(mainPresenter);
};

/***
 * Open registration page
 * @returns {Function}
 */
const doRegistration = () => {
    const registrationPresenter = new RegistrationPresenter(registrationView);
    registrationPresenter.control();

    return registrationPresenter.removePageListeners.bind(registrationPresenter);
};

/***
 * Open product create page
 * @returns {Function}
 */
const doProductCreate = () => {
    const productCreatePresenter = new ProductCreatePresenter(productCreateView);
    productCreatePresenter.control();

    return productCreatePresenter.removePageListeners.bind(productCreatePresenter);
};

/***
 * Open product editing page
 */
const doProductEdit = (val) => {
    const editProductPresenter = new ProductEditPresenter(productEditView, val.parameters.id);
    editProductPresenter.control();

    return editProductPresenter.removePageListeners.bind(editProductPresenter);
};

/***
 * Open product page
 * @param {Object} val - page params
 * @returns {Function}
 */
const doProduct = (val) => {
    const productPresenter = new ProductPresenter(productView, val.parameters.id);
    productPresenter.control();

    return productPresenter.removePageListeners.bind(productPresenter);
};

/***
 * Open promotion page
 * @returns {Function}
 */
const doPromotion = () => {
    const promotionPresenter = new PromotionPresenter(promotionView);
    promotionPresenter.control();

    return promotionPresenter.removePageListeners.bind(promotionPresenter);
};

/***
 * Open user profile page
 * @returns {Function}
 */
const doProfile = () => {
    const profilePresenter = new UserProfilePresenter(profileView);
    profilePresenter.control();

    return profilePresenter.removePageListeners.bind(profilePresenter);
};

/***
 * Open user ads page
 * @returns {Function}
 */
const doAd = () => {
    const adPresenter = new UserAdPresenter(adView);
    adPresenter.control();

    return adPresenter.removePageListeners.bind(adPresenter);
};

/***
 * Open user chats page
 * @returns {Function}
 */
const doChats = () => {
    const chatsPresenter = new UserChatsPresenter(chatsView);
    chatsPresenter.control();

    return chatsPresenter.removePageListeners.bind(chatsPresenter);
};

/***
 * Open user chat page
 * @param {Object} val - page params
 * @returns {Function}
 */
const doChat = (val) => {
    const chatsPresenter = new UserChatsPresenter(chatsView, val.parameters.id);
    chatsPresenter.control();

    return chatsPresenter.removePageListeners.bind(chatsPresenter);
};

/***
 * Open user favorite page
 * @returns {Function}
 */
const doFavorite = () => {
    const favoritePresenter = new UserFavoritePresenter(favoriteView);
    favoritePresenter.control();

    return favoritePresenter.removePageListeners.bind(favoritePresenter);
};

/***
 * Open user achievements page
 * @returns {Function}
 */
const doAchievements = (val) => {
    const achievementPresenter = new AchievementPresenter(achievementView, val.parameters.id);
    achievementPresenter.control();

    return achievementPresenter.removePageListeners.bind(achievementPresenter);
};

/***
 * Open search page with text
 * @param {Object} val - page params
 */
const doSearchWithText = (val) => {
    const searchPresenter = new SearchPresenter(searchView, val.parameters.text);
    searchPresenter.control();

    return searchPresenter.removePageListeners.bind(searchPresenter);
};

/***
 * Open search page
 * @returns {Function}
 */
const doSearch = () => {
    const searchPresenter = new SearchPresenter(searchView, '');
    searchPresenter.control();

    return searchPresenter.removePageListeners.bind(searchPresenter);
};

/***
 * Open not found page
 * @returns {Function}
 */
const doNotFound = () => {
    const notFoundPresenter = new NotFoundPresenter(notFoundView);
    notFoundPresenter.control();

    return notFoundPresenter.removePageListeners.bind(notFoundPresenter);
};

/***
 * Open product page
 * @param {Object} val - page params
 * @returns {Function}
 */
const doUserLanding = (val) => {
    const userLandingPresenter = new SellerProfilePresenter(userLandingView, val.parameters.id);
    userLandingPresenter.control();

    return userLandingPresenter.removePageListeners.bind(userLandingPresenter);
};

router.add(frontUrls.main, doMain);
router.add(frontUrls.registration, doRegistration);
router.add(frontUrls.productCreate, doProductCreate);
router.add(frontUrls.search, doSearch);
router.add(frontUrls.searchWithText(), doSearchWithText);
router.add(frontUrls.product(), doProduct);
router.add(frontUrls.promotion, doPromotion);
router.add(frontUrls.userProfile, doProfile);
router.add(frontUrls.userAd, doAd);
router.add(frontUrls.userChats, doChats);
router.add(frontUrls.userChat(), doChat);
router.add(frontUrls.userFavorite, doFavorite);
router.add(frontUrls.editProduct(), doProductEdit);
router.add(frontUrls.sellerAchievements(), doAchievements);
router.add(frontUrls.sellerProfile(), doUserLanding);

router.addNotFound(doNotFound);

router.start();
