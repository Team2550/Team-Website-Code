( function ( blocks, blockEditor, element ) {
	var el = element.createElement;
	var useBlockProps = blockEditor.useBlockProps;

	blocks.registerBlockType( 'skynet2550/event-date', {
		edit: function () {
			return el( 'div', useBlockProps(), 'Event Date' );
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element );
