<?php
/**
 * PWA File Handler
 *
 * Handles file operations for PWA plugin files.
 *
 * @package SwiftPWA\FileHandler
 */

namespace SwiftPWA\FileHandler;

defined('ABSPATH') || exit;

use WP_Error;

/**
 * Class File_Handler
 *
 * Manages file operations for LLMS plugin, including reading and writing content to files.
 */
class File_Handler
{
	/**
	 * Instance of this class
	 *
	 * @var File_Handler|null $instance Instance of the Cron_Handler class or null if not instantiated.
	 */
	private static $instance = null;

	/**
	 * Base path for storing files
	 *
	 * @var string
	 */
	private static $base_path = ABSPATH;

	/**
	 * Returns the singleton instance of the class.
	 *
	 * @return self Singleton instance of the class.
	 */
	public static function init(): self
	{
		if (null === self::$instance) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Get file content.
	 *
	 * Reads and returns content from the specified file type.
	 *
	 * @param string $file_type Type of file to read.
	 *
	 * @return string|WP_Error File content or WP_Error on failure.
	 */
	public static function get_file_content($file_type): string|WP_Error
	{
		// Include filesystem and make sure that it's properly set up.
		global $wp_filesystem;

		if (!$wp_filesystem) {
			require_once self::$base_path . 'wp-admin/includes/file.php';

			WP_Filesystem();
		}

		$file_path = self::get_file_path($file_type);

		if (empty($file_path)) {
			return new WP_Error(
				'invalid_file_type',
				sprintf('Invalid file type: %s', $file_type)
			);
		}

		if (!$wp_filesystem->exists($file_path)) {
			return '';
		}

		$content = $wp_filesystem->get_contents($file_path);

		if (!is_string($content)) {
			return new WP_Error(
				'file_read_failed',
				sprintf('Failed to read file: %s', $file_path)
			);
		}

		return $content;
	}

	/**
	 * Update file content.
	 *
	 * Writes new content to the specified file type.
	 *
	 * @param string $file_type Type of file to update.
	 * @param string $content   Content to write to file.
	 *
	 * @return bool|WP_Error True on success, WP_Error on failure.
	 */
	public static function update_file($file_type, $content): bool|WP_Error
	{
		// Include filesystem and make sure that it's properly set up.
		global $wp_filesystem;

		if (!$wp_filesystem) {
			require_once self::$base_path . 'wp-admin/includes/file.php';

			WP_Filesystem();
		}

		$file_path = self::get_file_path($file_type);

		if (empty($file_path)) {
			return new WP_Error(
				'invalid_file_type',
				sprintf('Invalid file type: %s', $file_type)
			);
		}

		$result = $wp_filesystem->put_contents($file_path, $content);

		if (!$result) {
			return new WP_Error(
				'file_update_failed',
				sprintf('Failed to update file: %s', $file_path)
			);
		}

		return true;
	}

	/**
	 * Delete file.
	 *
	 * Deletes the specified file type.
	 *
	 * @param string $file_type Type of file to delete.
	 *
	 * @return bool|WP_Error True on success, WP_Error on failure.
	 */
	public static function delete_file($file_type): bool|WP_Error
	{
		global $wp_filesystem;

		if (!$wp_filesystem) {
			require_once ABSPATH . 'wp-admin/includes/file.php';

			WP_Filesystem();
		}

		$file_path = self::get_file_path($file_type);

		if (empty($file_path)) {
			return new WP_Error(
				'invalid_file_type',
				sprintf('Invalid file type: %s', $file_type)
			);
		}

		if (!$wp_filesystem->exists($file_path)) {
			return new WP_Error(
				'file_not_found',
				sprintf('File does not exist: %s', $file_path)
			);
		}

		$result = $wp_filesystem->delete($file_path);

		if (!$result) {
			return new WP_Error(
				'file_delete_failed',
				sprintf('Failed to delete file: %s', $file_path)
			);
		}

		return true;
	}

	/**
	 * Get full file path by type.
	 *
	 * @param string $file_type Type of file.
	 *
	 * @return string Full file path.
	 */
	public static function get_file_path($file_type): string
	{
		return self::$base_path . $file_type;
	}
}

// Initialize singleton instance.
File_Handler::init();