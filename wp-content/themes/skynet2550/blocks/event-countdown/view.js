( function () {
	'use strict';

	function pad( num ) {
		return String( num ).padStart( 2, '0' );
	}

	function getVisitorTimezone() {
		try {
			var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			return tz && tz !== 'UTC' ? tz : null;
		} catch ( e ) {
			return null;
		}
	}

	function getTargetDate( el ) {
		var targetStr = el.getAttribute( 'data-target-datetime' );
		var pacificUtcStr = el.getAttribute( 'data-target-pacific-utc' );
		if ( ! targetStr && ! pacificUtcStr ) return null;

		var visitorTz = getVisitorTimezone();

		if ( visitorTz ) {
			// Use visitor's location: interpret target as local time (e.g. "2pm" = 2pm their time).
			var target = new Date( targetStr );
			return isNaN( target.getTime() ) ? null : target;
		}

		// Fallback: location unknown, use Pacific (server provides UTC equivalent).
		var pacificTarget = pacificUtcStr ? new Date( pacificUtcStr ) : ( targetStr ? new Date( targetStr ) : null );
		return pacificTarget && ! isNaN( pacificTarget.getTime() ) ? pacificTarget : null;
	}

	function updateCountdown( el ) {
		var target = getTargetDate( el );
		if ( ! target ) return;

		var daysEl = el.querySelector( '.event-countdown__days' );
		var hoursEl = el.querySelector( '.event-countdown__hours' );
		var minutesEl = el.querySelector( '.event-countdown__minutes' );
		var secondsEl = el.querySelector( '.event-countdown__seconds' );

		if ( ! daysEl || ! hoursEl || ! minutesEl || ! secondsEl ) return;

		function tick() {
			var now = new Date();
			var diff = target.getTime() - now.getTime();

			if ( diff <= 0 ) {
				daysEl.textContent = '0';
				hoursEl.textContent = '0';
				minutesEl.textContent = '0';
				secondsEl.textContent = '0';
				return;
			}

			var seconds = Math.floor( ( diff / 1000 ) % 60 );
			var minutes = Math.floor( ( diff / ( 1000 * 60 ) ) % 60 );
			var hours = Math.floor( ( diff / ( 1000 * 60 * 60 ) ) % 24 );
			var days = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) );

			daysEl.textContent = String( days );
			hoursEl.textContent = pad( hours );
			minutesEl.textContent = pad( minutes );
			secondsEl.textContent = pad( seconds );
		}

		tick();
		setInterval( tick, 1000 );
	}

	function init() {
		var blocks = document.querySelectorAll( '.event-countdown' );
		blocks.forEach( updateCountdown );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
