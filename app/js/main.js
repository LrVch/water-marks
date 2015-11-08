$(document).ready(function ($) {
	$(function () {
		$("#slider-range").slider({
			// range: true,
			// min: 0,
			max: 500,
			value: 300,
			// slide: function( event, ui ) {
			//   $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			// }
		});
		/*$(function () {
		    $("#draggable").draggable();
		});*/
		// $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		//   " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	});
	$(function () {
		$("#spinner_0").spinner({
			spin: function (event, ui) {
				if (ui.value > 10) {
					$(this).spinner("value", -10);
					return false;
				} else if (ui.value < -10) {
					$(this).spinner("value", 10);
					return false;
				}
			}
		});
		$("#spinner_1").spinner({
		    spin: function (event, ui) {
		        if (ui.value > 10) {
		            $(this).spinner("value", -10);
		            return false;
		        } else if (ui.value < -10) {
		            $(this).spinner("value", 10);
		            return false;
		        }
		    }
		});
	});
});