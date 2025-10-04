<?php
/**
 * Plugin Name: [Zilero] Swift PWA
 * Plugin URI: https://github.com/Zilero232/wp-swift-pwa
 * Description: Generates the `manifest.json` file, which is used for managing and storing the data related to Swift PWA configurations. It integrates with various data sources and provides an efficient way to manage and update Swift PWA-specific content and settings.
 * Version: 1.0.0
 * Author: zilero
 * Author URI: https://github.com/Zilero232
 *
 * @package Zilero\SwiftPWA
 */

if (!defined('ABSPATH')) {
	exit;
}

// Defined global variables.
const SWIFT_PWA_PLUGIN_VER = '1.0.0';
const SWIFT_PWA_SLUG = 'swift_pwa';
const SWIFT_PWA_PLUGIN_REST_API_BASE = SWIFT_PWA_SLUG . '_api/v2';
const SWIFT_PWA_SLUG_SETTINGS = SWIFT_PWA_SLUG . '_settings';

// Defined global constants.
define('SWIFT_PWA_PLUGIN_FILE', __FILE__);
define('SWIFT_PWA_PLUGIN_URL', plugin_dir_url(SWIFT_PWA_PLUGIN_FILE));
define('SWIFT_PWA_PLUGIN_PATH', plugin_dir_path(SWIFT_PWA_PLUGIN_FILE));

// Require composer autoload.
require_once SWIFT_PWA_PLUGIN_PATH . 'vendor/autoload.php';

// Require files.
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/wp-swift-pwa.php';
