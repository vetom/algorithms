// https://adventofcode.com/2018/day/1
const readline = require('readline');
const fs = require('fs');

let frequency = 0;
const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl.on('line', line => {
  frequency += Number(line);
});

rl.on('close', function() {
  // Part 1;
  console.log(`frequency: ${frequency}`);
});
