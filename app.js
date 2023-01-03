let gameActive = false; 
let currentPlayer;
let state = {
    board: ["", "", "", "", "", "", "", "", "",],
    players: ["", ""],
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
    return "It is " + `${currentPlayer}` +"'s turn";
};


// ********** DOM SELECTORS ****************
// select all cells on the board and store as array
const cells = document.querySelectorAll('.cell');
// console.log(cells);

const currentPlayerDisplay = document.getElementById('status');
const restartButton = document.querySelector('.restart');
const playerTurn = document.querySelector('.player-turn');
const startGameButton = document.querySelector('.startGameButton');






// ********** EVENT LISTENERS ****************
// loop through the cells array and add a click event listener to each, onclick run the cellClicked
cells.forEach((cell) => {
    cell.addEventListener('click', cellClicked)
});
// cells.addEventListener('click', console.log('click is working'));

restartButton.addEventListener('click', () => {
    gameActive = true;
    currentPlayer = `${state.players[0]}`;
    state.board = ["", "", "", "", "", "", "", "", "",];
    currentPlayerDisplay.innerHTML = currentPlayerTurn();
    cells.forEach((cell) => {
        cell.innerHTML = "";
    });
});

// here we want to add teh player names to the state.players when inputted
startGameButton.addEventListener('click', setPlayer);

// ********** FUNCTIONS **************** 

// currentPlayerDisplay.innerHTML = currentPlayerTurn();

function cellClicked(event) {
    // console.log('click is working')
    // console.log(event.target);
    const clickedCellEvent = event.target;

    // below function stores the index of the clicked cell in teh clickedcellindex variable using getatrribute method and converts it form a string to a number to pass later
    const clickedCellIndex = parseInt(clickedCellEvent.getAttribute('data-cell-index'));
    // console.log(typeof(clickedCellIndex));

    // if the state.board value is NOT empty (meaning an X or O is already there) or the gameActive has been set to false (meaning the game is over either via a win or a draw) we want to return out and end the function.
    //  otherwise run the markBoard function (update the stateboard array with X or O, and update the display of the page with X or O) by passing the event target and the index of the cell. then we run the checkforwin (which also checks for draw) and either ends or changes player turn and continues the game
    if (state.board[clickedCellIndex] !== "" || gameActive === false) {
        return;
    } 
    markBoard(clickedCellEvent, clickedCellIndex);
    checkForWin();
};

function markBoard (clickedCellEvent, clickedCellIndex) {
    if (currentPlayer === `${state.players[0]}`) {
    state.board[clickedCellIndex] = "X"    
    clickedCellEvent.innerHTML = "X";
    } else {
        state.board[clickedCellIndex] = "O"    
        clickedCellEvent.innerHTML = "O";
    }
};

    // this changes the player from X to O, simply by evaluating if the state of current player is X change to O, otherwise we assume the current is O so we will change it to X 
function changePlayer () {
    if (currentPlayer === `${state.players[0]}`) {
        currentPlayer = `${state.players[1]}`;
    } else {
        currentPlayer = `${state.players[0]}`;
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
        // console.log('this is a ',a);
        // console.log(typeof(a));
        let b = state.board[winCondition[1]];
        // console.log('this is b ',b);
        let c = state.board[winCondition[2]];
        // console.log('this is c ',c);
        
        // need to cover scenario where values in board are still empty, if so just skip and continue looping
        if (a === "" || b === "" || c === ""){
            continue;
        }

        // if any values in the loop return a, b, and c as equal then that player wins, we need to set the roundwon variable to true , then we need to display the round has been won by the current player who we can assume is teh one who just clicked the cell and triggered all these functions and events. we need to set the state of the game to false in order reset it later. return and leave the function as game is over 
        if (a === b && b === c) {
            roundWon = true;
        }
    }
    if (roundWon === true) {
        currentPlayerDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
      // if there is no winner, we need to check for draw as well. we know there will be a draw if there has been no winner declared (determined by the loop/roundwon above ^^) AND there are no empty spaces left in the state of the board meaning every space has been taken, no winner has been determined, meaning its a draw. return out of the function as the game is over
    let roundDraw = state.board.includes("");
    if (roundDraw === false) {
        currentPlayerDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
// if there is no winner or no draw by the clickevent, then changeplayer and the game continues
    changePlayer();
};


// below we run setPlayer after clicking start Game button. Here, if the target element classname is the startGameButton, we select the input element values which are typed by the user, then we assign it to a variable. then we assign the state.player at index 0 and 1 to each input value 
// then we update current player to = the name inputted in state.player[0] so we have assigned a player to make first move
// then we assign gameActive to true so the game can offically start ( we locked it before by not allowing event listener to trigger on cells is gameActive = false). and lastly we update the display to show the current players turn on the page!

function setPlayer(event) {
    // console.log(event.target.className);
    // gameActive = true;
    
    if (event.target.className === "startGameButton") {
        

        const player1Input = document.querySelector("input[name=player1]");
        const player1Value = player1Input.value;
        state.players[0] = player1Value;

        const player2Input = document.querySelector("input[name=player2]");
        const player2Value = player2Input.value;
        state.players[1] = player2Value;

        // console.log('this is current player', currentPlayer);
        // console.log(currentPlayerTurn());

        // console.log("this is my player1 value", player1Value);
        // console.log("this is my player2 value", player2Value);
        // console.log("this is my state.players[0]", state.players[0]);
        // console.log("this is my state.players[1]", state.players[1]);
    };
    gameActive = true;
    currentPlayer = `${state.players[0]}`;
    currentPlayerDisplay.innerHTML = currentPlayerTurn();
};

