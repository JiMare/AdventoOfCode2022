const getData = require("../index");

const data = getData("../data/day4.txt");

const getPairArr = (pair) => {
  const arr = pair.split(",");
  const firstPairRange = arr[0].split("-");
  const firstPairArr = [];
  for (let i = +firstPairRange[0]; i <= +firstPairRange[1]; i++) {
    firstPairArr.push(i);
  }
  const secondPairRange = arr[1].split("-");
  const secondPairArr = [];
  for (let i = +secondPairRange[0]; i <= +secondPairRange[1]; i++) {
    secondPairArr.push(i);
  }
  return [firstPairArr, secondPairArr];
};

const part1 = (data) => {
  let totalIncludedRanges = 0;
  data.forEach((pair) => {
    const pairArr = getPairArr(pair);
    if (
      pairArr[0].every((id) => pairArr[1].includes(id)) ||
      pairArr[1].every((id) => pairArr[0].includes(id))
    ) {
      totalIncludedRanges++;
    }
  });
  return totalIncludedRanges;
};

const part2 = (data) => {
  let totalSomeOverlapRange = 0;
  data.forEach((pair) => {
    const pairArr = getPairArr(pair);
    if (
      pairArr[0].find((id) => pairArr[1].includes(id)) ||
      pairArr[1].find((id) => pairArr[0].includes(id))
    ) {
      totalSomeOverlapRange++;
    }
  });
  return totalSomeOverlapRange;
};

console.log(part1(data)); //507
console.log(part2(data)); //897
