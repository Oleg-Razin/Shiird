$(document).ready(function() {
	var header = $('.JS-header')

	header.each(function(){
		var menuToggle = $('.JS-nav-toggle');
		var menuWrap = $(this).find('.c-nav');
		var menu = $(this).find('.c-nav__wrap');
		var menuLink = $(this).find('.c-nav__link');
		var menuItem = $(this).find('.c-nav__item');

		function amimateMenuLink(){
			menuLink.each(function(){
				$(this).css('--animate-duration', '1.5s');
				$(this).addClass('animate__animated');
				if ($(this).hasClass('animate__bounceInRight')){
					$(this).removeClass('animate__bounceInRight');
					$(this).addClass('animate__bounceOutRight');
				}else{
					$(this).removeClass('animate__bounceOutRight');
					$(this).addClass('animate__bounceInRight');
				}
			})
		}

		function amimateMenuItem(){
			menuItem.each(function(){
				$(this).css('--animate-duration', '1s');
				$(this).addClass('animate__animated');
				if ($(this).hasClass('animate__bounceInLeft')){
					$(this).removeClass('animate__bounceInLeft');
					$(this).addClass('animate__bounceOutLeft');
				}else{
					$(this).removeClass('animate__bounceOutLeft');
					$(this).addClass('animate__bounceInLeft');
				}
			})
		}

		menuToggle.click(function(){
			$(this).toggleClass('active');
			menuWrap.slideToggle(500);
			amimateMenuItem()
			amimateMenuLink();

			$('body').toggleClass('overflow-hidden');
		})

		function resizeMenu(){
			if ($(window).width() > 992){
				menuToggle.removeClass('active');
				menuWrap.css('display','');
				menuLink.removeClass('animate__animated animate__bounceInRight animate__bounceOutRight' );
				menuItem.removeClass('animate__animated animate__bounceInLeft animate__bounceOutLeft' );
				$('body').removeClass('overflow-hidden');
			}
		};

		resizeMenu();
		
		$(window).resize(function () {
			resizeMenu();
		});
	});

	$(window).scroll(function() {
		var height = $(window).scrollTop();

		if(height > 10){
		$(header).addClass('o-header--fixed');
		} else{
		$(header).removeClass('o-header--fixed');
		}
	});
})