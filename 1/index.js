const fs = require('fs');

const file = fs.readFileSync('./1/input.txt', 'utf8');

const groups = file.split('\n\n')

const totals = groups.map(group => {
    const items = group.split('\n');
    return items.reduce((total, item) => {
        return Number(item) + total;
    }, 0);
});

const highest = totals.sort((a, b) => b - a)[0];

const topThree = totals.slice(0, 3);

const sum = topThree.reduce((a, b) => a + b, 0);

console.log(sum);