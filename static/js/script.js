function createGameboard() {
    const board_current_result = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const getCurrentResult = () => board_current_result;

    function playGame(value, row_index, column_index) {
        if (value !== 'x' && value !== 'o') {
            // only 'x' and 'o' are accepted as input values
            console.log('Input value should be either "x" or "o."');
            return;
        }
        board_current_result[row_index][column_index] = value;
    };
    
    return {
        getCurrentResult,
        playGame,
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

    function getName() {
        return nick_name;
    }

    function getMark() {
        return mark;
    }

    function getScore() {
        return score;
    }

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