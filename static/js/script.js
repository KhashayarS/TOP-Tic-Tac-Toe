const gameboard = (function createGameboard() {

    const gameboardArray = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    return {
        gameboardArray,
    }

})();

function createPlayer(mark, nickName='Incognito') {
    
    let score = 0;
    
    if (mark === 'x' || mark === 'o') {
        mark = mark;
    } else {
        console.log(`User's mark should be either 'x' or 'o'`);
        return;
    }
    
    // Attach a random id to each player to identify them
    function generateRandomID (length = 10) {
        const generatedID = Math.random().toString().substring(2, length + 2);
        return generatedID;
    }
    
    const id = generateRandomID();

    nickName = (nickName === 'Incognito') ? `${nickName}#${id}` : nickName;
    
    function updateScore(newScore) {
        score = newScore;
    }
    
    // Modular functions
    const switchMark = () => {
        mark = mark === 'x' ? 'o' : 'x';
    }
    const setMark = (newMark) => {
        mark = newMark;
    }
    const getName = () => nickName;
    const getMark = () => mark;
    const getScore = () => score;
    const getID = () => id;


    return {
        getName,
        getMark,
        getScore,
        getID,
        updateScore,
        switchMark,
        setMark,
    }
}

gameController = (function () {

    const gameboardArray = gameboard.gameboardArray;

    // Helper functions
    function transposeBoard(board) {

        const transposedBoard = [];

        const numRows = board.length;
        const numColumns = board[0].length;
        
        let currentRow = [];
        for (let i = 0; i < numRows; i++) {
            // Empty the row
            currentRow = [];
            for (let j = 0; j < numColumns; j++) {
                currentRow.push(board[j][i]);
            }
            transposedBoard.push(currentRow);
        }

        console.transposedBoard;

        return transposedBoard;

    }

    function restartPlayersData(player1, player2) {
        player1.updateScore(0);
        player2.updateScore(0);
        player1.setMark('x');
        player2.setMark('o');
    }

    // Modular functions 
    const getCurrentResult = () => gameboardArray;

    function playTurn(value, rowIndex, columnIndex) {

        // This function only fills the gameboardArray cell with the input value if possible and returns nothing

        if (value !== 'x' && value !== 'o') {
            // only 'x' and 'o' are accepted as input values
            console.log('Input value should be either "x" or "o."');
            return;
        } else if (gameboardArray[rowIndex][columnIndex] !== null) {
            console.log('The position has already been taken!');
            return;
        }
        gameboardArray[rowIndex][columnIndex] = value;
        // Check there is a winner (commented out, will be check later in the roundResult)
        // checkRoundWinner(gameboardArray);
        return;

    };

    

    function getMainDiagonal(board) {
        const mainDiagonal = [];
        const numRows = board.length;
    
        for (let i = 0; i < numRows; i++) {
            mainDiagonal.push(board[i][i]);
        }
    
        // For compatibility, return it as a 1D array inside another array (like a 1D matrix)
        mainDiagonalArray = [mainDiagonal];

        return mainDiagonalArray;

    }

    function getSecondaryDiagonal(board) {
        const secondaryDiagonal = [];
        const numRows = board.length;
    
        for (let i = 0; i < numRows; i++) {
            secondaryDiagonal.push(board[i][numRows - 1 - i]);
        }
    
        // For compatibility, return it as a 1D array inside another array (like a 1D matrix)
        secondaryDiagonalArray = [secondaryDiagonal];

        return secondaryDiagonalArray;
    }

    function checkThreeConsectives(inputArray) {

        // This function only check for consecutive elements in a row, so for columns for example, first you should transpose them and then send them as inputs to this function

        const numRows = inputArray.length;
        const numColumns = inputArray[0].length;
        let winnerMark = null;
        let consecutiveIndex = null;

        for (let _mark of ['x', 'o']) {

            let counter = 0;

            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColumns; j++) {
                    if (inputArray[i][j] === _mark) {
                        counter++
                    };
                    if (counter >= 3) {

                        // console.log(`Player with the mark "${_mark}" Wins!`);
                        winnerMark = _mark;

                        // return the row/column/diagonal index
                        consecutiveIndex = i;
                        return {consecutiveIndex, winnerMark};
                    }
                }
                // reset row counter for the next row
                counter = 0;
            }

        }

        return {consecutiveIndex, winnerMark};
        
    }

    function checkRoundWinner() {
        let isRoundFinished = false;
        let finishedElements = [];
        let isItDraw = false;
        let winnerMark = null;

        const actualBoard = [...gameboardArray];
        const rowResult = checkThreeConsectives(actualBoard);
        const rowCompleted = rowResult.consecutiveIndex;
        const rowWinnerMark = rowResult.winnerMark;
        
        const transposedBoard = transposeBoard(actualBoard);
        const columnResult = checkThreeConsectives(transposedBoard);
        const columnCompleted = columnResult.consecutiveIndex;
        const columnWinnerMark = columnResult.winnerMark;
        
        const mainDiagonalArray = getMainDiagonal(actualBoard);
        const mainDiagonalResult = checkThreeConsectives(mainDiagonalArray);
        const mainDiagonalCompleted = mainDiagonalResult.consecutiveIndex;
        const mainDiagonalWinnerMark = mainDiagonalResult.winnerMark;
        
        const secondaryDiagonalArray = getSecondaryDiagonal(transposedBoard);
        const secondaryDiagonalResult = checkThreeConsectives(secondaryDiagonalArray);
        const secondaryDiagonalCompleted = secondaryDiagonalResult.consecutiveIndex;
        const secondaryDiagonalWinnerMark = secondaryDiagonalResult.winnerMark;

        const hasEmptyCells = actualBoard.some(row => row.includes(null));

        // Check if there is a winner
        if (rowCompleted !== null || columnCompleted !== null || mainDiagonalCompleted !== null || secondaryDiagonalCompleted !== null) {
            isRoundFinished = true;

            // Determine the winning elements
            const populateFinishedElements = (callback) => {
                for (let i = 0; i < 3; i++) {
                    finishedElements[i] = callback(i);
                }
            };
            
            if (rowCompleted !== null) {
                populateFinishedElements(i => [rowCompleted, i]);
                winnerMark = rowWinnerMark;
            } else if (columnCompleted !== null) {
                populateFinishedElements(i => [i, columnCompleted]);
                winnerMark = columnWinnerMark;
            } else if (mainDiagonalCompleted !== null) {
                populateFinishedElements(i => [i, i]);
                winnerMark = mainDiagonalWinnerMark;
            } else if (secondaryDiagonalCompleted !== null) {
                populateFinishedElements(i => [i, 2 - i]);
                winnerMark = secondaryDiagonalWinnerMark;
            }
        } else if (hasEmptyCells) {
            isRoundFinished = false;
        } else {         
            isRoundFinished = true;
            isItDraw = true;
        }

        return {
            isRoundFinished,
            finishedElements,
            isItDraw,
            winnerMark,
        }
    }

    function resetBoard() {
        
        for (let i = 0; i < gameboardArray.length; i++) {
            for (let j = 0; j < gameboardArray[i].length; j++) {
                gameboardArray[i][j] = null;
            }
        }

    }

    function restartGame(player1, player2) {

        resetBoard();
        restartPlayersData(player1, player2);

    }

    function switchCurrentMark(currentMark) {
        const newCurrentMark = currentMark === 'x' ? 'o' : 'x';
        return newCurrentMark;
    }

    function playRoundConsole(player1, player2) {

        let isRoundFinished = false;
        let player = player1;
        let roundResult = null;

        resetBoard();

        let newInput = 'empty';
        while (!isRoundFinished, newInput !== null) {
            const playerName = player.getName();
            const playerID = player.getID();
            const playerMark = player.getMark();

            console.log(`Player ${playerName}, it's your turn! Here is the current board, Pick one of the empty cells!`);
            console.log(gameboardArray);
            // newInput = prompt(`${playerName}! Input two digits separated by comma, i.e. the row and column numbers (beginning from 0)\ne.g. 0, 2`);

            let playerInput;
            try {
                playerInput = newInput.split(",").map(el => Number(el));
            } catch (error) {
                throw (`The input format is not accpetable:\n${error}`);
            }

            playTurn(playerMark, playerInput[0], playerInput[1]);

            // Check finishing of the game
            roundResult = checkRoundWinner();
            isRoundFinished = roundResult.isRoundFinished;



            if (isRoundFinished) {
                console.log(`Round is finished! Winner: ${player.getName()}`);
                if (playerID === player1.getID()) {
                    let newScore = player1.getScore() + 1;
                    player1.updateScore(newScore)
                } else if (playerID === player2.getID()) {
                    let newScore = player2.getScore() + 1;
                    player2.updateScore(newScore)
                }
            }

            currentMark = switchCurrentMark(currentMark);
        }
    }

    function playRound(player1, player2, currentMark, selectedRowColumn) {

        let roundResult = null;
        let isRoundFinished = false;
        let finishedElements = [];
        let winnerMark =  null;
        let isItDraw = null;
        let selectedRow, selectedColumn;

        if (selectedRowColumn === 'invalid') {
            return 'invalid';
        } else {
            [selectedRow, selectedColumn] = selectedRowColumn;
        }

        let player;
        if (player1.getMark() === currentMark) {
            player = player1;
        } else if (player2.getMark() === currentMark) {
            player = player2;
        } else {
            console.log("The current mark does not match any of the player' marks");
        }

        
        const playerID = player.getID();
        const playerMark = player.getMark();

        
        playTurn(playerMark, selectedRow, selectedColumn);

        // Check finishing of the game
        roundResult = checkRoundWinner();
        isRoundFinished = roundResult.isRoundFinished;
        finishedElements = roundResult.finishedElements;
        winnerMark = roundResult.winnerMark;
        isItDraw = roundResult.isItDraw;

        if (isRoundFinished) {

            if (isItDraw) {
                // Do nothing for now
            } else if (playerID === player1.getID()) {
                let newScore = player1.getScore() + 1;
                player1.updateScore(newScore)
            } else if (playerID === player2.getID()) {
                let newScore = player2.getScore() + 1;
                player2.updateScore(newScore)
            }

            resetBoard();
            player1.switchMark();
            player2.switchMark();

        }

        const newCurrentMark = switchCurrentMark(currentMark);

        return {
            isRoundFinished,
            newCurrentMark,
            finishedElements,
        }

    }

    return {
        getCurrentResult,
        checkRoundWinner,
        playTurn,
        playRoundConsole,
        playRound,
        resetBoard,
        restartGame,
        switchCurrentMark,
    };
})();

