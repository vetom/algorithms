let marbles = 7186400;
let players = 400;
const score = {};

let current = { m: 0 };
current.next = current;
current.prev = current;

for (let m = 1; m <= marbles; m++) {
  let player = m % players;
  if (player === 0) player = players;

  if (m % 23 === 0) {
    if (!score[player]) score[player] = 0;
    score[player] += m + current.prev.prev.prev.prev.prev.prev.prev.m;
    current.prev.prev.prev.prev.prev.prev.prev.prev.next =
      current.prev.prev.prev.prev.prev.prev;
    current.prev.prev.prev.prev.prev.prev.prev =
      current.prev.prev.prev.prev.prev.prev.prev.prev;
    current = current.prev.prev.prev.prev.prev.prev;
  } else {
    const node = { player, m };
    node.prev = current.next;
    node.next = current.next.next;
    current.next.next.prev = node;
    current.next.next = node;
    current = node;
  }
}

console.log(Math.max(...Object.values(score)));
