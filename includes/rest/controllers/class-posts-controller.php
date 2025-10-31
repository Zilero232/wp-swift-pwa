<?php
/**
 * Posts REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest\Posts;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;

use SwiftPWA\Rest\RestController;

defined('ABSPATH') || exit;

class PostsController extends RestController
{

    /**
     * Resource name.
     */
    protected $rest_base = 'posts';

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
        // Get posts
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'get_posts'],
                'permission_callback' => [$this, 'check_permission'],
                'args' => [
                    'page' => [
                        'default' => 1,
                        'type' => 'integer',
                        'sanitize_callback' => 'absint',
                    ],
                    'per_page' => [
                        'default' => 10,
                        'type' => 'integer',
                        'sanitize_callback' => 'absint',
                    ],
                    'search' => [
                        'default' => '',
                        'type' => 'string',
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                    'post_type' => [
                        'default' => 'post,page',
                        'type' => 'string',
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                ]
            ]
        );
    }

    /**
     * Get posts.
     */
    public function get_posts(WP_REST_Request $request): WP_REST_Response
    {
        $page = $request->get_param('page');
        $per_page = $request->get_param('per_page');
        $search = $request->get_param('search');
        $post_type = $request->get_param('post_type');

        // Convert post_type string to array
        $post_types = array_map('trim', explode(',', $post_type));

        $args = [
            'post_type' => $post_types,
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'paged' => $page,
            'orderby' => 'date',
            'order' => 'DESC',
        ];

        // Add search if provided
        if (!empty($search)) {
            $args['s'] = $search;
        }

        $query = new \WP_Query($args);

        $posts = [];
        if ($query->have_posts()) {
            foreach ($query->posts as $post) {
                $posts[] = [
                    'id' => $post->ID,
                    'title' => get_the_title($post->ID),
                    'link' => get_permalink($post->ID),
                    'type' => $post->post_type,
                    'status' => $post->post_status,
                ];
            }
        }

        $response = [
            'posts' => $posts,
            'total' => $query->found_posts,
            'pages' => $query->max_num_pages,
            'has_more' => $page < $query->max_num_pages,
        ];

        wp_reset_postdata();

        return $this->success_response($response);
    }
}

// Initialize singleton instance.
PostsController::init();