// https://adventofcode.com/2018/day/4
const readline = require('readline');
const fs = require('fs');
const E = {
  wu: 'wakes up',
  fa: 'falls asleep'
};

let records = [];
const zZz = {};
const champ = { id: -1, z: -1 };
const rl = readline.createInterface({
  input: fs.createReadStream('sample.txt'),
  crlfDelay: Infinity
});

rl.on('line', line => {
  records.push(
    line.match(/^\[(?<date>\d+-\d+-\d+ \d+:\d+)] (?<event>.+)$/).groups
  );
});

rl.on('close', function() {
  records = records.sort((a, b) => a.date.localeCompare(b.date));
  let guard = '';
  let fall = null;
  for (let record of records) {
    const shift = record.event.match(/^Guard #(?<id>\d+)/);
    if (shift) {
      guard = shift.groups.id;
      if (!zZz[guard]) {
        zZz[guard] = { total: 0, sleep: [] };
      }
    } else if (record.event === E.wu) {
      const wu = new Date(record.date).getMinutes();
      zZz[guard].total += wu - fall;
      for (let i = fall; i < wu; i++) {
        if (!zZz[guard].sleep[i]) zZz[guard].sleep[i] = 0;
        zZz[guard].sleep[i] += 1;
      }

      if (champ.z < zZz[guard].total) {
        champ.z = zZz[guard].total;
        champ.id = guard;
      }
    } else if (record.event === E.fa) {
      fall = new Date(record.date).getMinutes();
    }
  }
  let minute = -1;
  let freq = -1;
  for (let i = 0; i < zZz[champ.id].sleep.length; i++) {
    if (zZz[champ.id].sleep[i] > freq) {
      freq = zZz[champ.id].sleep[i];
      minute = i;
    }
  }
  console.log(`id: ${champ.id}, z: ${champ.z}, min: ${minute}`);

  console.log(`guard x min: ${champ.id * minute}`);
});
