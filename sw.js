// Coach Leal Pro - Service Worker
// Versión del cache - cambiar para forzar actualización
const CACHE_VERSION = 'coach-leal-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700;900&family=Great+Vibes&family=Playfair+Display:wght@700;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
];

// Instalar: precachear recursos esenciales
self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache){
      return cache.addAll(ASSETS_TO_CACHE).catch(function(err){
        console.log('Algunos recursos no se cachearon:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activar: limpiar caches viejos
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_VERSION; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Fetch: estrategia network-first con fallback a cache
self.addEventListener('fetch', function(event){
  // Solo manejar GET
  if(event.request.method !== 'GET') return;

  // No cachear llamadas a API de Anthropic
  if(event.request.url.indexOf('api.anthropic.com') !== -1) return;

  event.respondWith(
    fetch(event.request)
      .then(function(response){
        // Cachear copia de respuestas exitosas
        if(response && response.status === 200 && response.type === 'basic'){
          var responseClone = response.clone();
          caches.open(CACHE_VERSION).then(function(cache){
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(function(){
        // Sin red: intentar servir desde cache
        return caches.match(event.request).then(function(cached){
          if(cached) return cached;
          // Para navegación, fallback a index
          if(event.request.mode === 'navigate'){
            return caches.match('./index.html');
          }
        });
      })
  );
});
