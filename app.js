let currentPlayer = 'X';
let state = {
    board: ["", "", "", "", "", "", "", "", "",],
    // players: ["", ""],
    // counter: 0,
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
// loop through the cells array and add a click event listener to each, onclick run the cellClicked
cells.forEach((cell) => {
    cell.addEventListener('click', cellClicked)
});
// cells.addEventListener('click', console.log('click is working'));

// add a click event listener on the restart button, when clicked execute a function that resets the game to the starting state (currentplayer, board state, player display, and display in individual cells)
restartButton.addEventListener('click', () => {
    currentPlayer = "X";
    state.board = ["", "", "", "", "", "", "", "", "",];
    currentPlayerDisplay.innerHTML = currentPlayerTurn();
    cells.forEach((cell) => {
        cell.innerHTML = "";
    });
});

// ********** FUNCTIONS **************** 

currentPlayerDisplay.innerHTML = currentPlayerTurn();

function cellClicked(event) {
    // console.log('click is working')
    // console.log(event.target);
    clickedCellEvent = event.target;

    // below function stores the index of the clicked cell in teh clickedcellindex variable using getatrribute method 
    const clickedCellIndex = parseInt(clickedCellEvent.getAttribute('data-cell-index'));
    // console.log(typeof(clickedCellIndex));
    // this returned a string and gave me problems, have to change the returned string into a number to use in checkforwin function below

    // if the state.board value is empty, change the state.board at the cell index clicked to the current player value, then display the current player value in the cell clicked on the screen, then check if there is a win, if there is display winning message, if not change the player to the other player
    // *************************************************************
    // if (state.board[clickedCellIndex] === "") {
    //     // 
    //     state.board[clickedCellIndex] = currentPlayer    
    //     event.target.innerHTML = currentPlayer;
    // } else {
    //     return
    // }

    if (state.board[clickedCellIndex] !== "") {
        return;
    } 
    markBoard(clickedCellEvent, clickedCellIndex);
    checkForWin();
};

function markBoard (clickedCellEvent, clickedCellIndex) {
    state.board[clickedCellIndex] = currentPlayer    
    clickedCellEvent.innerHTML = currentPlayer;
}

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

    for (i=0; i<8; i++) {
        // loop through winngStates array and pull out each win condition array. we need the values in each win condition array, which are the indexes of the board we need to check. if thoses indexes on the board are the same value (aka X or O) then that player wins
        // so we look at each individual win condition array at index 0, 1, 2 and pass that value as the index to check in the current state of the board
        // we assign that value in the board to a variable
        // then we check those variable to see if they are equal, if they are then that player wins 
        const winCondition = winningStates[i];
        // console.log(winCondition[0]);
        let a = state.board[winCondition[0]];
        console.log('this is a ',a);
        // console.log(typeof(a));
        let b = state.board[winCondition[1]];
        console.log('this is b ',b);
        let c = state.board[winCondition[2]];
        console.log('this is c ',c);
        
        // need to cover scenario where values in board are still empty, if so just skip and continue looping
        if (a === "" || b === "" || c === ""){
            continue;
        }

        // if any values in the loop return a, b, and c as equal then that player wins, we need to set the roundwon variable to true , then we need to display the round has been won by the current player who we can assume is teh one who just clicked the cell and triggered all these functions and events. return and leave the function as game is over 
        if (a === b && b === c) {
            roundWon = true;
        }
    }
    if (roundWon === true) {
        currentPlayerDisplay.innerHTML = winningMessage();
        
        return;
    }
      // if there is no winner, we need to check for draw as well. we know there will be a draw if there has been no winner declared (determined by the loop/roundwon above ^^) AND there are no empty spaces left in the state of the board meaning every space has been taken, no winner has been determined, meaning its a draw. return out of the function as the game is over
    let roundDraw = state.board.includes("");
    if (roundDraw === false) {
        currentPlayerDisplay.innerHTML = drawMessage();
        
        return;
    }
// if there is no winner or no draw by the clickevent, then changeplayer and the game continues
    changePlayer();
};



// function restartGame () {
//     let currentPlayer = 'X';
//     let state = {
//     board: ["", "", "", "", "", "", "", "", "",]
//     };
//     currentPlayerDisplay.innerHTML = currentPlayerTurn();
//     cells.forEach((cell) => {
//         cell.innerHTML = "";
//     });
// };