const displayController = (function () {

    const playersFormContainer = document.querySelector('#players-form-container');
    const startBtn = document.querySelector('#start-btn');
    const resetBtn = document.querySelector('#reset-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const player1Input = document.querySelector("#player1-input");
    const player2Input = document.querySelector("#player2-input");
    const boardArea = document.querySelector('#board-area');
    const boardContainer = document.querySelector('#board-container');
    const boardItems = document.querySelectorAll('.board-item');
    const buttonsContainerBefore = document.querySelector('#buttons-container-before');
    const buttonsContainerAfter = document.querySelector('#buttons-container-after');
    const player1DataContainer = document.querySelector('#player1-data-container');
    const player2DataContainer = document.querySelector('#player2-data-container');
    const player1NameDisplay = document.querySelector('#player1-name-display');
    const player2NameDisplay = document.querySelector('#player2-name-display');
    const player1MarkDisplay = document.querySelector('#player1-mark-display');
    const player2MarkDisplay = document.querySelector('#player2-mark-display');
    const player1ScoreDisplay = document.querySelector('#player1-score-display');
    const player2ScoreDisplay = document.querySelector('#player2-score-display');

    // Define an array that can be used to the index and coordiantes of each board item
    const boardCorrespondingArray = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2],
    ];

    // Helper functions

    function toggleHiddenClass(toggleList) {
        toggleList.forEach(el => el.classList.toggle('hidden'));
    }
    
    function getSelectedRowColumn(event) {

        let selectedRowColumn;

        // Check that cell is not already selected
        let clickedItem = event.target.closest('.board-item');
        if (clickedItem.children.length > 0) {
            selectedRowColumn = 'invalid';
        } else {
            const selectedCellID = Number(clickedItem.id.split('-')[1]) - 1;
            selectedRowColumn = boardCorrespondingArray[selectedCellID];
        }

        return selectedRowColumn;

    };

    // Modular functinos

    function showMark(cellElement, mark) {
        const cellSVGCodes = {
            x: `<svg class="board-icon cross-icon" viewBox="0 0 100 100">
                    <use xlink:href="static/icons/svg/board-elements.svg#cross"></use>
                </svg>`,
            o: `<svg class="board-icon circle-icon" viewBox="0 0 100 100">
                    <use xlink:href="static/icons/svg/board-elements.svg#circle"></use>
                </svg>`,           
        };

        if (mark === 'x') {
            cellElement.innerHTML = cellSVGCodes.x;
        } else if (mark === 'o') {
            cellElement.innerHTML = cellSVGCodes.o;
        }
    };

    function startGameDisplay(event) {
        // Prevent the default submission of the form behaviour of the button
        event.preventDefault();
        const player1Name = player1Input.value.length > 0 ? player1Input.value : 'PLAYER 1';
        const player2Name = player2Input.value.length > 0 ? player2Input.value : 'PLAYER 2';
        const toggleList = [boardArea, playersFormContainer, player1DataContainer, player2DataContainer];
        toggleHiddenClass(toggleList);

        return {
            player1Name,
            player2Name,
        }
    }

    function addEventListeners(startCallback, resetCallback, restartCallback, cellClickCallback) {
        startBtn.addEventListener('click', startCallback);
        resetBtn.addEventListener('click', resetCallback);
        restartBtn.addEventListener('click', restartCallback);
        boardItems.forEach((item) => {
            item.addEventListener('click', cellClickCallback);
        });
    }

    function displayPlayersData(player1, player2) {
        player1NameDisplay.innerText = player1.getName();
        player2NameDisplay.innerText = player2.getName();
        player1MarkDisplay.innerText = player1.getMark().toUpperCase();
        player2MarkDisplay.innerText = player2.getMark().toUpperCase();
        player1ScoreDisplay.innerText = player1.getScore();
        player2ScoreDisplay.innerText = player2.getScore();
    }

    function resetBoard() {
        boardItems.forEach(item => item.innerHTML = '');
    }

    function highlighWinningCells(winningCellArray) {

        let winningBoardIndex, winningItemID, winningDOM;

        winningCellArray.forEach(winningCellElement => {
            let boardIndex = boardCorrespondingArray.findIndex(
                boardElement => boardElement[0] === winningCellElement[0] && 
                boardElement[1] === winningCellElement[1]
            );
            winningBoardIndex =  boardIndex + 1;
            try {
                winningItemID = `#cell-${winningBoardIndex}`;
                winningDOM = document.querySelector(`${winningItemID} .board-icon`);
                winningDOM.classList.add('winning-mark');
            } catch(error) {
                console.log(`Couldn't add the winning class to the winning elements, here is there: ${error}`);
            }

        })
    }

    function updateScores(player1, player2) {
        player1ScoreDisplay.innerText = player1.getScore();
        player2ScoreDisplay.innerText = player2.getScore();
    }

    function freezeBoard(cellClickCallback) {
        // Remove event listeners from the board items
        boardItems.forEach((item) => {
            item.removeEventListener('click', cellClickCallback);
        });
    }


    return {
        startGameDisplay,
        getSelectedRowColumn,
        showMark,
        addEventListeners,
        displayPlayersData,
        updateScores,
        resetBoard,
        highlighWinningCells,
        freezeBoard,
    }
    
})();

