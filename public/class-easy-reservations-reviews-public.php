<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://cmsminds.com
 * @since      1.0.0
 *
 * @package    Easy_Reservations_Reviews
 * @subpackage Easy_Reservations_Reviews/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Easy_Reservations_Reviews
 * @subpackage Easy_Reservations_Reviews/public
 * @author     cmsMinds <info@cmsminds.com>
 */
class Easy_Reservations_Reviews_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the JavaScript & stylesheet for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/easy-reservations-reviews-public.css', array(), $this->version, 'all' );

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/easy-reservations-reviews-public.js', array( 'jquery' ), $this->version, false );

	}
	/**
	 * Add review setting section on easy reservations setting page.
	 *
	 * @param string $reservation_id Holds the reservation product id.
	 * @return array
	 * @since 1.0.0
	 */
	public function ersrvr_after_item_details_callback( $reservation_id ){
		$product = get_product( $reservation_id );
		// check product is reservation type or not
    	if( $product->is_type( 'reservation' ) ) { 
			$ersrvr_reservation_button_text     = ersrvr_get_plugin_settings( 'ersrv_submit_review_button_text' );
			$ersrvr_reservation_review_criteria = ersrvr_get_plugin_settings( 'ersrv_submit_review_criterias' );
			echo ersrvr_prepare_reviews_html();
		}
		
		
		
	}

}
