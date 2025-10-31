<?php
/**
 * Media REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest\Media;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

use SwiftPWA\Rest\RestController;

defined('ABSPATH') || exit;

class MediaController extends RestController
{
    protected $rest_base = 'media';
    
    private static $instance;

    private function __construct()
    {
        $callback = function ($method_name) {
            return array($this, $method_name);
        };

        add_action('rest_api_init', $callback('register_routes'));
    }

    public static function init(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function register_routes()
    {
        // Upload file
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/upload',
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'upload_file'],
                'permission_callback' => [$this, 'check_permission'],
            ]
        );

        // Get media library
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/library',
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'get_library'],
                'permission_callback' => [$this, 'check_permission'],
                'args' => [
                    'search' => [
                        'type' => 'string',
                    ],
                    'mime_type' => [
                        'type' => 'string',
                    ],
                    'per_page' => [
                        'type' => 'integer',
                        'default' => 20,
                    ],
                    'paged' => [
                        'type' => 'integer',
                        'default' => 1,
                    ],
                ],
            ]
        );

        // Get attachment info
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/attachment/(?P<id>\d+)',
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'get_attachment'],
                'permission_callback' => [$this, 'check_permission'],
                'args' => [
                    'id' => [
                        'required' => true,
                        'type' => 'integer',
                    ],
                ],
            ]
        );
    }

    public function upload_file(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        $files = $request->get_file_params();

        if (empty($files['file'])) {
            return $this->error_response('No file provided', 400);
        }

        $file = $files['file'];
        
        if (!function_exists('wp_handle_upload')) {
            require_once(ABSPATH . 'wp-admin/includes/file.php');
        }

        $uploaded = wp_handle_upload($file, array('test_form' => false));

        if (isset($uploaded['error'])) {
            return $this->error_response($uploaded['error'], 400);
        }

        $attachment = array(
            'post_mime_type' => $uploaded['type'],
            'post_title' => sanitize_file_name(pathinfo($uploaded['file'], PATHINFO_FILENAME)),
            'post_content' => '',
            'post_status' => 'inherit'
        );

        $attachment_id = wp_insert_attachment($attachment, $uploaded['file']);
        
        if (is_wp_error($attachment_id)) {
            return $attachment_id;
        }

        if (!function_exists('wp_generate_attachment_metadata')) {
            require_once(ABSPATH . 'wp-admin/includes/image.php');
        }

        $attach_data = wp_generate_attachment_metadata($attachment_id, $uploaded['file']);
        wp_update_attachment_metadata($attachment_id, $attach_data);

        return $this->success_response($this->get_formatted_attachment_data($attachment_id));
    }

    /**
     * Get media library items
     */
    public function get_library(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        $items = [];

        $search = $request->get_param('search');
        $mime_type = $request->get_param('mime_type');
        $per_page = $request->get_param('per_page');
        $paged = $request->get_param('paged');

        $args = [
            'post_type' => 'attachment',
            'post_status' => 'inherit',
            'posts_per_page' => $per_page,
            'paged' => $paged,
            'post_mime_type' => ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
        ];

        if (!empty($search)) {
            $args['s'] = $search;
        }

        if (!empty($mime_type)) {
            $args['post_mime_type'] = [$mime_type];
        }

        $query = new \WP_Query($args);

        foreach ($query->posts as $attachment) {
            $items[] = $this->get_formatted_attachment_data($attachment->ID);
        }

        return $this->success_response([
            'items' => $items,
            'total' => $query->found_posts,
            'pages' => $query->max_num_pages,
        ]);
    }

    public function get_attachment(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        $attachment_id = $request->get_param('id');
        $attachment = get_post($attachment_id);

        if (!$attachment || $attachment->post_type !== 'attachment') {
            return $this->error_response('Attachment not found', 404);
        }

        return $this->success_response($this->get_formatted_attachment_data($attachment_id));
    }

    public function get_formatted_attachment_data(int $attachment_id): array {
        $metadata = wp_get_attachment_metadata($attachment_id);
        $attachment_url = wp_get_attachment_url($attachment_id);

        return [
            'id' => $attachment_id,
            'url' => $attachment_url,
            'width' => $metadata['width'] ?? 0,
            'height' => $metadata['height'] ?? 0,
            'title' => get_the_title($attachment_id),
            'mime_type' => get_post_mime_type($attachment_id),
            'alt' => get_post_meta($attachment_id, '_wp_attachment_image_alt', true),
        ];
    }
}

MediaController::init();