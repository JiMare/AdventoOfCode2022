const getData = require("../index");

const data = getData("../data/day1.txt");

const getMostCalories = (data) => {
  let totalCalories = 0;
  let elfCalories = 0;
  data.forEach((pack) => {
    if (pack !== "") {
      elfCalories += +pack;
    } else {
      if (elfCalories > totalCalories) {
        totalCalories = elfCalories;
      }
      elfCalories = 0;
    }
  });
  return totalCalories;
};

const getThreeElfsMostCalories = (data) => {
  let totalCalories = [0, 0, 0];
  let elfCalories = 0;
  data.forEach((pack) => {
    if (pack !== "") {
      elfCalories += +pack;
    } else {
      if (elfCalories > Math.min(...totalCalories)) {
        totalCalories[totalCalories.indexOf(Math.min(...totalCalories))] =
          elfCalories;
      }
      elfCalories = 0;
    }
  });
  return totalCalories.reduce((sum, calories) => calories + sum);
};

console.log(getMostCalories(data)); //72017
console.log(getThreeElfsMostCalories(data)); //212520
