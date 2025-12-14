// Service Worker for PWA - Version 6.1 Stable
// Provides offline functionality and caching WITHOUT auto-refresh issues

const CACHE_NAME = 'cirurgias-cec-v6.1-stable';
const OFFLINE_URL = '/splash.html';
const DYNAMIC_CACHE = 'cirurgias-cec-dynamic-v6.1';

// Files to cache on install
const CACHE_URLS = [
  '/',
  '/splash.html',
  '/login.html',
  '/index.html',
  '/admin.html',
  '/admin-login.html',
  '/download-app.html',
  '/js/main.js',
  '/js/admin.js',
  '/js/auth.js',
  '/js/pwa.js',
  '/js/navigation.js',
  '/js/student-stats.js',
  '/js/modules.js',
  '/js/install-app.js',
  '/js/api-config.js',
  '/js/mobile-enhancements.js',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching essential files');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        // Do NOT skip waiting automatically to prevent reload loops
        // return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip API requests (tables/) - Network first with dynamic cache
  if (event.request.url.includes('/tables/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone response to cache it in dynamic cache
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try dynamic cache
          return caches.match(event.request).then((cached) => {
            if (cached) {
              console.log('[Service Worker] Serving API from cache (offline mode)');
              return cached;
            }
            // Return offline response
            return new Response(JSON.stringify({ 
              error: 'Offline', 
              message: 'Você está offline. Tente novamente quando estiver conectado.' 
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
    return;
  }

  // For static files, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[Service Worker] Serving from cache:', event.request.url);
          return cachedResponse;
        }

        console.log('[Service Worker] Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone response to cache it
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });

            return response;
          })
          .catch((error) => {
            console.error('[Service Worker] Fetch failed:', error);
            
            // If offline and requesting a page, show offline page
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            
            throw error;
          });
      })
  );
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skip waiting requested');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[Service Worker] Clear cache requested');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'Abrir Sistema'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Sistema de Cirurgias', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/index.html')
    );
  }
});

// Background sync event
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-attendance') {
    event.waitUntil(syncAttendance());
  }
});

// Function to sync attendance data
async function syncAttendance() {
  try {
    console.log('[Service Worker] Syncing attendance data...');
    // Add sync logic here if needed
    return Promise.resolve();
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
    return Promise.reject(error);
  }
}

console.log('[Service Worker] Loaded successfully');
