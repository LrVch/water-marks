// загрузка изображений
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

		$('#fileupload_1').fileupload({
			dataType: 'json',
			add: function (e, data) {
				var
					imgType = data.files[0].type,
					imgSize = data.files[0].size;

				if (!(imgType.match(/^image\/(gif|jpeg|png)$/))) {
					//console.log("isn't image"); // показываем предупреждение что не картинка
					var key = "notImage";
					$(".block-right__input_1").tooltip({
						content: contentToltip($(".block-right__input_1"), key),
						position: 'top'
					});

					return;
				}

				//console.log(upload());

				if (imgSize > 2097152) {
					console.log("to big"); // показываем предупреждение что картинка слишком большая
					var key = "tooBig";
					$(".block-right__input_1").tooltip({
						content: contentToltip($(".block-right__input_1"), key),
						position: 'top'
					});

					return;
				}

				$('.progress_0').fadeIn();
				$('.progress_0 .bar').css(
					'width', 0
				);
				$('.progress_1').hide();
				$(this).attr("disabled", "disabled");
				$('.block-right__fileupload_0').addClass("disabled");
				$('.block-right__fileupload_1').addClass("disabled");
				$('#fileupload_2').attr("disabled", "disabled");


				data.formData = {
					img: data.files[0]
				}; //отправляем то что нам надо          
				data.submit(); // отправляем данные на сервер

			},
			submit: function (e, data) {
				//console.log(e);
			},
			done: function (e, data) {
				$(this).removeAttr("disabled");
				$('#fileupload_2').removeAttr("disabled");
				$('.block-right__fileupload_0').removeClass("disabled");

				if (!data.result.error) {
					$.when($('.block-left__wrapper-img').fadeOut()).then(function () { // скрытие заставки и активация создания главной катинки
						_createMainImg(data, container);
					});
				} else {
					//console.log(data.result.error);
					$(".block-right__input_1").tooltip({
						content: contentToltip($(".block-right__input_1"), data.result.error),
						position: 'top'
					});
				}
			},
			fail: function (e, data) {
				console.log("fail");
			},
			always: function (e, data) {
				//console.log(always);
			},
			change: function (e, data) {
				if ((!(data.files[0].type).match(/^image\/(gif|jpeg|png)$/)) || (data.files[0].size > 2000000)) {
					//console.log("not");
					return;
				}
				$(".block-right__input_1").val(data.files[0].name);
				$('.tooltip').remove();
			},
			progressall: function (e, data) {
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('.progress_0 .bar').css(
					'width',
					progress + '%'
				);
			}
		});
	}
	// загрузка водянного знака
	function _loadWaterMark(container) {
		var mainImg = $(".main-img");

		$('#fileupload_2').removeAttr("disabled");
		$('.block-right__fileupload_1').removeClass("disabled");

		$('#fileupload_2').fileupload({
			dataType: 'json',
			add: function (e, data) {
				var
					imgType = data.files[0].type,
					imgSize = data.files[0].size,
					mainImgWidth = $(".main-img").data("srcwidth"),
					mainImgHeight = $(".main-img").data("srchtight");


				if (!(imgType.match(/^image\/(gif|jpeg|png)$/))) {
					//console.log("isn't image"); // показываем предупреждение что не картинка
					var key = "notImage";
					$(".block-right__input_2").tooltip({
						content: contentToltip($(".block-right__input_2"), key),
						position: 'top'
					});

					return;
				}

				if (imgSize > 2097152) {
					//console.log("to big"); // показываем предупреждение что картинка слишком большая
					var key = "tooBig";
					$(".block-right__input_2").tooltip({
						content: contentToltip($(".block-right__input_2"), key),
						position: 'top'
					});

					return;
				}

				/*$('.progress_1').fadeIn();
				$('.progress_1 .bar').css(
					'width', 0
				);
				$(this).attr("disabled", "disabled");
				$('#fileupload_1').attr("disabled", "disabled");
				$('.block-right__fileupload_1').addClass("disabled");
				$('.block-right__fileupload_0').addClass("disabled");*/


				var
					reader = new FileReader(),
					isvalid = true;

				reader.readAsDataURL(data.files[0]);
				reader.onload = function (e) {
					var image = new Image();

					image.src = e.target.result;
					image.onload = function () {

						var
							height = this.height,
							width = this.width;

						if (height > mainImgHeight || width > mainImgWidth) {
							var key = "bigger";
							$(".block-right__input_2").tooltip({
								content: contentToltip($(".block-right__input_2"), key),
								position: 'top'
							});


							return false;
							//console.log(false);
						}

						//console.log(true);

						$('.progress_1').fadeIn();
						$('.progress_1 .bar').css(
							'width', 0
						);
						$('#fileupload_2').attr("disabled", "disabled");
						$('#fileupload_1').attr("disabled", "disabled");
						$('.block-right__fileupload_1').addClass("disabled");
						$('.block-right__fileupload_0').addClass("disabled");
						data.formData = {
							img: data.files[0]
						}; //отправляем то что нам надо          
						data.submit(); // отправляем данные на сервер
						return true;
					};
				}


				//data.formData = {
				//	img: data.files[0]
				//}; //отправляем то что нам надо          
				//data.submit(); // отправляем данные на сервер

			},
			done: function (e, data) {
				$(this).removeAttr("disabled");
				$('#fileupload_1').removeAttr("disabled");
				$('.block-right__fileupload_1').removeClass("disabled");
				$('.block-right__fileupload_0').removeClass("disabled");

				if (!data.result.error) {
					_creareWaterMark(data, container); // проверить размер и запретить 
				} else {
					console.log(data.result.error);
					$(".block-right__input_2").tooltip({
						content: contentToltip($(".block-right__input_2"), data.result.error),
						position: 'top'
					});
				}
			},
			fail: function (e, data) {
				console.log("fail");
			},
			always: function (e, data) {
				//console.log(always);
			},
			change: function (e, data) {
				$('.tooltip').remove();
			},
			progressall: function (e, data) {
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('.progress_1 .bar').css(
					'width',
					progress + '%'
				);
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
					$(this).fadeIn(1000);
				});
			return mainImg;
		}

		container.empty();
		mainImg.appendTo(mainImgWrapper); // вставка картинки в обетку
		mainImgWrapper.appendTo(container); // вставка блока главнной картинки в разметкуcontainer.empty();

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

		/*if (imgWidth > mainImg.data("srcwidth") || imgHeight > mainImg.data("srchtight")) {
			//console.log("вотемарк больше исходной картинки загрузите картинку поменьше");
			var key = "bigger";
			$(".block-right__input_2").tooltip({
				content: contentToltip($(".block-right__input_2"), key),
				position: 'top'
			});
			return;
		}*/

		//console.log(data);

		$(".block-right__input_2").val(data.files[0].name);

		$('.tooltip').remove();

		if (!$('.watermark-img-wrapper').lenght) {
			$.when($('.watermark-img-wrapper').fadeOut()).then(function () {
				$('.watermark-img-wrapper').remove();
				var html = _createMarkup();
				html.appendTo(mainImgWrapper); // вставка картинки в картинку
			});
		} else {
			_createMarkup();
		}

		function _createMarkup() {
			var
				waterImgWrapper = $("<div>", {
					class: "watermark-img-wrapper",
					"data-pos-y": 0,
					"data-pos-x": 0
				})
				.css({
					"position": "absolute",
					"top": 0,
					"left": 0,
					"margin": 0,
					"padding": 0
				}),
				waterImg = $("<img>", {
					"src": "uploads/" + imgName,
					"class": "watermark-img",
					"data-srcHtight": imgHeight,
					"data-srcWidth": imgWidth,
					"data-ratio": mainImg.data("ratio"),
					"data-newWidth": imgWidth / mainImg.data("ratio"),
					"data-newHight": imgHeight / mainImg.data("ratio"),
					"data-opacity": 100
				})
				.css({
					"width": imgWidth / mainImg.data("ratio"),
					"height": imgHeight / mainImg.data("ratio"),
					"display": "none",
					"margin": 0,
					"padding": 0
				})
				.on("load", function () {
					$(this).fadeIn(10);
					$('#slider-range').slider("option", {
						value: 100
					});
					$(".block-right__radio_0").attr("checked", "checked");
					$("#spinner_0").spinner("value", 0);
					$("#spinner_1").spinner("value", 0);
					$('.btn__save').removeAttr('disabled');
					_returnWatermark();
				});

			waterImg.appendTo(waterImgWrapper); // вставка картинки  в обертку

			return waterImgWrapper;
		}

	}
	// функция передачи сгенерированного элемента
	function _returnWatermark() {
		if ($(".block-right__form").length) {
			position.init(); // активируем модуль позиционирования и передаем элемент
		}
		if ($(".btn__clear").length) {
			reset.init(); // активируем ресет
		}
		if ($("#slider-range").length) {
			opacity.init(); // активируем прозрачность
		}
		return;
	}
	// контент тултипов
	function contentToltip(elem, key) {

		var content = "";

		switch (key) {

		case "notImage":
			content = elem.attr("data-tooltip-not-image");
			break;

		case "tooBig":
			content = elem.attr("data-tooltip-too-big");
			break;

		case "bigger":
			content = elem.attr("data-tooltip-bigger");
			break;

		case "error":
			content = elem.attr("data-tooltip-error");
			break;

		}

		return content;
	}



	return {
		init: init
	};

})();

// Вызов модуля загрузки
if ($('#fileupload_1').length && $('#fileupload_2').length) {
	loadImages.init();
}
// активация спинеров
if ($("#spinner_0").length && $("#spinner_1").length) {
	position.spinersInit();
}
// активация слайдера
if ($('#slider-range').length) {
	opacity.sliderInit();
}
