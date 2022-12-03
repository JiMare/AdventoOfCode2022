const getData = require("../index");

const data = getData("../data/day3.txt");

const getSharedItem = (text) => {
  const firstCompartment = text.split("").slice(0, text.length / 2);
  const secondCompartment = text.split("").slice(text.length / 2);
  const sharedItem = firstCompartment.filter((item) =>
    secondCompartment.includes(item)
  );
  return sharedItem[0];
};

const getItemPriority = (item) => {
  if (item.charCodeAt() >= 97) {
    return item.charCodeAt() - 96;
  } else {
    return item.charCodeAt() - 38;
  }
};

const getSharedItemInGroup = (packages) => {
  const sharedItemsInTwoPackages = packages[0]
    .split("")
    .filter((item) => packages[1].split("").includes(item));
  const sharedItemInallPackages = packages[2]
    .split("")
    .filter((item) => sharedItemsInTwoPackages.includes(item));
  return sharedItemInallPackages[0];
};

const part1 = (data) => {
  let totalPriority = 0;
  data.forEach((package) => {
    totalPriority += getItemPriority(getSharedItem(package));
  });
  return totalPriority;
};

const part2 = (data) => {
  let totalPriority = 0;
  let counter = 0;
  for (let i = 0; i < data.length / 3; i++) {
    let packages = [];
    for (let j = 0; j < 3; j++) {
      packages.push(data[counter]);
      counter++;
    }
    totalPriority += getItemPriority(getSharedItemInGroup(packages));
  }
  return totalPriority;
};

console.log(part1(data)); //7597
console.log(part2(data)); //2607
