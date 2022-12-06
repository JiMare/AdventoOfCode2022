const getData = require("../index");

const data = getData("../data/day6.txt");

const getEndOfUniqueString = (string, dimension) => {
  const arr = string.split("");
  for (let i = 0; i < arr.length; i++) {
    const subArr = arr.slice(i, i + dimension);
    if (new Set(subArr).size === dimension) {
      return i + dimension;
    }
  }
};

const part1 = (string) => {
  return getEndOfUniqueString(string, 4);
};

const part2 = (string) => {
  return getEndOfUniqueString(string, 14);
};

console.log(part1(data[0])); //1275
console.log(part2(data[0])); //3605
