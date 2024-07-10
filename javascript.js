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
    if (board[row][column].getValue === 0) {
      board[row][column].addMark(player);
    } else {
      return;
    }
  }

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => 
      row.map((cell) => cell.getValue()))
      console.log(boardWithCellValues);
  };

  return { getBoard, markCell, printBoard };
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

  const switchTurn = () => {
    if (currentPlayer = players[0]) {
      currentPlayer = players[1];
    } else {
      currentPlayer = players[0]
    }
  }
    
    

  
})();


// Display Controller
const displayController = (function() { 

})();

