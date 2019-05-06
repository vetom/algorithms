// https://adventofcode.com/2018/day/1
const readline = require('readline');
const fs = require('fs');

let frequency = 0;
let freqs = [];
let knownFreqs = { 0: true };
let twice = undefined;

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl.on('line', line => {
  const freq = Number(line);
  frequency += freq;
  if (knownFreqs[frequency] && !twice) {
    twice = frequency;
  }
  knownFreqs[frequency] = true;
  freqs.push(freq);
});

rl.on('close', function() {
  while (!twice) {
    for (let f of freqs) {
      frequency += f;
      if (knownFreqs[frequency]) {
        twice = frequency;
        break;
      }
      knownFreqs[frequency] = true;
    }
  }
  console.log(`twice: ${twice}`);
});
