const getData = require("../index");

const data = getData("../data/day11.txt");

const getMonkeys = (input) => {
  const filteredInput = input.filter((element) => element !== "");
  const result = filteredInput.map((element, index) => {
    if (element.startsWith("Monkey")) {
      let result = [element];
      let nextIndex = index + 1;
      while (
        nextIndex < filteredInput.length &&
        !filteredInput[nextIndex].startsWith("Monkey")
      ) {
        result.push(filteredInput[nextIndex]);
        nextIndex++;
      }
      return result;
    }
  });
  return result.filter((element) => element !== undefined);
};

const parseMonkeys = (monkeys) => {
  return monkeys.map((monkey, index) => {
    return {
      id: index,
      items: monkey[1].match(/\d+/g).map((int) => +int),
      operation: monkey[2].split(":")[1].split("=")[1].trim(),
      test: {
        divisible: +monkey[3].match(/\d+/g)[0],
        true: +monkey[4].match(/\d+/g)[0],
        false: +monkey[5].match(/\d+/g)[0],
      },
      inspect: 0,
    };
  });
};

const testItem = (worryLevel, test) => {
  if (worryLevel % test.divisible === 0) {
    return test.true;
  } else {
    return test.false;
  }
};

const round = (monkeys, countWorryLevel) => {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      const worryLevel = countWorryLevel(item, monkey.operation);
      const nextMonkey = testItem(worryLevel, monkey.test);
      monkey.inspect++;
      monkeys[nextMonkey].items.push(worryLevel);
    });
    monkey.items = [];
  });
};

const monkeys = getMonkeys(data);

const part1 = () => {
  const parsedMonkeys = parseMonkeys(monkeys);
  const countWorryLevel = (item, operation) => {
    const old = item;
    const newWorryLevel = eval(operation);
    return Math.floor(newWorryLevel / 3);
  };
  for (let i = 0; i < 20; i++) {
    round(parsedMonkeys, countWorryLevel);
  }
  const inspectInfo = parsedMonkeys
    .map((monkey) => monkey.inspect)
    .sort((a, b) => b - a);
  return inspectInfo[0] * inspectInfo[1];
};

const part2 = () => {
  const parsedMonkeys = parseMonkeys(monkeys);
  const multiplyAllDivisible = parsedMonkeys
    .map((monkey) => monkey.test.divisible)
    .reduce((a, b) => a * b);
  const countWorryLevel = (item, operation) => {
    const old = item;
    let newWorryLevel = eval(operation);
    return (newWorryLevel %= multiplyAllDivisible);
  };
  for (let i = 0; i < 10000; i++) {
    round(parsedMonkeys, countWorryLevel);
  }
  const inspectInfo = parsedMonkeys
    .map((monkey) => monkey.inspect)
    .sort((a, b) => b - a);
  return inspectInfo[0] * inspectInfo[1];
};

console.log(part1()); //112815
console.log(part2()); //25738411485
