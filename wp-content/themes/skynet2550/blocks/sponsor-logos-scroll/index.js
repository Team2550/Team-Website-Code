( function ( blocks, blockEditor, components, element ) {
	var el = element.createElement;
	var useBlockProps = blockEditor.useBlockProps;
	var InspectorControls = blockEditor.InspectorControls;
	var PanelBody = components.PanelBody;
	var TextControl = components.TextControl;

	blocks.registerBlockType( 'skynet2550/sponsor-logos-scroll', {
		edit: function ( props ) {
			var blockProps = useBlockProps();
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;

			return el(
				element.Fragment,
				{},
				el(
					InspectorControls,
					{},
					el(
						PanelBody,
						{ title: 'Sponsor Filters', initialOpen: true },
						el( TextControl, {
							label: 'Sponsor Group (slug)',
							help: 'Enter a sponsor group slug to filter, e.g. platinum',
							value: attributes.sponsorGroup || '',
							onChange: function ( val ) {
								setAttributes( { sponsorGroup: val || '' } );
							},
						} ),
						el( TextControl, {
							label: 'Sponsor Year (slug)',
							help: 'Enter a sponsor year slug to filter, e.g. 2024',
							value: attributes.sponsorYear || '',
							onChange: function ( val ) {
								setAttributes( { sponsorYear: val || '' } );
							},
						} )
					)
				),
				el(
					'div',
					blockProps,
					el(
						'div',
						{ className: 'sponsor-logos-scroll__placeholder' },
						'Sponsor Logos Scroll — configure filters in block sidebar'
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
