// https://adventofcode.com/2018/day/2
const readline = require('readline');
const fs = require('fs');

const words = [];
const match = [];
const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl.on('line', line => {
  words.forEach(w => {
    let green = false;
    let red = false;

    for (let i = 0; i < w.length; i++) {
      if (w[i] !== line[i]) {
        if (green) {
          red = true;
          break;
        }
        green = true;
      }
    }

    if (green && !red) {
      match.push(line);
      match.push(w);
    }
  });
  words.push(line);
});

rl.on('close', function() {
  let commonChars = '';
  for (let i = 0; i < match[0].length; i++) {
    if (match[0][i] === match[1][i]) commonChars += match[0][i];
  }
  console.log(commonChars);
});
