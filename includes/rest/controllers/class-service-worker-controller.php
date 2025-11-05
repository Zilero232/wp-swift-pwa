<?php
/**
 * Service Worker REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest\ServiceWorker;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;

use SwiftPWA\Rest\RestController;
use SwiftPWA\FileHandler\File_Handler;
use SwiftPWA\PWAConstants\Plugin_PWA_Constants;
use SwiftPWA\ServiceWorker\Service_Worker_Generator;

defined('ABSPATH') || exit;

class ServiceWorkerController extends RestController
{
	/**
	 * Resource name.
	 */
	protected $rest_base = 'service-worker';

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

		add_action('rest_api_init', $callback('register_routes'));
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
	 * Register routes.
	 */
	public function register_routes()
	{
		// Get service worker settings
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				'methods' => WP_REST_Server::READABLE,
				'callback' => [$this, 'get_service_worker'],
				'permission_callback' => [$this, 'check_permission'],
				'args' => array()
			]
		);

		// Update service worker settings
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				'methods' => WP_REST_Server::EDITABLE,
				'callback' => [$this, 'update_service_worker'],
				'permission_callback' => [$this, 'check_permission'],
				'args' => array()
			]
		);

		// Get service worker code
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/code',
			[
				'methods' => WP_REST_Server::READABLE,
				'callback' => [$this, 'get_service_worker_code'],
				'permission_callback' => [$this, 'check_permission'],
				'args' => array()
			]
		);
	}

	/**
	 * Get service worker settings.
	 */
	public function get_service_worker(WP_REST_Request $request): WP_REST_Response
	{
		$sw_content = File_Handler::get_file_content(Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME);

		// If file doesn't exist or error, return default
		if (is_wp_error($sw_content) || empty($sw_content)) {
			$default_config = include SWIFT_PWA_PLUGIN_PATH . 'includes/config/service-worker-default.php';
			return $this->success_response($default_config);
		}

		// Try to extract config from service worker file
		$config = $this->extract_config_from_sw($sw_content);

		return $this->success_response($config);
	}

	/**
	 * Update service worker settings.
	 */
	public function update_service_worker(WP_REST_Request $request): WP_REST_Response
	{
		$data = $request->get_json_params();

		// Validate data
		if (empty($data) || !is_array($data)) {
			return $this->error_response('Invalid service worker data', 400);
		}

		// Generate service worker code from config
		$sw_code = $this->generate_service_worker_code($data);

		// Update file
		$file_exists = File_Handler::file_exists(Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME);

		if ($file_exists) {
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

		if (is_wp_error($result)) {
			return $this->error_response(
				$result->get_error_message(),
				500
			);
		}

		return $this->success_response($data, 'Service Worker updated successfully');
	}

	/**
	 * Get service worker code.
	 */
	public function get_service_worker_code(WP_REST_Request $request): WP_REST_Response
	{
		$sw_content = File_Handler::get_file_content(Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME);

		if (is_wp_error($sw_content) || empty($sw_content)) {
			$default_config = include SWIFT_PWA_PLUGIN_PATH . 'includes/config/service-worker-default.php';
			$sw_content = $this->generate_service_worker_code($default_config);
		}

		return $this->success_response(['code' => $sw_content]);
	}

	/**
	 * Extract config from service worker code.
	 */
	private function extract_config_from_sw(string $sw_code): array
	{
		// Try to extract config object from SW code
		// This is a simple extraction - you might want to improve it
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
	 * Generate service worker code from config.
	 */
	private function generate_service_worker_code(array $config): string|WP_Error
	{
		return Service_Worker_Generator::generate($config);
	}
}

// Initialize singleton instance.
ServiceWorkerController::init();