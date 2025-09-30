<?php
/**
 * Preview REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest\Controllers;

use SwiftPWA\Rest\RestController;

defined('ABSPATH') || exit;

class PreviewController extends RestController
{

	protected string $rest_base = 'preview';

	public function register_routes()
	{
		register_rest_route($this->namespace, '/' . $this->rest_base . '/manifest', [
			'methods' => \WP_REST_Server::READABLE,
			'callback' => [$this, 'get_manifest_preview'],
			'permission_callback' => [$this, 'check_permission'],
		]);

		register_rest_route($this->namespace, '/' . $this->rest_base . '/compatibility', [
			'methods' => \WP_REST_Server::READABLE,
			'callback' => [$this, 'get_browser_compatibility'],
			'permission_callback' => [$this, 'check_permission'],
		]);
	}

	public function get_manifest_preview(\WP_REST_Request $request): \WP_REST_Response
	{
		$manifest = get_option('swift_pwa_manifest', []);

		// Format for preview
		$preview_manifest = array_filter($manifest, function ($value) {
			return !empty($value) || $value === false;
		});

		return $this->success_response([
			'manifest' => $preview_manifest,
			'json' => json_encode($preview_manifest, JSON_PRETTY_PRINT),
			'size' => strlen(json_encode($preview_manifest))
		]);
	}

	public function get_browser_compatibility(\WP_REST_Request $request): \WP_REST_Response
	{
		return $this->success_response([
			'chrome' => ['supported' => true, 'version' => '57+'],
			'firefox' => ['supported' => true, 'version' => '58+'],
			'safari' => ['supported' => true, 'version' => '11.1+'],
			'edge' => ['supported' => true, 'version' => '17+'],
		]);
	}
}

