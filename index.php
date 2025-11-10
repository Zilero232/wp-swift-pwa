<?php
/**
 * Plugin Name: Swift PWA
 * Plugin URI: https://github.com/Zilero232/wp-swift-pwa
 * Description: Transforms your WordPress site into a Progressive Web App with manifest.json and service worker
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Tested up to: 6.7
 * Author: zilero
 * Author URI: https://github.com/Zilero232
 * License: GPL v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: swift-pwa
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Defined global variables.
const SWIFT_PWA_PLUGIN_VER           = '1.0.0';
const SWIFT_PWA_SLUG                 = 'swift_pwa';
const SWIFT_PWA_PLUGIN_REST_API_BASE = SWIFT_PWA_SLUG . '_api/v2';
const SWIFT_PWA_SLUG_SETTINGS        = SWIFT_PWA_SLUG . '_settings';

// Defined global constants.
define( 'SWIFT_PWA_PLUGIN_FILE', __FILE__ );
define( 'SWIFT_PWA_PLUGIN_URL', plugin_dir_url( SWIFT_PWA_PLUGIN_FILE ) );
define( 'SWIFT_PWA_PLUGIN_PATH', plugin_dir_path( SWIFT_PWA_PLUGIN_FILE ) );

// Require composer autoload.
require_once SWIFT_PWA_PLUGIN_PATH . 'vendor/autoload.php';

// Require files.
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/wp-swift-pwa.php';
