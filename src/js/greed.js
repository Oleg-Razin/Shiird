$(document).ready(function() {
	
	$('.c-grid').isotope({
		layoutMode: 'packery',
		itemSelector: '.с-grid__item',
		masonry: {
				columnWidth: '.c-grid__sizer'
		},
		percentPosition: true
	});
});