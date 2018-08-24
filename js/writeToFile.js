function saveTextAsFile(){
    var title = document.getElementById("title").value;
    var video = document.getElementById("video").checked;
		var image = parseInt(document.getElementById("image").value);
		var imgTit = document.getElementById("imgTitle").value;
    var body = document.getElementById("body").value;
    var category =  document.getElementById("category").value;
    
    var d = new Date();
    var date = [d.getDate(),d.getMonth()+1,d.getFullYear()].join("/");

    var article = newArticle(title, date, category, imgTit);

    var media = carousel(imgTit, video, image);

    var text = [title,body,date,category].join(" $ ") + " $ % " + article + " % @ " + media + " @ ";

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

function newArticle(titleText, dateText, type, imgTit) {
    var article = document.createElement('article');
    article.className = "grid-item " + type;

    var link = document.createElement('a');
    var linkAnchor = "/posts/"+titleText+".html";
    link.href = linkAnchor;
    article.appendChild(link);

    var img = document.createElement('img');
    var imgFile = "/img/"+imgTit+".png";
    img.src = imgFile;
    link.appendChild(img);

    var section = document.createElement('section');
    link.appendChild(section);

    var vignette = document.createElement('div');
    vignette.id = "vignette";
    section.appendChild(vignette);

    var title = document.createElement('span');
    var titleNode = document.createTextNode(titleText + " - ");
    title.appendChild(titleNode);
    vignette.appendChild(title);

    var date = document.createElement('span'); 
    date.className = "date";
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

function carousel(imgTit, video, image){
		var wrapper = document.createAttribute('section');
		wrapper.className = "carousel";
    var main = document.createElement('div');
    main.className = "carousel-main";
    var thumb = document.createElement('div');
		thumb.className = "carousel-nav";
		
		for(var i=1;i<=image;i++){
			var temp = document.createAttribute('div');
			temp.class = "carousel-cell";
			var img = document.createAttribute('img');
			img.src = "/img/" + imgTit + " (" + i + ").png";
			temp.appendChild(img);
			main.appendChild(temp);
			var temp2 = temp.cloneNode();
			thumb.appendChild(temp2);
			temp2.appendChild(img.cloneNode());
		}
		if(video){
			var temp = document.createAttribute('div');
			var holder = document.createAttribute('img');
			holder.src = "/img/" + imgTit + ".png";
			holder.id = "vidHolder";
			var vid = document.createAttribute('video');
			vid.src = "/img/" + imgTit + ".mp4";
			vid.id = "carouselVid";
			temp.appendChild(holder);
			temp.appendChild(vid);
			main.appendChild(temp);
			thumb.appendChild(holder.cloneNode());
		}
		wrapper.appendChild(main);
		wrapper.appendChild(thumb);
    // if(video){
    //     var videoCItem = document.createElement('div');
    //     videoCItem.className = "carousel-item active";
    //     var videoWrap = document.createElement('div');
    //     videoWrap.className = "flex-item video-content embed-responsive embed-responsive-16by9";
    //     videoCItem.appendChild(videoWrap);
		// 		var videoElem = document.createElement('video');
		// 		videoElem.controls = true;
		// 		videoElem.id = "carouselVid";
    //     videoElem.src = "/img/" + imgTit + ".mp4"
    //     videoWrap.appendChild(videoElem);
    //     temp.appendChild(videoCItem);

    //     var vThumbli = document.createElement("li");
    //     vThumbli.setAttribute('data-target', '#imgCarousel');
    //     vThumbli.setAttribute('data-slide-to', '0');
    //     vThumbli.className = "active";
    //     var vThumbimg = document.createElement('img');
    //     vThumbimg.src = "/img/" + imgTit + ".png";
    //     vThumbimg.className = "img-responsive";
    //     vThumbli.appendChild(vThumbimg);
    //     thumb.appendChild(vThumbli);
    // }

    // for(var i=1; i<=image; i++){
    //     var imgCItem = document.createElement('div');
    //     imgCItem.className = "carousel-item";
    //     var imgElem = document.createElement('img');
    //     imgElem.className = "d-block w-100";

    //     var iThumbli = document.createElement('li');
    //     iThumbli.setAttribute('data-target', '#imgCarousel');
    //     var iThumbimg = document.createElement('img');
    //     iThumbimg.className = "img-responsive";

    //     if(i==1&&!video){
    //         imgCItem.classList.add("active");
    //         imgElem.src = "/img/" + imgTit + ".png";

    //         iThumbli.setAttribute('data-slide-to', "0");
    //         iThumbli.className = "active";
    //         iThumbimg.src = "/img/" + imgTit + ".png";
    //     }
    //     if(i>0){
    //         imgElem.src = "/img/" + imgTit + " (" + i + ").png";
    //         iThumbli.setAttribute('data-slide-to', i);
    //         iThumbimg.src = "/img/" + imgTit + " (" + i + ").png";
    //     }

    //     iThumbli.appendChild(iThumbimg);
    //     thumb.appendChild(iThumbli);

    //     imgCItem.appendChild(imgElem);
    //     temp.appendChild(imgCItem);
    // }

    return wrapper.outerHTML;
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