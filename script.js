'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

function changeActivePlayer(playerActive, playerInActive) {
  playerActive.classList.remove('player--active');
  playerInActive.classList.add('player--active');
}

function getActivePlayer() {
  return player0.classList.contains('player--active') ? player0 : player1;
}

function getCurrentScore() {
  if (getActivePlayer() === player0) {
    current0El.textContent = currentScore;
  } else {
    current1El.textContent = currentScore;
  }
}

function getScoreOfEl() {
  if (getActivePlayer() === player0) {
    score0El.textContent = +score0El.textContent + currentScore;
  } else {
    score1El.textContent = +score1El.textContent + currentScore;
  }
}

let currentScore = 0;
let playing = true;

btnRoll.addEventListener('click', function () {
  //1. Generate a random dice display
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
      getCurrentScore();
    } else {
      currentScore = 0;
      getCurrentScore();
      getActivePlayer() === player0
        ? changeActivePlayer(player0, player1)
        : changeActivePlayer(player1, player0);
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    getScoreOfEl();
    if (+score0El.textContent >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      player0.classList.add('player--winner');
    } else if (+score1El.textContent >= 100) {
      player1.classList.add('player--winner');
    } else {
      currentScore = 0;
      getCurrentScore();
      getActivePlayer() === player0
        ? changeActivePlayer(player0, player1)
        : changeActivePlayer(player1, player0);
    }
  }
});

btnNew.addEventListener('click', function () {
  if (player0.classList.contains('player--winner')) {
    player0.classList.remove('player--winner');
  } else {
    player1.classList.remove('player--winner');
  }
  if (!player0.classList.contains('player--active')) {
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }
  diceEl.classList.add('hidden');
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  playing = true;
});
