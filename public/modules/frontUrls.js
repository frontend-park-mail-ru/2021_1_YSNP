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
     * Get chat page
     * @returns {string}
     */
    get userChats() {
        return '/user/chats';
    }

    /***
     * Get favorite page
     * @returns {string}
     */
    get userFavorite() {
        return '/user/favorite';
    }
}

export const frontUrls = new FrontUrls();