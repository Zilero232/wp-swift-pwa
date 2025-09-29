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
const SWIFT_PWA_SLUG = 'swift-pwa';
const SWIFT_PWA_PLUGIN_REST_API_BASE = SWIFT_PWA_SLUG . '-api/v1';

// Defined global constants.
define('SWIFT_PWA_PLUGIN_URL', plugin_dir_url(__FILE__));
define('SWIFT_PWA_PLUGIN_PATH', plugin_dir_path(__FILE__));


// Require files.
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/wp-swift-pwa.php';

// // Require composer autoload.
require_once SWIFT_PWA_PLUGIN_PATH . 'vendor/autoload.php';