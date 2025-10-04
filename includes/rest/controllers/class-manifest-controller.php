<?php
/**
 * Manifest REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest\Controllers;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;

use SwiftPWA\Rest\RestController;
use SwiftPWA\FileHandler\File_Handler;
use SwiftPWA\PWAConstants\Plugin_PWA_Constants;

defined('ABSPATH') || exit;

class ManifestController extends RestController
{

    /**
     * Resource name.
     */
    protected $rest_base = 'manifest';

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

        add_action('rest_api_init', $callback('register_routes'));
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
     * Register routes.
     */
    public function register_routes()
    {
        // Get manifest settings
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'get_manifest'],
                'permission_callback' => [$this, 'check_permission'],
                'args' => array()
            ]
        );

        // Update manifest settings
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                'methods' => WP_REST_Server::EDITABLE,
                'callback' => [$this, 'update_manifest'],
                'permission_callback' => [$this, 'check_permission'],
                'args' => array(

                )
            ]
        );
    }

    /**
     * Get manifest settings.
     */
    public function get_manifest(WP_REST_Request $request): WP_REST_Response
    {
        global $wpdb;

        $table_name = $wpdb->prefix . SWIFT_PWA_SLUG_SETTINGS;

        $manifest = $wpdb->get_var("SELECT manifest FROM `{$table_name}`");

        if (!$manifest) {
            // If no data in table, return default
            $default_manifest = include SWIFT_PWA_PLUGIN_PATH . 'includes/config/manifest-default.php';

            return $this->success_response($default_manifest);
        }

        $decoded_manifest = json_decode($manifest, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            // If JSON is invalid, return default
            $default_manifest = include SWIFT_PWA_PLUGIN_PATH . 'includes/config/manifest-default.php';

            return $this->success_response($default_manifest);
        }

        return $this->success_response($decoded_manifest);
    }

    /**
     * Update manifest settings.
     */
    public function update_manifest(WP_REST_Request $request): WP_REST_Response
    {
        $data = $request->get_json_params();

        // Update option
        update_option(
            SWIFT_PWA_SLUG_SETTINGS,
            $data
        );

        // Update file
        File_Handler::update_file(
            Plugin_PWA_Constants::FILE_MANIFEST_NAME,
            json_encode($data, JSON_PRETTY_PRINT)
        );

        return $this->success_response($data, 'Manifest settings updated successfully');
    }
}

// Initialize singleton instance.
ManifestController::init();
