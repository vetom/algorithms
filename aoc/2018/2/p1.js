// https://adventofcode.com/2018/day/1
const readline = require('readline');
const fs = require('fs');

let two = 0;
let three = 0;
const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl.on('line', line => {
  const dic = {};
  let flag_two = false;
  let flag_three = false;

  for (let char of line) {
    if (!dic[char]) dic[char] = 0;
    dic[char]++;
  }

  Object.keys(dic).forEach(k => {
    if (dic[k] === 2) {
      flag_two = true;
    }
    if (dic[k] === 3) {
      flag_three = true;
    }
  });

  if (flag_two) two++;
  if (flag_three) three++;
});

rl.on('close', function() {
  console.log(`${two} x ${three} = ${two * three}`);
});
