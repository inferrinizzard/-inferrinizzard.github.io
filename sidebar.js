$(function(){
    var type = $(".count").attr("id");
    var anchor = $(".side-bar #anchor");
    anchor.load("/test.html ." + type + ":eq(0)");
    // anchor.load("/test.html ." + type + ":eq(1)");
    // anchor.load("/test.html ." + type + ":eq(2)");
})