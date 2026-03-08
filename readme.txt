=== Swift PWA – Progressive Web App toolkit for WordPress ===
Contributors: zilero
Donate link: https://github.com/sponsors/Zilero232
Tags: pwa, progressive-web-apps, manifest, service-worker, offline, mobile
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

* Guided manifest editor covering basic details, display modes, languages, categories, icons, screenshots, shortcuts, and related applications
* Real-time validation with sensible defaults pulled from your site name, description, locale, and URL structure
* WordPress media library integration for icons and screenshots with automatic size metadata
* Live preview with syntax highlighting and download options

---

### Service worker automation that fits your site

* Configuration panels for registration scope, update strategy, and caching strategies
* Skip-pattern management to exclude admin, login, or sensitive endpoints
* Five caching strategies: Cache First, Network First, Stale While Revalidate, Network Only, Cache Only
* Precache management for critical assets
* Runtime cache controller with customizable settings
* Optional background sync queue and push notification support
* Generates production-ready code and writes to site root automatically

---

### Monitor and debug with confidence

* Status dashboard verifies HTTPS, manifest and service-worker presence, file size, and timestamps
* Preview screen renders both files with syntax highlighting
* Copy to clipboard and download functionality
* File status monitoring with direct URLs for verification
* Admin SPA built with Vue 3 + PrimeVue for responsive, accessible controls

---

### Fits into existing workflows

* REST API namespace `swift_pwa_api/v2` secured by `manage_options` capability
* Controllers for manifests, service workers (including raw code endpoint), media uploads, and post listings
* Files stored in WordPress root for proper origin scope (e.g., `/manifest.json`, `/service-worker.js`)
* Compatible with popular caching plugins (WP Super Cache, W3 Total Cache, etc.)

---

### For developers

* **Architecture:** PSR-4 autoloading with proper PHP namespacing
* **Frontend Stack:** Vue 3 + TypeScript + Vite + TailwindCSS + PrimeVue
* **REST API:** Full REST API with extensible base controller
* **Service Worker:** Template-based generation for easy customization
* **Development:** Hot-reload with `npm run dev`, build with `npm run build`
* **Source Code:** [GitHub Repository](https://github.com/Zilero232/wp-swift-pwa)

== Installation ==

### System Requirements

* WordPress 6.0 or higher
* PHP 8.0 or higher
* HTTPS enabled (required for Service Workers to function)
* Modern browser with Service Worker support

### Quick Installation

1. Upload the `wp-swift-pwa` folder to `/wp-content/plugins/`
2. Activate **Swift PWA** from the WordPress **Plugins** screen
3. Navigate to **Swift PWA** in the admin menu
4. Configure your manifest settings (name, icons, colors, etc.)
5. Configure your service worker settings (caching strategy, offline page)
6. Check the **Status** page to verify HTTPS and file generation
7. Visit your site and test the install prompt

### Development Installation

For developers working from source:

1. Clone the repository: `git clone https://github.com/Zilero232/wp-swift-pwa.git`
2. Install PHP dependencies: `composer install`
3. Install Node dependencies: `npm install` or `yarn install`
4. Build production assets: `npm run build`
5. Activate the plugin in WordPress

For development with hot-reload:
* Run `npm run dev` to start Vite dev server
* Admin interface will auto-reload on file changes

== Frequently Asked Questions ==

= Where are the generated files stored? =

Both `manifest.json` and `service-worker.js` are written to the WordPress root directory (`ABSPATH`). This location allows browsers to fetch them at the origin scope, which is required for service workers and ensures install prompts work correctly.

= Do I need HTTPS? =

Yes, HTTPS is mandatory for Service Workers to function. Most modern browsers block Service Worker registration on non-secure origins. The Status dashboard will alert you if HTTPS is not enabled.

= Can I use my existing icons and screenshots? =

Absolutely! The manifest editor integrates directly with the WordPress media library. Select any uploaded images and the plugin automatically records their dimensions. You can also upload new assets through the built-in media picker.

= How do I customize the offline fallback page? =

1. Navigate to **Service Worker** → **Basic Settings**
2. Set the `offline_page` field to your desired URL (e.g., `/offline/`)
3. Make sure this page is accessible and contains helpful content for offline users
4. Save your settings

The service worker will serve this page when users try to navigate offline and the requested page isn't cached.

= The service worker fails to register. What should I check? =

Common issues and solutions:

1. **HTTPS:** Confirm your site uses HTTPS (check the Status page)
2. **File Location:** Verify `service-worker.js` exists at your site root
3. **File Permissions:** Ensure WordPress can write to the root directory
4. **Caching:** Clear any caching plugin cache
5. **Browser Cache:** Hard-refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)
6. **Console Errors:** Open browser DevTools → Console to see error messages

