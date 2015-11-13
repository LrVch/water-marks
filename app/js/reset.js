var reset = (function () {

	function init() {
		_setUpListners();
		_modules();
	};

	function _setUpListners() {
		$('.btn__clear').on('click', _reset);
		$('#fileupload_1').on("change", _reset);
	};

	function _modules() {
		_buttonResetUnlock();
		//console.log("remove disabled");
	};

	function _buttonResetUnlock() {
		$('.btn__clear').removeAttr("disabled");
	}

	function _reset(e) {
		e.preventDefault();

		var
			startCheck = $(".block-right__radio_0"),
			waterImgWrapper = $(".watermark-img-wrapper");
	
		if (this.id === "fileupload_1") {
      
      if (this.files[0].size > 2097152 || !this.files[0].type.match(/^image\/(gif|jpeg|png)$/)) {
        return;
      }

			$(".block-right__radio_0").attr("checked", "checked");
			$(".block-right-place__table").find("input").attr("disabled", "disabled");
			$('.btn__clear').attr("disabled", "disabled");
			$('.btn__save').attr("disabled", "disabled");
			$(".block-right__input_2").val("image.jpg");
			$("#spinner_0").spinner("value", 0);
			$("#spinner_1").spinner("value", 0);
			$("#spinner_0").spinner({
				disabled: true,
				value: 0
			});
			$("#spinner_1").spinner({
				disabled: true,
				value: 0
			});
			$('#slider-range').slider("option", {
				disabled: true,
				value: 100
			});
      $(".block-right-place__lbl").css({"cursor": "default"});
      $(".ui-slider .ui-slider-handle").removeClass("pointer");
		} else {
      $('.tooltip').remove();
			$.when(waterImgWrapper.fadeOut()).then(function () {
				waterImgWrapper.css({
					"top": 0,
					"left": 0
				}).fadeIn();
				waterImgWrapper.find(".watermark-img").css({
					"opacity": 1
				})
			});
			startCheck.attr("checked", "checked");
			$("#spinner_0").spinner("value", 0);
			$("#spinner_1").spinner("value", 0);
			$('#slider-range').slider("option", {
				value: 100
			});

		}
	};

	return {
		init: init
	};

})();