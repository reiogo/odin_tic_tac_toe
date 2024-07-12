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
const gameFlow = (function (){
  const players = [
    {
      name: "Player 1",
      token: 1
    },
    {
      name: "Player 2",
      token: 2
    }
  ];
  const setPlayerNames = (player1, player2) => {
    players[0].name = player1;
    players[1].name = player2;
    
  }
  
  
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
    gameboard.getBoard()[0][2].getValue() == getCurrentPlayer().token &
    gameboard.getBoard()[1][1].getValue() == getCurrentPlayer().token &
    gameboard.getBoard()[2][0].getValue() == getCurrentPlayer().token
    ) {
      checkingCounterDiagonal += 3;
      console.log("hello");
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
        gameboard.resetBoard();
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
    setPlayerNames,
    playRound,
    getCurrentPlayer
  }
})();


// Display Controller
const displayController = (function() { 
  const boardDiv = document.querySelector('.board');
  const playerTurnDiv = document.querySelector('.turn');
  const nameForm = document.querySelector('.names');

  const setNames = (event) => {
    event.preventDefault();
    
    let player1;
    let player2;
    if (event.target.querySelector("#user1").value == "") {
      player1 = "Player 1"; 
    } else {
      player1 = event.target.querySelector("#user1").value
    }
    if (event.target.querySelector("#user2").value == "") {
      player2 = "Player 2"; 
    } else {
      player2 = event.target.querySelector("#user2").value
    }
    
    gameFlow.setPlayerNames(player1, player2);
    const nameContainer = 
      document.querySelector(".name-container");
    nameContainer.style.display = "none";
    const gameContainer =
      document.querySelector(".game-container");
    gameContainer.style.display = "block";
    gameContainer.style.visibility = "visible";
    const currentPlayer = gameFlow.getCurrentPlayer();
    playerTurnDiv.textContent = `${currentPlayer.name}'s turn.`
    
  }
  
  nameForm.addEventListener("submit", setNames)

  const updateScreen = () => {
    boardDiv.textContent = "";
  
    // Update board and player turn 
    const board = gameboard.getBoard();

    // Display player turn
    const currentPlayer = gameFlow.getCurrentPlayer();
    playerTurnDiv.textContent = `${currentPlayer.name}'s turn.`
    
    //Render board squares
    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        if (cell.getValue() == 0) {
          cellButton.textContent = " ";
        } else if (cell.getValue() == 1) {
          cellButton.textContent = "o";
        } else if (cell.getValue() == 2) {
          cellButton.textContent = "x";
        }
        boardDiv.appendChild(cellButton);
      })
    })
  }
  // Event listener
  function boardClick(event) {
    const selectedColumn = event.target.dataset.column;
    const selectedRow = event.target.dataset.row;
    console.log(selectedColumn);
    if(!selectedColumn || !selectedRow) return;

    gameFlow.playRound(selectedRow, selectedColumn);
    updateScreen();
  }

  boardDiv.addEventListener("click", boardClick); 

  updateScreen();

  const resetButton = document.querySelector(".restart");
  resetButton.addEventListener("click", () => {
    gameboard.resetBoard();
    updateScreen();
  });
  

})();


