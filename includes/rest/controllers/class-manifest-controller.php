<?php
/**
 * Manifest REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest\Controllers;

use SwiftPWA\Rest\RestController;

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
        register_rest_route($this->namespace, '/' . $this->rest_base, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_manifest'],
            'permission_callback' => [$this, 'check_permission'],
        ]);
    }

    /**
     * Get manifest settings.
     */
    public function get_manifest(\WP_REST_Request $request): \WP_REST_Response
    {
        $manifest = get_option('swift_pwa_manifest', $this->get_default_manifest());

        return $this->success_response($manifest);
    }

    /**
     * Update manifest settings.
     */
    public function update_manifest(\WP_REST_Request $request): \WP_REST_Response
    {
        $data = $request->get_json_params();

        // Validate required fields
        $required_fields = ['name', 'short_name'];
        $errors = $this->validate_required_fields($data, $required_fields);

        if (!empty($errors)) {
            return $this->error_response('Validation failed: ' . implode(', ', $errors));
        }

        // Sanitize data
        $manifest = $this->sanitize_manifest_data($data);

        // Update option
        update_option('swift_pwa_manifest', $manifest);

        return $this->success_response($manifest, 'Manifest settings updated successfully');
    }

    /**
     * Generate manifest.json file.
     */
    public function generate_manifest_file(\WP_REST_Request $request): \WP_REST_Response
    {
        $manifest = get_option('swift_pwa_manifest', $this->get_default_manifest());

        // Prepare manifest for file generation
        $file_manifest = $this->prepare_manifest_for_file($manifest);

        // Generate file
        $upload_dir = wp_upload_dir();
        $pwa_dir = $upload_dir['basedir'] . '/swift-pwa';

        if (!file_exists($pwa_dir)) {
            wp_mkdir_p($pwa_dir);
        }

        $manifest_file = $pwa_dir . '/manifest.json';
        $result = file_put_contents($manifest_file, json_encode($file_manifest, JSON_PRETTY_PRINT));

        if ($result === false) {
            return $this->error_response('Failed to generate manifest file');
        }

        $manifest_url = $upload_dir['baseurl'] . '/swift-pwa/manifest.json';

        return $this->success_response([
            'file_path' => $manifest_file,
            'file_url' => $manifest_url,
            'file_size' => filesize($manifest_file)
        ], 'Manifest file generated successfully');
    }

    /**
     * Validate manifest data.
     */
    public function validate_manifest(\WP_REST_Request $request): \WP_REST_Response
    {
        $data = $request->get_json_params();

        $validation_result = $this->validate_manifest_data($data);

        return $this->success_response($validation_result);
    }

    /**
     * Upload icon.
     */
    public function upload_icon(\WP_REST_Request $request): \WP_REST_Response
    {
        $files = $request->get_file_params();

        if (empty($files['icon'])) {
            return $this->error_response('No icon file provided');
        }

        $file = $files['icon'];

        // Validate file type
        $allowed_types = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
        if (!in_array($file['type'], $allowed_types)) {
            return $this->error_response('Invalid file type. Only PNG, JPEG, WebP, and SVG are allowed');
        }

        // Handle upload
        $upload = wp_handle_upload($file, ['test_form' => false]);

        if (isset($upload['error'])) {
            return $this->error_response($upload['error']);
        }

        return $this->success_response([
            'url' => $upload['url'],
            'file' => $upload['file'],
            'type' => $upload['type']
        ], 'Icon uploaded successfully');
    }

    /**
     * Get default manifest data.
     */
    private function get_default_manifest(): array
    {
        return [
            'name' => get_bloginfo('name'),
            'short_name' => get_bloginfo('name'),
            'description' => get_bloginfo('description'),
            'start_url' => '/',
            'display' => 'standalone',
            'orientation' => 'portrait',
            'theme_color' => '#000000',
            'background_color' => '#ffffff',
            'scope' => '/',
            'lang' => get_locale(),
            'dir' => 'ltr',
            'categories' => [],
            'icons' => [],
            'screenshots' => [],
            'related_applications' => [],
            'prefer_related_applications' => false
        ];
    }

    /**
     * Sanitize manifest data.
     */
    private function sanitize_manifest_data(array $data): array
    {
        return [
            'name' => sanitize_text_field($data['name'] ?? ''),
            'short_name' => sanitize_text_field($data['short_name'] ?? ''),
            'description' => sanitize_textarea_field($data['description'] ?? ''),
            'start_url' => sanitize_url($data['start_url'] ?? '/'),
            'display' => sanitize_text_field($data['display'] ?? 'standalone'),
            'orientation' => sanitize_text_field($data['orientation'] ?? 'portrait'),
            'theme_color' => sanitize_hex_color($data['theme_color'] ?? '#000000'),
            'background_color' => sanitize_hex_color($data['background_color'] ?? '#ffffff'),
            'scope' => sanitize_url($data['scope'] ?? '/'),
            'lang' => sanitize_text_field($data['lang'] ?? get_locale()),
            'dir' => sanitize_text_field($data['dir'] ?? 'ltr'),
            'categories' => array_map('sanitize_text_field', $data['categories'] ?? []),
            'icons' => $this->sanitize_icons($data['icons'] ?? []),
            'screenshots' => $this->sanitize_screenshots($data['screenshots'] ?? []),
            'related_applications' => $this->sanitize_related_apps($data['related_applications'] ?? []),
            'prefer_related_applications' => (bool) ($data['prefer_related_applications'] ?? false)
        ];
    }

    /**
     * Prepare manifest for file generation.
     */
    private function prepare_manifest_for_file(array $manifest): array
    {
        // Remove empty values and prepare for JSON output
        $file_manifest = array_filter($manifest, function ($value) {
            return !empty($value) || $value === false || $value === 0;
        });

        // Ensure icons have proper structure
        if (!empty($file_manifest['icons'])) {
            $file_manifest['icons'] = array_map(function ($icon) {
                return [
                    'src' => $icon['src'],
                    'sizes' => $icon['sizes'],
                    'type' => $icon['type'],
                    'purpose' => $icon['purpose'] ?? 'any'
                ];
            }, $file_manifest['icons']);
        }

        return $file_manifest;
    }

    /**
     * Validate manifest data.
     */
    private function validate_manifest_data(array $data): array
    {
        $errors = [];
        $warnings = [];

        // Required fields validation
        if (empty($data['name'])) {
            $errors[] = 'App name is required';
        } elseif (strlen($data['name']) > 100) {
            $errors[] = 'App name must not exceed 100 characters';
        }

        if (empty($data['short_name'])) {
            $errors[] = 'Short name is required';
        } elseif (strlen($data['short_name']) > 12) {
            $warnings[] = 'Short name should not exceed 12 characters for optimal display';
        }

        // Icons validation
        if (empty($data['icons'])) {
            $warnings[] = 'At least one icon is recommended';
        } else {
            $required_sizes = ['192x192', '512x512'];
            $available_sizes = array_column($data['icons'], 'sizes');

            foreach ($required_sizes as $size) {
                if (!in_array($size, $available_sizes)) {
                    $warnings[] = sprintf('Icon size %s is recommended', $size);
                }
            }
        }

        return [
            'valid' => empty($errors),
            'errors' => $errors,
            'warnings' => $warnings
        ];
    }

    /**
     * Get manifest schema.
     */
    private function get_manifest_schema(): array
    {
        return [
            'name' => [
                'required' => true,
                'type' => 'string',
                'validate_callback' => function ($param) {
                    return is_string($param) && !empty(trim($param));
                }
            ],
            'short_name' => [
                'required' => true,
                'type' => 'string',
                'validate_callback' => function ($param) {
                    return is_string($param) && !empty(trim($param));
                }
            ]
        ];
    }

    /**
     * Sanitize icons array.
     */
    private function sanitize_icons(array $icons): array
    {
        return array_map(function ($icon) {
            return [
                'src' => sanitize_url($icon['src'] ?? ''),
                'sizes' => sanitize_text_field($icon['sizes'] ?? ''),
                'type' => sanitize_text_field($icon['type'] ?? ''),
                'purpose' => sanitize_text_field($icon['purpose'] ?? 'any')
            ];
        }, $icons);
    }

    /**
     * Sanitize screenshots array.
     */
    private function sanitize_screenshots(array $screenshots): array
    {
        return array_map(function ($screenshot) {
            return [
                'src' => sanitize_url($screenshot['src'] ?? ''),
                'sizes' => sanitize_text_field($screenshot['sizes'] ?? ''),
                'type' => sanitize_text_field($screenshot['type'] ?? ''),
                'form_factor' => sanitize_text_field($screenshot['form_factor'] ?? 'wide')
            ];
        }, $screenshots);
    }

    /**
     * Sanitize related applications array.
     */
    private function sanitize_related_apps(array $apps): array
    {
        return array_map(function ($app) {
            return [
                'platform' => sanitize_text_field($app['platform'] ?? ''),
                'url' => sanitize_url($app['url'] ?? ''),
                'id' => sanitize_text_field($app['id'] ?? '')
            ];
        }, $apps);
    }
}

// Initialize singleton instance.
ManifestController::init();
