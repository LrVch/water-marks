// тултипы кастом
$.fn.tooltip = function (options) {

	options = {
		position: options.position || 'right',
		content: options.content || "i'am tooltip"
	};

	var
		markup = '<div class="tooltip tooltip_' + options.position + '">' +
		'<div class="tooltip__inner">' + options.content + '</div>' +
		'</div>';

	var
		$this = this,
		body = $('body');

	$this
		.addClass('tooltipstered')
		.attr('data-tooltip-position', options.position);

	body.append(markup);

	_positionIt($this, body.find('.tooltip').last(), options.position);

	/*$(document).on('click', function () {
		$('.tooltip').remove();
	});*/

	$(window).resize(function () {
		var
			tooltips = $('.tooltip');

		var
			tooltipsArray = [];

		tooltips.each(function () {
			tooltipsArray.push($(this));
		});

		$('.tooltipstered').each(function (index) {
			var
				position = $(this).data('tooltip-position');

			_positionIt($(this), tooltipsArray[index], position);
		});
	});


	function _positionIt(elem, tooltip, position) {

		// измеряем элемент

		var
			elemWidth = elem.outerWidth(true),
			elemHeight = elem.outerHeight(true),
			topEdge = elem.offset().top,
			bottomEdge = topEdge + elemHeight,
			leftEdge = elem.offset().left,
			rigthEdge = leftEdge + elemWidth;

		// измеряем тултип

		var
			tooltipWidth = tooltip.outerWidth(true),
			tooltipHeight = elem.outerHeight(true),
			leftCentered = (elemWidth / 2) - (tooltipWidth / 2),
			topCentered = (elemHeight / 2) - (tooltipHeight / 2);

		var
			positions = {};

		switch (position) {
		case 'right':
			positions = {
				left: rigthEdge,
				top: topEdge + topCentered
			};
			break;
		case 'top':
			positions = {
				left: leftEdge + leftCentered,
				top: topEdge - tooltipHeight
			};
			break;
		case 'bottom':
			positions = {
				left: leftEdge + leftCentered,
				top: bottomEdge
			};
			break;
		case 'left':
			positions = {
				left: leftEdge - tooltipWidth,
				top: topEdge + topCentered
			};
			break;
		}

		tooltip
			.offset(positions)
			.css('opacity', '1');
	}
};