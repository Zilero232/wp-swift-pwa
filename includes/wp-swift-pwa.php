<?php
/**
 * WP Swift PWA.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA;

defined('ABSPATH') || exit;

// Require files.
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/admin/class-plugin.php';
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/admin/class-admin-panel.php';
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/admin/class-enqueue.php';

// Require REST controllers.
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/rest/class-rest-controller.php';
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/rest/controllers/class-manifest-controller.php';