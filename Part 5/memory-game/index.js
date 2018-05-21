
var firstCardObj={};
var flipCardArr = [];
var gameScore = 0;
var count = 0;


window.onload=function() {

  //preload images
  preloadImgs();

  if(localStorage.getItem("best_score")){
    console.log(localStorage.getItem("best_score"));
    document.getElementById("best-score").innerHTML = localStorage.getItem("best_score");
  } else{
    document.getElementById("best-score").innerHTML = "--";
  }

  var button = document.getElementById("start");
  button.onclick = createGame;
}

function createGame(){
  var btnText = document.getElementById("start-text");
  btnText.innerHTML = "RESTART"

  var g = document.getElementById("game");
  var cardsDiv = document.createElement("DIV");
  cardsDiv.setAttribute("id", "cards");

  g.removeChild(document.getElementById("cards"));
  g.appendChild(cardsDiv);



  g.scrollIntoView(true);

  //Generate random image url
  var imgArr1 = ["cat",
                "playing",
                "running",
                "love",
                "minion",
                "typing",
                "dog",
                "thinking",
                "eyes",
                "pikachu",
                "gangnam",
                "pusheen"];

  var imgArr2 = imgArr1.slice();  
  var randomArr = shuffleArray(imgArr1.concat(imgArr2));

  
  //create game cards
  createCards(randomArr);

  //flip card
  flipCard();
 
}

function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
}

function preloadImgs(){
  // preload gif files
  var arr = ["cat",
              "playing",
              "running",
              "love",
              "minion",
              "typing",
              "dog",
              "thinking",
              "eyes",
              "pikachu",
              "gangnam",
              "pusheen",
              "cool-face"];

    var hide = document.getElementById("hide");
    var tempGifUrl;
    for(let i = 1; i <= arr.length; i++){
      
      var image = document.createElement("IMG")
      if(i === arr.length){
        tempGifUrl = "./pic/"+arr[i-1]+".jpg";
      } else {
        tempGifUrl = "./pic/"+arr[i-1]+".gif";
      }
      image.setAttribute("src", tempGifUrl);
      hide.appendChild(image);

    }  
}

function createCards(arr){
  var cards = document.getElementById("cards");

  //create card front and back
  for(let i = 1; i <= arr.length; i++){

    var card = document.createElement("DIV");
    var card_front = document.createElement("DIV");
    var card_back = document.createElement("DIV");


      //score
      if(i===13){
        var div = document.createElement("DIV");
        div.setAttribute("id", "score");
        gameScore = 0
        div.innerHTML = gameScore;
        cards.appendChild(div);
      }

    card.setAttribute("class", "gameCard");

    card_front.setAttribute("class", "card_face card_front");
    card_front.setAttribute("style", "background-image: url('./pic/cool-face.jpg'); background-size: 100%");

    card_back.setAttribute("class", "card_face card_back");
    card_back.setAttribute("style", "background-image: url('./pic/"+arr[i-1]+".gif'); background-size: 100%");

    card.appendChild(card_front);
    card.appendChild(card_back);
    cards.appendChild(card);
  }
}


function flipCard(){

  var gameCard = document.querySelectorAll('.gameCard');
  

  for (var i = 0; i < gameCard.length; i++) {
    gameCard[i].addEventListener( 'click', flipCardListener);
  }



}

function flipCardListener(){

  if(this !== firstCardObj){
     this.classList.toggle('is-flipped');
      //background image url of card-back
      var url = this.children[1].style.backgroundImage;
      if(flipCardArr.length){

        if(url === flipCardArr[0] && this !== firstCardObj){
          this.removeEventListener('click', flipCardListener);
          firstCardObj.removeEventListener('click', flipCardListener);
          ++count;
          if(count === 12){
            alert("Congratulations, you won!\n You score is "+gameScore+".");
            if(!localStorage.getItem("best_score")){
              localStorage.setItem("best_score", gameScore);
            } else if(localStorage.getItem("best_score") > gameScore){
              localStorage.setItem("best_score", gameScore);
            } 
            document.getElementById("best-score").innerHTML = localStorage.getItem("best_score");
          }
          
          

        }
        else{
            setTimeout(() => { 
            this.classList.toggle('is-flipped'); 
            firstCardObj.classList.toggle('is-flipped');
            firstCardObj = {};
          }, 1000);
          
        }

        flipCardArr = [];
        
        
      } else{

        flipCardArr.push(url);
        firstCardObj = this;
      }

      document.getElementById("score").innerHTML = ++gameScore;
  } 
}