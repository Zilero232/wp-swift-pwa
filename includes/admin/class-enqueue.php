<?php
/**
 * Enqueue assets class.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Enqueue;

use Kucrut\Vite;

class Enqueue
{
	/**
	 * Singleton instance
	 *
	 * @var self
	 */
	private static $instance;

	/**
	 * Constructor
	 */
	private function __construct()
	{
		$callback = function ($method_name) {
			return array($this, $method_name);
		};

		add_action('admin_enqueue_scripts', $callback('admin_enqueue_scripts'));
	}

	/**
	 * Returns the singleton instance of the class.
	 *
	 * @return self Singleton instance of the class.
	 */
	public static function init(): self
	{
		if (self::$instance === null) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Enqueue scripts
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts()
	{
		Vite\enqueue_asset(
			SWIFT_PWA_PLUGIN_PATH . 'build',
			'src/main.ts',
			[
				'handle' => 'swift-pwa-admin-js',
				'in-footer' => true,
			]
		);

		wp_localize_script(
			'swift-pwa-admin-js',
			'swiftPwaSettings',
			[
				'apiUrl' => rest_url(SWIFT_PWA_PLUGIN_REST_API_BASE),
				'nonce' => wp_create_nonce('wp_rest'),
				'version' => SWIFT_PWA_PLUGIN_VER,
			]
		);
	}
}

// Initialize singleton instance.
Enqueue::init();