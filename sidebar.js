$(function(){
    var type = $(".count").attr("id");
    $(".col-md-4 #anchor").load("/test.html ." + type + ":eq(0)");
    $(".col-md-4 #anchor").load("/test.html ." + type + ":eq(1)");
    $(".col-md-4 #anchor").load("/test.html ." + type + ":eq(2)");
})