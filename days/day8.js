const getData = require("../index");

const data = getData("../data/day8.txt");

const getRows = (input) => {
  return input.map((line) =>
    line.split("").map((tree) => {
      return { value: +tree, visible: false };
    })
  );
};

const setVisibilityInLine = (line, index, linesLength) => {
  //in direction
  let maxInLine = -1; // lower than *any* tree
  for (let i = 0; i < line.length; i++) {
    if (line[i].value > maxInLine) {
      line[i].visible = true;
      maxInLine = line[i].value;
    }
  }
  //in reverse direction
  let mxInReverse = -1; // lower than *any* tree
  for (let i = line.length - 1; i >= 0; i--) {
    if (line[i].value > mxInReverse) {
      line[i].visible = true;
      mxInReverse = line[i].value;
    }
  }
};

const getColumns = (rows) => {
  let columns = [];
  let j = 0;
  while (j < rows[0].length) {
    columns.push([]);
    j++;
  }
  for (let i = 0; i < rows.length; i++) {
    rows[i].forEach((tree, index) => columns[index].push(tree));
  }
  return columns;
};

//creating grid with visibility info
const rows = getRows(data);
rows.map((row, index) => setVisibilityInLine(row, index, rows.length));
const columns = getColumns(rows);
columns.map((column, index) =>
  setVisibilityInLine(column, index, columns.length)
);

const part1 = () => {
  const getSumOfVisibleTrees = (rows) => {
    let sum = 0;
    rows.forEach((line) => {
      line.forEach((tree) => {
        if (tree.visible) {
          sum++;
        }
      });
    });
    return sum;
  };
  return getSumOfVisibleTrees(rows);
};

const part2 = () => {
  const setDistanceCoordinates = (lines, direction, reverseDirection) => {
    for (let i = 0; i < lines.length; i++) {
      //iterate through row
      for (j = 0; j < lines[i].length; j++) {
        //if tree is visible
        if (lines[i][j].visible) {
          //look to direction
          let direct = 0;
          let x = j;
          while (lines[i][x - 1]) {
            if (lines[i][x - 1].value >= lines[i][j].value) {
              direct++;
              break;
            }
            direct++;
            x--;
          }
          //look to reverseDirection
          let opposite = 0;
          let y = j;
          while (lines[i][y + 1]) {
            if (lines[i][y + 1].value >= lines[i][j].value) {
              opposite++;
              break;
            }
            opposite++;
            y++;
          }
          lines[i][j][direction] = direct;
          lines[i][j][reverseDirection] = opposite;
        }
      }
    }
  };

  //adding coordinates info 
  setDistanceCoordinates(rows, "left", "right");
  const columns = getColumns(rows);
  setDistanceCoordinates(columns, "up", "down");

  const getMostDistance = (lines) => {
    let distance = 0;
    lines.forEach((line) => {
      line.forEach((tree) => {
        if (tree.visible) {
          const multiply = tree.left * tree.right * tree.up * tree.down;
          if (multiply > distance) {
            distance = multiply;
          }
        }
      });
    });
    return distance;
  };
  return getMostDistance(rows);
};

console.log(part1()); //1809
console.log(part2()); //479400
