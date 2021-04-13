const cacheName = 'ysnpkoya-cache-v1';

const cacheUrls = [
    '/bundle.js',
    '/bundle.css',
    '/index.html',
    '/sw.js',

    '/img/favicon.svg',
    '/img/profile.png',
    '/img/search-background.webp',

    '/img/svg/cancel.svg',
    '/img/svg/checked.scg',
    '/img/svg/email.svg',
    '/img/svg/eye.svg',
    '/img/svg/gear.svg',
    '/img/svg/heart_regular.svg',
    '/img/svg/koya.svg',
    '/img/svg/like_light.svg',
    '/img/svg/like_solid.svg',
    '/img/svg/list.svg',
    '/img/svg/loupe.svg',
    '/img/svg/open-door.svg',
    '/img/svg/page-down.svg',
    '/img/svg/page-up.svg',
    '/img/svg/photo.svg',
    '/img/svg/placeholder.svg',
    '/img/svg/search.svg',
    '/img/svg/select.svg',
    '/img/svg/user.svg',
    '/img/svg/visibility.svg',

    '/fonts/Roboto-Regular.woff2',

    '/'
    // '/product/',
    // '/product/create',
    // '/signup',
    // '/search/',
    // '/promotion',
    // '/user/profile',
    // '/user/ad',
    // '/user/chats',
    // '/user/favorite'
];

const websiteUrls = [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://ykoya.ru',
    'https://ykoya.ru'
];

/***
 * Check is url to cache
 * @param {string} url - get url
 * @returns {boolean}
 */
function isCacheUrl(url) {
    const cache = websiteUrls.find((val) => url.includes(val));
    return !!cache;
}

/***
 * Fake response
 */
class FakeResponse {
    /***
     * Get init
     * @returns {{headers: {"Content-Type": string}, status: number}}
     * @private
     */
    __getInit(request) {
        let status = 420;
        if (request.url.includes('/me')) {
            status = 401;
        }

        return {
            status: status,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    /***
     * Get body
     * @returns {Blob}
     * @private
     */
    __getBody() {
        const body = {
            message: 'no internet'
        };

        return new Blob([JSON.stringify(body)]);
    }

    /***
     * Get response
     * @returns {Response}
     */
    get(request) {
        return new Response(this.__getBody(), this.__getInit(request));
    }
}

const fakeResponse = new FakeResponse();

/***
 * Cache control
 */
class CacheControl {
    /***
     * Put cache when install sw
     * @returns {Promise<Cache>}
     */
    installPutCache() {
        return this.__getCacheStorage()
            .then((cache) => {
                cache.addAll(cacheUrls).then(() => self.skipWaiting());
            });
    }

    /***
     * Get response from cache
     * @param request
     * @returns {Promise<Response | undefined>}
     */
    async getCache(request) {
        const cache = await this.__getCacheStorage();
        return cache.match(request.url)
            .then((matching) => matching || fakeResponse.get(request));
    }

    /***
     * Put response to cache
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<Response | undefined>}
     */
    async putCache(request, response) {
        const cache = await this.__getCacheStorage();
        return cache.match(request.url)
            .then((matching) => {
                if (!matching) {
                    cache.put(request, response.clone());
                }
            });
    }

    /***
     * Get cache storage
     * @returns {Promise<Cache>}
     * @private
     */
    async __getCacheStorage() {
        return caches.open(cacheName);
    }
}

const cacheControl = new CacheControl();

/***
 * Get request manager
 */
class GetRequestManager {
    /***
     * Work with request when offline
     * @param {Request} request
     * @returns {Promise<Response|undefined>}
     * @private
     */
    async __offlineRequest(request) {
        return await cacheControl.getCache(request);
    }

    /***
     * Work with request when online
     * @param request
     * @returns {Promise<Response<any, Record<string, any>, number>>}
     * @private
     */
    async __onlineRequest(request) {
        const response = await fetch(request);
        if (response && response.ok) {
            if (isCacheUrl(request.url)) {
                await cacheControl.putCache(request, response);
            }
        }

        return response;
    }

    /***
     * Fetch data
     * @param {Request} request
     * @returns {Promise<Response<*, Record<string, *>, number>|Response|undefined>}
     */
    async fetch(request) {
        if (navigator.onLine) {
            return await this.__onlineRequest(request);
        }

        return await this.__offlineRequest(request);
    }
}

/***
 * Post request manager
 */
class PostRequestManager {
    /***
     * Fetch data
     * @param request
     * @returns {Promise<Response<any, Record<string, any>, number>>}
     */
    async fetch(request) {
        if (navigator.onLine) {
            return await fetch(request);
        }

        return fakeResponse.get(request);
    }
}

const getRequest = new GetRequestManager();
const postRequest = new PostRequestManager();

self.addEventListener('install', (event) => {
    event.waitUntil(cacheControl.installPutCache());

});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    if (event.request.method === 'GET') {
        event.respondWith(getRequest.fetch(event.request));
    } else {
        event.respondWith(postRequest.fetch(event.request));
    }
});