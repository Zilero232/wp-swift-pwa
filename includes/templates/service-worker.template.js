// Service Worker для Swift PWA
// Версия: {{VERSION}}
// Генерируется автоматически

const DEBUG = '{{DEBUG}}' === 'true';
const VERSION = '{{VERSION}}';
const CACHE_NAME = '{{CACHE_NAME}}';
const OFFLINE_PAGE = '{{OFFLINE_PAGE}}';
const MAX_CACHE_ENTRIES = parseInt('{{MAX_ENTRIES}}', 10) || 50;

// Стратегии кэширования
const CACHE_STRATEGIES = {{CACHE_STRATEGIES}};

// Файлы для предварительного кэширования
const PRECACHE_FILES = {{PRECACHE_FILES}};

// Skip patterns
const SKIP_PATTERNS = {{SKIP_PATTERNS}};

// ============================================================================
// Installation
// ============================================================================

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing version:', VERSION);

  event.waitUntil(
    precacheFiles()
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('[Service Worker] Install failed:', error);
        throw error;
      })
  );
});

/**
 * Precache static files during installation
 */
async function precacheFiles() {
  if (!PRECACHE_FILES || PRECACHE_FILES.length === 0) {
    return console.log('[Service Worker] No files to precache');
  }

  const cache = await caches.open(CACHE_NAME);

  console.log('[Service Worker] Precaching', PRECACHE_FILES.length, 'files');

  // Cache files individually to avoid failing entire batch
  const results = await Promise.allSettled(
    PRECACHE_FILES.map(url =>
      cache.add(url).catch(err => {
        console.warn('[Service Worker] Failed to cache:', url, err);
      })
    )
  );

  const failed = results.filter(r => r.status === 'rejected').length;
  if (failed > 0) {
    console.warn('[Service Worker] Failed to cache', failed, 'files');
  }
}

// ============================================================================
// Activation
// ============================================================================

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating version:', VERSION);

  event.waitUntil(
    Promise.all([
      cleanupOldCaches(),
      self.clients.claim()
    ])
  );
});

/**
 * Remove old cache versions
 */
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => name !== CACHE_NAME);

  if (oldCaches.length === 0) {
    return console.log('[Service Worker] No old caches to clean');
  }

  console.log('[Service Worker] Removing', oldCaches.length, 'old caches');

  await Promise.all(
    oldCaches.map(name => {
      console.log('[Service Worker] Deleting cache:', name);

      return caches.delete(name);
    })
  );
}

// ============================================================================
// Fetch Handling
// ============================================================================

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip non-HTTP(S) requests
  const url = new URL(request.url);
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip patterns (wp-admin, wp-login, etc.)
  if (shouldSkipRequest(url.pathname)) {
    if (DEBUG) {
      console.log('[Service Worker] Skipping:', url.pathname);
    }

    return;
  }

  // Determine and apply caching strategy
  const strategy = determineStrategy(url.pathname);
  event.respondWith(handleRequest(request, strategy));
});

/**
 * Check if request should be skipped based on patterns
 */
function shouldSkipRequest(pathname) {
  if (!SKIP_PATTERNS || SKIP_PATTERNS.length === 0) {
    return false;
  }

  return SKIP_PATTERNS.some(pattern => {
    if (typeof pattern === 'string') {
      return pathname.includes(pattern);
    }
    if (pattern instanceof RegExp) {
      return pattern.test(pathname);
    }
    return false;
  });
}

/**
 * Determine caching strategy for a given pathname
 */
function determineStrategy(pathname) {
  const strategies = CACHE_STRATEGIES || {};

  // Check each extension group
  for (const [extensions, strategy] of Object.entries(strategies)) {
    if (extensions === 'default') continue;

    const extList = extensions.split(',').map(ext => ext.trim());

    if (matchesExtension(pathname, extList)) {
      return strategy;
    }
  }

  // Return default strategy or fallback
  return strategies.default || 'networkFirst';
}

/**
 * Check if pathname matches any extension in the list
 */
