//set up cache name and create array of files to be cached
const cacheName = "v1";

const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

//install service worker
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
});

//activate service worker
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName){
                        console.log('Service Worker:Cleared');
                        return caches.delete(cache);
                    }
                })
            );
        })
    )
});
//service worker fetching
self.addEventListener('fetch', e => {
    console.log('Service Worker:Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const resClone = res.clone();
            caches.open(cacheName).then(cache => {
                cache.put(e.request, resClone);
            });
            return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
});