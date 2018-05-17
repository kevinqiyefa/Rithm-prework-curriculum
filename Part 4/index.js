window.onload=function() {
  var button = document.getElementById("addMeme");
  button.onclick = addItem;
}   


function addItem() {
  var imgURL = document.getElementById("imgURL").value;  //getting input URL value

  //check for valid url
  if(!isURL(imgURL)){
    alert("Please enter a valid image url!");
    return;
  }

  var textTop = document.getElementById("textTop").value; //getting input text on top value
  var textBottom = document.getElementById("textBottom").value; //getting input text on bottom value

  var main = document.getElementById("imgs");  //getting element <main> to add element
  
  //create image span
  var span = document.createElement("span")
  span.setAttribute("id", "img-span");

  //close button overlay
  var x = document.createElement("span");
  x.setAttribute("id", "img-overlay");
  x.innerHTML = "&times";

  //create element for text on top of image
  var textOnTop = document.createElement("span")
  
  //create element for text on bottom of image
  var textOnBottom = document.createElement("span")

  //creating img element to add
  var image = document.createElement("IMG");  
  image.setAttribute("src", imgURL);
  image.setAttribute("id", "img");
  image.setAttribute("alt", "meme image");

  //create onclick event for deleting the image
  span.onclick = function() {this.parentNode.removeChild(this);}

  main.appendChild(span);
  span.appendChild(image);
  span.appendChild(x);


  //check if there's text for text on top and append to the image element 
  if(textTop){
    textOnTop.setAttribute("id", "text-top");
    textOnTop.innerHTML = textTop;
    span.appendChild(textOnTop);
  }

  //check if there's text for text on bottom and append to the image element 
  if(textBottom){
    textOnBottom.setAttribute("id", "text-bottom");
    textOnBottom.innerHTML = textBottom;
    span.appendChild(textOnBottom);
  }


  //clear input image url
  document.getElementById("imgURL").value = ""; 

  // clear text on the top of image
  document.getElementById("textTop").value = "";

  // clear text on the bottom of image
  document.getElementById("textBottom").value = "";
}


// check valid url
function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?'+ // port
  '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
  '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}