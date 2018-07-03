function appendPost(type) {
    var parent = document.getElementById(type);
    var article = document.createElement('article');
    parent.appendChild(article);
    var link = document.createElement('a');
    article.appendChild(link);
    var title = document.createElement('h2')
    var line = document.createElement('hr');
    var media = document.createElement('embed');
    link.appendChild(title);
    link.appendChild(line);
    link.appendChild(media);
    title.innerHTML = test;
    
}