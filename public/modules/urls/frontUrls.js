/***
 * Page urls
 */
class FrontUrls {
    /***
     * Get main page
     * @returns {string}
     */
    get main() {
        return '/';
    }

    /***
     * Get product page
     * @returns {string}
     * @param {number} id - product id
     */
    product(id = undefined) {
        if (id !== undefined) {
            return `/product/${id}`;
        }

        return '/product/{id}';
    }

    /***
     * Get product create page
     * @returns {string}
     */
    get productCreate() {
        return '/product/create';
    }

    /***
     * Get registration page
     * @returns {string}
     */
    get registration() {
        return '/signup';
    }

    /***
     * Get search page
     * @returns {string}
     */
    searchWithText(text = undefined) {
        if (text !== undefined) {
            return `/search/${text}`;
        }

        return '/search/{text}';
    }

    /***
     * Get search page
     * @returns {string}
     */
    get search() {
        return '/search';
    }

    /***
     * Get promotion page
     * @returns {string}
     */
    get promotion() {
        return '/promotion';
    }

    /***
     * Get profile page
     * @returns {string}
     */
    get userProfile() {
        return '/user/profile';
    }

    /***
     * Get ads page
     * @returns {string}
     */
    get userAd() {
        return '/user/ad';
    }

    /***
     * Get chats page
     * @returns {string}
     */
    get userChats() {
        return '/user/chats';
    }

    /***
     * Get user chat page
     * @param {number} id - chat id
     * @returns {string}
     */
    userChat(id = undefined) {
        if (id !== undefined) {
            return `/user/chat/${id}`;
        }

        return '/user/chat/{id}';
    }

    /***
     * Get favorite page
     * @returns {string}
     */
    get userFavorite() {
        return '/user/favorite';
    }

    /***
     * Get user landing page
     * @returns {string}
     */
    sellerProfile(id = undefined) {
        if (id !== undefined) {
            return `/user/${id}/ads`;
        }

        return '/user/{id}/ads';
    }

    /***
     * Get user achievements page
     * @returns {string}
     */
    userAchievements(id = undefined) {
        if (id !== undefined) {
            return `/user/${id}/achievements`;
        }

        return '/user/{id}/achievements';
    }

    /***
     * Get user comments page
     * @returns {string}
     */
    userReviews(id = undefined) {
        if (id !== undefined) {
            return `/user/${id}/reviews`;
        }

        return '/user/{id}/reviews';
    }

    /***
     * Get edit product page
     * @returns {string}
     */
    editProduct(id = undefined) {
        if (id !== undefined) {
            return `/product/${id}/edit`;
        }

        return '/product/{id}/edit';
    }
}

export const frontUrls = new FrontUrls();