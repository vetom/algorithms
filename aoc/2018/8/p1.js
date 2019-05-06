// https://adventofcode.com/2018/day/2
const readline = require('readline');
const fs = require('fs');

let stack = [];
const rl = readline.createInterface({
  input: fs.createReadStream(`${__dirname}/sample.txt`),
  crlfDelay: Infinity
});

rl.on('line', line => {
  stack = line.split(' ');
});

const sumChild = () => {
  let childs = Number(stack.shift());
  let metadata = Number(stack.shift());

  let total = 0;
  while (childs > 0) {
    total += sumChild();
    childs--;
  }

  for (let i = 0; i < metadata; i++) {
    const meta = Number(stack.shift());
    total += meta;
  }

  return total;
};

rl.on('close', function() {
  let total = sumChild();

  console.log(total);
});
