<?php
/**
 * Base REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest;

use WP_REST_Response;

defined( 'ABSPATH' ) || exit;

abstract class RestController {

	/**
	 * Plugin namespace.
	 */
	protected $namespace = SWIFT_PWA_PLUGIN_REST_API_BASE;

	/**
	 * Check if user has permission.
	 */
	public function check_permission(): bool {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Register routes.
	 */
	abstract public function register_routes();

	/**
	 * Format success response.
	 *
	 * @param mixed  $data Data to return.
	 * @param string $message Message to return.
	 *
	 * @return WP_REST_Response Response object.
	 */
	protected function success_response( $data = null, $message = '' ) {
		$response = [
			'success' => true,
			'data'    => $data,
		];

		if ( ! empty( $message ) ) {
			$response['message'] = $message;
		}

		return new WP_REST_Response(
			$response,
			200
		);
	}

	/**
	 * Format error response.
	 *
	 * @param string $message Error message.
	 * @param int    $status HTTP status code.
	 *
	 * @return WP_REST_Response Response object.
	 */
	protected function error_response( $message, $status = 400 ) {
		return new WP_REST_Response(
			[
				'success' => false,
				'message' => $message,
			],
			$status
		);
	}
}
