<?php
/**
 * Plugin Class
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Core;

class Plugin
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

		register_activation_hook(SWIFT_PWA_PLUGIN_PATH, $callback('activation_callback'));
		register_deactivation_hook(SWIFT_PWA_PLUGIN_PATH, $callback('deactivation_callback'));
		register_uninstall_hook(SWIFT_PWA_PLUGIN_PATH, [self::class, 'uninstall_callback']);
	}

	/**
	 * Returns the singleton instance of the class.
	 *
	 * @return self
	 */
	public static function init(): self
	{
		if (self::$instance === null) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Plugin activation callback.
	 *
	 * @return void
	 */
	public static function activation_callback(): void
	{
		// Code for plugin activation
	}

	/**
	 * Plugin deactivation callback.
	 *
	 * @return void
	 */
	public static function deactivation_callback(): void
	{
		// Code for plugin deactivation
	}

	/**
	 * Plugin uninstall callback.
	 *
	 * @return void
	 */
	public static function uninstall_callback(): void
	{
		// Code for plugin uninstall
	}
}

// Initialize singleton instance.
Plugin::init();