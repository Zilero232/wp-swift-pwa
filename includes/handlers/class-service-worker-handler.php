<?php
/**
 * Service Worker Handler
 *
 * @package SwiftPWA\ServiceWorkerHandler
 */

namespace SwiftPWA\ServiceWorkerHandler;

defined( 'ABSPATH' ) || exit;

class Service_Worker_Handler {

	private static $instance;

	private function __construct() {
		$callback = function ( $method_name ) {
			return array( $this, $method_name );
		};

		// Only register on frontend.
		if ( ! is_admin() ) {
			add_action( 'wp_footer', $callback( 'register_service_worker' ), 1 );
		}
	}

	public static function init(): self {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Register service worker in frontend
	 */
	public function register_service_worker(): void {
		$sw_url = home_url( '/service-worker.js' );

		?>
		<script>
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', function () {
					const swUrl = '<?php echo esc_js( $sw_url ); ?>';

					navigator.serviceWorker.register(swUrl)
						.then(function (registration) {
							console.log('[Service Worker] Registered successfully');

							// Listen for updates
							registration.addEventListener('updatefound', function () {
								const newWorker = registration.installing;
								
								console.log('[Service Worker] Update found');
								
								newWorker.addEventListener('statechange', function () {
									if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
										console.log('[Service Worker] New version available - refresh page to update');
									}
								});
							});
						})
						.catch(function (error) {
							console.error('[Service Worker] Registration failed:', error);
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