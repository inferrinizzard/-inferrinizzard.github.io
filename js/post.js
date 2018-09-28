var nextPages = [];

$(function(){
	initCarousel();

    var type = String($(".count").attr("id"));
    var anchor = $("#anchor");
    var temp = $("<div></div>");
    temp.load("/index.html ." + type + ":eq(0)").html();
    anchor.append(temp);
    temp = $("<div></div>");
    temp.load("/index.html ." + type + ":eq(1)").html();
    anchor.append(temp);
    temp = $("<div></div>");
    temp.load("/index.html ." + type + ":eq(2)").html();
		anchor.append(temp);
		
		// $('.container-fluid').infiniteScroll({
		// 	path: function() {
		// 		return nextPages[ this.loadCount ] + '.html';
		// 	},
		// 	// options...
		// });

		
});

function initCarousel(){
	var $carouselM = $('.carousel-main').flickity({
		percentPosition: false,
		pageDots: false,
		wrapAround: true,
		fullscreen: true,
		adaptiveHeight: true
	});
		
	$('.carousel-nav').flickity({
		asNavFor: '.carousel-main',
		pageDots: false,
		prevNextButtons: false,
		wrapAround: true
	});

	var $carouselVid = $('#carouselVid');
	$('#vidHolder').replaceWith($carouselVid);
	$carouselVid[0].setAttribute("style","display: block; max-height: 600px;");
	
	var $imgs = $carouselM.find('.carousel-cell img');
	if($carouselM.find('.carousel-cell video').length>0){
		$imgs.push($carouselM.find('.carousel-cell video')[0]);
	}
	// get transform property
	var docStyle = document.documentElement.style,
		transformProp = typeof docStyle.transform == 'string' ? 'transform' : 'WebkitTransform',
		flkty = $carouselM.data('flickity');

	$carouselM.on( 'scroll.flickity', function(){
		flkty.slides.forEach( function(slide, i){
			var img = $imgs[i],
				x   = 0;
	
			if(0 === i){
				x = Math.abs(flkty.x) > flkty.slidesWidth ? (flkty.slidesWidth + flkty.x + flkty.slides[flkty.slides.length-1].outerWidth + slide.target) : (slide.target + flkty.x);
			} 
			// else if(i === flkty.slides.length-1){
			// 	x = Math.abs(flkty.x) + flkty.slides[i].outerWidth < flkty.slidesWidth ? (slide.target - flkty.slidesWidth + flkty.x - flkty.slides[i].outerWidth) : (slide.target + flkty.x);
			// }
			else{
				x = slide.target + flkty.x;
			}
			img.style[transformProp] = 'translateX(' + x * ( -1 / 3 ) + 'px)';
		});
	});

	$carouselM.on('fullscreenChange.flickity', function(event, isFullscreen){
		if(isFullscreen)
			$('.navbar').hide();
		else
			$('.navbar').show();
	});
}