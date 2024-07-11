// Gameboard
// Use IIFE for gameboard, displayController
const gameboard = (function (){
  const rows = 3;
  const columns = 3;
  const board = [];
  
  for (let i = 0; i < rows; i++) {
    board[i]= []
    for (let j = 0; j < columns; j++) {
      board[i].push(cell());
    }
  }

  const getBoard = () => board;

  const markCell = (row, column, player) => {
    if (board[row][column].getValue() === 0) {
      board[row][column].addMark(player);
      return true;
    } else {
      return false;
    }
  }
  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j].addMark(0);
      }
    }
  }
  

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => 
      row.map((cell) => cell.getValue()))
      console.log(boardWithCellValues);
  };

  return { getBoard, markCell, printBoard, resetBoard};
})();


// Cell 
function cell() {
  let value = 0;

  const addMark = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addMark, getValue };
}


// Gameflow
const gameFlow = (function (
  playerOneName = "player 1",
  playerTwoName = "player 2"
){

  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ];
  
  let currentPlayer = players[0];

  const switchTurns = () => {
    if (currentPlayer == players[0]) {
      currentPlayer = players[1];
    } else {
      currentPlayer = players[0];
    }
  }
  
  const getCurrentPlayer = () => currentPlayer;

  const printNewRound = () => {
    gameboard.printBoard();
    console.log(`${getCurrentPlayer().name}'s turn.`);
  }

  const checkForWinner = (row, column) => {
    let checkingCounterRow = 0;
    let checkingCounterColumn = 0;
    let checkingCounterDiagonal = 0;
    let results = false;
    for (let i = 0; i < 3; i++) {
      if (gameboard.getBoard()[i][column].getValue() == getCurrentPlayer().token) {
        checkingCounterRow += 1;
      }
    }
    
    for (let j = 0; j < 3; j++) {
      if (gameboard.getBoard()[row][j].getValue() == getCurrentPlayer().token) {
        checkingCounterColumn += 1;
      }
    }

    if ( 
    gameboard.getBoard()[0][0].getValue() == getCurrentPlayer().token &
    gameboard.getBoard()[1][1].getValue() == getCurrentPlayer().token &
    gameboard.getBoard()[2][2].getValue() == getCurrentPlayer().token 
    ) {
      checkingCounterDiagonal += 3;
    } else if ( 
    gameboard.getBoard()[2][2].getValue() == getCurrentPlayer().token &
    gameboard.getBoard()[1][1].getValue() == getCurrentPlayer().token &
    gameboard.getBoard()[0][0].getValue() == getCurrentPlayer().token
    ) {
      checkingCounterDiagonal += 3;
    }

    if (checkingCounterRow == 3 || checkingCounterColumn == 3 || checkingCounterDiagonal == 3){
      results = true;
    } else {
      results = false;
    }

    checkingCounterRow = 0;
    checkingCounterColumn = 0;
    checkingCounterDiagonal = 0;
    return results
  }

  const checkForTies = (row, column) => { 
    const checkSet = new Set();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        checkSet.add(gameboard.getBoard()[i][j].getValue());
        }
      }
    if (checkSet.has(0)) {
      return false
    } else {
      return true
    }
    
    
  }
  
  const playRound = (row, column) => {
    if (!gameboard.markCell(row, column, getCurrentPlayer().token)){
      console.log( `That square is taken, try again`);
      printNewRound();

    } else {
    console.log (
      `Marking for ${getCurrentPlayer().name} on row ${row} and column ${column}.`);

      if (checkForWinner(row, column)) {
       console.log ( `${getCurrentPlayer().name} won!`);
      } else if (checkForTies(row, column)){
        console.log (`You're tied! GameOver!`);
        gameboard.resetBoard();
        printNewRound();
      } else {
        switchTurns();
        printNewRound();
      }
    }
  }
  printNewRound();
  return {
    playRound,
    getCurrentPlayer,
  }
})();


// Display Controller
const displayController = (function() { 

})();

