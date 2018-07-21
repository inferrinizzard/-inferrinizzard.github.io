$(function(){
    var type = String($(".count").attr("id"));
    var anchor = $("#anchor");
    var temp = $("<div></div>");
    temp.load("/test.html ." + type + ":eq(0)").html();
    temp = temp.html();
    anchor.append(temp);
    // anchor.load("/test.html ." + type + ":eq(1)");
    // anchor.load("/test.html ." + type + ":eq(2)");
})