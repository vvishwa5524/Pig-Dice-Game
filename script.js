'use strict';

//different types of selecting score elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const score = document.querySelectorAll('.score');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');   

for(let i=0;i<score.length;i++)
    score[i].textContent = 0;

//Hiding the Initial Dice image
const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

const scores = [0,0];
let currentPlayer =0;
let currentScore = 0;
let playing=true;
//switch function
const switchPlayer = function(){
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    currentPlayer = currentPlayer === 0 ? 1: 0;
    currentScore=0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling the dice functionality
btnRoll.addEventListener('click',function(){
if(playing){
// Generating Random dice Value
const dice = Math.trunc(Math.random()*6) +1; 

//Loading the the dice image
diceEl.classList.remove('hidden');
diceEl.src=`dice-${dice}.png`;

//if it is one then current score is Zero and chance to next player
if(dice !==1){
    //Add to current Score
    currentScore+=dice;
    document.getElementById(`current--${currentPlayer}`).textContent = currentScore;

    //another ways but complex
    //currentPlayer===0?current0El.textContent=currentScore:current1El.textContent=currentScore;
    //current0El.textContent=currentScore;


} else{
    //switch to the next player
    //let setScore =  Number(document.getElementById(`score--${currentPlayer}`).textContent);
    //setScore+=currentScore;
    //document.getElementById(`score--${currentPlayer}`).textContent = setScore;
   switchPlayer();
}
}
});

btnHold.addEventListener('click',function(){
if(playing){
scores[currentPlayer]+=currentScore;
document.getElementById(`score--${currentPlayer}`).textContent =scores[currentPlayer];
if(scores[currentPlayer]>=100){
   playing = false;
   diceEl.classList.add('hidden');
   document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
   document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active'); 

}else{
switchPlayer();
}
}
});

btnNew.addEventListener('click',function(){
document.getElementById(`current--${currentPlayer}`).textContent=0;
document.querySelector(`.player--${currentPlayer}`).classList.remove('player--winner');
player0El.classList.add('player--active');
currentScore =0;
currentPlayer =0;
scores[0]=0;
scores[1]=0;
for(let i=0;i<score.length;i++)
    score[i].textContent = 0;
playing=true;
//document.querySelector(`.player--${currentPlayer}`).classList.add('player--active'); 
});

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
const instruction = document.querySelector('.btn--inst');

const CloseModal = function(){
    modal.classList.add('hidden1');
    overlay.classList.add('hidden1');
};
const OpenModal = function(){
    modal.classList.remove('hidden1');
    overlay.classList.remove('hidden1');
}

instruction.addEventListener('click',OpenModal);
closeModal.addEventListener('click',CloseModal);
overlay.addEventListener('click',CloseModal);

document.addEventListener('keydown',function(e){
 if(e.key==='Escape' && !modal.classList.contains('hidden1')){
  CloseModal();
 }
});