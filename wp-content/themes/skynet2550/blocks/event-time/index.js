( function ( blocks, blockEditor, element ) {
	var el = element.createElement;
	var useBlockProps = blockEditor.useBlockProps;

	blocks.registerBlockType( 'skynet2550/event-time', {
		edit: function () {
			return el( 'div', useBlockProps(), 'Event Time' );
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element );
