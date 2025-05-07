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

function createUser(mark, nickName='Incognito') {
    
    let score = 0;

    nickName = (nickName === 'Incognito') ? `${nickName}#${id}` : nickName;

    if (mark === 'x' || mark === 'o') {
        mark = mark;
    } else {
        console.log(`User's mark should be either 'x' or 'o'`);
        return;
    }

    // Attach a random id to each player to identify them
    function generateRandomID (length = 10) {
        const id = Math.random().toString().substring(2, length + 2);
        return id;
    }

    const id = generateRandomID();

    function updateScore(newScore) {
        score = newScore;
    }

    getName = () => nickName;
    getMark = () => mark;
    getScore = () => score;
    getID = () => id;


    return {
        getName,
        getMark,
        getScore,
        getID,
        updateScore,
    }
}

const displayController = (function () {

    const playersForm = document.querySelector('#players-form');
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
    const player1ScoreDisplay = document.querySelector('#player1-score-display');
    const player2ScoreDisplay = document.querySelector('#player2-score-display');

    // Define an array that can be used to the index and coordiantes of each board item
    const boardCorrespondingArray = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2],
    ]
    
    function getSelectedRowColumn(event) {

        let selectedRowColumn;

        const selectedCellID = Number(event.target.id.split('-')[1]) - 1;
        selectedRowColumn = boardCorrespondingArray[selectedCellID];

        return selectedRowColumn;
    };

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
        const player1Name = player1Input.value.length > 0 ? player1Input.value : 'PLAYER1';
        const player2Name = player2Input.value.length > 0 ? player2Input.value : 'PLAYER2';
        const toggleList = [boardArea, playersForm, player1DataContainer, player2DataContainer];
        toggleHiddenClass(toggleList);

        return {
            player1Name,
            player2Name,
        }
    }

    function AddEventListeners(startCallback, resetCallback, restartCallback, cellClickCallback) {
        startBtn.addEventListener('click', startCallback);
        resetBtn.addEventListener('click', resetCallback);
        restartBtn.addEventListener('click', restartCallback);
        boardItems.forEach((item) => {
            item.addEventListener('click', cellClickCallback);
        });
    }

    function displayUsersData(player1, player2) {
        player1NameDisplay.innerText = player1.getName();
        player2NameDisplay.innerText = player2.getName();
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

    // Helper funcitons

    function toggleHiddenClass(toggleList) {
        toggleList.forEach(el => el.classList.toggle('hidden'));
    }

    return {
        startGameDisplay,
        getSelectedRowColumn,
        showMark,
        AddEventListeners,
        displayUsersData,
        resetBoard,
        highlighWinningCells,
    }
    
})();

