const fs = require('fs');

const file = fs.readFileSync('./4/input.txt', 'utf8');

const input = file.split('\n');

const totalContained = input.reduce((sum, pair) => {
    const [elfOne, elfTwo] = pair.split(',')
    const [elfOneMin, elfOneMax] = elfOne.split('-').map(Number);
    const [elfTwoMin, elfTwoMax] = elfTwo.split('-').map(Number);

    if (elfOneMin <= elfTwoMin && elfOneMax >= elfTwoMax) {
        sum += 1;
    } else if (elfTwoMin <= elfOneMin && elfTwoMax >= elfOneMax) {
        sum += 1;
    }
    return sum
}, 0);

console.log(totalContained)

const totalOverlap = input.reduce((sum, pair) => {
    const [elfOne, elfTwo] = pair.split(',')
    const [elfOneMin, elfOneMax] = elfOne.split('-').map(Number);
    const [elfTwoMin, elfTwoMax] = elfTwo.split('-').map(Number);

    if (elfOneMin <= elfTwoMax && elfOneMax >= elfTwoMin) {
        sum += 1;
    } else if (elfTwoMin <= elfOneMax && elfTwoMax >= elfOneMin) {
        sum += 1;
    }

    return sum
}, 0);

console.log(totalOverlap)
