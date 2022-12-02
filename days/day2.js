const getData = require("../index");

const data = getData("../data/day2.txt");

const getScoreOfShape = (shape) => {
  switch (shape) {
    case "X":
      return 1;
    case "Y":
      return 2;
    case "Z":
      return 3;
  }
};

const getResultOfRound = (round) => {
  switch (round) {
    case "A X":
      return 3;
    case "A Y":
      return 6;
    case "A Z":
      return 0;
    case "B X":
      return 0;
    case "B Y":
      return 3;
    case "B Z":
      return 6;
    case "C X":
      return 6;
    case "C Y":
      return 0;
    case "C Z":
      return 3;
  }
};

const getScoreOfResult = (round) => {
  switch (round) {
    case "X":
      return 0;
    case "Y":
      return 3;
    case "Z":
      return 6;
  }
};

const chooseShape = (round) => {
  switch (round) {
    case "A X":
      return getScoreOfShape('Z');
    case "A Y":
      return getScoreOfShape('X');
    case "A Z":
      return getScoreOfShape('Y');
    case "B X":
      return getScoreOfShape('X');
    case "B Y":
      return getScoreOfShape('Y');
    case "B Z":
      return getScoreOfShape('Z');
    case "C X":
      return getScoreOfShape('Y');
    case "C Y":
      return getScoreOfShape('Z');
    case "C Z":
      return getScoreOfShape('X');
  }
};

const part1 = (data) => {
  let totalScore = 0;
  data.forEach((round) => {
    totalScore +=
      getScoreOfShape(round.split(" ")[1]) + getResultOfRound(round);
  });
  return totalScore;
};

const part2 = (data) => {
     let totalScore = 0;
     data.forEach((round) => {
       totalScore += getScoreOfResult(round.split(" ")[1]) + chooseShape(round);
     });
     return totalScore;
};

console.log(part1(data)); //14297
console.log(part2(data)); //10498
