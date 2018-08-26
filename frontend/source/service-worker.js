self.addEventListener('fetch', function(event) {

});


// // キャッシュにバージョンを付けておくと、古いキャッシュを消す時に便利
// var CACHE_STATIC_VERSION = 'static-v1';
//
// // サービスワーカーのインストール
// self.addEventListener('install', function(event) {
//   console.log('[Service Worker] Installing Service Worker...');
//
//   // キャッシュできるまで次の処理を待つ
//   event.waitUntil(
//       caches.open(CACHE_STATIC_VERSION)
//           .then(function(cache) {
//             console.log('[Service Worker] Precaching App...');
//             // 何でもキャッシュできる。cssとかの中で更にリクエストが発生する場合は、動的にキャッシュする必要がある（後述）
//             cache.addAll([
//               '/'
//             ]);
//           })
//   );
// });
//
// var CACHE_DYNAMIC_VERSION = 'dynamic-v1';
//
// self.addEventListener('fetch', function(event) {
//   console.log('[Service Worker] Fetching something ...');
//   event.respondWith(
//       // キャッシュの存在チェック
//       caches.match(event.request)
//           .then(function(response) {
//             if (response) {
//               return response;
//             } else {
//               // キャッシュがなければリクエストを投げて、レスポンスをキャッシュに入れる
//               return fetch(event.request)
//                   .then(function(res) {
//                     return caches.open(CACHE_DYNAMIC_VERSION)
//                         .then(function(cache) {
//                           // 最後に res を返せるように、ここでは clone() する必要がある
//                          // cache.put(event.request.url, res.clone());
//                           return res;
//                         })
//                   })
//                   .catch(function() {
//                     // エラーが発生しても何もしない
//                   });
//             }
//           })
//   );
// });
//
//
// self.addEventListener('activate', function(event) {
//   console.log('[Service Worker] Activating Service Worker...');
//   event.waitUntil(
//       caches.keys()
//           .then(function(keyList) {
//             return Promise.all(keyList.map(function(key) {
//               if (key !== CACHE_STATIC_VERSION && key !== CACHE_DYNAMIC_VERSION) {
//                 console.log('[Service Worker] Removing old cache...');
//                 return caches.delete(key);
//               }
//             }));
//           })
//   );
//   return self.clients.claim();
// });