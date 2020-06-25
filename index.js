var gameMatrix = ["", "", "", "", "", "", "", "", ""];
var Player = "X";
//********** messages **********/
const drawMessage = () => `Game ended in a draw!`;
const PlayerTurn = () => `It's ${Player}'s turn`;
const winningMessage = () => `${Player} has won the tic-toe-match`;

const statusDisplay = document.querySelector(".status");
statusDisplay.innerHTML = PlayerTurn();

//********* funtions ***********/
function handleOnClick(Event) {
  const clickedCell = Event.target;
  let clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

  if (gameMatrix == "") {
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  updateGameStateWithCurrentPlayerValue(clickedCellIndex);
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameMatrix[clickedCellIndex] = Player;
  clickedCell.innerHTML = Player;
}

function updateGameStateWithCurrentPlayerValue(clickedCellIndex) {
  gameMatrix[clickedCellIndex] = Player;

  const gameConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i <= 7; i++) {
    const Condition = gameConditions[i];
    let a = gameMatrix[Condition[0]];
    let b = gameMatrix[Condition[1]];
    let c = gameMatrix[Condition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      statusDisplay.innerHTML = winningMessage();
      return;
    }
  }

  let roundDraw = !gameMatrix.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    return;
  }

  setNextPlayer();
}

function setNextPlayer() {
  Player = Player == "X" ? "0" : "X";
  statusDisplay.innerHTML = PlayerTurn();
}
function handleRestartGame() {
  roundDraw = false;
  Player = "X";
  gameMatrix = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = PlayerTurn();
  document
    .querySelectorAll(".element")
    .forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".element")
  .forEach((cell) => cell.addEventListener("click", handleOnClick));

document.querySelector(".restart").addEventListener("click", handleRestartGame);
