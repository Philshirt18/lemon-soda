// Picks a random index but never the same one twice in a row.
export function pickNext(length, last, rnd = Math.random) {
  if (length <= 1) return 0;
  let i = Math.floor(rnd() * length);
  if (i === last) i = (i + 1 + Math.floor(rnd() * (length - 1))) % length;
  return i;
}
