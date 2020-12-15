
$(document).ready(function() {
	var heroSlider = $('.JS-hero-slider');

	if ($(heroSlider).length !== 0){
		$(heroSlider).each(function(){
			var sliderContainer = $(this).find('.swiper-container');
			var sliderPagination = $(this).find('.swiper-pagination')
			var slider = new Swiper($(sliderContainer),{
				loop: true,
				speed: 700,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				pagination: {
					el: sliderPagination,
					clickable: true,
        	renderBullet: function (index, className) {
          	return '<span class="' + className + '">' + 0 + (index + 1) + '</span>';
        	},
				}
			})
		})
	}

	var testimonialsSlider = $('.JS-testimonials');
	if ($(testimonialsSlider).length!==0){
		$(testimonialsSlider).each(function(){
			var sliderContainer = $(this).find('.swiper-container');
			var nextSlide = $(this).find('.c-testimonials__nav-btn--next');
			var prevSlide = $(this).find('.c-testimonials__nav-btn--prev');
			console.log('hi	')
			var slider = new Swiper($(sliderContainer),{
				speed: 300,
				loop: true,
				sliderContainer: true,

				navigation: {
					nextEl: nextSlide,
					prevEl: prevSlide,
				}
			})
		})
	}

	var header = $('.JS-header')
	$(window).scroll(function() {
		var height = $(window).scrollTop();

		if(height > 10){
		$(header).addClass('o-header--fixed');
		} else{
		$('header').removeClass('o-header--fixed');
		}
	});

	header.each(function(){
		var menuToggle = $('.JS-nav-toggle');
		var menuWrap = $(this).find('.c-nav');
		var menu = $(this).find('.c-nav__wrap');

		function menuColumn(){
			$(menu).toggleClass('flex-column justify-content-between align-items-end');
		}

		menuToggle.click(function(){
			$(this).toggleClass('active');
			menuWrap.fadeToggle(500);

			menuColumn();

			$('body').toggleClass('overflow-hidden');
		})


		function resizeMenu(){
			if ($(window).width() > 992){
				menuToggle.removeClass('active');
				menu.css('display','');
				menu.removeClass('flex-column justify-content-between align-items-end');
				$('body').removeClass('overflow-hidden');
			}
		};

		resizeMenu();
		
		$(window).resize(function () {
			resizeMenu();
		});
	});
});


