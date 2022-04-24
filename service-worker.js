/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-9bad31f';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./jen_smouha_po_nebi_002.html","./index.html","./jen_smouha_po_nebi_005.html","./jen_smouha_po_nebi_006.html","./jen_smouha_po_nebi_007.html","./jen_smouha_po_nebi_008.html","./jen_smouha_po_nebi_009.html","./jen_smouha_po_nebi_010.html","./jen_smouha_po_nebi_011.html","./jen_smouha_po_nebi_012.html","./jen_smouha_po_nebi_013.html","./jen_smouha_po_nebi_014.html","./jen_smouha_po_nebi_015.html","./jen_smouha_po_nebi_016.html","./jen_smouha_po_nebi_017.html","./jen_smouha_po_nebi_018.html","./jen_smouha_po_nebi_019.html","./jen_smouha_po_nebi_020.html","./jen_smouha_po_nebi_021.html","./jen_smouha_po_nebi_022.html","./jen_smouha_po_nebi_023.html","./jen_smouha_po_nebi_024.html","./jen_smouha_po_nebi_025.html","./jen_smouha_po_nebi_026.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/obalka_jen_smouha_po_nebi.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
