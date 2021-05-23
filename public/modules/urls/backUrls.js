/***
 * Get backend urls
 */
class BackUrls {
    /***
     * Class constructor
     */
    constructor() {
        this.__url = 'https://ykoya.ru';
        // this.__url = 'http://localhost:8080';
        this.__api = '/api/v1';

        this.__wsUrl = 'wss://ykoya.ru';
        // this.__wsUrl = 'ws://localhost:8080';
        this.__wsApi = '/api/v1';
    }

    /***
     * Get chat create url
     * @returns {string}
     */
    get chatCreate() {
        return `${this.__url}${this.__api}/chat/new`;
    }

    /***
     * Get chat url
     * @param {number} id - chat id
     * @returns {string}
     */
    chat(id) {
        return `${this.__url}${this.__api}/chat/${id}`;
    }

    /***
     * Get chat list url
     * @returns {string}
     */
    get chatList() {
        return `${this.__url}${this.__api}/chat/list`;
    }

    /***
     * Get chat webSocket url
     * @returns {string}
     */
    get chatWs() {
        return `${this.__wsUrl}${this.__wsApi}/chat/ws`;
    }

    /***
     * Get login user url
     * @returns {string}
     */
    get login() {
        return `${this.__url}${this.__api}/login`;
    }

    /***
     * Get logout user url
     * @returns {string}
     */
    get logout() {
        return `${this.__url}${this.__api}/logout`;
    }

    /***
     * Get sing up url
     * @returns {string}
     */
    get singUp() {
        return `${this.__url}${this.__api}/signup`;
    }

    /***
     * Get upload user avatar url
     * @returns {string}
     */
    get upload() {
        return `${this.__url}${this.__api}/upload`;
    }

    /***
     * Get user profile url
     * @returns {string}
     */
    get me() {
        return `${this.__url}${this.__api}/me`;
    }


    /***
     * Get user url
     * @param {number} id - user id
     * @returns {string}
     */
    getUser(id) {
        return `${this.__url}${this.__api}/user/${id}`;
    }

    /***
     * Get user min info url
     * @param {number} id - user id
     * @returns {string}
     */
    getUserMinInfo(id) {
        return `${this.__url}${this.__api}/user/landing/${id}`;
    }

    /***
     * Get change user url
     * @returns {string}
     */
    get settings() {
        return `${this.__url}${this.__api}/user`;
    }

    /***
     * Get new password url
     * @returns {string}
     */
    get newPassword() {
        return `${this.__url}${this.__api}/user/password`;
    }

    /***
     * Get product create url
     * Get position user url
     * @returns {string}
     */
    get userPosition() {
        return `${this.__url}${this.__api}/user/position`;
    }

    /***
     * Get user ad list
     * @param {number} from - page number paginator
     * @param {number} count - count product per page
     * @returns {string}
     */
    userAdList(from, count) {
        return `${this.__url}${this.__api}/user/ad/list?from=${from}&count=${count}`;
    }

    /***
     * Get user favorite list
     * @param {number} from - page number paginator
     * @param {number} count - count product per page
     * @returns {string}
     */
    userFavoriteList(from, count) {
        return `${this.__url}${this.__api}/user/favorite/list?from=${from}&count=${count}`;
    }

    /***
     * User like product
     * @param {number} id - product id
     * @returns {string}
     */
    userLikeProduct(id) {
        return `${this.__url}${this.__api}/user/favorite/like/${id}`;
    }

    /***
     * User dislike product
     * @param {number} id - product id
     * @returns {string}
     */
    userDislikeProduct(id) {
        return `${this.__url}${this.__api}/user/favorite/dislike/${id}`;
    }

    /***
     * Get another user ads list
     * @param {number} from - page number paginator
     * @param {number} count - count product per page
     * @param {number} id - user id
     * @returns {string}
     */
    sellerAdList(from, count, id) {
        return `${this.__url}${this.__api}/user/${id}/ad/list?from=${from}&count=${count}`;
    }

    /***
     * Get user seller review
     * @param {number} id - user id
     * @param {number} from - page number paginator
     * @param {number} count - count product per page
     * @param {string} sort - sort type
     * @returns {string}
     */
    userSellerReviews(id, from, count, sort) {
        return `${this.__url}${this.__api}/user/${id}/reviews/seller?from=${from}&count=${count}&sort=${sort}`;
    }

    /***
     * Get user buyer reviews
     * @param {number} id - user id
     * @param {number} from - page number paginator
     * @param {number} count - count product per page
     * @param {string} sort - sort type
     * @returns {string}
     */
    userBuyerReviews(id, from, count, sort) {
        return `${this.__url}${this.__api}/user/${id}/reviews/buyer?from=${from}&count=${count}&sort=${sort}`;
    }

    /***
     * Get one product url
     * @param {number} id - product id
     * @returns {string}
     */
    product(id) {
        return `${this.__url}${this.__api}/product/${id}`;
    }

    /***
     * Get logout user url
     * @returns {string}
     */
    get productCreate() {
        return `${this.__url}${this.__api}/product/create`;
    }

    /***
     * Get product upload photo url
     *  @param {number} id - product id
     * @returns {string}
     */
    productUploadPhotos(id) {
        return `${this.__url}${this.__api}/product/upload/${id}`;
    }

    /***
     * Post close product
     * @param {number} id - product id
     * @returns {string}
     */
    closeProduct(id) {
        return `${this.__url}${this.__api}/product/close/${id}`;
    }

    /***
     * Get edit product
     * @return {string}
     */
    get editPage() {
        return `${this.__url}${this.__api}/product/edit`;
    }

    /***
     * Get product list url
     * @param {number} from - page number paginator
     * @param {number} count - count product per page
     * @returns {string}
     */
    productList(from, count) {
        return `${this.__url}${this.__api}/product/list?from=${from}&count=${count}`;
    }

    /***
     * Get categories
     * @return {string}
     */
    get categories() {
        return `${this.__url}${this.__api}/categories`;
    }

    /***
     * Get find products url
     * @returns {string}
     */
    search(data) {
        return `${this.__url}${this.__api}/search?category=${data.category}&fromAmount=${data.fromAmount}&toAmount=${data.toAmount}&date=${data.date}&radius=${data.radius}&latitude=${data.latitude}&longitude=${data.longitude}&sorting=${data.sorting}&search=${data.search}&from=${data.from}&count=${data.count}`;
    }

    /***
     * Get trends
     * @return {string}
     */
    get recStat() {
        return `${this.__url}${this.__api}/stat`;
    }

    /***
     * Get trends products
     * @return {string}
     */
    get recProductList() {
        return `${this.__url}${this.__api}/product/trend/list`;
    }

    /***
     * Get trends for product
     * @return {string}
     */
    recForProductList(id) {
        return `${this.__url}${this.__api}/product/${id}/trend/list`;
    }
}

export const backUrls = new BackUrls();
