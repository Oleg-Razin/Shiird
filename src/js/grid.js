$(document).ready(function() {
	
	var gridContainer = $('.c-grid');

	function gridPosition(){
		var gridItem = $(gridContainer).find('.с-grid__item');

		var gridItemsArray = [];
		
		gridItem.each(function(){
			var gridItemVisible = $(this).css('display');
			if (gridItemVisible == 'block'){
				$(this).filter(':nth-child(2n)').addClass('с-grid__item--left');
				$(this).filter(':nth-child(2n+1)').addClass('с-grid__item--right');
			}
		});
		console.log(gridItemsArray)
	}

	gridPosition();

	var $grid = $(gridContainer).isotope({
		layoutMode: 'packery',
		itemSelector: '.с-grid__item',
		masonry: {
				columnWidth: '.c-grid__sizer'
		},
		percentPosition: true
	});

	$('.filter-button-group').on( 'click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
		gridPosition();
	});
	

});