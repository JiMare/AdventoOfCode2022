const getData = require("../index");

const data = getData("../data/day10.txt");

const part1 = (input) => {
  const measurableCycles = [20, 60, 100, 140, 180, 220];
  let x = 1;
  let cycle = 0;
  let signalStrength = 0;
  const increaseSignalStrength = () => {
    if (measurableCycles.includes(cycle)) {
      signalStrength += x * cycle;
    }
  };
  const executeInstruction = (instruction) => {
    switch (instruction.split(" ")[0]) {
      case "noop":
        cycle++;
        increaseSignalStrength();
        break;
      case "addx":
        cycle++;
        increaseSignalStrength();
        cycle++;
        increaseSignalStrength();
        x += +instruction.split(" ")[1];
        break;
    }
  };
  input.forEach((instruction) => {
    executeInstruction(instruction);
  });
  return signalStrength;
};

const part2 = (input) => {
  let x = 1;
  let cycle = 0;
  let image = "";
  let drawIndex = 0;
  const draw = (spritePositions) => {
    if (spritePositions.includes(drawIndex)) {
      image += "#";
    } else {
      image += ".";
    }
    drawIndex++;
    if (drawIndex % 40 === 0) {
      image += "\n";
      drawIndex = 0;
    }
  };
  const executeInstruction = (instruction, spritePositions) => {
    switch (instruction.split(" ")[0]) {
      case "noop":
        cycle++;
        draw(spritePositions);
        break;
      case "addx":
        cycle++;
        draw(spritePositions);
        cycle++;
        draw(spritePositions);
        x += +instruction.split(" ")[1];
        break;
    }
  };
  input.forEach((instruction) => {
    const spritePositions = [x - 1, x, x + 1];
    executeInstruction(instruction, spritePositions);
  });
  return image;
};

console.log(part1(data)); //14860
console.log(part2(data)); //RGZEHURK
