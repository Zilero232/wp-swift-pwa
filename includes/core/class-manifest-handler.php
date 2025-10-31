<?php
/**
 * Manifest Handler
 *
 * @package SwiftPWA\ManifestHandler
 */

namespace SwiftPWA\ManifestHandler;

defined('ABSPATH') || exit;

class Manifest_Handler
{
	private static $instance;

	private function __construct()
	{
		$callback = function ($method_name) {
			return array($this, $method_name);
		};

		add_action('wp_head', $callback('add_manifest_link'), 1);
	}

	public static function init(): self
	{
		if (self::$instance === null) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Add manifest link to head
	 * Это всё что нужно - браузер сам прочитает manifest.json
	 */
	public function add_manifest_link(): void
	{
		echo '<link rel="manifest" href="' . esc_url(home_url('/manifest.json')) . '">' . "\n";
	}
}

Manifest_Handler::init();