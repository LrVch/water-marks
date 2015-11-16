var position = (function () {

	function init() {
		_setUpListners();
		_modules();
	};

	function _setUpListners() {
		$(".block-right-place__table").on("click", "input", _checkBox);
	};

	function _modules() {
		_unlockCheckbox();
		_imgDrag();
		_spiners();
	};

	// включение чекбоксов
	function _unlockCheckbox() {
		$(".block-right-place__table").find("input").removeAttr("disabled")
    $(".block-right-place__lbl").css({"cursor": "pointer"});
	}
	// блок чекбоксов
	function _checkBox(e) {
		//e.preventDefault();

		//console.log("init check");
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

		switch (tag[1]) {

		case "block-right__radio_0":
			top = 0;
			left = 0;
			_imgPos(top, left, watemarkWrapper);
			_spinerSetValue(top, left);

			break;

		case "block-right__radio_1":
			top = 0;
			left = (mainImg.data("newwidth") - watemark.data("newwidth")) / 2;
			_imgPos(top, left, watemarkWrapper);
			_spinerSetValue(top, left);

			break;

		case "block-right__radio_2":
			top = 0;
			left = (mainImg.data("newwidth") - watemark.data("newwidth"));
			_imgPos(top, left, watemarkWrapper);
			_spinerSetValue(top, left);

			break;

		case "block-right__radio_3":
			top = (mainImg.data("newhight") - watemark.data("newhight")) / 2;
			left = 0;
			_imgPos(top, left, watemarkWrapper);
			_spinerSetValue(top, left);

			break;

		case "block-right__radio_4":
			top = (mainImg.data("newhight") - watemark.data("newhight")) / 2;
			left = (mainImg.data("newwidth") - watemark.data("newwidth")) / 2;
			_imgPos(top, left, watemarkWrapper);
			_spinerSetValue(top, left);

			break;

		case "block-right__radio_5":
			top = (mainImg.data("newhight") - watemark.data("newhight")) / 2;
			left = (mainImg.data("newwidth") - watemark.data("newwidth"));
			_imgPos(top, left, watemarkWrapper);
			_spinerSetValue(top, left);

			break;

		case "block-right__radio_6":
			top = (mainImg.data("newhight") - watemark.data("newhight"));
			left = 0;
			_imgPos(top, left, watemarkWrapper);
			_spinerSetValue(top, left);

			break;

		case "block-right__radio_7":
			top = (mainImg.data("newhight") - watemark.data("newhight"));
			left = (mainImg.data("newwidth") - watemark.data("newwidth")) / 2;
			_imgPos(top, left, watemarkWrapper);
			_spinerSetValue(top, left);

			break;

		case "block-right__radio_8":
			top = (mainImg.data("newhight") - watemark.data("newhight"));
			left = (mainImg.data("newwidth") - watemark.data("newwidth"));
			_imgPos(top, left, watemarkWrapper);
			_spinerSetValue(top, left);

			break;

		}
	}
	// позиционирование
	function _imgPos(top, left, watemarkWrapper) {
		watemarkWrapper.css({
			"top": top,
			"left": left
		})
		watemarkWrapper.attr("data-pos-x", left);
		watemarkWrapper.attr("data-pos-y", top);
	}
	// драг тест
	function _imgDrag() {

		var
			watermark = $(".watermark-img"),
			watermarkWrapper = watermark.parent();

		//console.log("драг активен");
		watermarkWrapper.draggable({
			containment: ".main-img-wrapper",
			cursor: "move",
			drag: function (e) {
				var
					target = e.target,
					$target = $(target),
					top = $target.position().top,
					left = $target.position().left;
				_spinerSetValue(top, left)
				$(this).attr("data-pos-x", left);
				$(this).attr("data-pos-y", top);
				//console.log($(this));
			}
		});
	}
	// спинеры для работы после загрузки картинки - тест
	function _spiners() {
		//console.log("spiners init");

		var
			waterImg = $(".watermark-img"),
			waterWrapper = waterImg.parent(),
			mainImgWrapper = waterImg.parentsUntil(".block-left__main")[1],
			$mainImgWrapper = $(mainImgWrapper),
			mainImg = $mainImgWrapper.find(".main-img");

		var spinX = $("#spinner_0").spinner({
			min: 0,
			max: mainImg.width() - waterImg.width(),
			disabled: false
		});

		var spinY = $("#spinner_1").spinner({
			min: 0,
			max: mainImg.height() - waterImg.height(),
			disabled: false
		});

		spinX.on("spin", function (event, ui) {
			var curentVal = ui.value;
			waterWrapper
				.css({
					"left": curentVal
				})
				.attr("data-pos-x", curentVal);
		});

		spinY.on("spin", function (event, ui) {
			var curentVal = ui.value;
			waterWrapper
				.css({
					"top": curentVal
				})
				.attr("data-pos-y", curentVal);
		});

	}
	// передача значений в снипперы
	function _spinerSetValue(top, left) {
		$("#spinner_0").spinner("value", left);
		$("#spinner_1").spinner("value", top);
	}
	// активация спинеров
	function spinersInit() {
		$("#spinner_0").spinner({
			disabled: true,
			create: function (event, ui) {
				$(this).spinner("value", 0);
			}
		});
		$("#spinner_1").spinner({
			disabled: true,
			create: function (event, ui) {
				$(this).spinner("value", 0);
			}
		});
	}

	return {
		init: init,
		spinersInit: spinersInit
	};

})();
