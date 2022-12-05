const getData = require("../index");

const data = getData("../data/day5.txt");

const moves = data.slice(data.indexOf("") + 1);
const steps = moves.map((move) => {
  const moveArr = move.split(" ");
  return [+moveArr[1], +moveArr[3], +moveArr[5]];
});

const getMap = () => {
  let crates = data.slice(0, data.indexOf("") - 1);
  crates = crates
    .map((line) => [...line].filter((_, index) => index % 4 === 1))
    .reverse();
  crates = crates[0]
    .map((_, i) => crates.map((row) => row[i]))
    .map((stack) =>
      stack.filter((crate) => crate !== " " && crate !== undefined)
    );
  return crates;
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
  const map = getMap();
  steps.forEach((move) => {
    moveCrates(move, map, true);
  });
  return getCratesOnTop(map);
};

const part2 = () => {
  const map = getMap();
  steps.forEach((move) => {
    moveCrates(move, map, false);
  });
  return getCratesOnTop(map);
};

console.log(part1()); //FJSRQCFTN
console.log(part2()); //CJVLJQPHS
