var $grid = $('.grid').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    }); 
  });

// function appendPost(titleText, dateText, type) {
//     var parent = document.getElementById("anchor");
//     var article = document.createElement('article');
//     article.setAttribute('class', "grid-item");
//     parent.appendChild(article);

//     var link = document.createElement('a');
//     var linkAnchor = "posts/"+type+"/"+titleText+".html";
//     link.setAttribute('href',linkAnchor);
//     article.appendChild(link);

//     var img = document.createElement('img');
//     var imgFile = "img/"+titleText+".png";
//     img.setAttribute('src',imgFile);
//     link.appendChild(img);

//     var section = document.createElement('section');
//     link.appendChild(section);

//     var vignette = document.createElement('div');
//     vignette.setAttribute('id',"vignette");
//     section.appendChild(vignette);

//     var title = document.createElement('span');
//     var titleNode = document.createTextNode(titleText + " - ");
//     title.appendChild(titleNode);
//     vignette.appendChild(title);

//     var date = document.createElement('span'); 
//     date.setAttribute('class', "date");
//     var dateNode = document.createTextNode(dateText);
//     date.appendChild(dateNode);
//     vignette.appendChild(date);

//     var line = document.createElement('hr');
//     vignette.appendChild(line);

//     var catLink = document.createElement('a');
//     var catLinkA = "posts/"+type+".html"
//     catLink.setAttribute('href', catLinkA);
//     vignette.appendChild(catLink);

//     var category = document.createElement('h4');
//     var catNode = document.createTextNode(type);
//     category.appendChild(catNode);
//     catLink.appendChild(category);  
// }