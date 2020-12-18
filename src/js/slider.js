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

	
})