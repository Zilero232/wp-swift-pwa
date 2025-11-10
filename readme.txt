=== Swift PWA – Progressive Web App toolkit for WordPress ===
Contributors: zilero
Donate link: https://dalink.to/zilero
Tags: pwa, progressive web app, manifest, service worker, offline, caching
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Turn your WordPress site into a production-ready Progressive Web App with visual builders for manifest.json and service-worker.js, live previews, and automated status checks.

== Description ==

### Swift PWA: Visual toolkit for instant PWA readiness
	
Swift PWA delivers a purpose-built admin application inside WordPress that creates and maintains the two core files every PWA needs: `manifest.json` and `service-worker.js`. Launch a native-like experience for visitors while keeping full control over cache, offline, and install prompts.

---

### Build a PWA without touching code

- Guided manifest editor that covers basic details, display modes, languages, categories, icons, screenshots, shortcuts, and related applications.
- Real-time validation with sensible defaults pulled from your site name, description, locale, and URL structure.
- WordPress media library integration for icons and screenshots with automatic size metadata.

---

### Service worker automation that fits your site

- Configuration panels for registration scope, update strategy, and script type (classic or module).
- Skip-pattern management to exclude back-office or sensitive endpoints.
- Strategy matrix for HTML, styles, scripts, images, fonts, APIs, and a default fallback.
- Runtime cache controller with quota settings, optional background sync queue, and push-notification placeholders.
- Generates production code using the built-in Service Worker Generator, writes to the site root, and keeps versions in sync.

---

### Monitor and debug with confidence

- Status dashboard verifies HTTPS, manifest and service-worker presence, file size, timestamps, and public URLs.
- Preview screen renders both files with syntax highlighting, copy/download actions, and lazy loading.
- Admin SPA built with Vue 3 + PrimeVue for responsive, accessible controls.

---

### Fits into existing workflows

- REST namespace `swift_pwa_api/v2` secured by `manage_options` capability.
- Controllers for manifests, service workers (including raw code endpoint), media uploads, and post listings to help populate precache manifests.
- Files are stored in the WordPress root so browsers can fetch them at origin scope (e.g., `/manifest.json`, `/service-worker.js`).

---

### For developers

- Composer autoloading and PSR-4 namespacing for PHP components (`File_Handler`, `Service_Worker_Generator`, `RestController`).
- Front-end built with Vite and TypeScript; run `npm install`, `npm run build`, and `composer install` when working from source.
- Extend functionality via filters and additional REST controllers; reuse the base controller for permission and response helpers.
- Default configs live in `includes/config/manifest-default.php` and `includes/config/service-worker-default.php` for easy overrides.

== Installation ==

1. Upload the `wp-swift-pwa` folder to `/wp-content/plugins/`.
2. Activate **Swift PWA** from the WordPress **Plugins** screen.
3. Open **Swift PWA** → **Settings** in the admin menu to launch the SPA interface.
4. (Development build only) Install dependencies with `composer install` and `npm install`, then run `npm run build` to regenerate the admin assets.

== Frequently Asked Questions ==

= Where are the generated files stored? =
Both `manifest.json` and `service-worker.js` are written to the WordPress root (`ABSPATH`). This allows browsers to fetch them at the origin scope and ensures install prompts work correctly.

= Can I use my existing icons and screenshots? =
Yes. The manifest editor lists uploads from the WordPress media library and records intrinsic width/height automatically. You can also upload new assets through the built-in media picker.

= How do I customize the offline fallback? =
Set the `offline_page` value in the Service Worker → Basic settings panel. Make sure the URL points to a published page that remains accessible while offline.

= The service worker fails to register. What should I check? =
Confirm your site is served over HTTPS, the service worker URL matches your site root, and no caching plugin serves an outdated script. The Status dashboard highlights missing files and provides direct URLs for verification.

= Can I automate precaching pages? =
Yes. Use the Posts REST endpoint (`swift_pwa_api/v2/posts`) to fetch relative URLs for key posts or pages, then add them to the precache list within the Service Worker settings.

= Is multisite supported? =
Swift PWA works per-site. Activate the plugin on each site that needs PWA functionality so files are scoped to its domain.

== Screenshots ==

1. Dashboard overview of your PWA readiness status.
2. Manifest editor with sections for display, categories, shortcuts, and related apps.
3. Service worker builder showing registration, cache strategies, and runtime cache limits.
4. Preview screen with syntax-highlighted manifest and service worker code plus copy/download buttons.
5. Media picker for selecting icons and screenshots from the WordPress library.

== Changelog ==

= 1.0.0 =
* First public release.
* Admin SPA for manifest.json and service-worker.js management.
* Service Worker Generator with runtime cache, background sync, and strategy presets.
* Status monitor with HTTPS and file consistency checks.
* Preview tooling with download and clipboard helpers.
* REST API namespace `swift_pwa_api/v2` for manifests, service workers, media, and posts.

== Upgrade Notice ==

= 1.0.0 =
Initial release: configure manifest.json and service-worker.js through a single interface and launch your first PWA.