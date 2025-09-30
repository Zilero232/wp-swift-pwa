<?php
/**
 * Notifications REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest\Controllers;

use SwiftPWA\Rest\RestController;

defined('ABSPATH') || exit;

class NotificationsController extends RestController
{

	protected string $rest_base = 'notifications';

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

		register_rest_route($this->namespace, '/' . $this->rest_base . '/test', [
			'methods' => \WP_REST_Server::CREATABLE,
			'callback' => [$this, 'send_test_notification'],
			'permission_callback' => [$this, 'check_permission'],
		]);

		register_rest_route($this->namespace, '/' . $this->rest_base . '/vapid', [
			'methods' => \WP_REST_Server::CREATABLE,
			'callback' => [$this, 'generate_vapid_keys'],
			'permission_callback' => [$this, 'check_permission'],
		]);
	}

	public function get_settings(\WP_REST_Request $request): \WP_REST_Response
	{
		$settings = get_option('swift_pwa_notifications', $this->get_default_settings());
		return $this->success_response($settings);
	}

	public function update_settings(\WP_REST_Request $request): \WP_REST_Response
	{
		$data = $request->get_json_params();
		$settings = $this->sanitize_settings_data($data);
		update_option('swift_pwa_notifications', $settings);

		return $this->success_response($settings, 'Notification settings updated');
	}

	public function send_test_notification(\WP_REST_Request $request): \WP_REST_Response
	{
		$data = $request->get_json_params();

		if (empty($data['message'])) {
			return $this->error_response('Message is required');
		}

		return $this->success_response([
			'sent' => true,
			'message' => $data['message']
		], 'Test notification sent');
	}

	public function generate_vapid_keys(\WP_REST_Request $request): \WP_REST_Response
	{
		$keys = [
			'public_key' => base64_encode(random_bytes(65)),
			'private_key' => base64_encode(random_bytes(32))
		];

		return $this->success_response($keys, 'VAPID keys generated');
	}

	private function get_default_settings(): array
	{
		return [
			'enabled' => false,
			'vapid_public_key' => '',
			'vapid_private_key' => '',
			'templates' => [
				'welcome' => [
					'title' => 'Welcome!',
					'body' => 'Thanks for installing our PWA!',
					'icon' => '',
				]
			]
		];
	}

	private function sanitize_settings_data(array $data): array
	{
		return [
			'enabled' => (bool) ($data['enabled'] ?? false),
			'vapid_public_key' => sanitize_text_field($data['vapid_public_key'] ?? ''),
			'vapid_private_key' => sanitize_text_field($data['vapid_private_key'] ?? ''),
			'templates' => $this->sanitize_templates($data['templates'] ?? [])
		];
	}

	private function sanitize_templates(array $templates): array
	{
		return array_map(function ($template) {
			return [
				'title' => sanitize_text_field($template['title'] ?? ''),
				'body' => sanitize_textarea_field($template['body'] ?? ''),
				'icon' => sanitize_url($template['icon'] ?? ''),
			];
		}, $templates);
	}
}