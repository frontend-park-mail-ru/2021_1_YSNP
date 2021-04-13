const cacheName = 'ysnpkoya-cache-v1';

const cacheUrls = [
    ''
];

const FALLBACK =
    '<head>' +
    '<meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width">' +
    '<title>Koya</title>' +
    '<style type="text/css">' +
    '    body {' +
    '        margin: 0;' +
    '        padding: 0;' +
    '    }' +
    '' +
    '    .offline-page {' +
    '        bottom: 0;' +
    '        top: 0;' +
    '        margin: 0;' +
    '        padding: 0;' +
    '        left: 0;' +
    '        right: 0;' +
    '        width: 100%;' +
    '        height: 100vh;' +
    '        background-color: rgb(245, 245, 245);' +
    '    }' +
    '    ' +
    '    .logo-wrapper {' +
    '        display: flex;' +
    '        flex-direction: column;' +
    '       justify-content: space-evenly;' +
    '       justify-items: center;' +
    '       align-items: center;' +
    '       align-content: center;' +
    '       width: 100%;' +
    '       height: 100%;' +
    '   }' +
    '' +
    '    .offline-logo-img {' +
    '        animation: flowing 2s ease-in-out infinite;' +
    '    }' +
    '' +
    '.offline-message {' +
    'font-family: Roboto, sans-serif;' +
    'font-size: 2vw;' +
    'color: black;' +
    '}' +
    '' +
    '@keyframes flowing {' +
    '0% {' +
    'transform: translateX(-100%);' +
    '}' +
    '50% {' +
    'transform: translateX(100%);' +
    '}' +
    '100% {' +
    'transform: translateX(-100%);' +
    '}' +
    '}' +
    '</style>' +
    '</head>' +
    '<body>' +
    '<div class="offline-page">' +
    '<div class="logo-wrapper">' +
    '<svg class="offline-logo-img" width="100" height="100" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<g clip-path="url(#clip0)">' +
    '<rect width="60" height="60" rx="15" fill="#E3E3E3"/>' +
    '<circle cx="45.5" cy="42.5" r="3.5" fill="#D31E1E"/>' +
    '<path opacity="0.5" d="M18.125 46V9.57812H21.7812V33.4375L32.75 20.7812H37.5312L28.5312 30.8594L38.5625 46H34.1562L26.1875 33.3906L21.7812 38.3125V46H18.125Z" fill="black"/>' +
    '</g>' +
    '<defs>' +
    '<clipPath id="clip0">' +
    '<rect width="60" height="60" fill="white"/>' +
    '</clipPath>' +
    '</defs>' +
    '</svg>' +
    '<span class="offline-message">You are offline</span>' +
    '</div>' +
    '</div>' +
    '</body>';

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
            cache.addAll(cacheUrls).then(() => self.skipWaiting());
        }));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') {
        event.respondWith(
            fetch(request)
                .catch(() => {
                    const response = new Response(JSON.stringify({result: 'offline'}), { headers: { 'Content-Type': 'apllication/json' }, status: 400});
                    console.log(response.body);
                    return response;
                })
        );
        return;
    }
    event.respondWith(
        (async() => {
            if (navigator.onLine) {
                const response = await fetch(event.request);
                if (response && response.ok) {
                    const cache = await caches.open(cacheName);
                    await cache.match(event.request)
                        .then((matching) => {
                            if (!matching) {
                                cache.put(event.request, response.clone());
                            }
                        });
                }

                return response;
            } 
                const cache = await caches.open(cacheName);
                const match = await cache.match(event.request.url)
                    .then(
                        (matching) => matching || new Response(FALLBACK, {
                            headers: {
                                'Content-Type': 'text/html; charset=utf-8'
                            }
                        })
                    );

                return match;
            
        })()
    );
});