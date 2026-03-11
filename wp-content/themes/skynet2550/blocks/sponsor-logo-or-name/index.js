( function ( blocks, blockEditor, element ) {
	var el = element.createElement;
	var useBlockProps = blockEditor.useBlockProps;

	blocks.registerBlockType( 'skynet2550/sponsor-logo-or-name', {
		edit: function () {
			return el( 'div', useBlockProps(), 'Sponsor Logo or Name' );
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element );
