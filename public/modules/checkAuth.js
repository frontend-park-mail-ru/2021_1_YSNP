import {user} from '../models/ProfileUserModel.js';

import {router} from './router.js';
import {frontUrls} from './frontUrls.js';

/***
 * Check user auth, redirect if user is not auth
 */
export function checkAuth() {
    if (user.isAuth) {
        return;
    }

    router.redirect(frontUrls.registration);
}