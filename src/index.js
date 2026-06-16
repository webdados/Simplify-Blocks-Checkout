import { createRoot } from '@wordpress/element';
import ToggleButton from './ToggleButton';
import './style.css';

const FORM_SELECTOR = '.wc-block-components-address-form';
const FIRST_NAME_SELECTOR = '.wc-block-components-address-form__first_name';
const COUNTRY_SELECTOR = '.wc-block-components-address-form__country';
const CONTAINER_ID = 'ncsbc-toggle-container';

// Known wrapper class names for the billing address section across WC Blocks versions.
const BILLING_WRAPPERS = [
	'.wc-block-checkout__billing-fields',
	'.wc-block-checkout__billing-address',
	'.wp-block-woocommerce-checkout-billing-address-block',
	'[data-id="billing-fields"]',
];

function getBillingForm() {
	for ( const wrapper of BILLING_WRAPPERS ) {
		const form = document.querySelector( wrapper + ' ' + FORM_SELECTOR );
		if ( form ) return form;
	}
	return null;
}

function inject() {
	if ( document.getElementById( CONTAINER_ID ) ) {
		return;
	}

	// Only target the billing address form — never the shipping form.
	const form = getBillingForm();
	if ( ! form ) {
		return;
	}

	// Prefer inserting after first name so the name field spans full width.
	// Fall back to after country if first name isn't present.
	const anchor =
		form.querySelector( FIRST_NAME_SELECTOR ) ||
		form.querySelector( COUNTRY_SELECTOR );
	if ( ! anchor ) {
		return;
	}

	const container = document.createElement( 'div' );
	container.id = CONTAINER_ID;
	anchor.after( container );

	createRoot( container ).render( <ToggleButton form={ form } /> );
}

// Watch for WooCommerce Blocks to mount the checkout form (it's a React SPA).
// The guard inside inject() prevents duplicate injection on subsequent mutations.
const observer = new MutationObserver( inject );
observer.observe( document.body, { childList: true, subtree: true } );

// Also run immediately in case the DOM is already ready.
inject();
