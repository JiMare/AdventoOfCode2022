const getData = require("../index");

const data = getData("../data/day7.txt");

class TreeNode {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.size = undefined;
    this.type = "dir";
  }
}

class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.type = "file";
  }
}

const setDirSize = (node) => {
  let totalSize = 0;
  for (let i = 0; i < node.children.length; i++) {
    if (node.children[i].children && node.children[i].size === undefined) {
      setDirSize(node.children[i]);
      i--;
    } else {
      totalSize += +node.children[i].size;
    }
  }
  node.size = totalSize;
};

const getIndex = (arr, name) => {
  return arr.findIndex((obj) => obj.name === name && obj.type === "dir");
};

const getCurrentNode = (path, tree) => {
  const pathArr = path.split("/");
  let currentNode = tree;
  for (let i = 1; i < pathArr.length; i++) {
    currentNode =
      currentNode.children[getIndex(currentNode.children, pathArr[i])];
  }
  return currentNode;
};

const createTree = (input) => {
  const tree = new TreeNode("/");
  let currentPath = "";
  let currentNode = tree;
  for (let i = 0; i < input.length; i++) {
    //creating path
    if (input[i].includes("$ cd")) {
      if (input[i].split(" ")[2] !== "..") {
        if (!currentPath || currentPath === "/") {
          currentPath += `${input[i].split(" ")[2]}`;
        } else {
          currentPath += `/${input[i].split(" ")[2]}`;
        }
      } else {
        let currentPathArr = currentPath.split("/");
        currentPathArr.splice(-1, 1);
        currentPath =
          currentPathArr.length === 1 ? "/" : currentPathArr.join("/");
      }
    }
    //finding node
    if (currentPath === "/") {
      currentNode = tree;
    } else {
      currentNode = getCurrentNode(currentPath, tree);
    }
    //creating children
    if (input[i].includes("$ ls")) {
      let j = i + 1;
      while (input[j] && !input[j].includes("$")) {
        if (input[j].includes("dir")) {
          currentNode.children.push(new TreeNode(input[j].split(" ")[1]));
        } else {
          currentNode.children.push(
            new File(input[j].split(" ")[1], input[j].split(" ")[0])
          );
        }
        j++;
      }
    }
  }
  return tree;
};

const myTree = createTree(data);
setDirSize(myTree);

const part1 = () => {
  let counter = 0;
  const getSumOfSmallDirSizes = (node) => {
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].children) {
        getSumOfSmallDirSizes(node.children[i]);
      }
      if (node.children[i].type === "dir" && node.children[i].size < 100000) {
        counter += node.children[i].size;
      }
    }
  };
  getSumOfSmallDirSizes(myTree);
  return counter;
};

const part2 = () => {
  const totalDiskSpace = 70000000;
  const neededSpace = 30000000;
  const totalSizeOfTree = myTree.size; //42558312
  const mySpace = totalDiskSpace - totalSizeOfTree; //27441688
  const spaceToDelete = neededSpace - mySpace; //2558312
  const dirSizes = [];
  const getDirSizes = (node) => {
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].children) {
        getDirSizes(node.children[i]);
      }
      if (node.children[i].type === "dir") {
        dirSizes.push(node.children[i].size);
      }
    }
  };
  getDirSizes(myTree);
  const sizeToDelete = Math.min(
    ...dirSizes.filter((size) => size >= spaceToDelete)
  );
  return sizeToDelete;
};

console.log(part1()); //2031851
console.log(part2()); //2568781