// Game Flow Controller ()
const gameFlowController = (function() {

    let player1, player2, currentTurnMark, currentRoundTurnMark, isRoundFinished, finishedElements = null;

    function startCallback(event) {
        playerNames = displayController.startGameDisplay(event);
        player1 = createPlayer('x', playerNames.player1Name);
        player2 = createPlayer('o', playerNames.player2Name);
        displayController.displayPlayersData(player1, player2);
        currentTurnMark = player1.getMark();
        // This mark is used for reset board purposes, so each round will begin with the same mark after resetting the board (first player's turn won't change)
        currentRoundTurnMark = player1.getMark();
    }
    
    function resetCallback(event) {
        gameController.resetBoard();
        displayController.resetBoard();
        displayController.displayPlayersData(player1, player2);
        console.log({isRoundFinished});
        if (!isRoundFinished) currentTurnMark = currentRoundTurnMark;
        isRoundFinished = null;
        addAllEventListeners();
    }

    function restartCallback(event) {
        gameController.restartGame(player1, player2);
        displayController.resetBoard();
        displayController.displayPlayersData(player1, player2);
        currentTurnMark = player1.getMark();
        isRoundFinished = null;
        addAllEventListeners();
    }

    function cellClickCallback(event) {
        console.log(player1.getMark(), player2.getMark());
        const selectedCellElement = event.target.closest('.board-item');
        const selectedRowColumnArray = displayController.getSelectedRowColumn(event);

        if (selectedRowColumnArray !== 'invalid') {

            displayController.showMark(selectedCellElement, mark=currentTurnMark);
            const roundResult = gameController.playRound(
                player1,
                player2,
                currentTurnMark,
                selectedRowColumnArray,
            );
            // console.log(roundResult);
            // console.log(gameController.getCurrentResult());
            isRoundFinished = roundResult.isRoundFinished;
            currentTurnMark = roundResult.newCurrentMark;
    
    
            if (isRoundFinished) {
                finishedElements = roundResult.finishedElements;
                displayController.highlighWinningCells(finishedElements);
                displayController.updateScores(player1, player2);
                displayController.freezeBoard(cellClickCallback);
                currentRoundTurnMark = gameController.switchCurrentMark(currentRoundTurnMark);
            }
            
        }


    }

    addAllEventListeners = function() {
        displayController.addEventListeners(startCallback, resetCallback, restartCallback, cellClickCallback);
    };

    addAllEventListeners();

})();

