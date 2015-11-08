/*$(document).ready(function () {
	var position = (function () {

		function init() {
			_setUpListners();
			_modules();
		};

		  function _setUpListners() {
		    $('#id').on('click', _doSome);
		  };

		function _modules() {
			$("#slider-range").slider();
		};

		function _doSome(e) {
		  e.preventDefault();
		};

		function imgDrag(elem) {
			var
				imgDrag = elem,
				imgDragWrapper = elem.parent();

			imgDragWrapper.draggable();

			$('#slider-range').on('slide', function () {

				var opacity = $('#slider-range').slider("option", "value") / 100;

				imgDrag.css("opacity", opacity).attr("data-opacity", opacity * 100)

				console.log($('.pic').attr("data-opacity"));
			});

		}

		return {
			init: init,
			imgDrag: imgDrag
		};

	})();

	// Вызов модуля
	position.init();

});*/