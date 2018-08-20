var nextPages = [];

$(function(){
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

		if($('#carouselVid').playing){
			$('#imgCarousel').carousel('pause');
		}
		else{$('#imgCarousel').carousel('cycle');}
});

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
	get: function(){
			return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
	}
});