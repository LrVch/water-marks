$(function () {

	$('.icons__language-link').on('click', function (e) {
		e.preventDefault();
	});

	$('.icons__language-link_rus').on('click', function () {

		$('#eng').removeClass('active');
		$('#rus').addClass('active');

		$('.block-left__title').html('Генератор водяных знаков');
		$('.block-right__title').html('Настройки');
		$('.block-right__lbl').html('Исходное изображение');
		$('.block-right__lbl').last().html('Водяной знак');
		$('.block-right__form-title').html('Положение');
		$('.block-right__form-title').last().html('Прозрачность');
		$('.btn__clear').html('Сброс');
		$('.btn__save').html('Скачать');
		$('.footer').html('© 2015, Это мой сайт, пожалуйста, не копируйте и не воруйте его');

		$('.block-right__input_1, .block-right__input_2').attr({
			'tooltip-not-image': 'Вы загрузили не картинку',
			'tooltip-too-big': 'Вы загрузили картинку больше 2Мб',
			'tooltip-bigger': 'Вотемарк больше исходной картинки',
			'tooltip-error': 'Произошла ошибка!'
		});
	});

	$('.icons__language-link_eng').on('click', function () {

		$('#rus').removeClass('active');
		$('#eng').addClass('active');

		$('.block-left__title').html('Watermarks generator');
		$('.block-right__title').html('Settings');
		$('.block-right__lbl').html('Original image');
		$('.block-right__lbl').last().html('Watermark');
		$('.block-right__form-title').html('Place');
		$('.block-right__form-title').last().html('Transparency');
		$('.btn__clear').html('Reset');
		$('.btn__save').html('Download');
		$('.footer').html('© 2015, This is my website, please do not copy or steal it');

		$('.block-right__input_1, .block-right__input_2').attr({
			'tooltip-not-image': 'You did not download the picture',
			'tooltip-too-big': 'You uploaded an image large than 2Mb',
			'tooltip-bigger': 'Watemark larger than image',
			'tooltip-error': 'An error has occurred!'
		});
	})
});
