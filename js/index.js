var $window = $(window),
	buttons = $('#button-group')[0],
	didScroll = false;

$(function(){
 
	$window.scroll(function(){didScroll = true;});
	
	setInterval(function(){
		if(didScroll){
			didScroll = false;
			if($window.scrollTop()>=buttons.offset().top){
			}
		}
	}, 250);
});