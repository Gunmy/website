
/*
var unorderedList = document.createElement("ul");
var listItem = document.createElement("li");
var article = document.createElement("article");
var header = document.createElement("h2");
var p = document.createElement("p");

header.appendChild(document.createTextNode("Testing"));
p.appendChild(document.createTextNode("Testindfsdf fsd fsf sdf sdfsd  fsdffsdfsdsdfdfssdfdfdfssdfsdfsdfg"));

article.appendChild(header);
article.appendChild(p);

listItem.appendChild(article);
unorderedList.appendChild(listItem);
var main = document.getElementById("aboutMe");
console.log(main);
main.appendChild(unorderedList);
*/



function createListItem (id, linkOrArticle, header, paragraphs, images, videos) {
        console.log("done");

   
    var branch = document.getElementById(id);
    var list = branch.getElementsByTagName('ul')[0]
    console.log(list);
    var listItem = document.createElement("li");
    var container = 0;
    if (linkOrArticle != "") {
        container = document.createElement("a");
        container.href = linkOrArticle;
    } 
    else {
        container = document.createElement("article");
    }

    list.appendChild(listItem);
    listItem.appendChild(container);

    //Content
    var h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(header));
    container.appendChild(h3);

    for (const paragraph of paragraphs) {
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(paragraph));
        container.appendChild(p);
    }

    for (const image of images) {
        var img = document.createElement("img");
        img.src = image;
        container.appendChild(img);
    }

    for (const video of videos) {
        var vid = document.createElement("video");
        vid.src = video;
        vid.controls = true;
        container.appendChild(vid);
    }
}   

