const fs = require("fs");

const file = fs.readFileSync("./7/input.txt", "utf8");

const input = file.split("\n");

class Folder {
  constructor(name, parent) {
    this.name = name;
    this.size = 0;
    this.children = [];
    this.parent = parent;
  }

  calculateSize() {
    let size = this.size;
    size = this.children.reduce((acc, child) => {
      return (acc += child.calculateSize());
    }, size);
    this.size = size;
    return size;
  }

  addChild(name) {
    const child = new Folder(name, this);
    listOfFolders.push(child);
    this.children.push(child);
  }
}

const listOfFolders = [];
const root = new Folder("/", null);
let currentFolder = root;
listOfFolders.push(root);

for (let index = 1; index < input.length; index++) {
  const itemArr = input[index].split(" ");
  if (itemArr[0] === "$") {
    if (itemArr[1] === "ls") continue;
    if (itemArr[2] === "..") {
      currentFolder = currentFolder.parent;
      continue;
    }
    if (currentFolder === null) throw new Error("Out of bounds error");
    currentFolder = currentFolder.children.find(
      (child) => child.name === itemArr[2]
    );
    continue;
  }

  if (itemArr[0] === "dir") {
    currentFolder.addChild(itemArr[1]);
    continue;
  }

  currentFolder.size += parseInt(itemArr[0]);
}

root.calculateSize();

let output = 0;

listOfFolders.forEach((folder) => {
  if (folder.size <= 100000) output += folder.size;
});

console.log(output);

const amountAvailable = 70000000 - root.size;

const amountToDelete = 30000000 - amountAvailable;

const foldersEligibleForDeletion = listOfFolders.filter(
  (folder) => folder.size >= amountToDelete
).sort((a, b) => a.size - b.size);

console.log(foldersEligibleForDeletion[0].size);
