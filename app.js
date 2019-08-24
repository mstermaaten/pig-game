let alert = document.querySelector("#block");
let alertPlayer = document.querySelector("#winner");

let player1Panel = document.querySelector(".player-0-panel");
let player2Panel = document.querySelector(".player-1-panel");
let player1totalScore = document.querySelector("#score-0");
let player2totalScore = document.querySelector("#score-1");

let currentScore1 = document.querySelector("#current-0");
let currentScore2 = document.querySelector("#current-1");

let winScore1 = document.querySelector("#win-1");
let winScore2 = document.querySelector("#win-2");
let winScore11 = document.querySelector("#alert-win-1");
let winScore22 = document.querySelector("#alert-win-2");

let diceTrow = document.getElementById("dice");

function TrowDice() {
  let dice = Math.floor(Math.random() * 6) + 1;
  let diceRoll = `dice-${dice}.png`;
  diceTrow.src = diceRoll;

  if (dice === 1) {
    game.removeCurrent();
  }

  if (game.currentPlayer === 0) {
    game.current1 += dice;
    currentScore1.innerText = game.current1;
  } else if (game.currentPlayer === 1) {
    game.current2 += dice;
    currentScore2.innerText = game.current2;
  }
}

function HoldCurrent() {
  if (game.currentPlayer === 0) {
    game.totalScore1 += game.current1;
    player1totalScore.innerText = game.totalScore1;
    currentScore1.innerText = 0;
    if (game.totalScore1 >= 5) {
      game.round(1);
    } else {
      game.current1 = 0;
      game.changePlayer();
    }
  } else if (game.currentPlayer === 1) {
    game.totalScore2 += game.current2;
    player2totalScore.innerText = game.totalScore2;
    currentScore2.innerText = 0;
    if (game.totalScore2 >= 5) {
      game.round(2);
    } else {
      game.current2 = 0;
      game.changePlayer();
    }
  }
}

function NewGame() {
  if (game.currentPlayer === 1) {
    player2Panel.classList.remove("active");
    player1Panel.classList.add("active");
  }

  alertPlayer.classList.add("hide");
  winScore11.classList.add("hide");
  winScore22.classList.add("hide");
  alert.classList.remove("winner");
  alert.classList.remove("show");

  game.current1 = 0;
  game.current2 = 0;
  game.totalScore1 = 0;
  game.totalScore2 = 0;
  game.currentPlayer = 0;
  game.wins1 = 0;
  game.wins2 = 0;

  player1totalScore.innerText = 0;
  player2totalScore.innerText = 0;

  currentScore1.innerText = 0;
  currentScore2.innerText = 0;

  winScore1.innerText = "Player 1: 0";
  winScore2.innerText = "Player 2: 0";

  diceTrow.src = "dice-3.png";
}

class Game {
  constructor() {
    this.current1 = 0;
    this.current2 = 0;
    this.totalScore1 = 0;
    this.totalScore2 = 0;
    this.currentPlayer = 0;
    this.wins1 = 0;
    this.wins2 = 0;
  }

  roundWinning(x) {
    if (x === 1) {
      alertPlayer.innerText = "Player 1 Wins This Round!";
    } else if (x === 2) {
      alertPlayer.innerText = "Player 2 Wins This Round!";
    }
    alert.classList.add("show");
    alertPlayer.classList.remove("hide");
    winScore11.classList.remove("hide");
    winScore22.classList.remove("hide");
    setTimeout(function() {
      game.newRound();
    }, 1000);
  }

  gameWinner(x) {
    if (x === 1) {
      alertPlayer.innerText = "Player 1 is the WINNER!";
    } else if (x === 2) {
      alertPlayer.innerText = "Player 2 is the WINNER!";
    }
    alert.classList.add("winner");
    alertPlayer.classList.remove("hide");
    winScore11.classList.remove("hide");
    winScore22.classList.remove("hide");
    setTimeout(function() {
      NewGame();
    }, 5000);
  }

  newRound() {
    if (this.wins1 === 3) {
      game.gameWinner(1);
    } else if (this.wins2 === 3) {
      game.gameWinner(2);
    } else {
      if (this.currentPlayer === 1) {
        player2Panel.classList.remove("active");
        player1Panel.classList.add("active");
      }
      alert.classList.remove("show");
      alertPlayer.classList.add("hide");
      winScore11.classList.add("hide");
      winScore22.classList.add("hide");
      game.current1 = 0;
      game.current2 = 0;
      game.totalScore1 = 0;
      game.totalScore2 = 0;
      game.currentPlayer = 0;

      player1totalScore.innerText = 0;
      player2totalScore.innerText = 0;

      currentScore1.innerText = 0;
      currentScore2.innerText = 0;

      diceTrow.src = "dice-3.png";
    }
  }

  round(x) {
    if (x === 1) {
      this.wins1 += 1;
      winScore1.innerText = `Player 1: ${this.wins1}`;
      winScore11.innerText = `Player 1: ${this.wins1}`;

      game.roundWinning(x);
    } else if (x === 2) {
      this.wins2 += 1;
      winScore2.innerText = `Player 2: ${this.wins2}`;
      winScore22.innerText = `Player 2: ${this.wins2}`;
      game.roundWinning(x);
    }
  }

  changePlayer() {
    if (this.currentPlayer === 0) {
      this.currentPlayer = 1;
      player1Panel.classList.remove("active");
      player2Panel.classList.add("active");
    } else if (this.currentPlayer === 1) {
      this.currentPlayer = 0;
      player2Panel.classList.remove("active");
      player1Panel.classList.add("active");
    }
  }

  removeCurrent() {
    if (this.currentPlayer === 0) {
      currentScore1.innerText = 0;
      this.current1 = 0;
      this.current2 -= 1;
      game.changePlayer();
    } else if (this.currentPlayer === 1) {
      currentScore2.innerText = 0;
      this.current2 = 0;
      this.current1 -= 1;
      game.changePlayer();
    }
  }
}

const game = new Game();
