function convert(){
    let file  = document.getElementById("file").files[0];
    if(typeof file === undefined){
        console.log('Lütfen bir dosya seçin');
        return;
    }
    if(file.name.endsWith(".udf") === false){
        return;
    }
    JSZip.loadAsync(file).then(function(archive){
        if(archive.files.length > 1){
            return;
        }
        return archive.files["content.xml"].async("text");
    }).then(function(text){
        let parser = new DOMParser();
        let xml = parser.parseFromString(text,"text/xml");
        let content = xml.getElementsByTagName("content")[0].childNodes[0].nodeValue;
        document.getElementById("output").innerHTML = content;
    });;
}