const fs = require('fs');

const file = fs.readFileSync('./3/input.txt', 'utf8');

const input = file.split('\n');

const priorityString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const calculatePriority = (string) => {
    return priorityString.indexOf(string) + 1;
}

const totalPriority = input.reduce((sum, rucksack) => {
    const compartmentOne = rucksack.slice(0, rucksack.length / 2);
    const compartmentTwo = rucksack.slice(rucksack.length / 2);
    const sharedItem = compartmentOne.split('').find(item => compartmentTwo.includes(item));
    return sum += calculatePriority(sharedItem);
}, 0);

console.log(totalPriority);

const elfGroups = [];

for (let index = 0; index < input.length; index += 3) {
    elfGroups.push(input.slice(index, index + 3));   
}

const newTotalPriority = elfGroups.reduce((sum, elfGroup) => {
    const [compartmentOne, compartmentTwo, compartmentThree] = elfGroup;
    const sharedItem = compartmentOne.split('').find(item => compartmentTwo.includes(item) && compartmentThree.includes(item));
    return sum += calculatePriority(sharedItem);
}, 0);

console.log(newTotalPriority);
