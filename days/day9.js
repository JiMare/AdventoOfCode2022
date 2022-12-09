const getData = require("../index");

const data = getData("../data/day9.txt");

const moveHead = (step, headCoordinates) => {
  let newPosition = headCoordinates;
  switch (step) {
    case "R":
      newPosition[0]++;
      break;
    case "L":
      newPosition[0]--;
      break;
    case "U":
      newPosition[1]++;
      break;
    case "D":
      newPosition[1]--;
      break;
  }
  return newPosition;
};

const moveTail = (headCoordinates, tailCoordinates) => {
  const isTouched =
    Math.abs(headCoordinates[0] - tailCoordinates[0]) <= 1 &&
    Math.abs(headCoordinates[1] - tailCoordinates[1]) <= 1;
  let newPosition = tailCoordinates;
  if (!isTouched) {
    if (headCoordinates[0] === tailCoordinates[0]) {
      if (headCoordinates[1] - tailCoordinates[1] > 0) {
        newPosition[1]++;
      } else {
        newPosition[1]--;
      }
    }
    if (headCoordinates[1] === tailCoordinates[1]) {
      if (headCoordinates[0] - tailCoordinates[0] > 0) {
        newPosition[0]++;
      } else {
        newPosition[0]--;
      }
    }
    if (
      headCoordinates[0] !== tailCoordinates[0] &&
      headCoordinates[1] !== tailCoordinates[1]
    ) {
      if (headCoordinates[0] - tailCoordinates[0] > 0) {
        newPosition[0]++;
      } else {
        newPosition[0]--;
      }
      if (headCoordinates[1] - tailCoordinates[1] > 0) {
        newPosition[1]++;
      } else {
        newPosition[1]--;
      }
    }
  }
  return newPosition;
};

const part1 = (input) => {
  const tailPositions = [[0, 0]];
  let currentHeadCoordinates = [0, 0];
  let currentTailCoordinates = [0, 0];
  input.forEach((instruction) => {
    let i = 0;
    while (i < +instruction.split(" ")[1]) {
      currentHeadCoordinates = moveHead(
        instruction.split(" ")[0],
        currentHeadCoordinates
      );
      currentTailCoordinates = moveTail(
        currentHeadCoordinates,
        currentTailCoordinates
      );
      tailPositions.push([...currentTailCoordinates]);
      i++;
    }
  });
  return new Set(tailPositions.map(JSON.stringify)).size;
};

const part2 = (input) => {
  const tailPositions = [[0, 0]];
  let knotCoordinates = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  input.forEach((instruction) => {
    let i = 0;
    while (i < +instruction.split(" ")[1]) {
      knotCoordinates[0] = moveHead(
        instruction.split(" ")[0],
        knotCoordinates[0]
      );
      for (let j = 1; j < knotCoordinates.length; j++) {
        knotCoordinates[j] = moveTail(
          knotCoordinates[j - 1],
          knotCoordinates[j]
        );
      }
      tailPositions.push([...knotCoordinates[9]]);
      i++;
    }
  });
  return new Set(tailPositions.map(JSON.stringify)).size;
};

console.log(part1(data)); //6470
console.log(part2(data)); //2658
