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
                console.log('current row:', current_row)
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

        // console.log(input_array);

        const num_rows = input_array.length;
        const num_columns = input_array[0].length;

        for (const current_mark of ['x', 'o']) {

            let counter = 0;

            for (let i = 0; i < num_rows; i++) {
                for (let j = 0; j < num_columns; j++) {
                    if (input_array[i][j] === current_mark) { counter++ };
                    if (counter >= 3) {

                        console.log(input_array);
                        console.log(`Three consecutive elements and the row/column/diagonal #${i}`);

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

        const actual_board = [...board_current_result];
        checkThreeConsectives(actual_board);

        const transposed_board = transposeBoard(actual_board);
        checkThreeConsectives(transposed_board);
        
        const main_diagonal_array = getMainDiagonal(actual_board);
        checkThreeConsectives(main_diagonal_array);
        
        const secondary_diagonal_array = getSecondaryDiagonal(transposed_board);
        checkThreeConsectives(secondary_diagonal_array);

        
    }
    
    return {
        getCurrentResult,
        playTurn,
        checkRoundWinner,
    };
};

function createUser(mark, nick_name='Incognito') {
    
    const score = 0;

    nick_name = (nick_name === 'Incognito') ? `${nick_name}#${id}` : nick_name;

    if (mark === 'x' || mark === 'o') {
        mark = mark;
    } else {
        console.log(`User's mark should be either 'x' or 'o'`);
        return;
    }

    getName = () => nick_name;
    getMark = () => mark;
    getScore = () => score;

    function updateScore(newScore) {
        score = newScore;
    }

    return {
        getName,
        getMark,
        getScore,
        updateScore,
    }
}


// Testing Purposes
const gameboard = createGameboard();
const user1 = createUser('x', nick_name='Khashayar');
const user2 = createUser('o', nick_name='Majid');
// const user3 = createUser('a', nick_name='Ali');