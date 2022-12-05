const fs = require('fs');

const file = fs.readFileSync('./2/input.txt', 'utf8');

const input = file.split('\n');

const totalScore = input.reduce((score, round) => {
    const selections = round.split(' ');
    const opp = selections[0];
    const me = selections[1];
    switch(me) {
        case 'X':
            score += 1;
            if (opp === 'C') score += 6
            if (opp === 'A') score += 3
            break;
        case 'Y':
            score += 2;
            if (opp === 'A') score += 6
            if (opp === 'B') score += 3
            break;
        case 'Z':
            score += 3;
            if (opp === 'B') score += 6
            if (opp === 'C') score += 3
            break;
    }
    return score;
}, 0);

console.log(totalScore);

const newTotalScore = input.reduce((score, round) => {
    const selections = round.split(' ');
    const opp = selections[0];
    const result = selections[1];
    switch(result) {
        case 'X':
            if (opp === 'A') score += 3
            if (opp === 'B') score += 1
            if (opp === 'C') score += 2
            break;
        case 'Y':
            score += 3;
            if (opp === 'A') score += 1
            if (opp === 'B') score += 2
            if (opp === 'C') score += 3
            break;
        case 'Z':
            score += 6;
            if (opp === 'A') score += 2
            if (opp === 'B') score += 3
            if (opp === 'C') score += 1
            break;
    }
    return score;
}, 0);

console.log(newTotalScore);