function matchesExtension(pathname, extensions) {
  return extensions.some(ext => {
    // Special case: HTML pages
    if (ext === 'html') {
      return pathname.endsWith('.html') || pathname.endsWith('/');
    }

    // Special case: API endpoints
    if (ext === 'api') {
      return pathname.includes('/wp-json/') || pathname.includes('/api/');
    }

    // Regular file extension
    const escapedExt = ext.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\.${escapedExt}$`, 'i').test(pathname);
  });
}

/**
 * Handle request with appropriate strategy
 */
async function handleRequest(request, strategy) {
  switch (strategy) {
    case 'cacheFirst':
      return cacheFirstStrategy(request);
    case 'networkFirst':
      return networkFirstStrategy(request);
    case 'networkOnly':
      return networkOnlyStrategy(request);
    case 'cacheOnly':
      return cacheOnlyStrategy(request);
    default:
      console.warn('[Service Worker] Unknown strategy:', strategy);

      return networkFirstStrategy(request);
  }
}

// ============================================================================
// Caching Strategies
// ============================================================================

/**
 * Cache First: Try cache, fallback to network
 */
async function cacheFirstStrategy(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    // Only cache successful responses
    if (response.ok) {
      await cacheResponse(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error('[Service Worker] Cache First failed:', error);

    return handleOffline(request);
  }
}

/**
 * Network First: Try network, fallback to cache
 */
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);

    // Cache successful responses
    if (response.ok) {
      await cacheResponse(request, response.clone());
    }

    return response;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache');

    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    return handleOffline(request);
  }
}

/**
 * Network Only: Always fetch from network
 */
async function networkOnlyStrategy(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.error('[Service Worker] Network Only failed:', error);

    return handleOffline(request);
  }
}

/**
 * Cache Only: Only serve from cache
 */
async function cacheOnlyStrategy(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  console.warn('[Service Worker] Cache Only: Resource not cached:', request.url);

  return new Response('Resource not cached', {
    status: 404,
    statusText: 'Not Found in Cache'
  });
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Cache a response
 */
async function cacheResponse(request, response) {
  try {
    const cache = await caches.open(CACHE_NAME);

    await cache.put(request, response);
  } catch (error) {
    console.warn('[Service Worker] Failed to cache response:', error);
  }
}

/**
 * Handle offline scenarios
 */
async function handleOffline(request) {
  const isHTMLRequest = request.headers.get('accept')?.includes('text/html');

  if (isHTMLRequest && OFFLINE_PAGE) {
    const offlinePage = await caches.match(OFFLINE_PAGE);

    if (offlinePage) {
      return offlinePage;
    }
  }

  return new Response(
    isHTMLRequest ? 'Offline - No cached version available' : 'Network error',
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': isHTMLRequest ? 'text/html' : 'text/plain' }
    }
  );
}

/**
 * Check if cache size exceeds limit and remove oldest entries
 */
async function maintainCacheSize() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();

    if (requests.length <= MAX_CACHE_ENTRIES) {
      return;
    }

    console.log('[Service Worker] Cache size:', requests.length, '/ Max:', MAX_CACHE_ENTRIES);

    // Get all cached responses with their dates
    const entries = await Promise.all(
      requests.map(async (request) => {
        const response = await cache.match(request);
        const dateHeader = response?.headers.get('date');
        const timestamp = dateHeader ? new Date(dateHeader).getTime() : 0;

        return { request, timestamp };
      })
    );

    // Sort by timestamp (oldest first)
    entries.sort((a, b) => a.timestamp - b.timestamp);

    // Delete oldest entries
    const toDelete = entries.slice(0, entries.length - MAX_CACHE_ENTRIES);
    console.log('[Service Worker] Removing', toDelete.length, 'old cache entries');

    await Promise.all(
      toDelete.map(({ request }) => cache.delete(request))
    );
  } catch (error) {
    console.error('[Service Worker] Cache maintenance failed:', error);
  }
}

// ============================================================================
// Periodic Tasks
// ============================================================================

// Run cache maintenance every hour
setInterval(maintainCacheSize, 3600000);
