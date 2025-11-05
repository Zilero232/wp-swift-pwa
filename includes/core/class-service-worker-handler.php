<?php
/**
 * Service Worker Handler
 *
 * @package SwiftPWA\ServiceWorkerHandler
 */

namespace SwiftPWA\ServiceWorkerHandler;

defined('ABSPATH') || exit;

class Service_Worker_Handler
{
	private static $instance;

	private function __construct()
	{
		$callback = function ($method_name) {
			return array($this, $method_name);
		};

		add_action('wp_footer', $callback('register_service_worker'), 1);
	}

	public static function init(): self
	{
		if (self::$instance === null) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Register service worker in frontend
	 */
	public function register_service_worker(): void
	{
		$sw_url = home_url('/service-worker.js');

		?>
		<script>
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', function () {
					navigator.serviceWorker.register('<?php echo esc_js($sw_url); ?>')
						.then(function (registration) {
							console.log('[Service Worker] Registered successfully:', registration.scope);

							// Проверка обновлений
							registration.addEventListener('updatefound', function () {
								const newWorker = registration.installing;
								newWorker.addEventListener('statechange', function () {
									if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
										console.log('[Service Worker] New version available');
										// Здесь можно показать уведомление пользователю
									}
								});
							});
						})
						.catch(function (error) {
							console.error('[Service Worker] Registration failed:', error);
						});

					// Обработка обновлений
					navigator.serviceWorker.addEventListener('controllerchange', function () {
						window.location.reload();
					});
				});
			}
		</script>
		<?php
	}
}

Service_Worker_Handler::init();