const fs = require("fs");

const file = fs.readFileSync("./5/input.txt", "utf8");

const [startPositionText, input] = file.split("\n\n");

const startPositionArray = startPositionText.split("\n").reduce((arr, line) => {
  let text = "";
  for (let i = 1; i < line.length; i += 4) {
    text += line[i];
  }
  return [...arr, text];
}, []);

const positions = [];

for (let i = 0; i < startPositionArray.length; i++) {
  const str = startPositionArray.reduce((text, line) => {
    if (line[i] === " ") return text;
    return text + line[i];
  }, "");
  positions.push(str.slice(0, -1));
}

input.split("\n").forEach((line) => {
  const [amount, start, end] = line.match(/\d+/g);

  //   for (let index = 0; index < amount; index++) {
  //     const startStringArr = positions[start - 1].split("");
  //     const itemToMove = startStringArr.shift();
  //     positions[start - 1] = startStringArr.join("");
  //     const endStringArr = positions[end - 1].split("");
  //     if (itemToMove) endStringArr.unshift(itemToMove);
  //     positions[end - 1] = endStringArr.join("");
  //   }

  const startStringArr = positions[start - 1].split("");
  const itemsToMove = startStringArr.splice(0, amount);
  positions[start - 1] = startStringArr.join("");
  const endStringArr = positions[end - 1].split("");
  positions[end - 1] = [...itemsToMove, ...endStringArr].join("");

});

console.log(positions);
