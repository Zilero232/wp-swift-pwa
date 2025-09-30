<?php
/**
 * Base REST Controller.
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\Rest;

defined('ABSPATH') || exit;

abstract class RestController
{

    /**
     * Plugin namespace.
     */
    protected $namespace = 'swift-pwa/v1';

    /**
     * Check if user has permission.
     */
    public function check_permission(): bool
    {
        return current_user_can('manage_options');
    }

    /**
     * Register routes.
     */
    abstract public function register_routes();

    /**
     * Format success response.
     */
    protected function success_response($data = null, string $message = ''): \WP_REST_Response
    {
        return new \WP_REST_Response([
            'success' => true,
            'data' => $data,
            'message' => $message
        ], 200);
    }

    /**
     * Format error response.
     */
    protected function error_response(string $message, int $status = 400): \WP_REST_Response
    {
        return new \WP_REST_Response([
            'success' => false,
            'message' => $message
        ], $status);
    }

    /**
     * Validate required fields.
     */
    protected function validate_required_fields(array $data, array $required_fields): array
    {
        $errors = [];

        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                $errors[] = sprintf('Field "%s" is required', $field);
            }
        }

        return $errors;
    }
}
