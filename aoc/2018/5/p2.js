// https://adventofcode.com/2018/day/5
const readline = require('readline');
const fs = require('fs');

let original = '';
let champion = 50001;
const l = [
  /a/gi,
  /b/gi,
  /c/gi,
  /d/gi,
  /e/gi,
  /f/gi,
  /g/gi,
  /h/gi,
  /i/gi,
  /j/gi,
  /k/gi,
  /l/gi,
  /m/gi,
  /n/gi,
  /o/gi,
  /p/gi,
  /q/gi,
  /r/gi,
  /s/gi,
  /t/gi,
  /u/gi,
  /v/gi,
  /w/gi,
  /x/gi,
  /y/gi,
  /z/gi
];

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl.on('line', line => {
  original = line;
});

rl.on('close', function() {
  while (original) {
    for (let j = 0; j < l.length; j++) {
      let poly = original.replace(l[j], '');
      console.log(l[j], poly.length);
      for (let i = 1; i < poly.length; i++) {
        if (Math.abs(poly.charCodeAt(i - 1) - poly.charCodeAt(i)) === 32) {
          poly = poly.substring(0, i - 1) + poly.substring(i + 1, poly.length);
          i = 1;
        }
      }
      console.log(poly.length, champion);
      if (champion > poly.length) champion = poly.length;
    }
    break;
  }
  console.log(champion);
});
