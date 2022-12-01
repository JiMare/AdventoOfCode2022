const fs = require("fs");

const getData = (file) => {
    const content = fs.readFileSync(file, "utf8");
    return content.split("\n");
}

module.exports = getData;