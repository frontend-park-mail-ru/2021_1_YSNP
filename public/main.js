'use strict';

import './style.css';

import {Landing} from './pages/Landing.js';

const app = document.getElementById('app');

const landing = new Landing(app);
landing.render();
