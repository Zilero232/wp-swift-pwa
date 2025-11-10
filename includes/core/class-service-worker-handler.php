<?php
/**
 * Service Worker Handler
 *
 * @package SwiftPWA\ServiceWorkerHandler
 */

namespace SwiftPWA\ServiceWorkerHandler;

use SwiftPWA\FileHandler\File_Handler;
use SwiftPWA\PWAConstants\Plugin_PWA_Constants;

defined('ABSPATH') || exit;

class Service_Worker_Handler
{
	private static $instance;
	private $config;

	private function __construct()
	{
		// Load service worker config
		$this->load_config();

		$callback = function ($method_name) {
			return array($this, $method_name);
		};

		// Only register on frontend
		if (!is_admin()) {
			add_action('wp_footer', $callback('register_service_worker'), 1);
		}
	}

	public static function init(): self
	{
		if (self::$instance === null) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Load service worker configuration
	 */
	private function load_config(): void
	{
		$sw_content = File_Handler::get_file_content(Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME);

		if (is_wp_error($sw_content) || empty($sw_content)) {
			$this->config = include SWIFT_PWA_PLUGIN_PATH . 'includes/config/service-worker-default.php';
		} else {
			// Extract config from service worker file
			$this->config = $this->extract_config_from_sw($sw_content);
		}
	}

	/**
	 * Extract config from service worker code
	 */
	private function extract_config_from_sw(string $sw_code): array
	{
		$default_config = include SWIFT_PWA_PLUGIN_PATH . 'includes/config/service-worker-default.php';

		// Extract version
		if (preg_match('/const\s+VERSION\s*=\s*[\'"]([^\'"]+)[\'"]/', $sw_code, $matches)) {
			$default_config['version'] = $matches[1];
		}

		// Extract cache name
		if (preg_match('/const\s+CACHE_NAME\s*=\s*[\'"]([^\'"]+)[\'"]/', $sw_code, $matches)) {
			$default_config['cache_name'] = $matches[1];
		}

		return $default_config;
	}

	/**
	 * Register service worker in frontend
	 */
	public function register_service_worker(): void
	{
		$sw_url = home_url('/service-worker.js');
		$registration = $this->config['registration'] ?? array();
		$debug = $this->config['debug'] ?? false;

		$scope = $registration['scope'] ?? '/';
		$update_via_cache = $registration['update_via_cache'] ?? 'imports';
		$type = $registration['type'] ?? 'classic';

		?>
		<script>
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', function () {
					const swUrl = '<?php echo esc_js($sw_url); ?>';
					const registrationOptions = {
						scope: '<?php echo esc_js($scope); ?>',
						updateViaCache: '<?php echo esc_js($update_via_cache); ?>',
						type: '<?php echo esc_js($type); ?>'
					};

					<?php if ($debug): ?>
					console.log('[Service Worker] Registration options:', registrationOptions);
					<?php endif; ?>

					navigator.serviceWorker.register(swUrl, registrationOptions)
						.then(function (registration) {
							console.log('[Service Worker] Registered successfully');
							console.log('[Service Worker] Scope:', registration.scope);

							<?php if ($debug): ?>
							console.log('[Service Worker] Registration:', registration);
							<?php endif; ?>

							// Check for updates
							registration.addEventListener('updatefound', function () {
								const newWorker = registration.installing;
								
								console.log('[Service Worker] Update found');
								
								newWorker.addEventListener('statechange', function () {
									console.log('[Service Worker] State changed to:', newWorker.state);
									
									if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
										console.log('[Service Worker] New version available');
										
										// Dispatch custom event for UI notification
										window.dispatchEvent(new CustomEvent('swUpdateAvailable', {
											detail: { registration: registration }
										}));
									}
								});
							});

							// Check for updates periodically (every hour)
							setInterval(function() {
								registration.update();
							}, 3600000);
						})
						.catch(function (error) {
							console.error('[Service Worker] Registration failed:', error);
						});

					// Handle controller change
					navigator.serviceWorker.addEventListener('controllerchange', function () {
						console.log('[Service Worker] Controller changed, reloading page');
						window.location.reload();
					});

					// Listen for messages from service worker
					navigator.serviceWorker.addEventListener('message', function(event) {
						<?php if ($debug): ?>
						console.log('[Service Worker] Message received:', event.data);
						<?php endif; ?>

						if (event.data && event.data.type === 'CACHE_UPDATED') {
							console.log('[Service Worker] Cache updated');
						}
					});
				});
			} else {
				console.warn('[Service Worker] Not supported in this browser');
			}
		</script>
		<?php
	}
}

Service_Worker_Handler::init();