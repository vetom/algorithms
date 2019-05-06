// https://adventofcode.com/2018/day/7
const readline = require('readline');
const fs = require('fs');

const wks = 5;
const tax = 60;

const rules = [];
const nodes = {};
const workers = {};

const rl = readline.createInterface({
  input: fs.createReadStream(`${__dirname}/input.txt`),
  crlfDelay: Infinity
});

rl.on('line', line => {
  const r = line.match(
    /^Step (?<from>[A-Z]) must be finished before step (?<to>[A-Z]) can begin.$/
  ).groups;
  rules.push(r);
  nodes[r.from] = true;
  nodes[r.to] = true;
});

rl.on('close', function() {
  const dependencies = {};
  for (let i = 0; i < wks; i++) {
    workers[i] = { free: true, time: -1, letter: '' };
  }

  for (let rule of rules) {
    if (!dependencies[rule.to]) dependencies[rule.to] = {};
    dependencies[rule.to] = Object.assign(dependencies[rule.to], {
      [rule.from]: true
    });
  }

  let stack = [];
  let keys = Object.keys(nodes);
  for (let i = 0; i < keys.length; i++) {
    if (!dependencies[keys[i]]) stack.push(keys[i]);
  }
  stack = stack.sort();

  let res = '';
  let inProgress = false;
  let time = 0;
  const handled = {};
  while (stack.length > 0 || inProgress) {
    // assign
    while (stack.length > 0) {
      for (let i = 0; i < wks; i++) {
        if (workers[i].free && stack.length > 0) {
          const s = stack.shift();
          workers[i].letter = s;
          workers[i].time = s.charCodeAt(0) - 64 + tax;
          workers[i].free = false;
          handled[s] = true;
        }
      }
      break;
    }

    // work
    for (let i = 0; i < wks; i++) {
      if (!workers[i].free) {
        workers[i].time--;

        if (workers[i].time <= 0) {
          workers[i].free = true;
          let s = workers[i].letter;
          res += s;

          delete nodes[s];
          Object.keys(dependencies).forEach(d => {
            delete dependencies[d][s];
          });

          keys = Object.keys(nodes);
          for (let i = 0; i < keys.length; i++) {
            if (handled[keys[i]]) continue;
            if (Object.keys(dependencies[keys[i]] || {}).length === 0)
              stack.push(keys[i]);
          }
          stack = [...new Set(stack)].sort();
        }
      }
    }

    // progress?
    inProgress = false;
    for (let i = 0; i < wks; i++) {
      if (!workers[i].free) {
        inProgress = true;
      }
    }

    time++;
  }

  console.log(time, res);
});
