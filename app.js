let gameActive = true; 
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", "",];

const winningStates = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const statusDisplay = document.getElementById('status');

const winningMessage = () => {
    return currentPlayer + "wins!";
}

const drawMessage = () => {
    return "It's a draw!"
}

const currentPlayerTurn = () => {
    return "It is " + currentPlayer + "turn";
}


// ********** DOM SELECTORS ****************
// select all cells on the board and store as array
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.restart');
const playerTurn = document.querySelector('.player-turn');

// console.log(cells);

// ********** EVENT LISTENERS ****************
// loop through the cells array and add a click event listener to each, onclick run the markBoard
cells.forEach((cell) => {
    cell.addEventListener('click', markBoard)
});

// cells.addEventListener('click', console.log('click is working'));


// restartButton.addEventListener('click', restartGame);

// ********** FUNCTIONS **************** 

function markBoard(event) {
    // console.log('click is working')
    // console.log(event.target);

    // below function stores the index of the clicked cell in teh clickedcellindex variable using getatrribute method 
    const clickedCellIndex = event.target.getAttribute('data-cell-index');
    console.log(clickedCellIndex);
    
    // if (gameState[clickedCellIndex] 

   
    // const clickedCell = cellEvent.target;
    // const clickedCellIndex = clickedCell.getAtrribute('data-cell-index');
    // console.log(clickedCellIndex);
};


// const restartGame = () => {

// }