<?php
/**
 * Plugin Name: WP Swift PWA
 * Description: A plugin to create a PWA for WordPress.
 * Version: 1.0
 * Author: Artemev Aleksandr
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const WSP_SLUG = 'wp-swift-pwa';
const WSP_NAME = 'WP Swift PWA';
const WSP_VERSION = '1.0.0';

define( 'WSP_DIR', plugin_dir_path( __FILE__ ) );
define( 'WSP_URI', plugin_dir_url( __FILE__ ) );

require_once WSP_DIR . 'includes/wp-swift-pwa.php';

require_once WSP_DIR . '/vendor/autoload.php';
