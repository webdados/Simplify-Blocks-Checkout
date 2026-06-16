<?php
/**
 * Plugin Name:          Simplify WooCommerce Blocks Checkout
 * Plugin URI:
 * Description:          Hides non-necessary billing address fields, makes them optional, and only shows them if the user wants to
 * Version:              0.1
 * Author:               Naked Cat Plugins (by Webdados)
 * Author URI:           https://nakedcatplugins.com
 * Text Domain:          simplify-blocks-checkout
 * Requires at least:    6.2
 * Tested up to:         7.0
 * Requires PHP:         7.4
 * Update URI:           false
 * WC requires at least: 9.0
 * WC tested up to:      10.8
 * Requires Plugins:     woocommerce
 */

namespace NakedCatPlugins\SimplilyBlocksCheckout;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'wp_enqueue_scripts',
	function () {
		if ( ! is_checkout() && ! has_block( 'woocommerce/checkout' ) ) {
			return;
		}

		$asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = include $asset_file;

		wp_enqueue_script(
			'ncsbc-checkout',
			plugin_dir_url( __FILE__ ) . 'build/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_localize_script(
			'ncsbc-checkout',
			'ncsbcData',
			array(
				'showLabel' => __( 'Show optional address fields', 'simplify-blocks-checkout' ),
				'hideLabel' => __( 'Hide optional address fields', 'simplify-blocks-checkout' ),
			)
		);

		wp_enqueue_style(
			'ncsbc-checkout',
			plugin_dir_url( __FILE__ ) . 'build/style-index.css',
			array(),
			$asset['version']
		);
	}
);

/* HPOS Compatible */
add_action(
	'before_woocommerce_init',
	function () {
		\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
		\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'cart_checkout_blocks', __FILE__, true );
	}
);

/* If you're reading this you must know what you're doing ;-) Greetings from sunny Portugal! */
