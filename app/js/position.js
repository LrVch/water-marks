/*$(document).ready(function () {
	// вставил код для проверки совместимости

	var position = (function () {

		function init() {
			_setUpListners();
			_modules();
		};

		function _setUpListners() {
			$(".block-right-place__table").on("click", "input", _checkBox);
			$(".block-left__main").on("click", imgDrag); 
		};

		function _modules() {
			$("#slider-range").slider();
			$('#slider-range').on('slide', function () {

				var opacity = $('#slider-range').slider("option", "value") / 100;

				$(".watermark-img").css("opacity", opacity).attr("data-opacity", opacity * 100)

			});
			$(".main-img").on("load", function() {
				console.log("fds");
			});
		};

		function _checkBox(e) {
			//e.preventDefault();

			var
				target = e.target,
				$target = $(target),
				inputClass = $target.attr("class"),
				tag = inputClass.split(" "),
				mainImg = $(".main-img"),
				watemark = $(".watermark-img"),
				watemarkWrapper = watemark.parent(),
				top = 0,
				left = 0;
			

			//console.log(tag[1]);

			switch (tag[1]) {

			case "block-right__radio_0":
				top = 0;
				left = 0;
				_imgPos(top, left, watemarkWrapper);
				watemark.attr("data-pos-x", left);	
				watemark.attr("data-pos-y", top);	

				break;

			case "block-right__radio_1":
				top = 0;
				left = (mainImg.data("newwidth") - watemark.data("newwidth")) / 2;
				_imgPos(top, left, watemarkWrapper);

				break;

			case "block-right__radio_2":
				top = 0;
				left = (mainImg.data("newwidth") - watemark.data("newwidth"));
				_imgPos(top, left, watemarkWrapper);

				break;

			case "block-right__radio_3":
				top = (mainImg.data("newhight") - watemark.data("newhight")) / 2;
				left = 0;
				_imgPos(top, left, watemarkWrapper);

				break;

			case "block-right__radio_4":
				top = (mainImg.data("newhight") - watemark.data("newhight")) / 2;
				left = (mainImg.data("newwidth") - watemark.data("newwidth")) / 2;
				_imgPos(top, left, watemarkWrapper);

				break;

			case "block-right__radio_5":
				top = (mainImg.data("newhight") - watemark.data("newhight")) / 2;
				left = (mainImg.data("newwidth") - watemark.data("newwidth"));
				_imgPos(top, left, watemarkWrapper);

				break;

			case "block-right__radio_6":
				top = (mainImg.data("newhight") - watemark.data("newhight"));
				left = 0;
				_imgPos(top, left, watemarkWrapper);

				break;

			case "block-right__radio_7":
				top = (mainImg.data("newhight") - watemark.data("newhight"));
				left = (mainImg.data("newwidth") - watemark.data("newwidth")) / 2;
				_imgPos(top, left, watemarkWrapper);

				break;

			case "block-right__radio_8":
				top = (mainImg.data("newhight") - watemark.data("newhight"));
				left = (mainImg.data("newwidth") - watemark.data("newwidth"));
				_imgPos(top, left, watemarkWrapper);

				break;

			}
		};

		function _imgPos(top, left, watemarkWrapper) {
			watemarkWrapper.css({
				"top": top,
				"left": left
			})
			watemarkWrapper.attr("data-pos-x", left);	
			watemarkWrapper.attr("data-pos-y", top);
		}

		function imgDrag() {
			
			var
				watermark = $(this).find(".watermark-img"),
				watermarkWrapper = watermark.parent();

			console.log(watermark);
			watermarkWrapper.draggable();
		}

		return {
			init: init//,
			//imgDrag: imgDrag
		};

	})();

	// Вызов модуля
	position.init();

});*/