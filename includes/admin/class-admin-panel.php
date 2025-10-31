<?php
/**
 * Admin Menu Handler class.
 * 
 * @package SwiftPWA
 */

namespace SwiftPWA\AdminMenu;

class Admin_Panel
{
	/**
	 * Submenu items
	 *
	 * @var array
	 */
	private $submenus = [];

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

		add_action('admin_menu', $callback('admin_menu'));
		add_action('admin_init', $callback('register_settings'));

		$this->submenus = require_once SWIFT_PWA_PLUGIN_PATH . 'includes/config/menu-settings.php';
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
	 * Register menu pages.
	 *
	 * @return void
	 */
	public function admin_menu()
	{
		add_menu_page(
			__('Swift PWA', SWIFT_PWA_SLUG),
			__('Swift PWA', SWIFT_PWA_SLUG),
			'manage_options',
			SWIFT_PWA_SLUG . '-settings',
			array($this, 'settings_page_output'),
			'dashicons-performance',
			100
		);

		// Loop through the submenus array to create each submenu
		foreach ($this->submenus as $submenu) {
			add_submenu_page(
				SWIFT_PWA_SLUG . '-settings',
				$submenu['page_title'],
				$submenu['page_title'],
				'manage_options',
				SWIFT_PWA_SLUG . '-settings' . '#' . $submenu['menu_slug'],
				array($this, 'settings_page_output')
			);
		}
	}

	/**
	 * Register plugin settings.
	 *
	 * @return void
	 */
	public function register_settings()
	{
		register_setting(
			SWIFT_PWA_SLUG . '-' . 'settings',
			SWIFT_PWA_SLUG . '-' . 'settings',
			[
				'default' => [],
				'show_in_rest' => false,
			]
		);
	}

	/**
	 * Plugin settings page callback.
	 *
	 * @return void
	 */
	public function settings_page_output()
	{
		?>
		<div id="swift-pwa-settings-app"></div>
		<?php
	}
}

// Initialize singleton instance.
Admin_Panel::init();