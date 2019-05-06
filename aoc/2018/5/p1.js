// https://adventofcode.com/2018/day/5
const readline = require('readline');
const fs = require('fs');

let poly = '';
const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl.on('line', line => {
  poly = line;
});

rl.on('close', function() {
  for (let i = 1; i < poly.length; i++) {
    if (Math.abs(poly.charCodeAt(i - 1) - poly.charCodeAt(i)) === 32) {
      poly = poly.substring(0, i - 1) + poly.substring(i + 1, poly.length);
      i = 1;
    }
  }

  console.log(poly.length);
});
