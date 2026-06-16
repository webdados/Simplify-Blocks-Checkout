import { useState, useEffect } from '@wordpress/element';

const HIDDEN_CLASS = 'ncsbc-address-hidden';

export default function ToggleButton( { form } ) {
	const [ visible, setVisible ] = useState( false );

	useEffect( () => {
		form.classList.add( HIDDEN_CLASS );
	}, [ form ] );

	const toggle = () => {
		setVisible( ( prev ) => {
			const next = ! prev;
			form.classList.toggle( HIDDEN_CLASS, ! next );
			return next;
		} );
	};

	const data = window.ncsbcData || {};
	const showLabel = data.showLabel || 'Show address billing fields';
	const hideLabel = data.hideLabel || 'Hide address billing fields';

	return (
		<button
			type="button"
			className="wc-block-components-button wp-element-button ncsbc-toggle-btn"
			onClick={ toggle }
		>
			{ visible ? hideLabel : showLabel }
		</button>
	);
}
