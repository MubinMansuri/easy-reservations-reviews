jQuery( document ).ready( function( $ ) {
	'use strict';

	// Localized variables.
	var add_criteria_button_text     = ERSRVR_Reviews_Script_Vars.add_criteria_button_text;
	var add_criterias_promptbox_text = ERSRVR_Reviews_Script_Vars.add_criterias_promptbox_text;
	var add_same_criteria_error      = ERSRVR_Reviews_Script_Vars.add_same_criteria_error;

	// Get the current section.
	var current_section = get_query_string_parameter_value( 'section' );
	if ( 1 === is_valid_string( current_section ) && 'reviews' === current_section ) {
		// Add a button just after the review criterias.
		var criteria_select2_class = $( '#ersrv_submit_review_criterias' ).next( 'span.select2' ).attr( 'class' );
		criteria_select2_class     = '.' + criteria_select2_class.replace( / /g, '.' );
		$( '<a href="#" class="ersrv_add_more_criterias button">' + add_criteria_button_text + '</a>' ).insertAfter( criteria_select2_class );
		$( '.ersrv_add_more_criterias' ).css( 'margin-left', '5px' );
	}
	
	/**
	 * Append a new criteria for review.
	 */
	jQuery( document ).on( 'click', '.ersrv_add_more_criterias', function( evt ) {
		evt.preventDefault();
		// Get the criteria.
		var criteria_name = prompt( add_criterias_promptbox_text );

		// Exit, if the criteria is invalid.
		if ( -1 === is_valid_string( criteria_name ) ) {
			return false;
		}

		// Check if the criteria to be added doesn't already exist.
		var existing_cirterias_count = $( '#ersrv_submit_review_criterias > option' ).length;
		var has_similar_criteria     = false;
		if ( 1 <= existing_cirterias_count ) {
			$( '#ersrv_submit_review_criterias > option' ).each( function() {
				var this_option      = $( this );
				var this_option_text = this_option.text();

				if ( this_option_text.toLowerCase() === criteria_name.toLowerCase() ) {
					has_similar_criteria = true;
					return false;
				}
			} );
		}

		// Check if there was any similar criteria.
		if ( has_similar_criteria ) {
			alert( add_same_criteria_error );
			return false;
		}

		// Push the slug into the array.
		var new_criteria = new Option( criteria_name, criteria_name, true, true );

		// Append the select option.
		$( '#ersrv_submit_review_criterias' ).append( new_criteria ).trigger( 'change' );
	} );

	

	/**
	 * Check if a string is valid.
	 *
	 * @param {string} $data
	 */
	function is_valid_string( data ) {
		if ( '' === data || undefined === data || ! isNaN( data ) || 0 === data ) {
			return -1;
		} else {
			return 1;
		}
	}

	/**
	 * Check if a number is valid.
	 *
	 * @param {number} $data
	 */
	function is_valid_number( data ) {
		if ( '' === data || undefined === data || isNaN( data ) || 0 === data ) {
			return -1;
		} else {
			return 1;
		}
	}

	/**
	 * Block element.
	 *
	 * @param {string} element
	 */
	function block_element( element ) {
		element.addClass( 'non-clickable' );
	}

	/**
	 * Unblock element.
	 *
	 * @param {string} element
	 */
	function unblock_element( element ) {
		element.removeClass( 'non-clickable' );
	}

	/**
	 * Get query string parameter value.
	 *
	 * @param {string} string
	 * @return {string} string
	 */
	function get_query_string_parameter_value( param_name ) {
		var url_string = window.location.href;
		var url        = new URL( url_string );
		var val        = url.searchParams.get( param_name );

		return val;
	}
} );
