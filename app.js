/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-anchor",
              "fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf",
              "fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"];


let openCards = [];
let matchCards = [];


//invoke shuffle method to shuffle icons
//shuffle(icons);


//create cards
const container = document.querySelector('.deck');
function createCards() {
for(let i=0 ; i < icons.length ; i++){
  const card = document.createElement('li');
  card.classList.add('card');
  card.innerHTML = `<li class="${icons[i]}"> </li>`
  container.appendChild(card);

//create cards click Event
card.addEventListener('click',function() {
  const currentCard = this;
  const previousCard = openCards[0];
//existing open cards
if(openCards.length === 1) {
  card.classList.add('open' , 'show' , 'stop');
  openCards.push(this);
  openCards = [];

  //copmare cards
  if(currentCard.innerHTML === previousCard.innerHTML) {
    //match cards
    currentCard.classList.add('match');
    previousCard.classList.add('match');
    matchCards.push(currentCard , previousCard);
    gameOver();
    openCards = [];
  } else {
    //no match cards wait 1s before doing this
    openCards = [];
    setTimeout(function() {
      currentCard.classList.remove('open' , 'show' , 'stop');
      previousCard.classList.remove('open' , 'show' , 'stop');
    },700)
  }
  movesNum();

} else {
//no open cards
  card.classList.add('open' , 'show' , 'stop');
  openCards.push(this);
}
   })
       }
            }


//when game end
function gameOver() {
   if(matchCards.length === icons.length){
     alert("Congratulation! You Win!");
}
}


//number of moves
const steps = document.querySelector('.moves');
let moves = 0;
function movesNum(){
moves++;
steps.innerHTML = moves;
rating();
}


//rating function
const stars = document.querySelector('.stars');
function rating() {
  switch(moves) {
    case 10 :
         stars.innerHTML = `<li><i class="fa fa-star"></i></li>
            	           	  <li><i class="fa fa-star"></i></li>`;
    break;
    case 20 :
         stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }
     }


//restart the game
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click' , function() {
  container.innerHTML = "";
  createCards();
  shuffle(icons);
  openCards = [];
  matchCards = [];
  moves = 0;
  steps.innerHTML = moves;
  stars.innerHTML = `<li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>`;
})


//invoke createCards function
createCards();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
