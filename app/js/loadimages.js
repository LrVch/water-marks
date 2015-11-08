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
					//console.log("changed");
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
						//"overflow": "hidden",
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
				imgHeight = data.result.imgHeight,

				waterImgWrapper = $("<div>", {
					class: "watermark-img-wrapper"
				})
				.css({
					"position": "absolute",
					"top": 0,
					"left": 0,
					"cursor": "all-scroll"
				});

			if (imgWidth > mainImg.data("srcwidth") || imgHeight > mainImg.data("srchtight")) {
				console.log("вотемарк больше исходной картинки загрузите картинку поменьше");
				return;
			}

			var
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
					"display": "none"
				})
				.on("load", function () {
					$(this).fadeIn(500);
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

		return {
			init: init
		};

	})();

	// Вызов модуля
	loadImages.init();

});