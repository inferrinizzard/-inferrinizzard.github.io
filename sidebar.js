$(function(){
    var type = String($(".count").attr("id"));
    var anchor = $("#anchor");
    var temp = $("<div></div>");
    // temp.load("/index.html ." + type + ":eq(0)").html();
    temp.load("/test.html ." + type + ":eq(0)").html();
    // temp = temp.html();
    anchor.append(temp);
    temp = $("<div></div>");
    // temp.load("/index.html ." + type + ":eq(1)").html();
    temp.load("/test.html ." + type + ":eq(1)").html();
    anchor.append(temp);
    temp = $("<div></div>");
    // temp.load("/index.html ." + type + ":eq(2)").html();
    temp.load("/test.html ." + type + ":eq(2)").html();
    anchor.append(temp);
})