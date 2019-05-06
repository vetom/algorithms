// https://adventofcode.com/2018/day/3
const readline = require('readline');
const fs = require('fs');

const fabric = [];
let overlaps = 0;
let intact = '';

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl.on('line', line => {
  const claim = line.match(
    /^#(?<id>\d+) @ (?<x>\d+),(?<y>\d+): (?<w>\d+)x(?<h>\d+)/
  ).groups;
  const x = Number(claim.x),
    y = Number(claim.y),
    w = Number(claim.w),
    h = Number(claim.h);

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      if (!fabric[x + i]) fabric[x + i] = [];
      if (!fabric[x + i][y + j]) fabric[x + i][y + j] = 0;
      if (fabric[x + i][y + j] === 1) overlaps++;
      fabric[x + i][y + j]++;
    }
  }
});

rl.on('close', function() {
  // Part 1;
  console.log(`overlaps: ${overlaps}`);
});

const rl2 = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl2.on('line', line => {
  const claim = line.match(
    /^#(?<id>\d+) @ (?<x>\d+),(?<y>\d+): (?<w>\d+)x(?<h>\d+)/
  ).groups;
  const x = Number(claim.x),
    y = Number(claim.y),
    w = Number(claim.w),
    h = Number(claim.h);

  let overlaped = false;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      if (fabric[x + i][y + j] > 1) overlaped = true;
    }
  }

  if (!overlaped) intact = claim.id;
});

rl2.on('close', function() {
  // Part 2;
  console.log(`intact: ${intact}`);
});
