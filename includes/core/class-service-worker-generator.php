<?php
/**
 * Service Worker Generator
 *
 * @package SwiftPWA
 */

namespace SwiftPWA\ServiceWorker;

use WP_Error;

defined('ABSPATH') || exit;

class Service_Worker_Generator
{
	/**
	 * Template path
	 *
	 * @var string
	 */
	private static $template_path;

	/**
	 * Get template path
	 *
	 * @return string
	 */
	private static function get_template_path(): string
	{
		if (self::$template_path === null) {
			self::$template_path = SWIFT_PWA_PLUGIN_PATH . 'includes/templates/service-worker.template.js';
		}

		return self::$template_path;
	}

	/**
	 * Generate service worker code from config
	 *
	 * @param array $config Configuration array.
	 * @return string|WP_Error Generated code or error.
	 */
	public static function generate(array $config): string|WP_Error
	{
		$template_path = self::get_template_path();

		if (!file_exists($template_path)) {
			return new WP_Error(
				'template_not_found',
				sprintf('Service Worker template not found: %s', $template_path)
			);
		}

		$template = file_get_contents($template_path);

		if ($template === false) {
			return new WP_Error(
				'template_read_failed',
				'Failed to read Service Worker template'
			);
		}

		$variables = self::prepare_variables($config);

		return self::render_template($template, $variables);
	}

	/**
	 * Prepare variables for template
	 *
	 * @param array $config Configuration array.
	 * @return array Variables array.
	 */
	private static function prepare_variables(array $config): array
	{
		$version = $config['version'] ?? '1.0.0';
		$cache_name = $config['cache_name'] ?? 'swift-pwa-cache-v1';
		$offline_page = $config['offline_page'] ?? '/offline.html';
		$strategies = $config['strategies'] ?? array();
		$precache = $config['precache'] ?? array();
		$runtime_cache = $config['runtime_cache'] ?? array();
		$max_entries = $runtime_cache['max_entries'] ?? 50;

		// Формируем строку стратегий кэширования
		$strategies_code = '';
		foreach ($strategies as $type => $strategy) {
			$strategies_code .= sprintf(
				"      '%s': '%s',\n",
				esc_js($type),
				esc_js($strategy)
			);
		}

		return array(
			'VERSION' => esc_js($version),
			'CACHE_NAME' => esc_js($cache_name),
			'OFFLINE_PAGE' => esc_js($offline_page),
			'CACHE_STRATEGIES' => rtrim($strategies_code),
			'PRECACHE_FILES' => json_encode($precache, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES),
			'MAX_ENTRIES' => (int) $max_entries,
		);
	}

	/**
	 * Render template with variables
	 *
	 * @param string $template Template content.
	 * @param array  $variables Variables to replace.
	 * @return string Rendered template.
	 */
	private static function render_template(string $template, array $variables): string
	{
		$replacements = array();

		foreach ($variables as $key => $value) {
			$replacements['{{' . $key . '}}'] = $value;
		}

		return str_replace(
			array_keys($replacements),
			array_values($replacements),
			$template
		);
	}
}