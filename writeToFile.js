function saveTextAsFile(){
    var title = document.getElementById("title").value;
    var video = document.getElementById("video").value;
    var header = document.getElementById("header").value;
    var body = document.getElementById("body").value;
    
    var d = new Date();
    var date = [d.getDate(),d.getMonth()+1,d.getFullYear()].join("/");

    var text = [title,video,header,body,date].join(" $ ") + " $ ";

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