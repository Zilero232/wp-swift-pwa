<?php
/**
 * Service Worker REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest\Controllers;

use SwiftPWA\Rest\RestController;

defined('ABSPATH') || exit;

class ServiceWorkerController extends RestController
{

	protected string $rest_base = 'service-worker';

	public function register_routes()
	{
		register_rest_route($this->namespace, '/' . $this->rest_base, [
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [$this, 'get_settings'],
				'permission_callback' => [$this, 'check_permission'],
			],
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'update_settings'],
				'permission_callback' => [$this, 'check_permission'],
			],
		]);

		register_rest_route($this->namespace, '/' . $this->rest_base . '/generate', [
			'methods' => \WP_REST_Server::CREATABLE,
			'callback' => [$this, 'generate_service_worker'],
			'permission_callback' => [$this, 'check_permission'],
		]);
	}

	public function get_settings(\WP_REST_Request $request): \WP_REST_Response
	{
		$settings = get_option('swift_pwa_service_worker', $this->get_default_settings());
		return $this->success_response($settings);
	}

	public function update_settings(\WP_REST_Request $request): \WP_REST_Response
	{
		$data = $request->get_json_params();
		$settings = $this->sanitize_settings_data($data);
		update_option('swift_pwa_service_worker', $settings);

		return $this->success_response($settings, 'Service Worker settings updated');
	}

	public function generate_service_worker(\WP_REST_Request $request): \WP_REST_Response
	{
		$settings = get_option('swift_pwa_service_worker', $this->get_default_settings());
		$sw_content = $this->generate_sw_content($settings);

		$upload_dir = wp_upload_dir();
		$pwa_dir = $upload_dir['basedir'] . '/swift-pwa';

		if (!file_exists($pwa_dir)) {
			wp_mkdir_p($pwa_dir);
		}

		$sw_file = $pwa_dir . '/sw.js';
		$result = file_put_contents($sw_file, $sw_content);

		if ($result === false) {
			return $this->error_response('Failed to generate service worker file');
		}

		return $this->success_response([
			'file_url' => $upload_dir['baseurl'] . '/swift-pwa/sw.js',
			'file_size' => filesize($sw_file)
		], 'Service Worker generated successfully');
	}

	private function get_default_settings(): array
	{
		return [
			'enabled' => true,
			'cache_strategy' => 'cache_first',
			'cache_version' => '1.0.0',
			'cache_resources' => [
				'pages' => true,
				'images' => true,
				'scripts' => true,
				'styles' => true,
			],
			'exclude_patterns' => ['/wp-admin/', '/wp-login.php'],
			'network_timeout' => 5000,
		];
	}

	private function sanitize_settings_data(array $data): array
	{
		return [
			'enabled' => (bool) ($data['enabled'] ?? true),
			'cache_strategy' => sanitize_text_field($data['cache_strategy'] ?? 'cache_first'),
			'cache_version' => sanitize_text_field($data['cache_version'] ?? '1.0.0'),
			'cache_resources' => [
				'pages' => (bool) ($data['cache_resources']['pages'] ?? true),
				'images' => (bool) ($data['cache_resources']['images'] ?? true),
				'scripts' => (bool) ($data['cache_resources']['scripts'] ?? true),
				'styles' => (bool) ($data['cache_resources']['styles'] ?? true),
			],
			'exclude_patterns' => array_map('sanitize_text_field', $data['exclude_patterns'] ?? []),
			'network_timeout' => absint($data['network_timeout'] ?? 5000),
		];
	}

	private function generate_sw_content(array $settings): string
	{
		$cache_name = "swift-pwa-v{$settings['cache_version']}";

		return "
		// Swift PWA Service Worker
		const CACHE_NAME = '{$cache_name}';
		const NETWORK_TIMEOUT = {$settings['network_timeout']};

		self.addEventListener('install', (event) => {
			event.waitUntil(
				caches.open(CACHE_NAME).then((cache) => {
					return cache.addAll(['/']);
				})
			);
		});

		self.addEventListener('fetch', (event) => {
			event.respondWith(
				caches.match(event.request).then((response) => {
					return response || fetch(event.request);
				})
			);
		});
		";
	}
}
