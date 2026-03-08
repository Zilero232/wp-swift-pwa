<?php
/**
 * Service Worker REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest\ServiceWorker;

use WP_Error;
use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;

use SwiftPWA\Rest\RestController;
use SwiftPWA\FileHandler\File_Handler;
use SwiftPWA\PWAConstants\Plugin_PWA_Constants;
use SwiftPWA\ServiceWorker\Service_Worker_Generator;

defined( 'ABSPATH' ) || exit;

class ServiceWorkerController extends RestController {

	/**
	 * Resource name.
	 */
	protected $rest_base = 'service-worker';

	/**
	 * Option name for storing SW config.
	 */
	const CONFIG_OPTION_NAME = 'swift_pwa_service_worker_config';

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

		add_action( 'rest_api_init', $callback( 'register_routes' ) );
	}

	/**
	 * Returns the singleton instance of the class.
	 *
	 * @return self Singleton instance of the class.
	 */
	public static function init(): self {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Register routes.
	 */
	public function register_routes() {
		// Get service worker settings.
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_service_worker' ],
				'permission_callback' => [ $this, 'check_permission' ],
				'args'                => array(),
			]
		);

		// Update service worker settings.
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => [ $this, 'update_service_worker' ],
				'permission_callback' => [ $this, 'check_permission' ],
				'args'                => array(),
			]
		);

		// Get service worker code.
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/code',
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_service_worker_code' ],
				'permission_callback' => [ $this, 'check_permission' ],
				'args'                => [
					'config' => array(),
				],
			]
		);
	}

	/**
	 * Get service worker settings.
	 * 
	 * @param WP_REST_Request $request Request object.
	 * 
	 * @return WP_REST_Response Response object.
	 */
	public function get_service_worker( $request ) {
		$config = $this->get_config();
		
		return $this->success_response( $config );
	}

	/**
	 * Update service worker settings.
	 * 
	 * @param WP_REST_Request $request Request object.
	 * 
	 * @return WP_REST_Response Response object.
	 */
	public function update_service_worker( $request ) {
		$data = $request->get_json_params();

		// Validate data.
		if ( empty( $data ) || ! is_array( $data ) ) {
			return $this->error_response( 'Invalid service worker data', 400 );
		}

		// Merge with defaults to ensure all required fields exist.
		$config = array_merge( $this->get_default_config(), $data );

		// Save config to database first.
		$saved = $this->save_config( $config );
		
		if ( is_wp_error( $saved ) ) {
			return $this->error_response(
				$saved->get_error_message(),
				500
			);
		}

		// Generate service worker code from config.
		$sw_code = Service_Worker_Generator::generate( $config );

		if ( is_wp_error( $sw_code ) ) {
			return $this->error_response(
				$sw_code->get_error_message(),
				500
			);
		}

		// Update/create JS file.
		$file_exists = File_Handler::file_exists( Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME );

		if ( $file_exists ) {
			$result = File_Handler::update_file(
				Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME,
				$sw_code
			);
		} else {
			$result = File_Handler::create_file(
				Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME,
				$sw_code
			);
		}

		if ( is_wp_error( $result ) ) {
			return $this->error_response(
				$result->get_error_message(),
				500
			);
		}

		return $this->success_response( $config, 'Service Worker updated successfully' );
	}

	/**
	 * Get service worker code.
	 * 
	 * @param array $config Configuration array.
	 * 
	 * @return WP_REST_Response Response object.
	 */
	public function get_service_worker_code( $config ) {
		$sw_code = Service_Worker_Generator::generate( $config );

		if ( is_wp_error( $sw_code ) ) {
			return $this->error_response(
				$sw_code->get_error_message(),
				500
			);
		}

		return $this->success_response( [ 'code' => $sw_code ] );
	}

	/**
	 * Get config from database or return default.
	 * 
	 * @return array Configuration array.
	 */
	private function get_config(): array {
		$config = get_option( self::CONFIG_OPTION_NAME );

		// If no saved config, return defaults.
		if ( empty( $config ) || ! is_array( $config ) ) {
			$config = $this->get_default_config();
		}

		return $config;
	}

	/**
	 * Save config to database.
	 * 
	 * @param array $config Configuration array.
	 * 
	 * @return bool|WP_Error True on success, WP_Error on failure.
	 */
	private function save_config( array $config ) {
		$updated = update_option( self::CONFIG_OPTION_NAME, $config, false );

		if ( ! $updated && get_option( self::CONFIG_OPTION_NAME ) !== $config ) {
			return new WP_Error(
				'config_save_failed',
				'Failed to save service worker configuration'
			);
		}

		return true;
	}

	/**
	 * Get default config.
	 * 
	 * @return array Default configuration.
	 */
	private function get_default_config(): array {
		return include SWIFT_PWA_PLUGIN_PATH . 'includes/config/service-worker-default.php';
	}
}

// Initialize singleton instance.
ServiceWorkerController::init();