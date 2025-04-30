function createGameboard() {

    const board_current_result = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const getCurrentResult = () => board_current_result;

    function playTurn(value, row_index, column_index) {
        if (value !== 'x' && value !== 'o') {
            // only 'x' and 'o' are accepted as input values
            console.log('Input value should be either "x" or "o."');
            return;
        } else if (board_current_result[row_index][column_index] !== null) {
            console.log('The position has already been taken!');
            return;
        }
        board_current_result[row_index][column_index] = value;
        // Check there is a winner (commented out, will be check later in the round_result)
        // checkRoundWinner(board_current_result);
        return;
    };

    // Helper functions
    function transposeBoard(board) {

        const transposed_board = [];

        const num_rows = board.length;
        const num_columns = board[0].length;
        
        let current_row = [];
        for (let i = 0; i < num_rows; i++) {
            // Empty the row
            current_row = [];
            for (let j = 0; j < num_columns; j++) {
                current_row.push(board[j][i]);
            }
            transposed_board.push(current_row);
        }

        console.transposed_board;

        return transposed_board;

    }

    function getMainDiagonal(board) {
        const main_diagonal = [];
        const num_rows = board.length;
    
        for (let i = 0; i < num_rows; i++) {
            main_diagonal.push(board[i][i]);
        }
    
        // For compatibility, return it as a 1D array inside another array (like a 1D matrix)
        main_diagonal_array = [main_diagonal];

        return main_diagonal_array;

    }

    function getSecondaryDiagonal(board) {
        const secondary_diagonal = [];
        const num_rows = board.length;
    
        for (let i = 0; i < num_rows; i++) {
            secondary_diagonal.push(board[i][num_rows - 1 - i]);
        }
    
        // For compatibility, return it as a 1D array inside another array (like a 1D matrix)
        secondary_diagonal_array = [secondary_diagonal];

        return secondary_diagonal_array;
    }

    function checkThreeConsectives(input_array) {

        // This function only check for consecutive elements in a row, so for columns for example, first you should transpose them and then send them as inputs to this function

        const num_rows = input_array.length;
        const num_columns = input_array[0].length;

        for (const current_mark of ['x', 'o']) {

            let counter = 0;

            for (let i = 0; i < num_rows; i++) {
                for (let j = 0; j < num_columns; j++) {
                    if (input_array[i][j] === current_mark) { counter++ };
                    if (counter >= 3) {

                        console.log(`Player with the mark "${current_mark}" Wins!`);

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

        let round_finished = false;

        const actual_board = [...board_current_result];
        const row_completed = checkThreeConsectives(actual_board);
        
        const transposed_board = transposeBoard(actual_board);
        const column_completed = checkThreeConsectives(transposed_board);
        
        const main_diagonal_array = getMainDiagonal(actual_board);
        const main_diagonal_completed = checkThreeConsectives(main_diagonal_array);
        
        const secondary_diagonal_array = getSecondaryDiagonal(transposed_board);
        const secondary_diagonal_completed = checkThreeConsectives(secondary_diagonal_array);

        if (
            row_completed === null &&
            column_completed === null &&
            main_diagonal_completed === null &&
            secondary_diagonal_completed === null
        ) {
            round_finished = false;
        } else {
            round_finished = true;
        }

        return {
            round_finished,
        }

    }

    function resetBoard() {
        
        for (let i = 0; i < board_current_result.length; i++) {
            for (let j = 0; j < board_current_result[i].length; j++) {
                board_current_result[i][j] = null;
            }
        }

    }

    function beginRound(user1, user2) {
        let round_finished = false;
        let player = user1;
        let round_result = null;

        resetBoard();

        let new_input = 'empty';
        while (!round_finished, new_input !== null) {
            const player_name = player.getName();
            const player_id = player.getID();
            const player_mark = player.getMark();

            console.log(`Player ${player_name}, it's your turn! Here is the current board, Pick one of the empty cells!`);
            console.log(board_current_result);
            new_input = prompt(`${player_name}! Input two digits separated by comma, i.e. the row and column numbers (beginning from 0)\ne.g. 0, 2`);

            let user_input;
            try {
                user_input = new_input.split(",").map(el => Number(el));
            } catch (error) {
                throw (`The input format is not accpetable:\n${error}`);
            }
            
            playTurn(player_mark, user_input[0], user_input[1]);

            // Check finishing of the game
            round_result = checkRoundWinner();
            console.log({round_result});
            round_finished = round_result.round_finished;

            if (round_finished) {
                console.log(`Round is finished! Winner: ${player.getName()}`);
                if (player_id === user1.getID()) {
                    let new_score = user1.getScore() + 1;
                    user1.updateScore(new_score)
                } else if (player_id === user2.getID()) {
                    let new_score = user2.getScore() + 1;
                    user2.updateScore(new_score)
                }
                break;
            } else {
                // switch player
                player = player_id === user1.getID() ? user2 : user1;
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

function createUser(mark, nick_name='Incognito') {
    
    let score = 0;

    nick_name = (nick_name === 'Incognito') ? `${nick_name}#${id}` : nick_name;

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

    getName = () => nick_name;
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
const user1 = createUser('x', nick_name='Khashayar');
const user2 = createUser('o', nick_name='Majid');
// const user3 = createUser('a', nick_name='Ali');