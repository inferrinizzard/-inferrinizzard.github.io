$(function(){
    var type = $(".count").attr("id");
	$(".col-md-4 #anchor").load("/test.html ." + type + ":eq(0)");
})