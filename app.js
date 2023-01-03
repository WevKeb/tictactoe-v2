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
const currentPlayerDisplay = document.getElementById('status');
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

currentPlayerDisplay.innerHTML = currentPlayerTurn();

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
    } else {
        return
    }
    checkForWin();
};

    // this changes the player from X to O, simply by evaluating if the state of current player is X change to O, otherwise we assume the current is O so we will change it to X 
function changePlayer () {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    currentPlayerDisplay.innerHTML = currentPlayerTurn();
};

function checkForWin () {
    let roundWon = false;

    for (i=0; i<=8; i++) {
        // loop through winngStates array and pull out each win condition array. we need the values in each win condition array, which are the indexes of the board we need to check. if thoses indexes on the board are the same value (aka X or O) then that player wins
        // so we look at each individual win condition array at index 0, 1, 2 and pass that value as the index to check in the current state of the board
        // we assign that value in the board to a variable
        // then we check those variable to see if they are equal, if they are then that player wins 
        const winCondition = winningStates[i];
        // console.log(winCondition[0]);
        let a = state.board[winCondition[0]];
        console.log('this is a ',a);
        console.log(typeof(a));
        let b = state.board[winCondition[1]];
        console.log('this is b ',b);
        let c = state.board[winCondition[2]];
        console.log('this is c ',c);
        
        // if (a === "" || b === "" || c === ""){
        //     continue;
        // }

        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        currentPlayerDisplay.innerHTML = winningMessage();
    }
    changePlayer();
};

// checkForWin();

// const restartGame = () => {

// 