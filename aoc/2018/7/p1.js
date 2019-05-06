// https://adventofcode.com/2018/day/7
const readline = require('readline');
const fs = require('fs');

const rules = [];
const nodes = {};
const rl = readline.createInterface({
  input: fs.createReadStream(`${__dirname}/sample.txt`),
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

  while (stack.length > 0) {
    console.log(stack);

    const s = stack.shift();
    res += s;
    delete nodes[s];

    Object.keys(dependencies).forEach(d => {
      delete dependencies[d][s];
    });

    keys = Object.keys(nodes);
    for (let i = 0; i < keys.length; i++) {
      if (Object.keys(dependencies[keys[i]] || {}).length === 0)
        stack.push(keys[i]);
    }
    stack = [...new Set(stack)].sort();
  }

  console.log(res);
});
