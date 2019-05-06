// https://www.codewars.com/kata/57680d0128ed87c94f000bfd

function* positionCandidates(s, pos) {
  if (pos < 0) {
    yield* [...Array(s * s)].map((_, i) => i);
    return;
  }

  const f = {
    u: pos >= s,
    d: pos < s * (s - 1),
    l: pos % s > 0,
    r: pos % s < s - 1
  };

  if (f.u && f.l) yield pos - s - 1;
  if (f.u) yield pos - s;
  if (f.u && f.r) yield pos - s + 1;
  if (f.l) yield pos - 1;
  if (f.r) yield pos + 1;
  if (f.d && f.l) yield pos + s - 1;
  if (f.d) yield pos + s;
  if (f.d && f.r) yield pos + s + 1;
}

const checkWord = (board, [char, ...word], checked = {}, pos = -1) => {
  if (!char) return true;

  const s = board.length;
  return [...positionCandidates(board.length, pos)]
    .filter(e => !checked[e])
    .filter(e => board[Math.floor(e / s)][e % s] === char)
    .reduce(
      (acc, cur) =>
        acc || checkWord(board, word, { ...checked, [cur]: true }, cur),
      false
    );
};