The Status dashboard provides direct URLs to both files for manual verification.

= Can I precache specific pages automatically? =

Yes! Use the Posts REST endpoint to fetch URLs:

1. Make a request to `https://yoursite.com/wp-json/swift_pwa_api/v2/posts`
2. Extract the relative URLs from the response
3. Add them to the precache list in **Service Worker** → **Basic Settings**
4. Save your settings

The service worker will cache these pages during installation for instant offline access.

= Does this work with caching plugins? =

Yes, Swift PWA is compatible with most caching plugins (WP Super Cache, W3 Total Cache, WP Rocket, etc.). However, ensure your caching plugin:

* Does NOT cache `service-worker.js` (it must always be fresh)
* Does NOT cache `manifest.json` (or use a short cache lifetime)
* Allows the service worker to bypass cache for dynamic content

Most caching plugins work fine with default settings.

= Will this slow down my site? =

No. The admin interface only loads on Swift PWA admin pages (not on other admin pages or frontend). The service worker actually *improves* performance by:

* Caching assets for faster repeat visits
* Enabling offline functionality
* Reducing server requests for cached resources

= Can I use this with WooCommerce, BuddyPress, or other plugins? =

Yes! Swift PWA works alongside other plugins. Configure skip patterns to exclude specific URLs from caching:

* `/wp-content/plugins/` - Skip all plugins (recommended)
* `/cart/`, `/checkout/` - Skip WooCommerce checkout
* `/members/` - Skip BuddyPress member pages
* `/wp-json/` - Skip REST API endpoints

Add patterns in **Service Worker** → **Skip Patterns**.

= What happens when I deactivate the plugin? =

* **Deactivation:** Service worker stops registering on new visits, but remains active for existing users until browsers unregister it naturally
* **Uninstallation:** Both `manifest.json` and `service-worker.js` files are automatically deleted from your WordPress root

Database settings are preserved on deactivation and deleted on uninstallation.

= Is the plugin translated? =

Swift PWA is translation-ready with text domain `swift-pwa`. Translate using:

* WordPress.org translation system (once plugin is approved)
* Loco Translate plugin
* Manual .po/.mo files in the `/languages/` directory

Contributions welcome on [GitHub](https://github.com/Zilero232/wp-swift-pwa).

= Is multisite supported? =

Swift PWA works on a per-site basis. For multisite installations:

* Activate the plugin on each site that needs PWA functionality
* Configure settings independently for each site
* Files are scoped to each site's domain automatically

== Screenshots ==

1. **Status Dashboard** - Overview of PWA readiness with HTTPS verification and file status
2. **Manifest Editor** - Visual builder for basic info, display modes, and branding
3. **Icons & Screenshots** - WordPress media library integration with automatic size detection
4. **Service Worker Builder** - Configure caching strategies, skip patterns, and offline behavior
5. **Preview Screen** - Syntax-highlighted code view with copy and download options

== Changelog ==

= 1.0.0 - 2024-03-08 =
* **Initial Release**
* Admin SPA for manifest.json and service-worker.js management
* Visual manifest editor with all PWA fields
* Service Worker Generator with 5 caching strategies
* Skip pattern management for selective caching
* Status monitor with HTTPS and file verification
* Preview screen with syntax highlighting
* Media library integration for icons and screenshots
* REST API namespace `swift_pwa_api/v2`
* Precache management for critical assets
* Background sync and push notification placeholders
* TypeScript + Vue 3 + PrimeVue admin interface

== Upgrade Notice ==

= 1.0.0 =
Initial release: configure manifest.json and service-worker.js through a single interface and launch your first PWA. Requires PHP 8.0+ and HTTPS.

== Additional Info ==

### Browser Support

Swift PWA works in all modern browsers that support Service Workers:

* Chrome/Edge 40+
* Firefox 44+
* Safari 11.1+
* Opera 27+
* Samsung Internet 4+

### Security

* All REST API endpoints require `manage_options` capability
* Nonce verification for all requests
* Input sanitization and validation
* Escaping for all output

### Performance

* Admin scripts load only on plugin pages
* Lazy-loaded Vue components for faster initial load
* Optimized Vite build with code splitting
* Service Worker caching improves frontend performance

### Support

* **Documentation:** [GitHub Wiki](https://github.com/Zilero232/wp-swift-pwa/wiki)
* **Issues:** [GitHub Issues](https://github.com/Zilero232/wp-swift-pwa/issues)
* **Support Forum:** [WordPress.org Support](https://wordpress.org/support/plugin/wp-swift-pwa/)

### Credits

Built with:
* Vue 3 - Frontend framework
* PrimeVue - UI component library
* TanStack Query - Data fetching and caching
* Vite - Build tool
* Shiki - Syntax highlighting