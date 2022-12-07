const fs = require("fs");

const file = fs.readFileSync("./6/input.txt", "utf8");

let uniqueString = "";

for (let i = 0; i < file.length; i++) {
    const char = file[i];
    const charIndexInString = uniqueString.indexOf(char);
    if (charIndexInString === -1) {
        uniqueString += char;
        if (uniqueString.length === 14) {
            console.log(uniqueString);
            console.log(i + 1);
            break;
        }
    } else {
        uniqueString = uniqueString.substring(charIndexInString + 1) + char;
    }
}
