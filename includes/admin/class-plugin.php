<?php
/**
 * Plugin Class
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Core;

defined('ABSPATH') || exit;

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

		register_activation_hook(SWIFT_PWA_PLUGIN_FILE, $callback('activation_callback'));
		register_deactivation_hook(SWIFT_PWA_PLUGIN_FILE, $callback('deactivation_callback'));
		register_uninstall_hook(SWIFT_PWA_PLUGIN_FILE, [self::class, 'uninstall_callback']);
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
		global $wpdb;

		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . SWIFT_PWA_SLUG_SETTINGS;

		$tables = [
			$table_name => "CREATE TABLE IF NOT EXISTS `{$table_name}` (
				id int(11) NOT NULL AUTO_INCREMENT,
				manifest longtext NOT NULL,
				service_worker longtext NOT NULL,
				created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				PRIMARY KEY (id)
			) {$charset_collate};",
		];

		foreach ($tables as $table => $sql) {
			if ($wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table)) !== $table) {
				require_once ABSPATH . 'wp-admin/includes/upgrade.php';

				dbDelta($sql);
			}
		}

		// Check if table has data
		$count = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM `{$table_name}`"));

		if ($count == 0) {
			// Insert default data
			$default_manifest = include SWIFT_PWA_PLUGIN_PATH . 'includes/config/manifest-default.php';

			$wpdb->insert(
				$table_name,
				[
					'manifest' => wp_json_encode($default_manifest),
					'service_worker' => ''
				],
				['%s', '%s']
			);
		}

		error_log('Plugin activated');
	}

	/**
	 * Plugin deactivation callback.
	 *
	 * @return void
	 */
	public static function deactivation_callback(): void
	{
		error_log('Plugin deactivated');

		// Code for plugin deactivation
	}

	/**
	 * Plugin uninstall callback.
	 *
	 * @return void
	 */
	public static function uninstall_callback(): void
	{
		global $wpdb;

		// Drop table
		$table_name = $wpdb->prefix . SWIFT_PWA_SLUG_SETTINGS;

		$wpdb->query($wpdb->prepare("DROP TABLE IF EXISTS %i", $table_name));
	}
}

// Initialize singleton instance.
Plugin::init();