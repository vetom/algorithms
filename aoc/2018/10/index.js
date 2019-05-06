// https://adventofcode.com/2018/day/6
const readline = require('readline');
const fs = require('fs');

const coords = [];
const snaps = [
  {
    grid: {},
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
    t: 0
  }
];

const rl = readline.createInterface({
  input: fs.createReadStream(`${__dirname}/input.txt`),
  crlfDelay: Infinity
});

rl.on('line', line => {
  let coord = line.match(
    /^position=< *(?<x>-?\d+), *(?<y>-?\d+)> velocity=< *(?<vx>-?\d+), *(?<vy>-?\d+)>$/
  ).groups;

  coord.x = Number(coord.x);
  coord.y = Number(coord.y);
  coord.vx = Number(coord.vx);
  coord.vy = Number(coord.vy);
  if (coord.x < snaps[0].minX) snaps[0].minX = coord.x;
  if (coord.y < snaps[0].minY) snaps[0].minY = coord.y;
  if (coord.x > snaps[0].maxX) snaps[0].maxX = coord.x;
  if (coord.y > snaps[0].maxY) snaps[0].maxY = coord.y;
  if (!snaps[0].grid[coord.y]) snaps[0].grid[coord.y] = {};
  snaps[0].grid[coord.y][coord.x] = true;
  coords.push(coord);
});

const snapOnT = t => {
  const snap = {
    grid: {},
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
    t: t
  };

  Object.keys(coords).map(c => {
    const x = coords[c].x + coords[c].vx * t;
    const y = coords[c].y + coords[c].vy * t;
    if (x < snap.minX) snap.minX = x;
    if (y < snap.minY) snap.minY = y;
    if (x > snap.maxX) snap.maxX = x;
    if (y > snap.maxY) snap.maxY = y;
    if (!snap.grid[y]) snap.grid[y] = {};
    snap.grid[y][x] = true;
  });
  return snap;
};

const print = snap => {
  console.log(`Snap on T: ${snap.t}`);
  let g = '';
  for (let y = snap.minY; y < snap.maxY + 1; y++) {
    let l = '';
    for (let x = snap.minX; x < snap.maxX + 1; x++) {
      if (!snap.grid[y] || !snap.grid[y][x]) l += '.';
      else l += '#';
    }
    g += l + '\n';
  }
  return g;
};

const save = snap => {
  for (let y = snap.minY; y < snap.maxY; y++) {
    let l = '';
    let je = false;
    for (let x = snap.minX; x < snap.maxX; x++) {
      if (!snap.grid[y] || !snap.grid[y][x]) l += ' ';
      else {
        l += '#';
        je = true;
      }
    }
    if (je) l = '';
    console.log(`${Math.round((y / snap.maxY) * 100) / 100}`);
    fs.appendFileSync(`${__dirname}/${snap.t}.txt`, `\n${l}`, err => {
      if (err) throw err;
    });
  }
};

rl.on('close', function() {
  let area = (snaps[0].maxX - snaps[0].minX) * (snaps[0].maxY - snaps[0].minY);
  let messageSnap = snaps[0];
  for (let i = 1; i < 12000; i++) {
    const snap = snapOnT(i);
    const snapArea = (snap.maxX - snap.minX) * (snap.maxY - snap.minY);
    if (snapArea < area) {
      area = snapArea;
      messageSnap = snap;
    }
  }

  console.log(print(messageSnap));
});
