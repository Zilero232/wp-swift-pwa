// Service Worker для Swift PWA
// Version: {{VERSION}}

const VERSION = '{{VERSION}}';
const CACHE_NAME = '{{CACHE_NAME}}-v{{VERSION}}';
const OFFLINE_PAGE = '{{OFFLINE_PAGE}}';
const STRATEGY = '{{STRATEGY}}';

// Precache files
const PRECACHE_FILES = {{PRECACHE_FILES}};

// Skip patterns
const SKIP_PATTERNS = {{SKIP_PATTERNS}};

// ============================================================================
// Installation
// ============================================================================

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing version:', VERSION);
  console.log('[Service Worker] Using strategy:', STRATEGY);

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
// Fetch Handling - Dynamic Strategy Selection
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
    return;
  }

  // Apply selected strategy
  event.respondWith(handleRequest(request, STRATEGY));
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
      return pathname.startsWith(pattern);
    }
    if (pattern instanceof RegExp) {
      return pattern.test(pathname);
    }
    return false;
  });
}

/**
 * Handle request with selected strategy
 */
async function handleRequest(request, strategy) {
  switch (strategy) {
    case 'cacheFirst':
      return cacheFirstStrategy(request);
    case 'networkFirst':
      return networkFirstStrategy(request);
    case 'staleWhileRevalidate':
      return staleWhileRevalidateStrategy(request);
    case 'networkOnly':
      return networkOnlyStrategy(request);
    case 'cacheOnly':
      return cacheOnlyStrategy(request);
    default:
      console.warn('[Service Worker] Unknown strategy:', strategy, '- using networkFirst');

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
 * Stale While Revalidate: Return cache immediately, update in background
 */
async function staleWhileRevalidateStrategy(request) {
  const cached = await caches.match(request);

  // Fetch in background and update cache
  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) {
        cacheResponse(request, response.clone());
      }

      return response;
    })
    .catch(error => {
      console.warn('[Service Worker] Background update failed:', error);

      return null;
    });

  // Return cached version immediately or wait for network
  return cached || fetchPromise;
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
