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

  for (let o = 0; o < edge; o++) {
    for (let q = 0; q < edge; q++) {
      if (grid[q][o] === '.') {
        let closest = '.';
        let distance = Infinity;
        for (let p = 0; p < pts.length; p++) {
          const toxicab = Math.abs(pts[p].x - q) + Math.abs(pts[p].y - o);
          if (toxicab === distance) closest = '.';
          if (toxicab < distance) {
            distance = toxicab;
            closest = id[p];
          }
        }
        grid[q][o] = closest;
      }
    }
  }

  fs.writeFile('output.json', JSON.stringify(grid), err => {
    if (err) {
      return console.log(err);
    }
  });

  const counts = {};
  for (let l = 0; l < edge; l++) {
    for (let m = 0; m < edge; m++) {
      if (!counts[grid[m][l]]) counts[grid[m][l]] = 0;
      counts[grid[m][l]]++;
    }
    counts[grid[0][l]] = -Infinity;
    counts[grid[l][edge - 1]] = -Infinity;
    counts[grid[l][0]] = -Infinity;
    counts[grid[edge - 1][l]] = -Infinity;
  }

  let max = Math.max(...Object.values(counts));
  console.log(counts, max);
});
