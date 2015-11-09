$(document).ready(function () {

	var loadImages = (function () {

		function init() {
			_modules();
		}

		//подключение модулей
		function _modules() {
			_loadMainImage();
		}

		// загрузка основной кртинки
		function _loadMainImage() {

			var
				container = $(".block-left__main");
			//console.log("init module");


			$('#fileupload-1').fileupload({
				dataType: 'json',
				add: function (e, data) {
					var
						imgType = data.files[0].type,
						imgSize = data.files[0].size;

					//console.log(data);
					if (!(imgType.match(/^image\/(gif|jpeg|png)$/))) {
						console.log("isn't image"); // показываем предупреждение что не картинка
						//_createQtip($('#fileupload-1'), "Загрузить можно только картинку");

						return;
					}

					if (imgSize > 2000000) {
						console.log("to big"); // показываем предупреждение что картинка слишком большая
						//_createQtip($('#fileupload-1'), "Максимальный размет 2Мб");

						return;
					}

					data.formData = {
						img: data.files[0]
					}; //отправляем то что нам надо          
					data.submit(); // отправляем данные на сервер

				},
				done: function (e, data) {
					$.when($('.block-left__wrapper-img').fadeOut()).then(function () { // скрытие заставки и активация создания главной катинки
						_createMainImg(data, container);
					});
				},
				fail: function (e, data) {
					console.log("fail");
				},
				always: function (e, data) {
					//console.log(always);
				},
				change: function (e, data) {
					//console.log(data);
					$(".block-right__input_1").val(data.files[0].name);
				}
			});
		}

		// загрузка водянного знака
		function _loadWaterMark(container) {
			var mainImg = $(".main-img");

			$('#fileupload-2').removeAttr("disabled");

			$('#fileupload-2').fileupload({
				dataType: 'json',
				add: function (e, data) {
					var
						imgType = data.files[0].type,
						imgSize = data.files[0].size;

					if (!(imgType.match(/^image\/(gif|jpeg|png)$/))) {
						console.log("isn't image"); // показываем предупреждение что не картинка
						return;
					}

					if (imgSize > 2000000) {
						console.log("to big"); // показываем предупреждение что картинка слишком большая
						return;
					}

					data.formData = {
						img: data.files[0]
					}; //отправляем то что нам надо          
					data.submit(); // отправляем данные на сервер

				},
				done: function (e, data) {
					_creareWaterMark(data, container);
				},
				fail: function (e, data) {
					console.log("fail");
				},
				always: function (e, data) {
					//console.log(always);
				},
				change: function (e, data) {
					//console.log(data);
					$(".block-right__input_2").val(data.files[0].name);
				}
			});

		}

		// создание главного изображения
		function _createMainImg(data, container) {
			var
				containerWidth = container.innerWidth(),
				containerHeigth = container.innerHeight(),
				mainImgName = data.result.imgName,
				mainImgWidth = data.result.imgWidth,
				mainImgHeight = data.result.imgHeight,
				ratioWidth = mainImgWidth / containerWidth,
				ratioHeight = mainImgHeight / containerHeigth,
				mainImg = _mainImg(),
				mainImgWrapper = _mainImgWrapper();

			function _mainImgWrapper() {
				var
					mainImgWrapper = $("<div>", {
						class: "main-img-wrapper"
					})
					.css({
						"position": "absolute",
						"overflow": "hidden",
						"top": (containerHeigth - mainImg.data("newhight")) / 2,
						"left": (containerWidth - mainImg.data("newwidth")) / 2
					});
				return mainImgWrapper;
			}

			function _mainImg() {
				var
					width = mainImgWidth,
					height = mainImgHeight,
					dataRatio = 1;

				if (ratioWidth > 1) {

					width = mainImgWidth / ratioWidth;
					height = mainImgHeight / ratioWidth;
					dataRatio = mainImgWidth / width;

					if (height > containerHeigth) {

						dataRatio = height / containerHeigth;
						width = width / dataRatio;
						height = height / dataRatio;
						dataRatio = mainImgWidth / width;
					}

				} else if (ratioHeight > 1) {

					height = mainImgHeight / ratioHeight;
					width = mainImgWidth / ratioHeight;
					dataRatio = mainImgWidth / width;
				}

				var
					mainImg = $("<img>", {
						"src": "uploads/" + mainImgName,
						"class": "main-img",
						"data-srcHtight": mainImgHeight,
						"data-srcWidth": mainImgWidth,
						"data-ratio": dataRatio,
						"data-newWidth": width,
						"data-newHight": height
					})
					.css({
						"width": width,
						"height": height,
						"display": "none"
					})
					.on("load", function () {
						$(this).fadeIn(1500);
					});
				return mainImg;
			}

			$.when(mainImgWrapper.fadeOut(1000)).then(function () {
				container.empty();
				mainImg.appendTo(mainImgWrapper); // вставка картинки в обетку
				mainImgWrapper.appendTo(container); // вставка блока главнной картинки в разметкуcontainer.empty();
			});

			_loadWaterMark(container); // активация загрузки водянного знака

		}

		// создание водянного знака
		function _creareWaterMark(data, container) {
			var
				mainImgWrapper = $(".main-img-wrapper"),
				mainImg = $(".main-img"),
				containerWidth = container.innerWidth(),
				containerHeigth = container.innerHeight(),
				imgName = data.result.imgName,
				imgWidth = data.result.imgWidth,
				imgHeight = data.result.imgHeight;



			if (imgWidth > mainImg.data("srcwidth") || imgHeight > mainImg.data("srchtight")) {
				console.log("вотемарк больше исходной картинки загрузите картинку поменьше");
				return;
			}

			var
				waterImgWrapper = $("<div>", {
					class: "watermark-img-wrapper"
				})
				.css({
					"position": "absolute",
					"top": 0,
					"left": 0,
					//"width": imgWidth / mainImg.data("ratio"),
					//"height": imgHeight / mainImg.data("ratio"),
					"margin": 0,
					"padding": 0
						//"cursor": "all-scroll"
				}),
				waterImg = $("<img>", {
					"src": "uploads/" + imgName,
					"class": "watermark-img",
					"data-srcHtight": imgHeight,
					"data-srcWidth": imgWidth,
					"data-ratio": mainImg.data("ratio"),
					"data-newWidth": imgWidth / mainImg.data("ratio"),
					"data-newHight": imgHeight / mainImg.data("ratio")
				})
				.css({
					"width": imgWidth / mainImg.data("ratio"),
					"height": imgHeight / mainImg.data("ratio"),
					"display": "none",
					"margin": 0,
					"padding": 0
				})
				.on("load", function () {
					$(this).fadeIn(500);
					_returnWatermark($(this));
				});

			$('.watermark-img-wrapper').remove(); // удаляем старый вотемарк
			waterImg.appendTo(waterImgWrapper); // вставка картинки
			waterImgWrapper.appendTo(mainImgWrapper); // вставка картинки
		}

		// тултипы
		function _createQtip(element, content) { // Создаёт тултипы

			// позиция тултипа
			var position = {
				my: 'right center',
				at: 'left center',
				adjust: {
					method: 'shift none'
				}
			};

			// инициализация тултипа
			element.qtip({
				content: {
					text: function () {
						return content;
					}
				},
				show: {
					event: 'show'
				},
				hide: {
					event: 'click hideTooltip'
				},
				position: position,
				style: {
					classes: 'myclass qtip-rounded',
					tip: {
						height: 10,
						width: 16
					}
				}
			}).trigger('show');
		}
		// функция передаци сгенерированного элемента
		function _returnWatermark(elem) {
			position.init(); // активируем модуль позиционирования и передаем элемент
			return;
		}

		return {
			init: init
		};

	})();

	// Вызов модуля
	loadImages.init();

	// вставил код для проверки совместимости позиционирования

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
			$(".block-right-place__table").find("input").removeAttr("disabled");
		}
		// блок чекбоксов
		function _checkBox(e) {
			//e.preventDefault();

			console.log("init check");
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

			console.log("драг активен");
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
			console.log("spiners init");

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

	// Вызов модуля
	position.spinersInit(); // активация спинеров


	// слайдер прозрачности - тест
	function _slider() {
		$("#slider-range").slider({
			min: 0,
			max: 100,
			value: 100
			//range: true
		});
		$('#slider-range').on('slide', function () {

			var opacity = $('#slider-range').slider("option", "value") / 100;

			$(".watermark-img").css("opacity", opacity).attr("data-opacity", opacity * 100)

		});
		$(".main-img").on("load", function () {
			console.log("fds");
		});
	}
	_slider();

});