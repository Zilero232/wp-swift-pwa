// Service Worker для Swift PWA
// Версия: {{VERSION}}
// Генерируется автоматически

const VERSION = '{{VERSION}}';
const CACHE_NAME = '{{CACHE_NAME}}';
const OFFLINE_PAGE = '{{OFFLINE_PAGE}}';

// Стратегии кэширования
const CACHE_STRATEGIES = {
{{CACHE_STRATEGIES}}};

// Файлы для предварительного кэширования
const PRECACHE_FILES = {{PRECACHE_FILES}};

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Precaching files');
        return cache.addAll(PRECACHE_FILES);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Install error:', error);
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys().then((cache_names) => {
      return Promise.all(
        cache_names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
    .then(() => {
      return self.clients.claim();
    })
  );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Пропускаем не-GET запросы
  if (request.method !== 'GET') {
    return;
  }

  // Пропускаем chrome-extension и другие схемы
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Определяем стратегию кэширования
  const strategy = getCacheStrategy(url.pathname);

  switch (strategy) {
    case 'cacheFirst':
      event.respondWith(cacheFirst(request));
      break;
    case 'networkFirst':
      event.respondWith(networkFirst(request));
      break;
    case 'networkOnly':
      event.respondWith(networkOnly(request));
      break;
    case 'cacheOnly':
      event.respondWith(cacheOnly(request));
      break;
    default:
      event.respondWith(networkFirst(request));
  }
});

// Определение стратегии кэширования
function getCacheStrategy(pathname) {
  const strategies = CACHE_STRATEGIES || {};

  // Проверяем каждый набор расширений
  for (const [extensions, strategy] of Object.entries(strategies)) {
    if (extensions === 'default') continue;

    const extList = extensions.split(',').map(ext => ext.trim());

    // Проверяем расширения файлов
    if (extList.some(ext => {
      if (ext === 'html') {
        return pathname.endsWith('.html') || pathname.endsWith('/');
      }
      if (ext === 'api') {
        return pathname.includes('/wp-json/') || pathname.includes('/api/');
      }
      return pathname.match(new RegExp(`\\.${ext.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'));
    })) {
      return strategy;
    }
  }

  // Возвращаем стратегию по умолчанию или fallback
  return strategies.default || 'networkFirst';
}

// Стратегия: Cache First
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[Service Worker] Fetch error:', error);
    // Возвращаем оффлайн страницу для HTML запросов
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match(OFFLINE_PAGE) || new Response('Offline', { status: 503 });
    }
    return new Response('Offline', { status: 503 });
  }
}

// Стратегия: Network First
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache');
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    // Возвращаем оффлайн страницу для HTML запросов
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match(OFFLINE_PAGE) || new Response('Offline', { status: 503 });
    }
    return new Response('Offline', { status: 503 });
  }
}

// Стратегия: Network Only
async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.error('[Service Worker] Network error:', error);
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match(OFFLINE_PAGE) || new Response('Offline', { status: 503 });
    }
    return new Response('Offline', { status: 503 });
  }
}

// Стратегия: Cache Only
async function cacheOnly(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  return new Response('Not cached', { status: 404 });
}

// Очистка старого кэша
async function cleanOldCache() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();

  if (keys.length > {{MAX_ENTRIES}}) {
    const sorted = keys
      .map(async (key) => {
        const response = await cache.match(key);
        const headers = response.headers;
        const date = headers.get('date');
        return { key, date: date ? new Date(date).getTime() : 0 };
      });

    const resolved = await Promise.all(sorted);
    resolved.sort((a, b) => a.date - b.date);

    const toDelete = resolved.slice(0, resolved.length - {{MAX_ENTRIES}});
    await Promise.all(toDelete.map((item) => cache.delete(item.key)));
  }
}

// Периодическая очистка кэша
setInterval(cleanOldCache, 3600000); // Каждый час
