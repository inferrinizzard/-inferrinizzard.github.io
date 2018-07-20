$(function(){
    var type = String($(".count").attr("id"));
    alert(type);
    var anchor = $(".side-bar #anchor");
    anchor.load("/test.html ." + type + ":eq(0)");
    anchor.load("/test.html ." + type + ":eq(1)");
    anchor.load("/test.html ." + type + ":eq(2)");
    alert(anchor);
})