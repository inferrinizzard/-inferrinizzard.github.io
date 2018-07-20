$(function(){
    var type = String($(".count").attr("id"));
    var anchor = $("#anchor");
    anchor.load("/test.html ." + type + ":eq(0)");
    anchor.load("/test.html ." + type + ":eq(1)");
    anchor.load("/test.html ." + type + ":eq(2)");
})