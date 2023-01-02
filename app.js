let gameActive = true; 
let currentPlayer = 'X';
let state = {
    board: ["", "", "", "", "", "", "", "", "",],
    players: ["", ""],
    counter: 0,
};

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



const winningMessage = () => {
    return currentPlayer + " wins!";
}

const drawMessage = () => {
    return "It's a draw!"
};

const currentPlayerTurn = () => {
    return "It is " + currentPlayer +"'s turn";
};



// ********** DOM SELECTORS ****************
// select all cells on the board and store as array
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
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
    // console.log(clickedCellIndex);
    
    // if the state.board value is empty, change the state.board at the cell index clicked to the current player value, then display the current player value in the cell clicked on the screen, then check if there is a win, if there is display winning message, if not change the player to the other player
    if (state.board[clickedCellIndex] === "") {
        // 
        state.board[clickedCellIndex] = currentPlayer    
        event.target.innerHTML = currentPlayer;
        changePlayer();    
    } else {
        return
    }};

    // this changes the player from X to O, simply by evaluating if the state of current player is X change to O, otherwise we assume the current is O so we will change it to X 
function changePlayer () {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    statusDisplay.innerHTML = currentPlayerTurn();
};



    // const clickedCell = cellEvent.target;
    // const clickedCellIndex = clickedCell.getAtrribute('data-cell-index');
    // console.log(clickedCellIndex);
// };


// const restartGame = () => {

// }