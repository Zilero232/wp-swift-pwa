<?php
/**
 * Status REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest\Status;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;

use SwiftPWA\Rest\RestController;
use SwiftPWA\FileHandler\File_Handler;
use SwiftPWA\PWAConstants\Plugin_PWA_Constants;

defined( 'ABSPATH' ) || exit;

class StatusController extends RestController {

	/**
	 * Resource name.
	 */
	protected $rest_base = 'status';

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
		// Get files status.
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_status' ],
				'permission_callback' => [ $this, 'check_permission' ],
				'args'                => array(),
			]
		);
	}

	/**
	 * Get status of PWA files.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function get_status( WP_REST_Request $request ): WP_REST_Response {
		// Check HTTPS status.
		$is_ssl   = is_ssl();
		$site_url = get_site_url();

		$https_status = [
			'enabled'  => $is_ssl,
			'site_url' => $site_url,
			'message'  => $is_ssl
				? 'Ваш сайт использует безопасное HTTPS соединение'
				: 'Progressive Web Apps требуют HTTPS. Обратитесь к хостинг-провайдеру для установки SSL сертификата.',
		];

		$files = [
			[
				'name'        => Plugin_PWA_Constants::FILE_MANIFEST_NAME,
				'description' => 'PWA Manifest file',
			],
			[
				'name'        => Plugin_PWA_Constants::FILE_SERVICE_WORKER_NAME,
				'description' => 'Service Worker file',
			],
		];

		$files_status = array_map(
			function ( $file ) {
				$exists    = File_Handler::file_exists( $file['name'] );
				$file_path = File_Handler::get_file_path( $file['name'] );

				return [
					'name'        => $file['name'],
					'description' => $file['description'],
					'exists'      => $exists,
					'path'        => $file_path,
					'url'         => $exists ? home_url( $file['name'] ) : null,
					'size'        => $exists ? filesize( $file_path ) : null,
					'modified'    => $exists ? filemtime( $file_path ) : null,
				];
			},
			$files
		);

		return $this->success_response(
			[
				'https' => $https_status,
				'files' => $files_status,
			]
		);
	}
}

// Initialize singleton instance.
StatusController::init();
