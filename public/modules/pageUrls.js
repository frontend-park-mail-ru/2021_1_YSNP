/***
 * Page urls
 */
class PageUrls {
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
     */
    get product() {
        return '/product/';
    }

    /***
     * Get product create page
     * @returns {string}
     */
    get productCreate() {
        return '/product/create';
    }

    /***
     * Get profile page
     * @returns {string}
     */
    get profile() {
        return '/profile';
    }

    /***
     * Get registration page
     * @returns {string}
     */
    get registration() {
        return '/signup';
    }
}

export const pageUrls = new PageUrls();