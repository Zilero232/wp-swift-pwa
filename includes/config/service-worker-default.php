<?php

defined('ABSPATH') || exit;

return array(
	'version' => '1.0.0',
	'cache_name' => 'swift-pwa-cache-v1',
	'offline_page' => '/offline.html',
	'strategies' => array(
		'html,htm' => 'networkFirst',
		'css,scss,sass' => 'cacheFirst',
		'js,mjs' => 'cacheFirst',
		'jpg,jpeg,png,gif,webp,svg,ico' => 'cacheFirst',
		'woff,woff2,ttf,eot,otf' => 'cacheFirst',
		'api' => 'networkFirst',
		'default' => 'networkFirst',
	),
	'precache' => array(),
	'runtime_cache' => array(
		'enabled' => true,
		'max_entries' => 50,
		'max_age_seconds' => 86400, // 24 hours
	),
	'background_sync' => array(
		'enabled' => false,
	),
	'push_notifications' => array(
		'enabled' => false,
	),
);