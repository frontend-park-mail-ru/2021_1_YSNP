import {user} from '../models/ProfileUserModel.js';

import {router} from './router.js';
import {frontUrls} from './urls/frontUrls.js';

/***
 * Check user auth, redirect to registration if user is not auth
 */
export function checkIsAuth() {
    if (user.isAuth) {
        return true;
    }

    router.redirect(frontUrls.registration);
    return false;
}

/***
 * Check user auth, redirect to profile if user is auth
 */
export function checkIsNotAuth() {
    if (!user.isAuth) {
        return true;
    }

    router.redirect(frontUrls.userProfile);
    return false;
}