function createGameboard() {

    const boardCurrentResult = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const getCurrentResult = () => boardCurrentResult;

    function playTurn(value, rowIndex, columnIndex) {
        if (value !== 'x' && value !== 'o') {
            // only 'x' and 'o' are accepted as input values
            console.log('Input value should be either "x" or "o."');
            return;
        } else if (boardCurrentResult[rowIndex][columnIndex] !== null) {
            console.log('The position has already been taken!');
            return;
        }
        boardCurrentResult[rowIndex][columnIndex] = value;
        // Check there is a winner (commented out, will be check later in the roundResult)
        // checkRoundWinner(boardCurrentResult);
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

        for (const currentMark of ['x', 'o']) {

            let counter = 0;

            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColumns; j++) {
                    if (inputArray[i][j] === currentMark) { counter++ };
                    if (counter >= 3) {

                        console.log(`Player with the mark "${currentMark}" Wins!`);

                        // return the row/column/diagonal index
                        return i;
                    }
                }
                // reset row counter for the next row
                counter = 0;
            }

        }

        return null;
        
    }

    function checkRoundWinner() {

        let isRoundFinished = false;

        const actualBoard = [...boardCurrentResult];
        const rowCompleted = checkThreeConsectives(actualBoard);
        
        const transposedBoard = transposeBoard(actualBoard);
        const columnCompleted = checkThreeConsectives(transposedBoard);
        
        const mainDiagonalArray = getMainDiagonal(actualBoard);
        const mainDiagonalCompleted = checkThreeConsectives(mainDiagonalArray);
        
        const secondaryDiagonalArray = getSecondaryDiagonal(transposedBoard);
        const secondaryDiagonalCompleted = checkThreeConsectives(secondaryDiagonalArray);

        if (
            rowCompleted === null &&
            columnCompleted === null &&
            mainDiagonalCompleted === null &&
            secondaryDiagonalCompleted === null
        ) {
            isRoundFinished = false;
        } else {
            isRoundFinished = true;
        }

        return {
            isRoundFinished,
        }

    }

    function resetBoard() {
        
        for (let i = 0; i < boardCurrentResult.length; i++) {
            for (let j = 0; j < boardCurrentResult[i].length; j++) {
                boardCurrentResult[i][j] = null;
            }
        }

    }

    function beginRound(user1, user2) {
        let isRoundFinished = false;
        let player = user1;
        let roundResult = null;

        resetBoard();

        let newInput = 'empty';
        while (!isRoundFinished, newInput !== null) {
            const playerName = player.getName();
            const playerID = player.getID();
            const playerMark = player.getMark();

            console.log(`Player ${playerName}, it's your turn! Here is the current board, Pick one of the empty cells!`);
            console.log(boardCurrentResult);
            newInput = prompt(`${playerName}! Input two digits separated by comma, i.e. the row and column numbers (beginning from 0)\ne.g. 0, 2`);

            let userInput;
            try {
                userInput = newInput.split(",").map(el => Number(el));
            } catch (error) {
                throw (`The input format is not accpetable:\n${error}`);
            }
            
            playTurn(playerMark, userInput[0], userInput[1]);

            // Check finishing of the game
            roundResult = checkRoundWinner();
            isRoundFinished = roundResult.isRoundFinished;

            if (isRoundFinished) {
                console.log(`Round is finished! Winner: ${player.getName()}`);
                if (playerID === user1.getID()) {
                    let newScore = user1.getScore() + 1;
                    user1.updateScore(newScore)
                } else if (playerID === user2.getID()) {
                    let newScore = user2.getScore() + 1;
                    user2.updateScore(newScore)
                }
                break;
            } else {
                // switch player
                player = playerID === user1.getID() ? user2 : user1;
            }
        }
    }
    
    return {
        getCurrentResult,
        playTurn,
        checkRoundWinner,
        beginRound,
        resetBoard
    };

};

function createUser(mark, nickName='Incognito') {
    
    let score = 0;

    nickName = (nickName === 'Incognito') ? `${nickName}#${id}` : nickName;

    if (mark === 'x' || mark === 'o') {
        mark = mark;
    } else {
        console.log(`User's mark should be either 'x' or 'o'`);
        return;
    }

    // Attach a random id to each user to identify them
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


// Testing Purposes
const gameboard = createGameboard();
const user1 = createUser('x', nickName='Khashayar');
const user2 = createUser('o', nickName='Majid');
// const user3 = createUser('a', nickName='Ali');