
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

	var header = $('.o-header')
	$(window).scroll(function() {
		var height = $(window).scrollTop();

		if(height > 100){
		$(header).addClass('o-header--fixed');
		} else{
		$('header').removeClass('o-header--fixed');
		}
		
		});
});


