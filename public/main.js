'use strict';

// import {Landing} from './pages/Landing.js';
import {Profile} from './pages/Profile.js';
import {Registration} from './pages/Registration.js';

const app = document.getElementById('app');

// const registration = new Registration(app);
// registration.render();

const profile = new Profile(app);
profile.render();
