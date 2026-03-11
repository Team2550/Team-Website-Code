( function ( blocks, blockEditor, components, element ) {
	var el = element.createElement;
	var useBlockProps = blockEditor.useBlockProps;
	var InspectorControls = blockEditor.InspectorControls;
	var PanelBody = components.PanelBody;
	var TextControl = components.TextControl;
	var DateTimePicker = components.DateTimePicker;

	blocks.registerBlockType( 'skynet2550/event-countdown', {
		edit: function ( props ) {
			var blockProps = useBlockProps();
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;

			var targetDate = attributes.targetDateTime
				? new Date( attributes.targetDateTime )
				: null;

			if ( targetDate && isNaN( targetDate.getTime() ) ) {
				targetDate = null;
			}

			return el(
				element.Fragment,
				{},
				el(
					InspectorControls,
					{},
					el(
						PanelBody,
						{ title: 'Event Countdown', initialOpen: true },
						el( TextControl, {
							label: 'Event Name',
							help: 'The name of the event to display above the countdown.',
							value: attributes.eventName || '',
							onChange: function ( val ) {
								setAttributes( { eventName: val || '' } );
							},
						} ),
						el( DateTimePicker, {
							currentDate: targetDate,
							onChange: function ( newDate ) {
								if ( newDate ) {
									var iso = typeof newDate === 'string'
										? newDate
										: new Date( newDate ).toISOString();
									setAttributes( { targetDateTime: iso } );
								} else {
									setAttributes( { targetDateTime: '' } );
								}
							},
							is12Hour: true,
						} )
					)
				),
				el(
					'div',
					blockProps,
					el(
						'div',
						{ className: 'event-countdown__placeholder' },
						'Event Countdown — set date and event name in block sidebar'
					)
				)
			);
		},
		save: function () {
			return null;
		},
	} );
} )(
	window.wp.blocks,
	window.wp.blockEditor,
	window.wp.components,
	window.wp.element
);
