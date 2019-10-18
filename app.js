/*
 * Create a list that holds all of your cards
 */
 "use strict"

const icons = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-anchor",
              "fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf",
              "fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"],
      rate = document.querySelector("#total_rate"),
      secondsContainer = document.querySelector("#seconds"),
      minutesContainer = document.querySelector("#minutes"),
      hoursContainer = document.querySelector("#hours"),
      container = document.querySelector('.deck'),
      steps = document.querySelector('.moves'),
      repeatBtnFromModal = document.querySelector(".modal .play-again"),
      stars = document.querySelector('.stars'),
      restartButton = document.querySelector('.restart'),
      modal= document.querySelector(".modal");

let openCards = [],
    matchCards = [],
    firstClick = true,
    moves = 0,
    seconds,minutes,hours = 0,
    totalTime = 0,
    incrementer;


//invoke shuffle method to shuffle icons
shuffle(icons);


//create cards
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

      //if it is the first click ? start the timer
      if(firstClick) {
                timer();
                firstClick = false;
                  }

      //existing open cards
      if(openCards.length === 1) {
        card.classList.add('open' , 'show' , 'stop');
        openCards.push(this);
        openCards = [];

        //compare cards
        if(currentCard.innerHTML === previousCard.innerHTML) {
            //match cards
            currentCard.classList.add('match');
            previousCard.classList.add('match');
            matchCards.push(currentCard , previousCard);
            gameEnd();
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
function gameEnd() {
     if(matchCards.length === icons.length){
           gameOverMessage();
 }
    }


//number of moves
function movesNum() {
    moves++;
    steps.innerHTML = moves;
    rating();
}


//rating function
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
    hoursContainer.innerHTML = "00";
    minutesContainer.innerHTML = "00";
    secondsContainer.innerHTML = "00";
    stopTimer();
    firstClick = true;
    totalTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
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


//start timer
function timer() {
     // Start Incrementer
     incrementer = setInterval(function() {
         totalTime += 1;

         // Convert Total Time to hr:min:sec
         calculateTime(totalTime);

         // Change the current time values
         secondsContainer.innerHTML = seconds;
         minutesContainer.innerHTML = minutes;
         hoursContainer.innerHTML   = hours;
    }, 1000);

}


// Calculate Time
function calculateTime(totalTime) {
    hours   = Math.floor( totalTime / 60 / 60);
    minutes = Math.floor( (totalTime / 60) % 60);
    seconds = totalTime % 60;
}


//stop timer
function stopTimer() {
    clearInterval(incrementer);
}


//Game over game over message
function gameOverMessage() {
    // Display the modal
    modal.style.top = "0";

    // Add moves to the Modal
    const totalMoves = document.querySelector("#total_moves");
    totalMoves.innerHTML = moves + 1;

    // Add Rate
    rate.innerHTML = stars.innerHTML;

    // Stop Timer
    stopTimer();

    // Add time to the Modal
    const totalHours       = document.querySelector("#totalHours");
    const totalMinutes     = document.querySelector("#totalMinutes");
    const totalSeconds     = document.querySelector("#totalSeconds");
    totalHours.innerHTML   = hours;
    totalMinutes.innerHTML = minutes;
    totalSeconds.innerHTML = seconds;
}

//Play Again Buttons
repeatBtnFromModal.addEventListener("click", function () {

    // Hide the modal
    modal.style.top = "-150%";

    // Start the game again
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
    hoursContainer.innerHTML = "00";
    minutesContainer.innerHTML = "00";
    secondsContainer.innerHTML = "00";
    stopTimer();
    firstClick = true;
    totalTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
});
