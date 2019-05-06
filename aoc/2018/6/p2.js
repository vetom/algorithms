// https://adventofcode.com/2018/day/6
const readline = require('readline');
const fs = require('fs');

let grid = [[]];
let pts = [];
const id = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '+',
  '(',
  '-',
  '=',
  '_',
  ')',
  '{',
  '[',
  '}',
  ']',
  '|',
  ',',
  '<',
  '>',
  '/',
  '?'
];
let edge = -Infinity;
const REG = 10000;

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl.on('line', line => {
  const sp = line.split(',');
  const x = Number(sp[0]);
  const y = Number(sp[1]);
  pts.push({ x, y });
  if (x > edge) edge = x;
  if (y > edge) edge = y;
});

rl.on('close', function() {
  edge++;
  for (let i = 0; i < edge; i++) {
    for (let j = 0; j < edge; j++) {
      if (!grid[j]) grid[j] = [];
      grid[j][i] = '.';
    }
  }

  for (let k = 0; k < pts.length; k++) {
    if (!grid[pts[k].x]) grid[pts[k].x] = [];
    grid[pts[k].x][pts[k].y] = id[k];
  }

  let area = 0;
  for (let o = 0; o < edge; o++) {
    for (let q = 0; q < edge; q++) {
      let inside = true;
      let bound = REG;
      for (let p = 0; p < pts.length; p++) {
        const toxicab = Math.abs(pts[p].x - q) + Math.abs(pts[p].y - o);
        bound -= toxicab;
        if (bound <= 0) {
          inside = false;
          break;
        }
      }
      if (inside) area++;
    }
  }

  console.log(area);
});
