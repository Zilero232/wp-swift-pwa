<?php

defined( 'ABSPATH' ) || exit;

return array(
	'version'            => '1.0.0',
	'cache_name'         => 'swift-pwa-cache',
	'offline_page'       => '/',
	'strategy'           => 'networkFirst',

	'skip_patterns'      => array(
		'/wp-admin/',
		'/wp-login.php',
		'/wp-json/wp/',
	),

	'precache'           => array(),

	'background_sync'    => array(
		'enabled'    => false,
		'queue_name' => 'swift-pwa-sync',
	),

	'push_notifications' => array(
		'enabled'          => false,
		'vapid_public_key' => '',
	),
);
