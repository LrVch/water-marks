var download = (function () {

	var init = function () {
		//$('.btn__save').removeAttr('disabled');
		_setUpListners();
	};

	var _setUpListners = function () {
		$('.btn__save').on('click', _createResult);
	};

	var _createResult = function (e) {
		var request_data = new Object();

		request_data = {
			bg_img: $('.main-img').attr('src'),
			wm_img: $('.watermark-img').attr('src'),
			ratio: $('.watermark-img').attr('data-ratio'),
			pos_x: $('.watermark-img-wrapper').attr('data-pos-x'),
			pos_y: $('.watermark-img-wrapper').attr('data-pos-y'),
			opacity: $('.watermark-img').attr('data-opacity')
		};


		e.preventDefault();

		//console.log(request_data);

		$.ajax({
				type: "POST",
				url: "./php/download.php",
				data: request_data
			})
			.done(function (data) {
				//console.log("success");
				//console.log(data);
				var link = document.createElement('a');
				//link.setAttribute('href', 'result/' + data);
				link.setAttribute('href', 'php/file.php?filename=' + data.imgName);
				//link.setAttribute('download', data);
				document.body.appendChild(link);
				onload = link.click();
				//var script = document.createElement('script');
				//script.src = "js/loader.js";
				//document.body.appendChild(script);
//
//				script.onload = function (data) {
//
//					link.click();
//					console.log(data);
//				}

			})
			.fail(function () {
				console.log("error");
			})
			.always(function (data) {
				//console.log("complete");
			});

		//console.log('hit!');
		//console.log();

	};

	return {
		init: init
	};
})();

if ($('.btn__save')) {
	download.init();
}