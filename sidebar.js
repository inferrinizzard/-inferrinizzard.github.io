$(function(){
    var type = String($(".count").attr("id"));
    var anchor = $("#anchor");
    anchor.append($("<div>").load("/test.html ." + type + ":eq(0)").html());
    // anchor.load("/test.html ." + type + ":eq(1)");
    // anchor.load("/test.html ." + type + ":eq(2)");
})