gameController = (function () {

    const gameboardArray = gameboard.gameboardArray;
    
    const getCurrentResult = () => gameboardArray;

    function playTurn(value, rowIndex, columnIndex) {
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
        let consecutive_index = null;

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
                        consecutive_index = i;
                        return {consecutive_index, winnerMark};
                    }
                }
                // reset row counter for the next row
                counter = 0;
            }

        }

        return {consecutive_index, winnerMark};
        
    }

    function checkRoundWinner() {

        let isRoundFinished = false;
        let finishedElements = [];

        const actualBoard = [...gameboardArray];
        const rowCompleted = checkThreeConsectives(actualBoard).consecutive_index;
        
        const transposedBoard = transposeBoard(actualBoard);
        const columnCompleted = checkThreeConsectives(transposedBoard).consecutive_index;
        
        const mainDiagonalArray = getMainDiagonal(actualBoard);
        const mainDiagonalCompleted = checkThreeConsectives(mainDiagonalArray).consecutive_index;
        
        const secondaryDiagonalArray = getSecondaryDiagonal(transposedBoard);
        const secondaryDiagonalCompleted = checkThreeConsectives(secondaryDiagonalArray).consecutive_index;

        if (
            rowCompleted === null &&
            columnCompleted === null &&
            mainDiagonalCompleted === null &&
            secondaryDiagonalCompleted === null
        ) {

            isRoundFinished = false;

        } else {

            isRoundFinished = true;

            // Spot finishing elements
            if (rowCompleted !== null) {
                for (let i=0; i < 3; i++) {
                    finishedElements[i] = [rowCompleted, i];
                }
            } else if (columnCompleted !== null) {
                for (let i=0; i < 3; i++) {
                    finishedElements[i] = [i, columnCompleted];
                }
            } else if (mainDiagonalCompleted !== null) {
                for (let i=0; i < 3; i++) {
                    finishedElements[i] = [i, i];
                }
            } else if (secondaryDiagonalCompleted !== null) {
                for (let i=0; i < 3; i++) {
                    finishedElements[i] = [i, 2 - i];
                }
            }
        }

        return {
            isRoundFinished,
            finishedElements,
        }

    }

    function resetBoard() {
        
        for (let i = 0; i < gameboardArray.length; i++) {
            for (let j = 0; j < gameboardArray[i].length; j++) {
                gameboardArray[i][j] = null;
            }
        }

    }

    function switchMark(currentMark) {
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

            switchPlayerMark(currentMark);
        }
    }

    function playRound(player1, player2, currentMark, selectedRow, selectedColumn) {

        let isRoundFinished = false;
        let roundResult = null;

        let player;
        if (player1.getMark() === currentMark) {
            player = player1;
        } else if (player2.getMark() === currentMark) {
            player = player2;
        } else {
            console.log("The current mark does not match any of the user' marks");
        }

        
        const playerID = player.getID();
        const playerMark = player.getMark();

        playTurn(playerMark, selectedRow, selectedColumn);

        // Check finishing of the game
        roundResult = checkRoundWinner();
        isRoundFinished = roundResult.isRoundFinished;
        finishedElements = roundResult.finishedElements;

        if (isRoundFinished) {

            if (playerID === player1.getID()) {
                let newScore = player1.getScore() + 1;
                player1.updateScore(newScore)
            } else if (playerID === player2.getID()) {
                let newScore = player2.getScore() + 1;
                player2.updateScore(newScore)
            }

            resetBoard();

        }

        const newCurrentMark = switchMark(currentMark);

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
        playRound,
        resetBoard
    };
})();

// Game Flow Controller ()
const gameFlowController = (function() {

    let player1, player2, currentTurnMark, isRoundFinished, finishedElements = null;

    function startCallback(event) {
        playerNames = displayController.startGameDisplay(event);
        player1 = createUser('x', playerNames.player1Name);
        player2 = createUser('o', playerNames.player2Name);
        displayController.displayUsersData(player1, player2);
        currentTurnMark = player1.getMark();
    }
    
    function playRoundCallBack() {
        
        gameController.playRound(player1, player2);

    }

    function resetCallback(event) {
        displayController.resetBoard();
        gameController.resetBoard();
    }

    function restartCallback(event) {
        displayController.resetBoard();
    }

    function cellClickCallback(event) {
        const selectedCellElement = event.target.closest('.board-item');
        const selectedRowColumnArray = displayController.getSelectedRowColumn(event);

        displayController.showMark(selectedCellElement, mark=currentTurnMark);

        const roundResult = gameController.playRound(
            player1,
            player2,
            currentTurnMark,
            selectedRowColumnArray[0],
            selectedRowColumnArray[1]
        );
        // console.log(roundResult);
        // console.log(gameController.getCurrentResult());
        isRoundFinished = roundResult.isRoundFinished;
        currentTurnMark = roundResult.newCurrentMark;


        if (isRoundFinished) {
            finishedElements = roundResult.finishedElements;
            displayController.highlighWinningCells(finishedElements);
        }

    }

    displayController.AddEventListeners(startCallback, resetCallback, restartCallback, cellClickCallback);


})();

