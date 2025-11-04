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
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/core/class-pwa-constants.php';
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/core/class-file-handler.php';
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/core/class-manifest-handler.php';

// Require REST base class.
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/rest/class-rest-controller.php';

// Require REST controllers.
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/rest/controllers/class-media-controller.php';
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/rest/controllers/class-posts-controller.php';
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/rest/controllers/class-manifest-controller.php';
require_once SWIFT_PWA_PLUGIN_PATH . 'includes/rest/controllers/class-status-controller.php';