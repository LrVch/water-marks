var opacity = (function () {

	function init() {
		// _setUpListners();
		_modules();
	};

	function _modules() {
		_opacitySlider();
	};

	function _doSome(e) {
		e.preventDefault();
	};

	function _opacitySlider() {
		$('#slider-range')
			.slider("option", {
				disabled: false
			})
			.on('slide slidechange', function () {

				var opacity = $('#slider-range').slider("option", "value") / 100;

				$(".watermark-img").css("opacity", opacity).attr("data-opacity", opacity * 100)

			});
	}

	function sliderInit() {
		$("#slider-range").slider({
			min: 1,
			max: 100,
			value: 100,
			range: "min",
			disabled: true
		});
	}

	return {
		init: init,
		sliderInit: sliderInit
	};

})();