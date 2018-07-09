function saveTextAsFile(){
    var title = document.getElementById("title").value;
    var video = document.getElementById("video").value;
    var body = document.getElementById("body").value;
    var category =  document.getElementById("category").value;
    
    var d = new Date();
    var date = [d.getDate(),d.getMonth()+1,d.getFullYear()].join("/");

    var article = newArticle(title, date, category);

    var text = [title,video,body,date].join(" $ ") + " $ % " + article + " %";

    var textToSaveAsBlob = new Blob([text], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function newArticle(titleText, dateText, type) {
    var article = document.createElement('article');
    article.classList.add("grid-item", type);

    var link = document.createElement('a');
    var linkAnchor = "posts/"+titleText+".html";
    link.setAttribute('href',linkAnchor);
    article.appendChild(link);

    var img = document.createElement('img');
    var imgFile = "img/"+titleText+".png";
    img.setAttribute('src',imgFile);
    link.appendChild(img);

    var section = document.createElement('section');
    link.appendChild(section);

    var vignette = document.createElement('div');
    vignette.setAttribute('id',"vignette");
    section.appendChild(vignette);

    var title = document.createElement('span');
    var titleNode = document.createTextNode(titleText + " - ");
    title.appendChild(titleNode);
    vignette.appendChild(title);

    var date = document.createElement('span'); 
    date.setAttribute('class', "date");
    var dateNode = document.createTextNode(dateText);
    date.appendChild(dateNode);
    vignette.appendChild(date);

    var line = document.createElement('hr');
    vignette.appendChild(line);

    var category = document.createElement('h4');
    var catNode = document.createTextNode(type);
    category.appendChild(catNode);
    vignette.appendChild(category); 

    return article.outerHTML;
}

function destroyClickedElement(event){
    document.body.removeChild(event.target);
}

function loadFileAsText(){
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("inputTextToSave").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}