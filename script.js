'use strict';


// global variables 
const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0Element = document.querySelector("#current--0");
const current1Element = document.querySelector("#current--1");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const winningMessage = document.querySelector(".winning-message");
const modalBox = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeInstruction = document.querySelector(".close-modal");
const btnInstructions = document.querySelector(".btn--instructions");



// function to open instruction modal 
const openModal = function () {
  modalBox.classList.add("hidden-1");
  overlay.classList.remove("hidden");
}

// function to close instruction modal
const closeModal = function () {
  modalBox.classList.add("hidden");
  overlay.classList.add("hidden");
  modalBox.classList.remove("hidden-1");
}

// buttons to open and close  instruction modal
btnInstructions.addEventListener("click", openModal);
closeInstruction.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);


// score to each player
score0Element.innerHTML = 0;
score1Element.innerHTML = 0;
// current score
let currentScore = 0;
// active player 
let activePlayer = 0;
// global score array
let scores = [0, 0];
let playing = true;
let btnNewClick = false;
// hide the dice 
diceElement.classList.add("hidden");

document.querySelector(".btn--new").disabled = true;


// switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).innerHTML = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
}


// rolling dice function
btnRoll.addEventListener("click", function () {
  if (playing) {

    // dice variable to generate random number between 1 to 6 
    const dice = Math.trunc(Math.random() * 6) + 1;



    // Display dice 
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${dice}.png`;

    // check for rolled 

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).innerHTML = currentScore;
    } else {
      switchPlayer();

    }
  }
})


// hold the current score and add to global score 

btnHold.addEventListener("click", function () {
  if (playing) {
    //  active player score will current score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).innerHTML = scores[activePlayer];

    // check if the player score more then 100 
    if (scores[activePlayer] >= 20) {
      playing = false;
      btnNew.classList.remove("disable-click");
      document.querySelector(`#current--${activePlayer}`).innerHTML = 0;
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      diceElement.classList.add("hidden");
      winningMessage.classList.remove("hidden");
      winningMessage.innerHTML = `Player ${activePlayer + 1} won `;
      document.querySelector(".btn--new").disabled = false;
    } else {
      switchPlayer();
    }
  }
})


// reset the game button 

btnNew.addEventListener("click", function () {

  diceElement.classList.add("hidden");
  currentScore = 0;
  activePlayer = 0;
  document.querySelector("#current--0").innerHTML = 0;;
  document.querySelector("#current--1").innerHTML = 0;;
  document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector("#score--0").innerHTML = 0;
  document.querySelector("#score--1").innerHTML = 0;
  document.querySelector(".btn--new").disabled = true;
  scores = [0, 0];
  winningMessage.classList.add("hidden");
  playing = true;


})




