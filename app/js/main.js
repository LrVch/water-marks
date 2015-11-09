$(document).ready(function () {

	/*$("#slider-range").slider({
		max: 500,
		value: 30
	})*/

	$("#spinner_0").spinner({
		spin: function (event, ui) {
			console.log($(".watermark-img"));
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
