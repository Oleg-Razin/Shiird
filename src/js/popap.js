
$(document).ready(function($) {
	const pageBody = $('body');
	$('.JS-contact-popap').magnificPopup({
		type: 'inline',
		mainClass: 'c-popap-wrapper',
		showCloseBtn: false,
		fixedContentPos: true,
		fixedBgPos: true,
		midClick: true,
		overflowY: 'auto',
		removalDelay: 300,
		// callbacks: {
		// 	beforeOpen: function() {
		// 			pageBody.addClass('c-popup--helper');
		// 			var documentOfsset = $(window).scrollTop();
		// 			$('html').css('height', '100%');
		// 			pageBody.css({'position':'fixed',
		// 										'top': -documentOfsset});
		// 	},
		// 	open: function() {
		// 			$('html').css('margin-right', 0);
		// 	},
		// 	close: function() {
		// 			pageBody.removeClass('c-popup--helper');
		// 			var scrollY = document.body.style.top;
		// 			$('html').css('height', '');
		// 			pageBody.css({'position':'',
		// 										'top': ''});
		// 			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		// 	}
		// }
	})
	$(document).on('click', '.JS-close-popap', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
	

});