$(function(){
    var type = $(".count").attr("id");
    var anchor = $(".col-md-4 #anchor");
    anchor.load("/test.html ." + type + ":eq(0)");
    // anchor.load("/test.html ." + type + ":eq(1)");
    // anchor.load("/test.html ." + type + ":eq(2)");
})