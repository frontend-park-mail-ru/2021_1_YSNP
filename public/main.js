'use strict';

import './style.css';

import {Landing} from './pages/Landing.js';
import {Product} from './pages/Product.js';
import {ProductCreate} from './pages/ProductCreate.js';
import {Profile} from './pages/Profile.js';
import {Registration} from './pages/Registration.js';

import {router} from './modules/router.js';
import {pageUrls} from './modules/pageUrls.js';

const app = document.getElementById('app');

const landing = new Landing(app);
const product = new Product(app);
const productCreate = new ProductCreate(app);
const profile = new Profile(app);
const registration = new Registration(app);

/***
 * Open landing page
 */
const doLanding = () => {
    landing.render();
};

/***
 * Open product create page
 */
const doProductCreate = () => {
    productCreate.render();
};

/***
 * Open product page
 * @param {Object} reg - url parameters
 */
const doProduct = (reg) => {
    product.render(reg.parameters.id);
};

/***
 * Open profile page
 */
const doProfile = () => {
    profile.render();
};

/***
 * Open registration page
 */
const doRegistration = () => {
    registration.render();
};

router.add(pageUrls.main, doLanding);
router.add(pageUrls.productCreate, doProductCreate);
router.add(`${pageUrls.product}{id}`, doProduct);
router.add(pageUrls.profile, doProfile);
router.add(pageUrls.registration, doRegistration);

router.start();
