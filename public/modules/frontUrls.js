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

    /***
     * Get search page
     * @returns {string}
     */
    get search() {
        return '/search';
    }

    /***
     * Get favorite page
     * @returns {string}
     */
    get favorite() {
        return '/favorite';
    }

    /***
     * Get promotion page
     * @returns {string}
     */
    get promotion() {
        return '/promotion';
    }

    /***
     * Get my ads page
     * @returns {string}
     */
    get myAds() {
        return '/ads';
    }
}

export const frontUrls = new FrontUrls();