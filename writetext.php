<?php
    $post = fopen("post.txt","w");
    $title = $_POST['title']+"\n";
    $date = $_POST['date']+"\n";
    $video = $_POST['video']+"\n";
    $body = $_POST['body']+"\n" ;
    fwrite($post,$title);
    fwrite($post,$date);
    fwrite($post,$video);
    fwrite($post,$body);
    fclose($post);
?>