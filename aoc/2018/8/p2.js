// https://adventofcode.com/2018/day/2
const readline = require('readline');
const fs = require('fs');

let stack = [];
const rl = readline.createInterface({
  input: fs.createReadStream(`${__dirname}/input.txt`),
  crlfDelay: Infinity
});

rl.on('line', line => {
  stack = line.split(' ');
});

const sumChild = () => {
  let childs = Number(stack.shift());
  let metadata = Number(stack.shift());
  let total = 0;

  let cvals = [];
  for (let i = 0; i < childs; i++) {
    cvals.push(sumChild());
  }

  if (childs === 0) {
    for (let i = 0; i < metadata; i++) {
      const meta = Number(stack.shift());
      total += meta;
    }
  } else {
    for (let i = 0; i < metadata; i++) {
      let meta = Number(stack.shift());
      meta--;
      if (cvals[meta]) {
        total += cvals[meta];
      }
    }
  }

  return total;
};

rl.on('close', function() {
  console.log(sumChild());
});
