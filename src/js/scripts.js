
$(document).ready(function() {
	var heroSlider = $('.JS-hero-slider');

	if ($(heroSlider).length !== 0){
		console.log('sdfas')
		$(heroSlider).each(function(){
			var sliderContainer = $(this).find('.swiper-container');
			var slider = new Swiper($(sliderContainer),{
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
        	renderBullet: function (index, className) {
          	return '<span class="' + className + '">' + 0 + (index + 1) + '</span>';
        	},
				}
			})
		})
	}
});


