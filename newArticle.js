function appendPost(type) {
    var id = toString(type);

    var parent = document.getElementById(id);
    var article = document.createElement('article');
    parent.appendChild(article);

    var link = document.createElement('a');
    var linkAnchor = "";
    link.setAttribute('href',linkAnchor);
    article.appendChild(link);

    var img = document.createElement('img');
    var imgFile = Image;
    img.setAttribute('src',imgFile);
    link.appendChild(img);

    var section = document.createElement('section');
    link.appendChild(section);

    var vignette = document.createElement('div');
    vignette.setAttribute('id',"vignette");
    section.appendChild(vignette);

    var title = document.createElement('span');
    var titleText = "";
    var titleNode = document.createTextNode(titleText + " - ");
    title.appendChild(titleNode);
    vignette.appendChild(title);

    var date = document.createElement('span'); 
    date.setAttribute('class', "date");
    var dateText = "";
    var dateNode = document.createTextNode(dateText);
    date.appendChild(dateNode);
    vignette.appendChild(date);

    var line = document.createElement('hr');
    vignette.appendChild(hr);

    var caption = document.createElement('h4');
    var captText = "";
    var captNode = document.createTextNode(captText);
    caption.appendChild(captText);
    vignette.appendChild(caption);  

}