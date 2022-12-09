const fs = require("fs");

const file = fs.readFileSync("./8/input.txt", "utf8");

const input = file.split("\n");

const output = input.map((line) => {
  const lineArr = line.split("").map((char) => ({ char, visible: false }));
  let highestLeft = -1;
  for (let index = 0; index < lineArr.length; index++) {
    const char = Number(lineArr[index].char);
    if (char > highestLeft) {
      lineArr[index].visible = true;
      highestLeft = char;
    }
  }
  let highestRight = -1;
  for (let index = lineArr.length - 1; index >= 0; index--) {
    const char = Number(lineArr[index].char);
    if (char > highestRight) {
      lineArr[index].visible = true;
      highestRight = char;
    }
  }
  return lineArr;
});

const highestTop = output[0].map((tree) => {
  tree.visible = true;
  return tree.char;
});
const highestBottom = output[output.length - 1].map((tree) => {
  tree.visible = true;
  return tree.char;
});

for (let index = 0; index < output.length; index++) {
  const line = output[index];
  line.forEach((tree, index) => {
    const char = Number(tree.char);
    if (char > highestTop[index]) {
      tree.visible = true;
      highestTop[index] = char;
    }
  });
}

for (let index = output.length - 1; index >= 0; index--) {
  const line = output[index];
  if (!line) break;
  line.forEach((tree, index) => {
    const char = Number(tree.char);
    if (char > highestBottom[index]) {
      tree.visible = true;
      highestBottom[index] = char;
    }
  });
}

const visibleTrees = output.reduce((acc, line) => {
  return (acc += line.filter((tree) => tree.visible).length);
}, 0);

console.log(visibleTrees);

const calculateScene = (tree, lineIndex, treeIndex) => {
    const scene = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
    const val = Number(tree.char);
    for (let i = lineIndex - 1; i >= 0; i--) {
        const char = Number(output[i][treeIndex].char);
        scene.top++;
        if (char >= val) break;
    }
    for (let i = lineIndex + 1; i < output.length; i++) {
        const char = Number(output[i][treeIndex].char);
        scene.bottom++;
        if (char >= val) break;
    }
    for (let i = treeIndex - 1; i >= 0; i--) {
        const char = Number(output[lineIndex][i].char);
        scene.left++;
        if (char >= val) break;
    }
    for (let i = treeIndex + 1; i < output[lineIndex].length; i++) {
        const char = Number(output[lineIndex][i].char);
        scene.right++;
        if (char >= val) break;
    }
    return scene.top * scene.bottom * scene.left * scene.right;
}

output.forEach((line, lineIndex) => {
  line.forEach((tree, treeIndex) => {
    tree.scene = calculateScene(tree, lineIndex, treeIndex);
  });
});

console.log(output.flat().sort((a, b) => b.scene - a.scene)[0]);