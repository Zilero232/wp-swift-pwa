<?php
/**
 * Plugin Class
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Plugin;

defined( 'ABSPATH' ) || exit;

use SwiftPWA\FileHandler\File_Handler;
use SwiftPWA\PWAConstants\Plugin_PWA_Constants;
use SwiftPWA\ServiceWorker\Service_Worker_Generator;

class Plugin {

	/**
	 * Singleton instance
	 *
	 * @var self
	 */
	private static $instance;

	/**
	 * Constructor
	 */
	private function __construct() {
		$callback = function ( $method_name ) {
			return array( $this, $method_name );
		};

		register_activation_hook( SWIFT_PWA_PLUGIN_FILE, $callback( 'activation_callback' ) );
		register_deactivation_hook( SWIFT_PWA_PLUGIN_FILE, $callback( 'deactivation_callback' ) );
		register_uninstall_hook( SWIFT_PWA_PLUGIN_FILE, [ self::class, 'uninstall_callback' ] );
	}

	/**
	 * Returns the singleton instance of the class.
	 *
	 * @return self
	 */
	public static function init(): self {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Plugin activation callback.
	 *
	 * @return void
	 */
	public static function activation_callback(): void {
		// Create default manifest.json if it doesn't exist.
		if ( ! File_Handler::file_exists( Plugin_PWA_Constants::FILE_MANIFEST_NAME ) ) {
			$default_manifest = include SWIFT_PWA_PLUGIN_PATH . 'includes/config/manifest-default.php';

			File_Handler::create_file(
				Plugin_PWA_Constants::FILE_MANIFEST_NAME,
				wp_json_encode( $default_manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE )
			);
		}

		// Create default service-worker.js if it doesn't exist.
		if ( ! File_Handler::file_exists( Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME ) ) {
			$default_config = include SWIFT_PWA_PLUGIN_PATH . 'includes/config/service-worker-default.php';

			$sw_code = Service_Worker_Generator::generate( $default_config );

			if ( is_wp_error( $sw_code ) ) {
				// Log error but don't fail activation.
				error_log( 'Swift PWA: Failed to generate service worker: ' . $sw_code->get_error_message() );
			} else {
				File_Handler::create_file(
					Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME,
					$sw_code
				);
			}
		}
	}

	/**
	 * Plugin deactivation callback.
	 *
	 * @return void
	 */
	public static function deactivation_callback(): void {
		// Code for plugin deactivation.
	}

	/**
	 * Plugin uninstall callback.
	 *
	 * @return void
	 */
	public static function uninstall_callback(): void {
		// Delete manifest.json file on uninstall.
		if ( File_Handler::file_exists( Plugin_PWA_Constants::FILE_MANIFEST_NAME ) ) {
			File_Handler::delete_file( Plugin_PWA_Constants::FILE_MANIFEST_NAME );
		}

		// Delete service-worker.js file on uninstall.
		if ( File_Handler::file_exists( Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME ) ) {
			File_Handler::delete_file( Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME );
		}
	}
}

// Initialize singleton instance.
Plugin::init();
