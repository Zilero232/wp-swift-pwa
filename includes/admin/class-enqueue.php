<?php
/**
 * Brands filter.
 *
 * @since 1.0.0
 */

namespace WP_Swift_PWA\Enqueue;

use Kucrut\Vite;

class Enqueue {
    public function __construct() {
        add_action(
            'admin_enqueue_scripts',
            array(
                $this,
                'admin_enqueue_scripts',
            )
        );
    }

    public function admin_enqueue_scripts() {
        Vite\enqueue_asset(
            WSP_DIR . '/build',
            'src/main.tsx',
            [
                'handle' => 'my-script-handle',
                'dependencies' => [ 'react', 'react-dom' ],
                'in-footer' => true,
            ]
        );
    }
}

new Enqueue();
