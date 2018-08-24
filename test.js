$(function(){
	var $carouselM = $('.carousel-main').flickity({
		percentPosition: false,
		pageDots: false,
		wrapAround: true,
		fullscreen: true
	});
		
	$('.carousel-nav').flickity({
		asNavFor: '.carousel-main',
		pageDots: false,
		prevNextButtons: false,
		wrapAround: true
	});

	var $imgs = $carouselM.find('.carousel-cell img');
	// get transform property
	var docStyle = document.documentElement.style;
	var transformProp = typeof docStyle.transform == 'string' ?
	'transform' : 'WebkitTransform';
	// get Flickity instance
	var flkty = $carouselM.data('flickity');
	
	$carouselM.on('scroll.flickity', function(){
			flkty.slides.forEach( function( slide, i){
				var img = $imgs[i],
					x  = 0;
		
					if(0 === i){
						x = Math.abs( flkty.x ) > flkty.slidesWidth ? ( flkty.slidesWidth + flkty.x + flkty.slides[flkty.slides.length-1].outerWidth + slide.target ) : ( slide.target + flkty.x );
					} 
					else if(i === flkty.slides.length-1){
						x = Math.abs( flkty.x ) + flkty.slides[i].outerWidth < flkty.slidesWidth ? ( slide.target - flkty.slidesWidth + flkty.x - flkty.slides[i].outerWidth ) : ( slide.target + flkty.x );
					}
					else{
						x = slide.target + flkty.x;
					}
				img.style[transformProp] = 'translateX(' + x * ( -1 / 3 ) + 'px)';
			});
		});
});