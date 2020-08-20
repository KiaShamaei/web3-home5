

/* store our game status */
var statusDisplay = document.querySelector('.game-status');
var gameActive = true;
//my game start with mr.kaaziraz as X
var currentPlayer = "X";
var gameState = ["", "", "", "", "", "", "", "", ""];

var winningMessage = function winningMessage() {
  return "Player ".concat(currentPlayer, " has won!");
};

var drawMessage = function drawMessage() {
  return "Game ended in a draw!";
};
var winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

var roundDraw = !gameState.includes("");
var currentPlayerTurn = function currentPlayerTurn() {
  return "It's ".concat(currentPlayer, "'s turn");
};

//dispaly the palyer 
statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(function (cell) {
	return cell.addEventListener('click', handleCellClick);
  });
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);
//select player 
function handleCellClick(clickedCellEvent) {
	/* clicked html element in a variable */
var clickedCell = clickedCellEvent.target;
//which cell is clicked
var clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
//check draw status 
	if (gameState[clickedCellIndex] !== "" || !gameActive) {
	  return;
	}
	handleCellPlayed(clickedCell, clickedCellIndex);
	handleResultValidation();
  }
  
  function handleCellPlayed(clickedCell, clickedCellIndex) {
	gameState[clickedCellIndex] = currentPlayer;
	clickedCell.innerHTML = currentPlayer;
  }
  
  
  function handleResultValidation() {
	var roundWon = false;
  
	for (var i = 0; i <= 7; i++) {
	  var winCondition = winningConditions[i];
	  var a = gameState[winCondition[0]];
	  var b = gameState[winCondition[1]];
	  var c = gameState[winCondition[2]];
  
	  if (a === '' || b === '' || c === '') {
		continue;
	  }
  
	  if (a === b && b === c) {
		roundWon = true;
		break;
	  }
	}
  
	if (roundWon) {
	  statusDisplay.innerHTML = winningMessage();
	  
	  gameActive = false;
	  return;
	}

  
	if (roundDraw) {
	  statusDisplay.innerHTML = drawMessage();
	  gameActive = false;
	  return;
	}
  
function handlePlayerChange() {
	  currentPlayer = currentPlayer === "X" ? "O" : "X";
	  statusDisplay.innerHTML = currentPlayerTurn();
	}
	handlePlayerChange();
  }
  
  
  function handleRestartGame() {
	gameActive = true;
	currentPlayer = "X";
	gameState = ["", "", "", "", "", "", "", "", ""];
	statusDisplay.innerHTML = currentPlayerTurn();
	document.querySelectorAll('.cell').forEach(function (cell) {
	  return cell.innerHTML = "";
	});
  }