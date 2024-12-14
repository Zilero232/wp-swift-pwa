<?php
/**
 * Admin Menu Handler
 *
 * @since 1.0.0
 */

namespace WP_Swift_PWA\AdminMenu;

class Admin_Menu {
    /**
     * Submenu items
     *
     * @var array
     */
    private $submenus;

    /**
     * Constructor
     */
    public function __construct() {
        $this->submenus = require_once WSP_DIR . '/includes/config/menu-settings.php';

        add_action('admin_menu', array($this, 'admin_menu'));
    }

    /**
     * Register menu pages.
     *
     * @return void
     */
    public function admin_menu() {
        add_menu_page(
            __('Swift PWA', 'wsp'),
            __('Swift PWA', 'wsp'),
            'manage_options',
            WSP_SLUG,
            array($this, 'admin_display_root'),
            'dashicons-performance',
            6
        );

        // Loop through the submenus array to create each submenu
        foreach ($this->submenus as $submenu) {
            add_submenu_page(
                WSP_SLUG,
                $submenu['page_title'],
                $submenu['page_title'],
                'manage_options',
                WSP_SLUG . '-' . $submenu['menu_slug'],
                array($this, 'admin_display_root'),
            );
        }

        // Remove 'Perfecto Settings' from the submenus, but keep it as a main menu item
        remove_submenu_page(WSP_SLUG, WSP_SLUG);
    }

    /**
     * Display root element for React application
     *
     * @return void
     */
    public function admin_display_root() {
        echo '<div id="wp-swift-pwa-root"></div>';
    }
}

// Initialize the admin menu
new Admin_Menu();
