const getData = require("../index");

const data = getData("../data/day5.txt");

const crates = data.slice(0, data.indexOf("") - 1);

const moves = data.slice(data.indexOf("") + 1);
const steps = moves.map((move) => {
  const moveArr = move.split(" ");
  return [+moveArr[1], +moveArr[3], +moveArr[5]];
});

const getMap = () => {
  //TODO parse data to create map
};

const moveCrates = (move, map, reverse) => {
  let grabbedCrates;
  if (reverse) {
    grabbedCrates = map[move[1] - 1].splice(-move[0]).reverse();
  } else {
    grabbedCrates = map[move[1] - 1].splice(-move[0]);
  }
  map[move[2] - 1].push(...grabbedCrates);
};

const getCratesOnTop = (map) => {
  let cratesOnTop = [];
  map.forEach((stack) => cratesOnTop.push(stack.pop()));
  return cratesOnTop.join("");
};

const part1 = () => {
  const map = [
    ["B", "V", "S", "N", "T", "C", "H", "Q"],
    ["W", "D", "B", "G"],
    ["F", "W", "R", "T", "S", "Q", "B"],
    ["L", "G", "W", "S", "Z", "J", "D", "N"],
    ["M", "P", "D", "V", "F"],
    ["F", "W", "J"],
    ["L", "N", "Q", "B", "J", "V"],
    ["G", "T", "R", "C", "J", "Q", "S", "N"],
    ["J", "S", "Q", "C", "W", "D", "M"],
  ];
  steps.forEach((move) => {
    moveCrates(move, map, true);
  });
  return getCratesOnTop(map);
};

const part2 = () => {
  const map = [
    ["B", "V", "S", "N", "T", "C", "H", "Q"],
    ["W", "D", "B", "G"],
    ["F", "W", "R", "T", "S", "Q", "B"],
    ["L", "G", "W", "S", "Z", "J", "D", "N"],
    ["M", "P", "D", "V", "F"],
    ["F", "W", "J"],
    ["L", "N", "Q", "B", "J", "V"],
    ["G", "T", "R", "C", "J", "Q", "S", "N"],
    ["J", "S", "Q", "C", "W", "D", "M"],
  ];
  steps.forEach((move) => {
    moveCrates(move, map, false);
  });
  return getCratesOnTop(map);
};

console.log(part1()); //FJSRQCFTN
console.log(part2()); //CJVLJQPHS
